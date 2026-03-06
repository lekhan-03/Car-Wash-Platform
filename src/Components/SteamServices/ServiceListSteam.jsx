import React from "react";
import { useNavigate } from "react-router-dom"; // Added for ad redirects
import "./ServiceListSteam.css";
import { motion } from "framer-motion";
import { useCar } from "../../Context/CarContext";
import { ShieldCheck } from "lucide-react";
import adsStripData from "../../data/adStrips"; // Import the ads data

const ServiceList = ({ services, onServiceClick }) => {
  const { selectedCar } = useCar();
  const navigate = useNavigate();

  // Determine Car Type (sedan/suv etc.) to show correct price
  const rawType = selectedCar?.type || "sedan";
  const carType = rawType.toLowerCase();

  if (!services || services.length === 0) {
    return null;
  }

  // Safety check to ensure ads array is valid
  const validAds = Array.isArray(adsStripData) ? adsStripData : [];

  return (
    <div className="service-list-container">
      {services.map((service, index) => {

        // Price Calculation Logic based on car type
        let displayPrice = service.price?.[carType];
        if (!displayPrice) displayPrice = service.price?.["sedan"] || 0;

        // --- AD POSITIONING LOGIC ---
        // Check if this is a multiple of 3 (3rd, 6th, 9th, etc.)
        const isAdPosition = (index + 1) % 3 === 0;
        
        // Safely cycle through your ads dynamically so they don't repeat the same image
        const adIndex = validAds.length > 0 ? Math.floor(index / 3) % validAds.length : 0;
        const currentAd = validAds.length > 0 ? validAds[adIndex] : null;

        return (
          <React.Fragment key={`steam-service-${service.id}`}>
            <motion.div
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
              <div className="promo-banner-strip-steam">
                <div className="marquee-track">
                  {/* --- SET 1 --- */}
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

                  {/* --- SET 2 (Exact Duplicate for seamless looping) --- */}
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
                style={{ backgroundColor: currentAd.bgColor || '#ffffff' }}
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