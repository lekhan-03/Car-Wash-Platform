import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPromoCodes, isWashServiceItem, PROMO_KEY } from "../../Components/Navbar/RewardsPie";
import "./Checkout.css";

const CashIcon  = () => <span>💵</span>;
const OnlineIcon = () => <span>💳</span>;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [address, setAddress] = useState({
    fullName: "", phone: "", street: "", city: "", pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Pay After Service");
  const [savedAddrAvailable, setSavedAddrAvailable] = useState(false);

  // ── Promo state ───────────────────────────────────────
  const [promoInput,   setPromoInput]   = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError,   setPromoError]   = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

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

  // ── Bill calculations ─────────────────────────────────
  let itemTotal    = 0;
  let taxes        = 0;
  let serviceCharge = 0;
  let hasDetailing = false;
  let hasStandard  = false;

  // Track cheapest WASH service price for free-wash promo cap
  let cheapestWashPrice = Infinity;

  (cartItems || []).forEach((item) => {
    const lineTotal = item.price * item.quantity;
    itemTotal += lineTotal;

    if (item.companyName || item.categoryName) {
      taxes += lineTotal * 0.18;
      hasDetailing = true;
      const category = (item.categoryName || "").toUpperCase();
      if      (category.includes("TINT"))                             serviceCharge += 99  * item.quantity;
      else if (category.includes("CERAMIC"))                          serviceCharge += 149 * item.quantity;
      else if (category.includes("PPF"))                              serviceCharge += 199 * item.quantity;
      else if (category.includes("RUBBING") || category.includes("POLISH")) serviceCharge += 49 * item.quantity;
      else                                                            serviceCharge += 49  * item.quantity;
    } else {
      taxes += lineTotal * 0.05;
      hasStandard = true;
      // Track cheapest wash item (per-unit price)
      if (item.price < cheapestWashPrice) cheapestWashPrice = item.price;
    }
  });

  let taxLabel = "Taxes";
  if (hasDetailing && hasStandard) taxLabel = "Taxes (5% & 18%)";
  else if (hasDetailing)           taxLabel = "Taxes (18%)";
  else if (hasStandard)            taxLabel = "Taxes (5%)";

  const platformFee = 10;

  // ── Promo discount calculation ────────────────────────
  // Free wash = covers cheapest wash service item price (capped at code.value)
  const calcPromoDiscount = () => {
    if (!appliedPromo) return 0;
    // If no wash items, discount is 0 (blocked at apply time anyway)
    if (!hasStandard || cheapestWashPrice === Infinity) return 0;
    // Discount = cheapest wash item price, but no more than code.value
    return Math.min(cheapestWashPrice, appliedPromo.value);
  };

  const promoDiscount = calcPromoDiscount();
  const subtotal      = itemTotal + taxes + serviceCharge + platformFee;
  const grandTotal    = Math.max(0, subtotal - promoDiscount);

  // ── Apply promo ───────────────────────────────────────
  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    setPromoError("");

    if (!code)        { setPromoError("Please enter a promo code."); return; }
    if (appliedPromo) { setPromoError("A promo code is already applied."); return; }

    // Guard: cart must have at least one wash service item
    const hasWashItems = (cartItems || []).some((item) => isWashServiceItem(item));
    if (!hasWashItems) {
      setPromoError(
        "This promo code is valid only on Water Wash or Steam Wash services. Detailing products are not eligible."
      );
      return;
    }

    setPromoLoading(true);
    setTimeout(() => {
      const codes = getPromoCodes();
      const found = codes.find((c) => c.code === code && !c.used);

      if (!found) {
        setPromoError("Invalid or already used promo code.");
        setPromoLoading(false);
        return;
      }

      setAppliedPromo(found);
      setPromoInput("");
      setPromoLoading(false);

      const discount = Math.min(cheapestWashPrice === Infinity ? found.value : cheapestWashPrice, found.value);
      toast.success(
        `🎉 Free Wash code applied! ₹${discount} off your cheapest wash`,
        { position: "top-center" }
      );
    }, 600);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError("");
    setPromoInput("");
  };

  // ── Submit order ──────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.fullName || !address.phone || !address.street || !address.city || !address.pincode) {
      toast.error("Please fill all address fields ❌", { position: "top-center" });
      return;
    }

    localStorage.setItem("lastAddress", JSON.stringify(address));

    const existingAddr = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    const isDuplicate  = existingAddr.some(
      (a) => a.street.toLowerCase() === address.street.toLowerCase() && a.pincode === address.pincode
    );
    if (!isDuplicate) {
      existingAddr.push(address);
      localStorage.setItem("savedAddresses", JSON.stringify(existingAddr));
    }

    // Mark promo as used
    if (appliedPromo) {
      const codes   = getPromoCodes();
      const updated = codes.map((c) =>
        c.code === appliedPromo.code
          ? { ...c, used: true, usedOn: new Date().toISOString() }
          : c
      );
      localStorage.setItem(PROMO_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("promoUsed"));
    }

    const orders   = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      bill: {
        itemTotal,
        taxes,
        serviceCharge,
        platformFee,
        promoDiscount,
        promoCode: appliedPromo?.code || null,
        grandTotal,
      },
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
    );
  }

  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h2>Checkout</h2>
      </div>

      <div className="checkout-content">
        <div className="checkout-left">

          {/* ── Address ── */}
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

          {/* ── Payment ── */}
          <div className="checkout-section">
            <h3>💳 Payment Method</h3>
            <div className="payment-grid">
              <div
                className={`payment-card ${paymentMethod === "Pay After Service" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("Pay After Service")}
              >
                <div className="radio-circle" />
                <div className="pay-info">
                  <CashIcon />
                  <span>Pay After Service</span>
                  <small>Cash / UPI upon completion</small>
                </div>
              </div>
              <div
                className={`payment-card ${paymentMethod === "Online Payment" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("Online Payment")}
              >
                <div className="radio-circle" />
                <div className="pay-info">
                  <OnlineIcon />
                  <span>Pay Online</span>
                  <small>Credit / Debit / UPI</small>
                </div>
              </div>
            </div>
          </div>

          {/* ── Promo Code ── */}
          <div className="checkout-section promo-section">
            <h3>🎁 Free Wash Code</h3>

            {/* Alert if no wash items in cart */}
            {!hasStandard && (
              <div className="promo-services-only-alert">
                ⚠️ Free wash codes apply only to <strong>Water Wash</strong> & <strong>Steam Wash</strong> services.
                Your current cart has detailing products only.
              </div>
            )}

            {appliedPromo ? (
              <div className="promo-applied-banner">
                <div className="promo-applied-left">
                  <span className="promo-applied-icon">✅</span>
                  <div>
                    <p className="promo-applied-code">{appliedPromo.code}</p>
                    <p className="promo-applied-label">
                      {appliedPromo.label} — ₹{promoDiscount} OFF cheapest wash
                    </p>
                  </div>
                </div>
                <button className="promo-remove-btn" onClick={handleRemovePromo}>✕</button>
              </div>
            ) : (
              <div className="promo-input-row">
                <input
                  className="promo-input"
                  type="text"
                  value={promoInput}
                  onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError(""); }}
                  placeholder="Enter code  e.g. R2B-WASH-XXXXX"
                  maxLength={16}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                  disabled={!hasStandard}
                />
                <button
                  className={`promo-apply-btn ${promoLoading ? "loading" : ""}`}
                  onClick={handleApplyPromo}
                  disabled={promoLoading || !hasStandard}
                >
                  {promoLoading ? "..." : "Apply"}
                </button>
              </div>
            )}

            {promoError && <p className="promo-error">⚠️ {promoError}</p>}
          </div>

        </div>

        {/* ── Order Summary ── */}
        <div className="checkout-right">
          <div className="order-summary-box">
            <h3>Order Summary</h3>
            <div className="summary-items-list">
              {cartItems.map((item) => (
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

            {appliedPromo && promoDiscount > 0 && (
              <div className="bill-row promo-discount-row">
                <span>🎁 Free Wash ({appliedPromo.code})</span>
                <span className="discount-amount">− ₹{promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <hr className="divider dashed" />

            <div className="bill-row total">
              <span>To Pay</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>

            {appliedPromo && promoDiscount > 0 && (
              <p className="saved-label">🎉 Your basic wash is on us! Saved ₹{promoDiscount}</p>
            )}

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