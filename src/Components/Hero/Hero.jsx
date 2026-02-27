import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // Import a modern arrow icon
import './Hero.css';

const slides = [
  {
    id: 1,
    headline: "SPARKLING",
    subHeadline: "CLEAN CAR",
    desc: "Premium Car Wash & Detailing Services",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero1.png", 
    link: "/waterwash",
    accent: "#0066ff"
  },
  {
    id: 2,
    headline: "INTERIOR",
    subHeadline: "PERFECTION",
    desc: "Deep Clean & Sanitize Your Cabin",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero2.png",
    link: "/steamwash",
    accent: "#00b894"
  },
  {
    id: 3,
    headline: "ULTIMATE",
    subHeadline: "PROTECTION",
    desc: "Ceramic Coating & Paint Correction",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero3.png",
    link: "/Detailing",
    accent: "#f5a623"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='hero-premium-container'>
      
      {/* Animated Background Mesh */}
      <div className="hero-bg-mesh"></div>

      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`hero-slide-modern ${index === current ? "active" : ""}`}
        >
          {/* Dynamic Glowing Orbs matching the slide's accent color */}
          <div className="glow-orb orb-1" style={{ background: slide.accent }}></div>
          <div className="glow-orb orb-2" style={{ background: slide.accent }}></div>

          <div className="hero-content-staggered">
            <h1 className="hero-title animate-1">{slide.headline}</h1>
            <h1 className="hero-subtitle animate-2">{slide.subHeadline}</h1>
            <p className="hero-desc animate-3">{slide.desc}</p>
            
            <button 
              className="hero-btn-premium animate-4"
              onClick={() => navigate(slide.link)}
            >
              BOOK NOW <ChevronRight size={18} />
            </button>
          </div>

          <div className="hero-image-stage">
            <img 
              src={slide.image} 
              alt={slide.headline} 
              className="slide-car-img" 
            />
          </div>
        </div>
      ))}

      {/* Modern Pill Indicators */}
      <div className="hero-indicators">
        {slides.map((_, idx) => (
          <div 
            key={idx} 
            className={`indicator-pill ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          >
            {/* The progress bar inside the active pill */}
            {idx === current && <div className="pill-progress"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;