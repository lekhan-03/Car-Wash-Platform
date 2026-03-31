import React from "react";
import './Services.css';
import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, ShieldCheck, ArrowRight, Zap, Package, Star } from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } }
  };

  return (
    <div className="services-premium-wrapper">
      {/* ── SECTION HEADER ── */}
      <div className="services-header-premium">
        <div>
          <h2>Our Services</h2>
          <p>Premium care for your vehicle</p>
        </div>
        <div className="header-badge">
          <Star size={11} fill="currentColor" /> Top Rated
        </div>
      </div>

      <motion.div 
        className="bento-grid-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* ── 1. HERO: CAR WASH ── */}
        <motion.div variants={itemVariants}>
          <Link to="/waterwash" className="bento-card hero-wash-card">
            {/* Animated radial glow */}
            <div className="hero-bg-glow" />

            <div className="bento-content hero-text-block">
              <div className="hero-top-row">
                <div className="icon-wrapper glass">
                  <Sparkles size={18} className="accent-icon" />
                </div>
                <span className="live-badge"><Zap size={10} strokeWidth={2.5} /> Available Now</span>
              </div>
              <h3>Car Wash</h3>
              <p>High-pressure foam wash<br/>at your doorstep</p>
              <span className="bento-action hero-action">
                Book Now <ArrowRight size={14} />
              </span>
            </div>

            <div className="image-wrapper hero-img">
              <img
                src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771850857/HomeService/Hero/0E1A4424.jpg"
                alt="Wash and Care"
              />
            </div>
          </Link>
        </motion.div>

        {/* ── 2 & 3. SUB-GRID ── */}
        <div className="bento-row-split">
          {/* Detailing Accessories */}
          <motion.div variants={itemVariants} style={{ height: "100%" }}>
            <Link to="/detailing" className="bento-card square-card dark-product-card">
              <div className="bento-content z-10 flex-col-top">
                <div className="card-top-header">
                  <div className="product-icon-box">
                    <ShoppingBag size={16} />
                  </div>
                  <div className="discount-pill">50% Off</div>
                </div>
                <h4 className="card-title-lg">Detailing<br/>Accessories</h4>
                <p className="product-subtext">Pro-grade kits</p>
              </div>
              <div className="image-wrapper products-img-wrapper">
                <img
                  src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771853385/HomeService/Hero/Detailing_final.jpg"
                  alt="Products"
                />
              </div>
            </Link>
          </motion.div>

          {/* Monthly Packages */}
          <motion.div variants={itemVariants} style={{ height: "100%" }}>
            <Link to="/monthly-packages" className="bento-card square-card dark-monthly-card">
              <div className="bento-content z-10">
                <div className="monthly-icon-row">
                  <Package size={16} className="monthly-icon" />
                  <span className="monthly-tag">Members</span>
                </div>
                <h4 className="card-title-lg text-white">Monthly<br/>Packages</h4>
                <p className="monthly-subtext">Save flat<br/><strong>50%</strong></p>
              </div>
              <div className="image-wrapper dark-card-img">
                <img
                  src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771856081/HomeService/Hero/Monthly_Membership.jpg"
                  alt="Packages"
                />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ── 4. VEHICLE INSURANCE ── */}
        <motion.div variants={itemVariants}>
          <Link to="/insurance" className="bento-card wide-row-card insurance-card">
            <div className="bento-content row-content z-10">
              <div className="shield-icon-box">
                <ShieldCheck size={22} color="#3b82f6" />
              </div>
              <div className="text-group">
                <span className="insurance-tag">✦ Exclusive</span>
                <h3 className="card-title-lg">Vehicle<br/>Insurance</h3>
                <p className="insurance-subtext">Earn rewards<br/>up to <strong>₹5000</strong></p>
              </div>
            </div>
            <div className="image-wrapper insurance-img-wrapper">
              <img
                src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771853971/HomeService/Hero/Insurance.jpg"
                alt="Car Insurance"
              />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── 5. PROMO BANNER ── */}
      <motion.div 
        className="premium-promo-banner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 70, damping: 14 }}
      >
        <div className="promo-content">
          <span className="pulse-badge">🔥 Trending</span>
          <div className="promo-text-group">
            <h2>Is your Car Dirty?</h2>
            <p>Quick wash starting at just <strong>₹249</strong></p>
          </div>
          <Link to="/waterwash" className="promo-btn">Book a Wash →</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;