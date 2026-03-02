import React, { useState, useEffect } from 'react';
import './SplashScreen.css';
import MyCar from '../Assets/Toyota.png'; // Make sure this path is correct

const SplashScreen = ({ onFinish }) => {
  const [startZoom, setStartZoom] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Zoom triggers at 2.8s (exactly after the car finishes driving off-screen)
    const zoomTimer = setTimeout(() => {
      setStartZoom(true);
    }, 2800);

    // 2. Start fading out the entire splash screen at 3.6s (right as the zoom finishes)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3600);

    // 3. Unmount completely and reveal your app
    const unmountTimer = setTimeout(() => {
      onFinish();
    }, 4000);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen-container ${isExiting ? "fade-out" : ""}`}>
      
      <div className={`dark-phase ${startZoom ? "zooming" : ""}`}>
        
        {/* Detailed Astrology/Concentric Rings */}
        <div className="mandala-bg">
          <div className="m-circle m1"></div>
          <div className="m-circle m2"></div>
          <div className="m-circle m3"></div>
          <div className="m-circle m4"></div>
          <div className="m-circle m5"></div>
        </div>

        <div className="phase1-content-wrapper">
          <h1 className="splash-logo-cursive">Rev2Blush</h1>
          
          {/* The Premium Car driving in AND out */}
          <div className="splash-car-track">
            <div className="splash-car">
              <img 
                src={MyCar} 
                alt="Premium Car" 
                className="real-car-img"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SplashScreen;