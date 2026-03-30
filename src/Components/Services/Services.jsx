import React from "react";
import './Services.css';
import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
  };

  return (
    <div className="services-premium-wrapper">
      <div className="services-header-premium">
        <div>
          <h2>Our Services</h2>
          <p>Premium care for your vehicle</p>
        </div>
        <div className="header-badge">✨ Top Rated</div>
      </div>

      <motion.div 
        className="bento-grid-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* 1. HERO CARD: Wash & Care */}
        <motion.div variants={itemVariants}>
          <Link to="/waterwash" className="bento-card hero-wash-card">
            <div className="bento-content">
              <div className="icon-wrapper glass">
                <Sparkles size={20} className="accent-icon" />
              </div>
              <h3>Car Wash</h3>
              <p>High-pressure foam wash at your doorstep</p>
              <span className="bento-action">Book Now <ArrowRight size={14} /></span>
            </div>
            <div className="image-wrapper hero-img">
              <div className="glow-backdrop blue-glow"></div>
              <img
                src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771850857/HomeService/Hero/0E1A4424.jpg"
                alt="Wash and Care"
              />
            </div>
          </Link>
        </motion.div>

        {/* 2 & 3. SUB-GRID */}
        <div className="bento-row-split">
          {/* Products Card */}
          <motion.div variants={itemVariants} style={{ height: "100%" }}>
            <Link to="/detailing" className="bento-card square-card dark-product-card">
              <div className="bento-content z-10 flex-col-top">
                <div className="card-top-header">
                  <div className="outline-icon-box">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="discount-pill">Up to 50% Off</div>
                </div>
                <h4 className="card-title-lg">Detailing <br />Accessories</h4>
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
                <h4 className="card-title-lg text-white">Monthly <br/>Packages</h4>
                <p className="monthly-subtext">Save flat<br/>50%</p>
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

        {/* 4. FEATURE CARD: Insurance */}
        <motion.div variants={itemVariants}>
          <Link to="/insurance" className="bento-card wide-row-card">
            <div className="bento-content row-content z-10">
              <div className="dark-shield-icon">
                <ShieldCheck size={22} color="#0066ff" />
              </div>
              <div className="text-group">
                <h3 className="card-title-lg">Vehicle<br/>Insurance</h3>
                <p className="insurance-subtext">Get rewards<br/>up to ₹5000</p>
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

      {/* 5. PROMO BANNER */}
      <motion.div 
        className="premium-promo-banner"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <div className="promo-content">
          <span className="pulse-badge">🔥 Trending</span>
          <h2>Is your Car Dirty?</h2>
          <p>Get a quick wash starting at just <strong>₹249</strong></p>
          <button className="promo-btn">Explore</button>
        </div>
        <div className="promo-image-wrapper">
          <div className="glow-backdrop white-glow"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;