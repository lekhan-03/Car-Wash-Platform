import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 1. Load initial state from localStorage safely
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart", error);
      return [];
    }
  });

  // 2. Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to cart (Handles Unique Configurations)
  const addToCart = (product) => {
    setCartItems((prev) => {
      // FIX 1: Look for 'config' (used in Detailing) or 'tintConfig'
      const activeConfig = product.config || product.tintConfig;
      
      const uniqueId = activeConfig 
        ? `${product.id}-${JSON.stringify(activeConfig)}` 
        : product.id;

      const existing = prev.find((item) => item.uniqueId === uniqueId);

      if (existing) {
        return prev.map((item) =>
          item.uniqueId === uniqueId
            ? { 
                ...item, 
                quantity: item.quantity + (product.quantity || 1),
                // FIX 2: Force update the image if a new one is sent
                image: product.image || item.image 
              }
            : item
        );
      }
      
      // Add new item with uniqueId
      return [...prev, { ...product, uniqueId, quantity: product.quantity || 1 }];
    });
  };

  // ✅ Update quantity
  const updateQuantity = (uniqueId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  // ✅ Remove from cart
  const removeFromCart = (uniqueId) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  // ✅ Clear cart
  const clearCart = () => setCartItems([]);

  // ✅ Total items count
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};