import React, { useState, useEffect } from "react";
import "./RewardsPie.css";

const RewardsPie = () => {
  const [progress, setProgress] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [orderCount, setOrderCount] = useState(0);

  // --- LOGIC TO CALCULATE PROGRESS ---
  const calculateProgress = () => {
    try {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      
      // Filter for Home Service Orders
      // Checks if ANY item in the order matches keywords like "Home", "Service", "Wash", "Clean"
      const homeServiceOrders = orders.filter(order => 
        order.items && order.items.some(item => {
          const name = item.name ? item.name.toLowerCase() : "";
          const category = item.category ? item.category.toLowerCase() : "";
          
          // Broad check to ensure we catch the order
          return (
            name.includes("home") || 
            category.includes("home") ||
            name.includes("service") ||
            category.includes("service") ||
            name.includes("wash") ||
            name.includes("clean")
          );
        })
      );

      const count = homeServiceOrders.length;
      
      // Update State only if changed to prevent re-renders
      if (count !== orderCount) {
        setOrderCount(count);
        
        // Reward Logic: Every 5th order
        const remainder = count % 5;
        
        if (count > 0 && remainder === 0) {
          setIsEligible(true);
          setProgress(100);
        } else {
          setIsEligible(false);
          setProgress((remainder / 5) * 100);
        }
      }
    } catch (error) {
      console.error("Error calculating rewards:", error);
    }
  };

  // --- USE EFFECT TRIGGERS ---
  useEffect(() => {
    // 1. Initial Check
    calculateProgress();

    // 2. Listen for 'orderPlaced' event (Immediate update)
    window.addEventListener("orderPlaced", calculateProgress);
    
    // 3. Listen for Storage changes (Cross-tab update)
    window.addEventListener("storage", calculateProgress);

    // 4. Polling Interval (Backup: Checks every 2 seconds to guarantee sync)
    const intervalId = setInterval(calculateProgress, 2000);

    return () => {
      window.removeEventListener("orderPlaced", calculateProgress);
      window.removeEventListener("storage", calculateProgress);
      clearInterval(intervalId);
    };
  }, [orderCount]); // Re-run if count changes (mostly for safety)

  const handleRedeem = () => {
    alert("🎉 Coupon Code 'FREEWASH' applied! Use this on your next booking.");
    setIsEligible(false); // Reset visual for UX
    setProgress(0);
  };

  return (
    <div 
      className="rewards-container" 
      onClick={() => setShowDropdown(!showDropdown)}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {/* --- PIE ICON --- */}
      <div className={`pie-wrapper ${isEligible ? "shake-animation" : ""}`}>
        {isEligible ? (
          <div className="gift-icon-wrapper">
            <span className="gift-emoji">🎁</span>
            <span className="notification-dot"></span>
          </div>
        ) : (
          <div 
            className="pie-chart" 
            style={{ 
              background: `conic-gradient(#0066ff ${progress}%, #e3f2fd 0)` 
            }}
          >
            <div className="pie-inner-hole">
              <span className="pie-number">{orderCount % 5}/5</span>
            </div>
          </div>
        )}
      </div>

      {/* --- DROPDOWN --- */}
      {showDropdown && (
        <div className="rewards-dropdown">
          <div className="rewards-header">
            <h4>Loyalty Rewards</h4>
            <span className="badge-blue">Home Service</span>
          </div>
          
          <div className="rewards-content">
            {isEligible ? (
              <div className="success-state">
                <div className="confetti-icon">🎉</div>
                <h5>Goal Reached!</h5>
                <p>You've unlocked a <strong>Free Wash</strong>.</p>
                <button className="redeem-btn" onClick={handleRedeem}>
                  Redeem Now
                </button>
              </div>
            ) : (
              <>
                <p className="progress-text">
                  Book <strong>{5 - (orderCount % 5)}</strong> more services to unlock your reward!
                </p>
                {/* Visual Segments */}
                <div className="segments-track">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div 
                      key={step} 
                      className={`segment-bar ${step <= (orderCount % 5) ? "active" : ""}`}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="dropdown-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default RewardsPie;