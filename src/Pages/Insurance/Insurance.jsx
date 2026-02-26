import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, HelpCircle, Gift, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import { insuranceCategories, trustedPartners, testimonials, processSteps } from "../../data/insuranceData";
import "./Insurance.css";

export default function Insurance() {
  const navigate = useNavigate();
  // Default to 'bike' view
  const [activeTab, setActiveTab] = useState("bike");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const currentData = insuranceCategories.find(c => c.id === activeTab);

  return (
    <div className="insurance-premium-container">
      
      {/* 1. PREMIUM HEADER (Glassmorphism) */}
      <div className="app-header-modern">
        <div className="header-left">
          <button className="back-btn-icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <div className="header-titles">
            <span className="title-main">Vehicle Insurance</span>
            <span className="title-sub">Secure what you love</span>
          </div>
        </div>
        <button className="help-btn-icon">
          <HelpCircle size={22} />
        </button>
      </div>

      <div className="scroll-content-modern">
        
        {/* 2. CATEGORY TABS (Sleek Segmented Control) */}
        <div className="tabs-container-modern">
          {insuranceCategories.map((cat) => (
            <button
              key={cat.id}
              className={`modern-tab ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {/* Fallback to image if you prefer, but icons look cleaner */}
              <img src={cat.icon} alt={cat.title} className="tab-img-icon" />
              {cat.title}
            </button>
          ))}
        </div>

        {/* 3. HERO BANNER (Midnight Blue Theme) */}
        <div className="hero-card-premium">
          <div className="hero-glow-bg"></div>
          <div className="hero-content-z">
            <span className="premium-badge"><ShieldCheck size={12} /> Best Plans</span>
            <h1>{currentData.bannerTitle}</h1>
            <p className="hero-subtext">⭐ {currentData.bannerSubtitle}</p>
          </div>
          <img 
            src={activeTab === 'car' 
              ? "https://cdn3d.iconscout.com/3d/premium/thumb/car-insurance-4993616-4160467.png" 
              : "https://cdn3d.iconscout.com/3d/premium/thumb/motorcycle-insurance-6789785-5586617.png"} 
            className="hero-3d-img" 
            alt="vehicle"
          />
        </div>

        {/* 4. INPUT SECTION (Fintech Style) */}
        <div className="modern-section">
          <h3 className="section-title">Enter {activeTab} Number</h3>
          <p className="section-desc">Compare top plans and save up to 80%</p>
          
          <div className="input-box-premium">
            <input 
              type="text" 
              placeholder={currentData.placeholder || "DL 01 AB 1234"} 
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              maxLength={10}
            />
            {vehicleNumber.length > 4 && (
              <button className="btn-view-plans">
                View Plans <ArrowRight size={16} />
              </button>
            )}
          </div>
          <p className="disclaimer-text">
            By proceeding, you agree to our terms and allow us to provide insurance assistance.
          </p>
        </div>

        {/* 5. NEW VEHICLE PROMO (Accent Blue Card) */}
        <div className="promo-card-modern">
          <div className="promo-text-modern">
            <h4>Buying a brand new {activeTab}?</h4>
            <p>Save up to ₹{activeTab === 'car' ? '40,000' : '5,000'} on showroom prices</p>
            <span className="promo-link">Check New {activeTab} Plans</span>
          </div>
          <div className="promo-icon-wrapper">
            <Gift size={32} strokeWidth={1.5} />
          </div>
        </div>

        {/* 6. TESTIMONIALS (Snap Scroll Carousel) */}
        <div className="modern-section no-bottom-pad">
          <h3 className="section-title">1 Cr+ Indians Chose Us</h3>
          <p className="section-desc">Hear what our customers have to say</p>
          
          <div className="testimonial-carousel">
            {testimonials.map((t) => (
              <div key={t.id} className="testimony-card-modern">
                <div className="testimony-header">
                  <div className="avatar-modern" style={{backgroundColor: t.color || '#0066ff'}}>
                    {t.initial}
                  </div>
                  <div>
                    <h5>{t.name}</h5>
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="testimony-text">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. TRUSTED PARTNERS */}
        <div className="modern-section">
          <h3 className="section-title text-center">Our Trusted Partners</h3>
          <div className="partners-grid-modern">
            {trustedPartners.map((p, i) => (
              <div key={i} className="partner-box">
                <img src={p.logo} alt={p.name} onError={(e) => e.target.style.display='none'}/>
                <span className="partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8. STEPS TO BUY */}
        <div className="modern-section steps-bg-modern">
          <h3 className="section-title text-center">Faster Insurance, Fewer Steps</h3>
          <div className="steps-flow-modern">
            {processSteps.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-icon-circle">
                  <CheckCircle size={18} />
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{height: "100px"}}></div>
      </div>
    </div>
  );
}