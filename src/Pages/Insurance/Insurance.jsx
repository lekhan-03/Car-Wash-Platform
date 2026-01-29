import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insuranceCategories, trustedPartners, testimonials, processSteps } from "../../data/insuranceData";
import "./Insurance.css";

export default function Insurance() {
  const navigate = useNavigate();
  // Default to 'bike' view
  const [activeTab, setActiveTab] = useState("bike");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const currentData = insuranceCategories.find(c => c.id === activeTab);

  return (
    <div className="insurance-container">
      {/* 1. HEADER */}
      <div className="app-header">
        <div className="location-info">
          <button className="back-btn-modern" onClick={() => navigate(-1)}>
            <span className="icon">←</span>
          </button>
          <div className="loc-text">
            <span className="loc-city">Insurance</span>
            <span className="loc-label">Secure what you love</span>
          </div>
        </div>
        <div className="help-icon">?</div>
      </div>

      <div className="scrollable-content">
        
        {/* 2. CATEGORY TABS (Toggle) */}
        <div className="insurance-tabs">
          {insuranceCategories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <img src={cat.icon} alt={cat.title} className="tab-icon" />
              {cat.title}
            </button>
          ))}
        </div>

        {/* 3. HERO BANNER (Dynamic) */}
        <div className={`hero-banner ${activeTab}`}>
          <div className="banner-content">
            <span className="sub-tag">Best Plans</span>
            <h1>{currentData.bannerTitle}</h1>
            <p>⭐ {currentData.bannerSubtitle}</p>
          </div>
          <img 
            src={activeTab === 'car' 
              ? "https://cdn-icons-png.flaticon.com/512/2554/2554936.png" 
              : "https://cdn-icons-png.flaticon.com/512/3097/3097039.png"} 
            className="hero-img" 
            alt="vehicle"
          />
        </div>

        {/* 4. INPUT SECTION (Like PhonePe) */}
        <div className="input-section">
          <h3>Enter {activeTab} number</h3>
          <p>Compare plans from multiple insurers</p>
          
          <div className="number-input-box">
            <input 
              type="text" 
              placeholder={currentData.placeholder} 
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              maxLength={10}
            />
            {vehicleNumber.length > 4 && (
              <button className="view-plans-btn">View Plans →</button>
            )}
          </div>
          <p className="disclaimer">
            By proceeding, you allow us to call you to provide insurance assistance.
          </p>
        </div>

        {/* 5. NEW VEHICLE BANNER */}
        <div className="new-vehicle-card">
          <div className="text">
            <h4>Buying a brand new {activeTab}?</h4>
            <p>Save up to ₹{activeTab === 'car' ? '40,000' : '5,000'}</p>
            <span className="link">Check Plans</span>
          </div>
          <div className="gift-icon">🎁</div>
        </div>

        {/* 6. TESTIMONIALS */}
        <div className="section-block">
          <h3>1 Cr+ Indians chose us</h3>
          <p className="subtitle">Hear what our customers have to say</p>
          
          <div className="testimonial-row">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="avatar" style={{backgroundColor: t.color}}>
                  {t.initial}
                  <div className="quote-mark">❞</div>
                </div>
                <p>"{t.text}"</p>
                <h5>{t.name}</h5>
              </div>
            ))}
          </div>
        </div>

        {/* 7. TRUSTED PARTNERS */}
        <div className="section-block">
          <h3>Our Trusted Partners</h3>
          <div className="partners-grid">
            {trustedPartners.map((p, i) => (
              <div key={i} className="partner-logo">
                {/* Fallback to text if image fails, visually hidden img if broken */}
                <img src={p.logo} alt={p.name} onError={(e) => e.target.style.display='none'}/>
                <span className="partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8. STEPS */}
        <div className="section-block steps-container">
          <h3>Faster Insurance, Fewer Steps</h3>
          <div className="steps-row">
            {processSteps.map((s, i) => (
              <div key={i} className="step-item">
                <div className="step-circle">{s.step}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{height: "80px"}}></div>
      </div>
    </div>
  );
}