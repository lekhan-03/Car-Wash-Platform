import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import './Hero.css';

const slides = [
  {
    id: 1,
    headline: "SPARKLING",
    subHeadline: "CLEAN CAR",
    desc: "Premium Car Wash & Detailing Services",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero1.png", 
    link: "/waterwash",
    accent: "var(--accent-primary)"
  },
  {
    id: 2,
    headline: "INTERIOR",
    subHeadline: "PERFECTION",
    desc: "Deep Clean & Sanitize Your Cabin",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero2.png",
    link: "/steamwash",
    accent: "var(--success)"
  },
  {
    id: 3,
    headline: "ULTIMATE",
    subHeadline: "PROTECTION",
    desc: "Ceramic Coating & Paint Correction",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/Ads/Hero/Hero3.png",
    link: "/Detailing",
    accent: "var(--accent-secondary)"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariant = {
    initial: { opacity: 0, x: 100, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, type: "spring", stiffness: 70 } },
    exit: { opacity: 0, x: -100, scale: 0.9, transition: { duration: 0.5 } }
  };

  const textVariant = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } }
  };

  const currentSlide = slides[current];

  return (
    <div className='hero-premium-container'>
      <div className="hero-bg-mesh"></div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide.id}
          className="hero-slide-modern"
          variants={slideVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="glow-orb orb-1" style={{ background: currentSlide.accent }}></div>
          <div className="glow-orb orb-2" style={{ background: currentSlide.accent }}></div>

          <motion.div 
            className="hero-content-staggered"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.h1 variants={textVariant} className="hero-title">{currentSlide.headline}</motion.h1>
            <motion.h1 variants={textVariant} className="hero-subtitle" style={{ color: currentSlide.accent }}>{currentSlide.subHeadline}</motion.h1>
            <motion.p variants={textVariant} className="hero-desc">{currentSlide.desc}</motion.p>
            
            <motion.button 
              variants={textVariant}
              className="hero-btn-premium"
              onClick={() => navigate(currentSlide.link)}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK NOW <ChevronRight size={18} />
            </motion.button>
          </motion.div>

          <motion.div 
            className="hero-image-stage"
            initial={{ opacity: 0, x: 150, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0, transition: { type: "spring", stiffness: 50, duration: 1 } }}
            exit={{ opacity: 0, x: -150, rotate: -10 }}
          >
            <motion.img 
              src={currentSlide.image} 
              alt={currentSlide.headline} 
              className="slide-car-img" 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="hero-indicators">
        {slides.map((_, idx) => (
          <div 
            key={idx} 
            className={`indicator-pill ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          >
            {idx === current && <motion.div className="pill-progress" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }}></motion.div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;