import React from "react";
import { useNavigate } from "react-router-dom"; // Added for ad redirects
import "./ServiceListWater.css";
import { motion } from "framer-motion";
import { useCar } from "../../Context/CarContext"; 
import { ShieldCheck } from "lucide-react"; 
import adsStripData from "../../data/adStrips";

const ServiceList = ({ services, onServiceClick }) => {
  const { selectedCar } = useCar();
  const navigate = useNavigate();
  
  // Determine Car Type (sedan/suv etc.) to show correct price
  const rawType = selectedCar?.type || "sedan";
  const carType = rawType.toLowerCase();

  if (!services || services.length === 0) {
    return null; 
  }

  // Safety check to ensure ads load without crashing
  const validAds = Array.isArray(adsStripData) ? adsStripData : [];

  return (
    <div className="service-list-container">
      {services.map((service, index) => {
        
        let displayPrice = service.price?.[carType] || service.price?.["sedan"] || 0;

        // Check if this is the 3rd, 6th, 9th item...
        const isAdPosition = (index + 1) % 3 === 0;
        
        // Safely cycle through your ads array
        const adIndex = validAds.length > 0 ? Math.floor(index / 3) % validAds.length : 0;
        const currentAd = validAds.length > 0 ? validAds[adIndex] : null;

        return (
          <React.Fragment key={`service-${service.id}`}>
            <motion.div
              className="service-unit-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* --- THE MAIN CARD --- */}
              <div
                className="glass-card"
                onClick={() => onServiceClick(service)}
              >
                <div className="card-left">
                  <div className="card-header">
                    <h3>{service.name}</h3>
                    <div className="rating-row">
                      <span className="star-badge">★ 4.8</span>
                      <span className="review-count">(120+ reviews)</span>
                    </div>
                  </div>

                  <ul className="glass-features">
                    {service.features ? (
                      service.features.slice(0, 2).map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))
                    ) : (
                      <li>Premium quality service</li>
                    )}
                  </ul>

                  <div className="card-price-row">
                    <span className="price-main">
                      <small>₹</small>{displayPrice}
                    </span>
                    <span className="view-details-btn">View Details &gt;</span>
                  </div>
                </div>

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
                      e.stopPropagation(); 
                      onServiceClick(service);
                    }}
                  >
                    ADD
                  </button>
                </div>
              </div>

              {/* --- PROMO BANNER --- */}
              <div className="promo-banner-strip-water">
                <div className="marquee-track">
                  <div className="promo-content">
                    <ShieldCheck size={14} />
                    <span>Best Price Guarantee</span>
                    <span className="arrow-icon">➔</span>
                  </div>
                  <div className="promo-content">
                    <ShieldCheck size={14} />
                    <span>Premium Quality Assured</span>
                    <span className="arrow-icon">➔</span>
                  </div>
                  <div className="promo-content">
                    <ShieldCheck size={14} />
                    <span>Best Price Guarantee</span>
                    <span className="arrow-icon">➔</span>
                  </div>
                  <div className="promo-content">
                    <ShieldCheck size={14} />
                    <span>Premium Quality Assured</span>
                    <span className="arrow-icon">➔</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* --- INLINE AD BANNER AFTER EVERY 3RD ITEM --- */}
            {isAdPosition && currentAd && currentAd.image && (
              <motion.div 
                className="inline-ad-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => currentAd.redirect ? navigate(currentAd.redirect) : null}
                style={{ backgroundColor: currentAd.bgColor || 'var(--bg-primary)' }}
              >
                <img src={currentAd.image} alt={currentAd.title || "Promotional Offer"} />
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ServiceList;