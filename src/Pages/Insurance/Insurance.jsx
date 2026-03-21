import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, HelpCircle, Gift, ShieldCheck, 
  ArrowRight, CheckCircle, Car, Calendar, AlertTriangle, 
  Search, X
} from "lucide-react";
import { insuranceCategories, trustedPartners, testimonials, processSteps } from "../../data/insuranceData";
import { vehicleInsuranceData } from "../../data/vehicleInsuranceData"; 
import "./Insurance.css";

export default function Insurance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bike");
  const [vehicleNumber, setVehicleNumber] = useState("");
  
  const [searchedVehicle, setSearchedVehicle] = useState(null);
  const [searchError, setSearchError] = useState("");

  const currentData = (insuranceCategories || []).find(c => c.id === activeTab) || {};

  const handleSearch = () => {
    if (!vehicleNumber.trim()) {
      setSearchError("Please enter a vehicle number.");
      return;
    }
    
    const formattedInput = vehicleNumber.replace(/\s+/g, '').toUpperCase();
    
    const foundVehicle = (vehicleInsuranceData || []).find(
      v => v.vehicleNumber.replace(/\s+/g, '').toUpperCase() === formattedInput
    );

    if (foundVehicle) {
      setSearchedVehicle(foundVehicle);
      setSearchError("");
    } else {
      setSearchedVehicle(null);
      setSearchError("Vehicle not found. Please try 'KA01AB1234' or proceed manually.");
    }
  };

  const clearSearch = () => {
    setSearchedVehicle(null);
    setVehicleNumber("");
    setSearchError("");
  };

  return (
    <div className="insurance-premium-container">
      
      {/* 1. TOP BAR */}
      <div className="app-header-modern">
        <button className="back-btn-icon" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <button className="help-btn-icon">
          <HelpCircle size={22} />
        </button>
      </div>

      <div className="scroll-content-modern">
        
        {/* ==============================================
            ORIGINAL TABS & HERO BANNER (Restored)
            ============================================== */}
        {!searchedVehicle && (
          <>
            {/* 2. CATEGORY TABS */}
            <div className="tabs-container-modern">
              {insuranceCategories?.map((cat) => (
                <button
                  key={cat.id}
                  className={`modern-tab ${activeTab === cat.id ? "active" : ""}`}
                  onClick={() => setActiveTab(cat.id)}
                >
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
                <h1>{currentData?.bannerTitle || "Premium Insurance"}</h1>
                <p className="hero-subtext">⭐ {currentData?.bannerSubtitle || "Instant Policy. Zero Hassle."}</p>
              </div>
              <img 
                src={activeTab === 'car' 
                  ? "https://res.cloudinary.com/ddgxphtda/image/upload/v1772188388/Insurance_photo.png" 
                  : "https://res.cloudinary.com/ddgxphtda/image/upload/v1772189364/bike_insurance.png"} 
                className="hero-3d-img" 
                alt="vehicle"
              />
            </div> 
          </>
        )}

        {/* --- 4. SEARCH SECTION --- */}
        <div className="modern-section" style={{ marginTop: searchedVehicle ? '20px' : '25px' }}>
          <div className="search-card-modern">
            <h2 className="brand-heading">Zero Paperwork.<br/>Instant Policy.</h2>
            <p className="search-subtitle">Get up to 85% off on your premium</p>
            
            <div className="input-group-modern">
              <input
                type="text"
                placeholder="Enter Vehicle Number (e.g. MH02...)"
                value={vehicleNumber}
                onChange={(e) => {
                  setVehicleNumber(e.target.value.toUpperCase());
                  setSearchError(""); 
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-btn-modern" onClick={handleSearch}>
                {searchedVehicle ? <Search size={20} /> : <ArrowRight size={20} />}
              </button>
            </div>
            {searchError && <p className="search-error-msg">{searchError}</p>}
          </div>
        </div>

        {/* ==============================================
            DYNAMIC CONTENT (Dashboard vs Marketing)
            ============================================== */}
        {searchedVehicle ? (
          
          /* VIEW 1: VEHICLE DASHBOARD (When Searched) */
          <div className="vehicle-dashboard-view fade-in-up">
            
            <div className="dashboard-header-row">
              <h3>Vehicle Details</h3>
              <button className="clear-search-btn" onClick={clearSearch}>
                <X size={14} /> Clear
              </button>
            </div>

            {/* Vehicle Info Card */}
            <div className="vehicle-info-card">
              <div className="vi-top">
                <div className="vi-icon-wrapper"><Car size={24} /></div>
                <div>
                  <h4 className="vi-title">{searchedVehicle?.make} {searchedVehicle?.model}</h4>
                  <p className="vi-plate">{searchedVehicle?.vehicleNumber}</p>
                </div>
              </div>
              <div className="vi-bottom">
                <span><Calendar size={14} /> Reg: {searchedVehicle?.year}</span>
                <span>Fuel: {searchedVehicle?.fuelType}</span>
                <span>Owner: {searchedVehicle?.ownerName}</span>
              </div>
            </div>

            {/* Current Policy Card */}
            {searchedVehicle.activeInsurance && (
              <div className={`current-policy-card status-${searchedVehicle.activeInsurance.status?.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="cp-header">
                  <span className="cp-title">Current Policy</span>
                  <span className="cp-status-badge">
                    {searchedVehicle.activeInsurance.status === "Expired" && <AlertTriangle size={12} />}
                    {searchedVehicle.activeInsurance.status}
                  </span>
                </div>
                <div className="cp-details">
                  <div className="cp-col">
                    <small>Provider</small>
                    <strong>{searchedVehicle.activeInsurance.provider}</strong>
                  </div>
                  <div className="cp-col">
                    <small>Expires On</small>
                    <strong>{searchedVehicle.activeInsurance.expiryDate}</strong>
                  </div>
                  <div className="cp-col">
                    <small>Current IDV</small>
                    <strong>₹{searchedVehicle.activeInsurance.idv?.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Compare Quotes Section */}
            <div className="quotes-section">
              <h3 className="section-title">Compare New Quotes</h3>
              <div className="quotes-list">
                {searchedVehicle.quotes?.map((quote) => (
                  <div key={quote.id} className="quote-card">
                    {quote.tag && <div className="quote-tag">{quote.tag}</div>}
                    
                    <div className="quote-header">
                      <div className="quote-brand">
                        <ShieldCheck size={20} className="q-icon" />
                        <span>{quote.provider}</span>
                      </div>
                      <div className="quote-premium">
                        <span className="q-price">₹{quote.premium?.toLocaleString()}</span>
                        <small>+GST</small>
                      </div>
                    </div>
                    
                    <div className="quote-body">
                      <div className="q-feature">
                        <small>Plan Type</small>
                        <p>{quote.plan}</p>
                      </div>
                      <div className="q-feature">
                        <small>IDV Cover</small>
                        <p>{quote.idv > 0 ? `₹${quote.idv.toLocaleString()}` : "N/A"}</p>
                      </div>
                    </div>

                    <button className="buy-quote-btn">
                      Buy Now <ArrowRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          
          /* VIEW 2: DEFAULT MARKETING (When Not Searched) */
          <div className="default-marketing-view fade-in-up">
            
            <div className="modern-section promo-cards-scroll">
              {currentData.promos?.map((promo, idx) => (
                <div key={idx} className="promo-card-modern" style={{ background: promo.color }}>
                  <div className="promo-text-modern">
                    <h4>{promo.title}</h4>
                    <p>{promo.desc}</p>
                    <button className="promo-action-btn">Explore <ArrowRight size={14}/></button>
                  </div>
                  <div className="promo-icon-modern"><Gift size={32} /></div>
                </div>
              ))}
            </div>

            <div className="modern-section">
              <div className="stats-row-modern">
                <div className="stat-col">
                  <strong>₹200Cr+</strong><span>Claims Settled</span>
                </div>
                <div className="stat-col">
                  <strong>30L+</strong><span>Happy Users</span>
                </div>
                <div className="stat-col">
                  <strong>2 Mins</strong><span>Instant Policy</span>
                </div>
              </div>
            </div>

            <div className="modern-section bg-white-section">
              <h3 className="section-title">What Our Customers Say</h3>
              <div className="testimonials-scroll-modern">
                {testimonials?.map((t, i) => (
                  <div key={i} className="testimony-card-modern">
                    <div className="t-user">
                      <div className="avatar-circle">{t.name?.charAt(0)}</div>
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

            <div className="modern-section">
              <h3 className="section-title text-center">Our Trusted Partners</h3>
              <div className="partners-grid-modern">
                {trustedPartners?.map((p, i) => (
                  <div key={i} className="partner-box">
                    <img src={p.logo} alt={p.name} onError={(e) => e.target.style.display='none'}/>
                    <span className="partner-name">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modern-section steps-bg-modern">
              <h3 className="section-title text-center">Faster Insurance, Fewer Steps</h3>
              <div className="steps-flow-modern">
                {processSteps?.map((s, i) => (
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
          
          </div>
        )}
<br />
<br />
      </div>
    </div>
  );
}