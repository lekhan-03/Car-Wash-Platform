import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./steamService.css";
import { Sparkles } from "lucide-react";
import { services } from "../../data/steamServices";
import adsData from "../../data/detailAdsData";
import ServiceList from "./ServiceListSteam";
import SteamServiceDetail from "./ServiceDetail";

// --- CATEGORIES AS KEYWORDS ---
const defaultCategories = [
  {
    id: "steam-wash",
    label: "Steam Wash",
    keywords: ["steam", "dry", "eco"],
    exclude: ["foam"]
  },
  {
    id: "interior",
    label: "💺 Interior",
    keywords: ["interior", "fabric", "leather", "vacuum", "upholstery"]
  },
  {
    id: "coating",
    label: "🛡️ Coating",
    keywords: ["coating", "ceramic", "teflon", "protection", "wax"]
  },
  {
    id: "deep-clean",
    label: "✨ Deep Clean",
    keywords: ["deep", "sanitize", "germ", "spa", "complete"]
  }
];

const SteamService = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [selectedService, setSelectedService] = useState(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Auto-scroll banner
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % adsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeBottomSheet = () => {
    setSelectedService(null);
  };

  // 1. FLATTEN ALL SERVICES into a single array for searching
  const allServices = useMemo(() => {
    if (Array.isArray(services)) return services;
    return Object.values(services).flat();
  }, []);

  // 2. FILTER SERVICES BASED ON CATEGORY KEYWORDS
  const currentServices = useMemo(() => {
    const categoryDef = defaultCategories.find(c => c.id === selectedCategory);
    if (!categoryDef) return allServices;

    return allServices.filter(service => {
      const name = service.name ? service.name.toLowerCase() : "";

      const matchesKeyword = categoryDef.keywords.some(keyword =>
        name.includes(keyword)
      );

      const matchesExclude = categoryDef.exclude
        ? categoryDef.exclude.some(ex => name.includes(ex))
        : false;

      return matchesKeyword && !matchesExclude;
    });
  }, [selectedCategory, allServices]);

  return (
    <div className="home-container">

      {/* 1. GLASS HEADER */}
      <div className="glass-header">
        <div className="header-top-row">
          {/* <div className="location-info">
             <MapPin size={18} color="#ff3b30" />
             <div className="loc-text">
                <span className="loc-label">Current Location</span>
                <span className="loc-city">Bengaluru, KA</span>
             </div>
          </div>

          {/* NEW REDIRECT BUTTON FOR MONTHLY PLANS */}
          <button
            className="subscription-nav-btn"
            onClick={() => navigate("/monthly-packages")}
          >
            <Sparkles size={14} fill="white" />
            <span>Monthly Plans</span>
          </button>
        </div>

        {/* Categories Scroll */}
        <div className="category-scroll">
          {defaultCategories.map((cat) => (
            <button
              key={cat.id}
              className={`glass-pill ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="scrollable-content with-header-space">

        {/* 2. BANNER */}
        <div className="top-banner-section">
          <AnimatePresence mode='wait'>
            <motion.img
              key={bannerIndex}
              src={adsData[bannerIndex]?.image}
              alt="Offer"
              className="banner-img"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onError={(e) => e.target.style.display = 'none'}
            />
          </AnimatePresence>
          <div className="dots-indicator">
            {adsData.map((_, i) => (
              <span key={i} className={`dot ${i === bannerIndex ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* 3. CONTENT AREA */}
        <div className="content-area">
          <div className="section-header">
            <h3>Select Service</h3>
          </div>

          {currentServices.length > 0 ? (
            <ServiceList
              services={currentServices}
              onServiceClick={handleServiceClick}
            />
          ) : (
            <div className="no-services-found">
              <p>No services found for "{defaultCategories.find(c => c.id === selectedCategory)?.label}".</p>
            </div>
          )}
        </div>

        {/* 4. TRUST FOOTER */}
        <div className="trust-section">
          <h3>Why Choose Rev2Blush?</h3>
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-val">10+</span>
              <span className="stat-lbl">Cities</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-val">4.8 ★</span>
              <span className="stat-lbl">Rating</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-val">100%</span>
              <span className="stat-lbl">Secure</span>
            </div>
          </div>
        </div>

        <div style={{ height: "100px" }}></div>
      </div>

      {/* BOTTOM SHEET */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              className="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeBottomSheet}
            />
            <motion.div
              className="bottom-sheet-container"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="sheet-handle-bar"><div className="handle"></div></div>
              <div className="sheet-content-scroll">
                <SteamServiceDetail service={selectedService} onBack={closeBottomSheet} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SteamService;