import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

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
      // Generate a unique ID based on config (e.g., specific Tint values)
      // If no config, use the standard Product ID
      const uniqueId = product.tintConfig 
        ? `${product.id}-${JSON.stringify(product.tintConfig)}` 
        : product.id;

      const existing = prev.find((item) => item.uniqueId === uniqueId);

      if (existing) {
        return prev.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Add new item with uniqueId
      return [...prev, { ...product, uniqueId, quantity: 1 }];
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
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};