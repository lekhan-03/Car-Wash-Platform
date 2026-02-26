import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, ShieldCheck, Zap, Star, ChevronRight } from "lucide-react";
import { useCart } from "../../Context/CartContext";
import "./MonthlyPackages.css";

const plans = {
  basic: [
    { 
      id: "bronze", 
      name: "Bronze Shine Basic", 
      price: 570, 
      original: 629, 
      washes: 2, 
      features: ["1 Interior Wash and Exterior at ₹325 ", "1 Exterior Wash(only) at ₹250", "Basic Vacuuming"], 
      color: "#b45309", // Bronze Color,
      perwash: 285
    },
    { 
      id: "silver", 
      name: "Silver Shine Basic", 
      price: 1049, 
      original: 1259, 
      washes: 4, 
      features: ["2 Interior Wash and Exterior at ₹300 each", "2 Exterior Wash(only) at ₹225 each", "Basic Vacuuming"], 
      color: "#64748b",// Silver Color (slightly darkened for better white text contrast)
      perwash: 262
    },
    { 
      id: "gold", 
      name: "Gold Glow Basic", 
      price: 1899, 
      original: 2379, 
      washes: 8, 
      features: ["4 Interior Wash and Exterior at ₹275 each", "4 Exterior Wash(only) at ₹200 each", "Dashboard Polish", "Glass Cleaning"], 
      color: "#d9a806", // Gold Color (slightly darkened for better white text contrast)
      popular: true ,
      perwash: 237
    },
    { 
      id: "platinum", 
      name: "Platinum Basic", 
      price: 2549, 
      original: 3059, 
      washes: 12, 
      features: ["6 Interior Wash and Exterior at ₹250 each", "6 Exterior Wash(only) at ₹175 each", "Dashboard Polish", "Glass Cleaning"], 
      color: "#eb258f", // Platinum Blue Color
      perwash: 212
    }
  ],
  premium: [
    { 
      id: "bronzepremium", 
      name: "Bronze Shine Premium", 
      price: 649, 
      original: 719, 
      washes: 2, 
      features: ["Exterior Foam Wash", "Tyre Dressing", "Basic Vacuuming"], 
      color: "#b45309" ,
      perwash: 325
    },
    { 
      id: "silverpremium", 
      name: "Silver Shine Premium", 
      price: 1189, 
      original: 1349, 
      washes: 4, 
      features: ["Exterior Foam Wash", "Tyre Dressing", "Basic Vacuuming"], 
      color: "#64748b",
      perwash: 300 
    },
    { 
      id: "goldpremium", 
      name: "Gold Glow Premium", 
      price: 2199, 
      original: 2699, 
      washes: 8, 
      features: ["8 Premium Washes", "Interior Vacuuming", "Dashboard Polish", "Glass Cleaning"], 
      color: "#d9a806", 
      popular: true ,
      perwash:275
    },
    { 
      id: "platinumpremium", 
      name: "Platinum Premium", 
      price: 2999, 
      original: 3599, 
      washes: 12, 
      features: ["12 Premium Washes", "Engine Bay Cleaning", "Deep Interior Spa", "Hard Wax Protection"], 
      color: "#eb258f", 
      perwash: 250
    }
  ]
};

const MonthlyPackagePageWater = () => {
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
        <div style={{ width: 24 }} />
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
          <div className="plan-group" key={plan.id}>
            {/* ENTIRE CARD BACKGROUND IS COLORED */}
            <div 
                className={`plan-card ${plan.popular ? 'featured' : ''}`}
                style={{
                    backgroundColor: plan.color,
                    borderColor: plan.color,
                    color: '#ffffff' // Force text to white
                }}
            >
                {plan.popular && (
                    <div className="popular-badge" style={{ backgroundColor: '#ffffff', color: plan.color }}>
                        <Star size={12} fill={plan.color} color={plan.color}/> Best Value
                    </div>
                )}
                
                <div className="plan-card-header">
                <div className="plan-meta">
                    <h2 style={{ color: '#ffffff' }}>{plan.name}</h2>
                    <span className="washes-count" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {plan.washes} Washes / Month
                    </span>
                </div>
                <div className="plan-pricing">
                    <span className="price" style={{ color: '#ffffff' }}>₹{plan.price}</span>
                    <span className="old-price" style={{ color: 'rgba(255,255,255,0.6)' }}>₹{plan.original}</span>
                </div>
                </div>

                <ul className="plan-features-list">
                {plan.features.map((f, i) => (
                    <li key={i} style={{ color: '#ffffff' }}>
                        <CheckCircle size={16} color="#ffffff" /> {f}
                    </li>
                ))}
                </ul>

                <div className="savings-banner" style={{ backgroundColor: 'rgb(255, 255, 255)', color: '#161515' }}>
                <Zap size={14} fill="#000000" color="#0a0a0a" />
                <span >You will get ₹{plan.perwash} per wash</span>
                </div>

                <button 
                className="buy-plan-btn" 
                style={{ background: "#0e0e0e", color: "#ffffff" }} // White button with colored text
                onClick={() => handleSubscribe(plan)}
                >
                Subscribe Now
                </button>
            </div>

            {/* Darker Banner at the bottom to ground the bright colored cards */}
            <div className="promo-banner-strip">
                <div className="promo-left">
                    <ShieldCheck size={16} />
                    <span>Premium Quality Guaranteed</span>
                </div>
                <ChevronRight size={16} />
            </div>
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

export default MonthlyPackagePageWater;