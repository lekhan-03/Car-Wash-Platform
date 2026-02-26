import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, ShieldCheck, Zap, Star } from "lucide-react";
import { useCart } from "../../Context/CartContext";
import "./MonthlyPackages.css";

const plans = {
  basic: [
    { 
      id: "silver", 
      name: "Silver Shine", 
      price: 899, 
      original: 1200, 
      washes: 2, 
      features: ["Exterior Foam Wash", "Tyre Dressing", "Basic Vacuuming"], 
      color: "#94a3b8" 
    },
    { 
      id: "gold", 
      name: "Gold Glow", 
      price: 1599, 
      original: 2400, 
      washes: 4, 
      features: ["4 Premium Washes", "Interior Vacuuming", "Dashboard Polish", "Glass Cleaning"], 
      color: "#f59e0b", 
      popular: true 
    }
  ],
  premium: [
    { 
      id: "platinum", 
      name: "Platinum Pro", 
      price: 2999, 
      original: 4800, 
      washes: 8, 
      features: ["8 Premium Washes", "Engine Bay Cleaning", "Deep Interior Spa", "Hard Wax Protection"], 
      color: "#3b82f6" 
    }
  ]
};

const MonthlyPackagePageSteam = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [tier, setTier] = useState("basic");

  const handleSubscribe = (plan) => {
    addToCart({ 
        id: plan.id,
        name: plan.name + " Membership",
        price: plan.price,
        image: "https://cdn-icons-png.flaticon.com/512/3845/3845868.png",
        type: "Membership",
        quantity: 1
    });
    navigate('/cart');
  };

  return (
    <div className="package-page">
      <div className="package-nav">
        <button onClick={() => navigate(-1)} className="back-icon"><ArrowLeft size={24} color="#1e293b" /></button>
        <h1>Subscription Plans</h1>
        <div style={{ width: 24 }} /> {/* Placeholder for center alignment */}
      </div>

      <div className="tier-selector">
        {["basic", "premium"].map(t => (
          <button 
            key={t} 
            className={tier === t ? "active" : ""} 
            onClick={() => setTier(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} Plans
          </button>
        ))}
      </div>

      <div className="plans-list">
        {plans[tier].map((plan) => (
          <div className={`plan-card ${plan.popular ? 'featured' : ''}`} key={plan.id}>
            {plan.popular && (
                <div className="popular-badge">
                    <Star size={12} fill="white"/> Best Value
                </div>
            )}
            
            <div className="plan-card-header">
              <div className="plan-meta">
                <h2 style={{ color: plan.color }}>{plan.name}</h2>
                <span className="washes-count">{plan.washes} Washes / Month</span>
              </div>
              <div className="plan-pricing">
                <span className="price">₹{plan.price}</span>
                <span className="old-price">₹{plan.original}</span>
              </div>
            </div>

            <ul className="plan-features-list">
              {plan.features.map((f, i) => (
                <li key={i}>
                    <CheckCircle size={16} color="#10b981" /> {f}
                </li>
              ))}
            </ul>

            <div className="savings-banner">
              <Zap size={14} fill="#f59e0b" color="#f59e0b" />
              <span>You save ₹{plan.original - plan.price} every month!</span>
            </div>

            <button 
              className="buy-plan-btn" 
              style={{ background: plan.color }} 
              onClick={() => handleSubscribe(plan)}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>

      <div className="insurance-trust-footer">
        <ShieldCheck size={24} color="#0066ff" />
        <p>Doorstep service included. 100% Satisfaction Guarantee.</p>
      </div>
    </div>
  );
};

export default MonthlyPackagePageSteam;