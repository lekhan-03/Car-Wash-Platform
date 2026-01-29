import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  // Calculate Totals
  const itemTotal = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const taxes = itemTotal * 0.05; // 5% Tax
  const platformFee = 10;
  const grandTotal = itemTotal + taxes + platformFee;

  // Fallback image in case of broken links
  const fallbackImage = "https://cdn-icons-png.flaticon.com/512/3202/3202926.png";

  const handleImageError = (e) => {
    e.target.src = fallbackImage; 
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <div className="empty-icon-wrapper">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
            alt="Empty Cart"
            className="empty-cart-icon" 
          />
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any services yet.</p>
        <button onClick={() => navigate("/")} className="btn-shop-now">
          Explore Services
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      
      {/* --- Header --- */}
      <div className="cart-header-nav">
        <button onClick={() => navigate(-1)} className="back-btn">
          <span className="icon">←</span> Back
        </button>
        <h3>My Cart <span className="cart-count-badge">({cartItems.length})</span></h3>
        <button onClick={clearCart} className="clear-btn">Clear</button>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="cart-grid-layout">
        
        {/* LEFT COLUMN: Cart Items */}
        <div className="cart-left-section">
          <div className="cart-items-container">
            {cartItems.map((item) => {
              // Handle image source safely (supports singular 'image' or array 'images')
              const displayImage = item.image || (item.images && item.images.length > 0 ? item.images[0] : fallbackImage);

              return (
                <div className="cart-card" key={item.id}>
                  <div className="cart-card-media">
                    <img 
                      src={displayImage} 
                      alt={item.name} 
                      onError={handleImageError} 
                    />
                  </div>
                  
                  <div className="cart-card-info">
                    <div className="info-top">
                      <h4>{item.name}</h4>
                      {item.companyName && <span className="brand-tag">{item.companyName}</span>}
                      <p className="item-price">₹{item.price}</p>
                    </div>
                    
                    <div className="action-row">
                      {/* Quantity Controls */}
                      <div className="quantity-pill">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      
                      {/* Remove Button */}
                      <button className="trash-btn" onClick={() => removeFromCart(item.id)}>
                        <span className="trash-icon">🗑</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Bill & Actions */}
        <div className="cart-right-section">
          
          {/* Promo Banner */}
          <div className="cart-promo-banner">
            <div className="promo-content">
              <span className="sparkle">⚡</span>
              <div className="promo-text">
                <strong>Electric Deal!</strong>
                <span>Extra ₹50 saved on this order</span>
              </div>
            </div>
          </div>

          {/* Bill Details Card */}
          <div className="bill-details-card">
            <h3>Bill Details</h3>
            
            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{itemTotal.toFixed(2)}</span>
            </div>
            <div className="bill-row">
              <span>Taxes & Charges (5%)</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>
            <div className="bill-row">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            
            <div className="divider-line"></div>
            
            <div className="bill-row total">
              <span>To Pay</span>
              <span className="grand-total">₹{grandTotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button 
              className="btn-checkout-main"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Pay <span className="btn-arrow">→</span>
            </button>
            
            <div className="secure-badge">
              🔒 100% Safe & Secure Payments
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;