import React from "react";
import "./MonthlyPackages.css";
import { useCart } from "../../Context/CartContext";

const packages = [
  {
    id: "pkg_1",
    name: "Silver Shine",
    washCount: 2,
    price: 899,
    originalPrice: 1200,
    perWash: 449,
    color: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)", // Silver Gradient
    benefits: ["Exterior Foam Wash", "Interior Vacuuming", "Tyre Dressing"],
    popular: false
  },
  {
    id: "pkg_2",
    name: "Gold Glow",
    washCount: 4,
    price: 1599,
    originalPrice: 2400,
    perWash: 399,
    color: "linear-gradient(135deg, #f1c40f 0%, #d35400 100%)", // Gold Gradient
    benefits: ["4 Premium Washes", "1 Wax Polish FREE", "Priority Booking", "Interior Deep Clean"],
    popular: true // Shows "Best Value"
  },
  {
    id: "pkg_3",
    name: "Platinum Pro",
    washCount: 8,
    price: 2999,
    originalPrice: 4800,
    perWash: 375,
    color: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)", // Electric Blue Gradient
    benefits: ["8 Premium Washes", "2 Wax Polish", "Engine Bay Cleaning", "Dedicated Washer"],
    popular: false
  }
];

const MonthlyPackages = () => {
  const { addToCart } = useCart();

  const handleSubscribe = (pkg) => {
    // Add package to cart with specific type
    addToCart({
      id: pkg.id,
      name: pkg.name + " Membership",
      price: pkg.price,
      image: "https://cdn-icons-png.flaticon.com/512/3845/3845868.png", // Generic Membership Icon
      type: "Membership",
      quantity: 1
    });
  };

  return (
    <div className="packages-container">
      <div className="section-header">
        <h3>Monthly Subscriptions 💎</h3>
        <p>Save up to 40% with our smart plans.</p>
      </div>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            
            {/* Header / Background */}
            <div className="pkg-header" style={{ background: pkg.color }}>
              {pkg.popular && <span className="best-value-badge">BEST VALUE</span>}
              <div className="pkg-name-row">
                <h4>{pkg.name}</h4>
                <span className="wash-count-badge">{pkg.washCount} Washes</span>
              </div>
              <div className="pkg-price-row">
                <span className="currency">₹</span>
                <span className="price">{pkg.price}</span>
                <span className="original">₹{pkg.originalPrice}</span>
              </div>
              <div className="per-wash-tag">
                Effective: <strong>₹{pkg.perWash}/wash</strong>
              </div>
            </div>

            {/* Benefits List */}
            <div className="pkg-body">
              <ul className="benefits-list">
                {pkg.benefits.map((benefit, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span> {benefit}
                  </li>
                ))}
              </ul>
              
              <div className="savings-alert">
                You save <strong>₹{pkg.originalPrice - pkg.price}</strong> with this pack!
              </div>

              <button 
                className="subscribe-btn"
                onClick={() => handleSubscribe(pkg)}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyPackages;