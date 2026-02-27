import React, { useState, useEffect } from 'react';
import './SplashScreen.css';
import MyCar from '../Assets/Toyota.png';

const SplashScreen = ({ onFinish }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 5500); 

    const unmountTimer = setTimeout(() => {
      onFinish();
    }, 6000); 

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [onFinish]);

  const brandName = "Rev2Blush".split("");

  return (
    <div className={`splash-screen-container ${isExiting ? "fade-out" : ""}`}>
      {/* Background Rotating Rings Layer */}
      <div className="splash-bg-rings"></div>

      <div className="splash-logo-wrapper">
        <div className="splash-logo">
          {brandName.map((letter, index) => (
            <span 
              key={index} 
              className="splash-letter"
              style={{ animationDelay: `${index * 0.1}s` }} 
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="splash-car-track">
          <div className="splash-car">
            <div className="car-particle-trail">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <img 
              src={MyCar} 
              alt="Driving Car" 
              className="real-car-img"
            />
          </div>
        </div>

        <div className="splash-subtitle">PREMIUM CAR CARE</div>
      </div>
    </div>
  );
};

export default SplashScreen;