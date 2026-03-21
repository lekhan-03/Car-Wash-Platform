import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { ArrowLeft, Trash2, Zap, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  // --- CALCULATIONS ---
  let itemTotal = 0;
  let taxes = 0;
  let serviceCharge = 0; // Moved here so we can add to it dynamically
  let hasDetailing = false;
  let hasStandard = false;

  (cartItems || []).forEach((item) => {
    const lineTotal = item.price * item.quantity;
    itemTotal += lineTotal;
    
    // Detailing Products
    if (item.companyName || item.categoryName) {
      taxes += lineTotal * 0.18; 
      hasDetailing = true;

      // --- DYNAMIC SERVICE CHARGE LOGIC ---
      const category = (item.categoryName || "").toUpperCase();
      
      // Change these numbers to your actual Service Charges!
      if (category.includes("TINT")) {
        serviceCharge += 99 * item.quantity; 
      } 
      else if (category.includes("CERAMIC")) {
        serviceCharge += 149 * item.quantity;
      } 
      else if (category.includes("PPF")) {
        serviceCharge += 199 * item.quantity;
      } 
      else if (category.includes("RUBBING") || category.includes("POLISH")) {
        serviceCharge += 49 * item.quantity;
      } 
      else {
        serviceCharge += 49 * item.quantity; // Default fallback for any other detailing
      }

    } 
    // Standard Services
    else {
      taxes += lineTotal * 0.05; 
      hasStandard = true;
    }
  });

  let taxLabel = "Taxes";
  if (hasDetailing && hasStandard) taxLabel = "Taxes (5% & 18%)";
  else if (hasDetailing) taxLabel = "Taxes (18%)";
  else if (hasStandard) taxLabel = "Taxes (5%)";
  
  const platformFee = 10;
  const grandTotal = itemTotal + taxes + serviceCharge + platformFee;

  const fallbackImage = "https://cdn-icons-png.flaticon.com/512/3202/3202926.png";
  const handleImageError = (e) => { e.target.src = fallbackImage; };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <div className="empty-icon-wrapper">
          <ShoppingBag size={50} color="#0066ff" strokeWidth={1.5} className="empty-cart-icon" />
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
      <div className="cart-header-nav">
        <button onClick={() => navigate(-1)} className="back-btn"><ArrowLeft size={18} /> Back</button>
        <h3>My Cart <span className="cart-count-badge">({cartItems.length})</span></h3>
        <button onClick={clearCart} className="clear-btn">Clear</button>
      </div>

      <div className="cart-grid-layout">
        <div className="cart-left-section">
          <div className="cart-items-container">
            {cartItems.map((item, index) => {
              const displayImage = item.image || (item.images && item.images.length > 0 ? item.images[0] : fallbackImage);

              return (
                <div className="cart-card" key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="cart-card-media">
                    <img src={displayImage} alt={item.name} onError={handleImageError} />
                  </div>
                  
                  <div className="cart-card-info">
                    <div className="info-top">
                      <h4>{item.name}</h4>
                      {item.companyName && <span className="brand-tag">{item.companyName}</span>}
                      <p className="item-price">₹{item.price}</p>
                    </div>
                    
                    <div className="action-row">
                      <div className="quantity-pill">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="trash-btn" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cart-right-section">
          <div className="cart-promo-banner">
            <div className="promo-content">
              <Zap size={24} fill="#fff" className="sparkle-icon" />
              <div className="promo-text">
                <strong>Electric Deal!</strong>
                <span>Extra ₹50 saved on this order</span>
              </div>
            </div>
          </div>

          <div className="bill-details-card">
            <h3>Bill Details</h3>
            
            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{itemTotal.toFixed(2)}</span>
            </div>
            
            <div className="bill-row">
              <span>{taxLabel}</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>

            {/* Will only show if there is an actual service charge calculated */}
            {serviceCharge > 0 && (
              <div className="bill-row">
                <span>Service Charge</span>
                <span>₹{serviceCharge.toFixed(2)}</span>
              </div>
            )}

            <div className="bill-row">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            
            <div className="divider-line"></div>
            
            <div className="bill-row total">
              <span>To Pay</span>
              <span className="grand-total">₹{grandTotal.toFixed(2)}</span>
            </div>

            <button className="btn-checkout-main" onClick={() => navigate("/checkout")}>
              Proceed to Pay <ArrowRight size={18} className="btn-arrow" />
            </button>
            
            <div className="secure-badge">
              <ShieldCheck size={14} /> 100% Safe & Secure Payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;