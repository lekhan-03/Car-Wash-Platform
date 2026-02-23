import React from "react";
import "./ServiceList.css";
import { motion } from "framer-motion";
import { useCar } from "../../Context/CarContext"; 

const ServiceList = ({ services, onServiceClick }) => {
  const { selectedCar } = useCar();
  
  // Determine Car Type (sedan/suv etc.) to show correct price
  const rawType = selectedCar?.type || "sedan";
  const carType = rawType.toLowerCase();

  if (!services || services.length === 0) {
    return null; 
  }

  return (
    <div className="service-list-container">
      {services.map((service, index) => {
        
        // Price Calculation Logic based on car type
        let displayPrice = service.price?.[carType];
        if (!displayPrice) displayPrice = service.price?.["sedan"] || 0;

        return (
          <motion.div
            key={service.id}
            className="service-unit-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* --- GLASS CARD --- */}
            <div
              className="glass-card"
              onClick={() => onServiceClick(service)}
            >
              {/* LEFT SIDE: INFO & DETAILS */}
              <div className="card-left">
                <div className="card-header">
                  <h3>{service.name}</h3>
                  
                  {/* Rating Badge */}
                  <div className="rating-row">
                    <span className="star-badge">★ 4.8</span>
                    <span className="review-count">(120+ reviews)</span>
                  </div>
                </div>

                {/* Features List (Limit to 2 items for cleanliness) */}
                <ul className="glass-features">
                  {service.features ? (
                    service.features.slice(0, 2).map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))
                  ) : (
                    <li>Premium quality service</li>
                  )}
                </ul>

                {/* Price & View Details Link */}
                <div className="card-price-row">
                  <span className="price-main">
                    <small>₹</small>{displayPrice}
                  </span>
                  <span className="view-details-btn">View Details &gt;</span>
                </div>
              </div>

              {/* RIGHT SIDE: IMAGE + ADD BUTTON */}
              <div className="card-right">
                <div className="img-wrapper">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/296/296216.png"}
                  />
                </div>
                
                <button 
                  className="add-btn-glass"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening details when clicking ADD
                    onServiceClick(service);
                  }}
                >
                  ADD
                </button>
              </div>
            </div>

            {/* --- PROMO BANNER (Appears after every service) --- */}
            <div className="promo-banner-strip">
              <div className="promo-content">
                <span className="promo-icon">💎</span>
                <span>Best Price Guarantee</span>
              </div>
              <span className="arrow-icon">➔</span>
            </div>

          </motion.div>
        );
      })}
    </div>
  );
};

export default ServiceList;