import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";

const CashIcon = () => <span>💵</span>;
const OnlineIcon = () => <span>💳</span>;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [address, setAddress] = useState({
    fullName: "", phone: "", street: "", city: "", pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Pay After Service");
  const [savedAddrAvailable, setSavedAddrAvailable] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lastAddress");
    if (saved) setSavedAddrAvailable(true);
  }, []);

  const loadSavedAddress = () => {
    const saved = localStorage.getItem("lastAddress");
    if (saved) {
      setAddress(JSON.parse(saved));
      toast.info("Address Auto-filled! ⚡", { position: "top-center", autoClose: 1000 });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  // --- CALCULATIONS ---
  let itemTotal = 0;
  let taxes = 0;
  let serviceCharge = 0; // Moved here for dynamic addition
  let hasDetailing = false;
  let hasStandard = false;

  (cartItems || []).forEach((item) => {
    const lineTotal = item.price * item.quantity;
    itemTotal += lineTotal;
    
    if (item.companyName || item.categoryName) {
      taxes += lineTotal * 0.18; 
      hasDetailing = true;

      // --- DYNAMIC SERVICE CHARGE LOGIC ---
      const category = (item.categoryName || "").toUpperCase();
      
      if (category.includes("TINT")) serviceCharge += 99 * item.quantity;
      else if (category.includes("CERAMIC")) serviceCharge += 149 * item.quantity;
      else if (category.includes("PPF")) serviceCharge += 199 * item.quantity;
      else if (category.includes("RUBBING") || category.includes("POLISH")) serviceCharge += 49 * item.quantity;
      else serviceCharge += 49 * item.quantity;

    } else {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.fullName || !address.phone || !address.street || !address.city || !address.pincode) {
      toast.error("Please fill all address fields ❌", { position: "top-center" });
      return;
    }

    localStorage.setItem("lastAddress", JSON.stringify(address));

    const existingAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    const isDuplicate = existingAddresses.some(
      (addr) => addr.street.toLowerCase() === address.street.toLowerCase() && addr.pincode === address.pincode
    );
    if (!isDuplicate) {
      existingAddresses.push(address);
      localStorage.setItem("savedAddresses", JSON.stringify(existingAddresses));
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      bill: { itemTotal, taxes, serviceCharge, platformFee, grandTotal },
      paymentMethod,
      address,
      status: "Pending",
      date: new Date().toLocaleString(),
    };
    
    orders.unshift(newOrder); 
    localStorage.setItem("orders", JSON.stringify(orders));
    window.dispatchEvent(new Event("orderPlaced"));

    clearCart();
    toast.success("Order Placed Successfully! 🎉", { position: "top-center" });
    setTimeout(() => navigate("/account"), 2000); 
  };

  if (!cartItems.length) {
    return (
        <div className="checkout-empty">
            <h2>Your Cart is Empty</h2>
            <button onClick={() => navigate("/")}>Go Home</button>
        </div>
    )
  }

  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h2>Checkout</h2>
      </div>

      <div className="checkout-content">
        <div className="checkout-left">
          
          <div className="checkout-section">
            <div className="section-header-row">
              <h3>📍 Delivery Address</h3>
              {savedAddrAvailable && (
                <button type="button" className="autofill-btn" onClick={loadSavedAddress}>
                  Auto-fill Saved
                </button>
              )}
            </div>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="address-form">
              <div className="form-row">
                <div className="form-group half">
                  <label>Full Name</label>
                  <input type="text" name="fullName" value={address.fullName} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="form-group half">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={address.phone} onChange={handleChange} placeholder="9876543210" />
                </div>
              </div>

              <div className="form-group">
                <label>Street / Flat / Area</label>
                <input type="text" name="street" value={address.street} onChange={handleChange} placeholder="Flat 101, Galaxy Apartments..." />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>City</label>
                  <input type="text" name="city" value={address.city} onChange={handleChange} placeholder="Bengaluru" />
                </div>
                <div className="form-group half">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={address.pincode} onChange={handleChange} placeholder="560001" />
                </div>
              </div>
            </form>
          </div>

          <div className="checkout-section">
            <h3>💳 Payment Method</h3>
            <div className="payment-grid">
              <div className={`payment-card ${paymentMethod === "Pay After Service" ? "selected" : ""}`} onClick={() => setPaymentMethod("Pay After Service")}>
                <div className="radio-circle"></div>
                <div className="pay-info">
                  <CashIcon />
                  <span>Pay After Service</span>
                  <small>Cash / UPI upon completion</small>
                </div>
              </div>

              <div className={`payment-card ${paymentMethod === "Online Payment" ? "selected" : ""}`} onClick={() => setPaymentMethod("Online Payment")}>
                <div className="radio-circle"></div>
                <div className="pay-info">
                  <OnlineIcon />
                  <span>Pay Online</span>
                  <small>Credit / Debit / UPI</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="order-summary-box">
            <h3>Order Summary</h3>
            <div className="summary-items-list">
                {cartItems.map(item => (
                    <div key={item.id} className="summary-item">
                        <span>{item.quantity} x {item.name}</span>
                        <span>₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>
            
            <hr className="divider" />
            
            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{itemTotal.toFixed(2)}</span>
            </div>

            <div className="bill-row">
              <span>{taxLabel}</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>

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
            
            <hr className="divider dashed" />
            
            <div className="bill-row total">
              <span>To Pay</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>

            <button type="submit" form="checkout-form" className="place-order-btn">
              Place Order & Pay ₹{grandTotal.toFixed(0)}
            </button>
          </div>

          <div className="trust-badge-row">
            <span>🛡️ 100% Safe & Secure Payments</span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Checkout;