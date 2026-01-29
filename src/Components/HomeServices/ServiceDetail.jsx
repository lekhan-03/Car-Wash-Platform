import React, { useState } from "react";
import "./ServiceDetail.css";
import { useCart } from "../../Context/CartContext";
import { useCar } from "../../Context/CarContext";

const availableSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];

const ServiceDetail = ({ service, onBack }) => {
  const { selectedCar } = useCar();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("included");
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Safe fallback for price
  const carType = selectedCar?.type?.toLowerCase() || "sedan";
  const finalPrice = service.price?.[carType] || service.price?.["sedan"] || 0;

  const handleAddToCart = () => {
    if (!selectedSlot) {
      alert("Please select a time slot first.");
      return;
    }

    addToCart({
      id: `${service.id}-${selectedSlot}`,
      name: `${service.name} (${selectedSlot})`,
      price: finalPrice,
      quantity: 1,
    });
  };

  const handleImageError = (e) => {
    e.target.src = "https://cdn-icons-png.flaticon.com/512/296/296216.png";
  };

  return (
    <div className="service-detail-page">
      {/* 1. Header */}
      <div className="sd-header">
        <button className="sd-back-btn" onClick={onBack}>
          ←
        </button>
        <span className="sd-header-title">Service Details</span>
        <button className="sd-filter-btn">Filter</button>
      </div>

      <div className="sd-scroll-content">
        {/* 2. Gallery Carousel */}
        <div className="sd-gallery">
          {service.gallery && service.gallery.length > 0 ? (
            service.gallery.map((item, index) => (
              <div key={index} className="sd-gallery-item">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={handleImageError}
                />
                <span className="sd-gallery-label">{item.title}</span>
              </div>
            ))
          ) : (
            <img
              src={service.image}
              alt={service.name}
              className="sd-main-img"
              onError={handleImageError}
            />
          )}
        </div>

        {/* 3. Title & Info */}
        <div className="sd-info-section">
          <div className="sd-title-row">
            <h1 className="sd-service-name">{service.name}</h1>
            <div className="sd-rating-box">
              <span className="sd-star">★</span> 4.5
              <span className="sd-rating-count">596 ratings</span>
            </div>
          </div>

          <div className="sd-price-time-row">
            <span className="sd-price-large">₹{finalPrice}</span>
            <span className="sd-time">⏱ 1 hr 25 mins</span>
            <span className="sd-link">Why Rev2Blush &gt;</span>
          </div>
        </div>

        {/* 4. Banner */}
        <div className="sd-banner">
          <div className="sd-banner-content">
            <span className="sd-banner-yellow">HIGH-QUALITY</span>
            <span className="sd-banner-text">CAR CARE PRODUCTS</span>
            <small>For Superior Shine & Protection</small>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/2403/2403043.png" alt="products" className="sd-banner-icon" />
        </div>

        {/* 5. Included / Excluded Tabs */}
        <div className="sd-tabs-section">
          <div className="sd-tabs-header">
            <h3>What is Included in my Service?</h3>
            <span className="sd-see-all">See all</span>
          </div>

          <div className="sd-tab-buttons">
            <button
              className={`sd-tab-btn included ${activeTab === 'included' ? 'active' : ''}`}
              onClick={() => setActiveTab('included')}
            >
              ✓ What's Included
            </button>
            <button
              className={`sd-tab-btn excluded ${activeTab === 'excluded' ? 'active' : ''}`}
              onClick={() => setActiveTab('excluded')}
            >
              ✕ What's Excluded
            </button>
          </div>

          {activeTab === 'included' && (
            <div className="sd-features-grid">
              {(service.gallery || []).slice(0, 4).map((item, idx) => (
                <div key={idx} className="sd-feature-item">
                  <img src={item.image} alt={item.title} onError={handleImageError} />
                  <span>{item.title}</span>
                </div>
              ))}
              {(!service.gallery || service.gallery.length === 0) && (
                <>
                  <div className="sd-feature-item"><span>Foam Wash</span></div>
                  <div className="sd-feature-item"><span>Tyre Polish</span></div>
                  <div className="sd-feature-item"><span>Vacuum</span></div>
                  <div className="sd-feature-item"><span>Doorstep</span></div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="sd-booking-section">
          <h3>Select Date & Time</h3>
          <div className="sd-slots-grid">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className={`sd-slot-chip ${selectedSlot === slot ? "active" : ""}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.split("-")[0]} {/* Show start time only for clean look */}
                <span className="sd-slot-dur">30 min</span>
              </button>
            ))}
          </div>

          {/* MAIN ADD TO CART BUTTON (Below Slots) */}
          <button
            className={`sd-main-add-btn ${!selectedSlot ? 'disabled' : ''}`}
            onClick={handleAddToCart}
          >
            {selectedSlot ? "Add to Cart" : "Select a Slot to Continue"}
          </button>
        </div>

        {/* 6. Comparison Card */}
        <div className="sd-comparison-card">
          <div className="sd-comp-header">
            <div className="sd-comp-col">Local Car<br />Washing Center</div>
            <div className="sd-comp-vs">VS</div>
            <div className="sd-comp-col hoora">Rev2Blush</div>
          </div>

          <div className="sd-comp-row">
            <div className="sd-comp-left">
              <span className="cross-icon">✕</span>
              <p>No doorstep service<br /><span>(Time wasted visiting center)</span></p>
            </div>
            <div className="sd-comp-right">
              <span className="check-icon">✓</span>
              <p>Doorstep professional setup<br /><span>(Saves time & effort)</span></p>
            </div>
          </div>

          <div className="sd-comp-row">
            <div className="sd-comp-left">
              <span className="check-icon">✓</span>
              <p>Basic exterior pressure wash<br /><span>(Surface cleaning only)</span></p>
            </div>
            <div className="sd-comp-right">
              <span className="check-icon">✓</span>
              <p>High-pressure wash & vacuum<br /><span>(Deep clean inside-out)</span></p>
            </div>
          </div>

          <div className="sd-comp-row">
            <div className="sd-comp-left">
              <span className="cross-icon">✕</span>
              <p>No dashboard or plastic polish</p>
            </div>
            <div className="sd-comp-right">
              <span className="check-icon">✓</span>
              <p>Dashboard & trims polish</p>
            </div>
          </div>
        </div>

        {/* 7. BOOKING SECTION (Moved Here) */}


        {/* 8. Help Links */}
        <div className="sd-help-links">
          <h3>Help & Feedback</h3>
          <div className="sd-link-item">Customer Reviews <span>&gt;</span></div>
          <div className="sd-link-item">Frequently Asked Questions <span>&gt;</span></div>
        </div>

        {/* Spacer for sticky footer if you keep it, otherwise reduce */}
        <div style={{ height: "100px" }}></div>
      </div>

      {/* 9. Sticky Footer (Optional: You can keep this for price visibility or remove if the main button is enough) */}
      <div className="sd-sticky-footer">
        <div className="sd-footer-price-block">
          <span className="sd-footer-price">₹{finalPrice}</span>
          <span className="sd-footer-time">1 hr 25 mins</span>
        </div>
        <button className="sd-footer-btn black" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ServiceDetail;