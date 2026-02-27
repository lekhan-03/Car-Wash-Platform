import React from "react";
import './Services.css';
import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, ShieldCheck,  ArrowRight } from "lucide-react";
// import { Receipt } from "lucide-react";

const Services = () => {
  return (
    <div className="services-premium-wrapper">

      <div className="services-header-premium">
        <div>
          <h2>Our Services</h2>
          <p>Premium care for your vehicle</p>
        </div>
        <div className="header-badge">✨ Top Rated</div>
      </div>

      <div className="bento-grid-container">

        {/* 1. HERO CARD: Wash & Care (Full Width) */}
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
              className="floating-img"
            />
          </div>
        </Link>

        {/* 2 & 3. SUB-GRID: Products & Challan (2 Columns) */}
        <div className="bento-row-split">

          {/* Products */}
          {/* <Link to="/detailing" className="bento-card square-card">
            <div className="discount-pill">Up to 50% Off</div>
            <div className="bento-content z-10">
              <ShoppingBag size={18} className="dark-icon mb-2" />
              <h4>Detailing</h4>
            </div>
            <div className="image-wrapper bottom-img">
              <img 
                src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771852813/HomeService/Hero/Detailing.jpg" 
                alt="Products" 
                className="floating-img-delayed"
              />
            </div>
          </Link> */}
          {/* Products Card */}
          <Link to="/detailing" className="bento-card square-card">
            <div className="discount-pill">Up to 50% Off</div>

            <div className="bento-content z-10">
              <ShoppingBag size={18} className="dark-icon mb-2" />
              <h4>Detailing <br />Accessories</h4>
            </div>

            {/* NEW WRAPPER CLASS HERE */}
            <div className="image-wrapper products-img-wrapper">
              <img
                src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771853385/HomeService/Hero/Detailing_final.jpg"
                alt="Products"
              />
            </div>
          </Link>

          {/* Challan */}
          <Link to="/monthly-packages" className="bento-card square-card dark-card">
            <div className="bento-content z-10">
              {/* <Receipt size={18} className="light-icon mb-2" /> */}
              <h4 className="text-white">Monthly Packages</h4>
              <p className="text-light-blue">Save flat 50%</p>
            </div>
            <div className="image-wrapper bottom-right-img">
              <img
                src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771856081/HomeService/Hero/Monthly_Membership.jpg"
                alt="Challan"
                className="floating-img"
              />
            </div>
          </Link>

        </div>

        {/* 4. FEATURE CARD: Insurance (Wide sleek row) */}
        <Link to="/insurance" className="bento-card wide-row-card">
          {/* Added z-10 to ensure text stays on top of the image */}
          <div className="bento-content row-content z-10">
            <div className="icon-wrapper soft-blue">
              <ShieldCheck size={20} className="accent-icon" />
            </div>
            <div className="text-group">
              <h3>Vehicle Insurance</h3>
              <p>Get rewards up to ₹5000</p>
            </div>
          </div>
          {/* Replaced side-img with a new wrapper for the photograph */}
          <div className="image-wrapper insurance-img-wrapper">
            <img
              src="https://res.cloudinary.com/ddgxphtda/image/upload/v1771853971/HomeService/Hero/Insurance.jpg"
              alt="Car & Bike Insurance"
            />
          </div>
        </Link>

      </div>

      {/* 5. PROMO BANNER: Dark Theme */}
      <div className="premium-promo-banner">
        <div className="promo-content">
          <span className="pulse-badge">🔥 Trending</span>
          <h2>Is your Car Dirty?</h2>
          <p>Get a quick wash starting at just <strong>₹249</strong></p>
          <button className="promo-btn">Explore</button>
        </div>
        <div className="promo-image-wrapper">
          <div className="glow-backdrop white-glow"></div>
          {/* <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/sports-bike-4993638-4160489.png"
            alt="Bike Wash"
          /> */}
        </div>
      </div>

    </div>
  );
};

export default Services;