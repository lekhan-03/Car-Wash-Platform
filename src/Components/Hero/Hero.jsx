import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Hero.css';

// Placeholder images - Replace with your actual assets
const slides = [
  {
    id: 1,
    headline: "SPARKLING",
    subHeadline: "CLEAN CAR",
    desc: "Premium Car Wash & Detailing Services",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero1.png", // Replace with actual car image
    link: "/CarWash"
  },
  {
    id: 2,
    headline: "INTERIOR",
    subHeadline: "PERFECTION",
    desc: "Deep Clean & Sanitize Your Cabin",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero2.png",
    link: "/Detailing"
  },
  {
    id: 3,
    headline: "ULTIMATE",
    subHeadline: "PROTECTION",
    desc: "Ceramic Coating & Paint Correction",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero3.png",
    link: "/Detailing"
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
    <div className='hero-container'>
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`hero-slide ${index === current ? "active" : ""}`}
        >
          {/* Background Overlay */}
          <div className="hero-overlay"></div>

          <div className="hero-content">
            {/* Split Headline for visual impact */}
            <h1>{slide.headline} <br /> <span className="highlight-text">{slide.subHeadline}</span></h1>
            <p>{slide.desc}</p>
            
            <button 
              className="hero-btn-rect"
              onClick={() => navigate(slide.link)}
            >
              BOOK NOW
            </button>
          </div>

          <div className="hero-image-wrapper">
            <img src={slide.image} alt={slide.headline} className="slide-img" />
            {/* Bubbles effect to match image */}
            <div className="bubble b1"></div>
            <div className="bubble b2"></div>
            <div className="bubble b3"></div>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="hero-dots">
        {slides.map((_, idx) => (
          <span 
            key={idx} 
            className={`h-dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Hero;