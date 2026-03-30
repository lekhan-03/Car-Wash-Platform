import React, { useState, useEffect, useCallback } from "react";
import { Gift, PartyPopper, Copy, Check, Tag, Droplets, Wind } from "lucide-react";
import "./RewardsPie.css";

// ── constants ─────────────────────────────────────────────
export const PROMO_KEY = "r2b_promo_codes";

// The reward: 1 free basic wash (covers cheapest hatchback price = ₹279)
export const FREE_WASH_VALUE = 279;
export const FREE_WASH_LABEL = "1 Free Basic Wash";
export const FREE_WASH_NOTE = "Valid on Water Wash & Steam Wash services only";

// ── helpers ───────────────────────────────────────────────
export const getPromoCodes = () => {
  try { return JSON.parse(localStorage.getItem(PROMO_KEY)) || []; }
  catch { return []; }
};

const savePromoCodes = (codes) =>
  localStorage.setItem(PROMO_KEY, JSON.stringify(codes));

/** Generates a unique promo code: R2B-WASH-XXXXX */
const generateCode = () => {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `R2B-WASH-${rand}`;
};

// ─────────────────────────────────────────────────────────
const RewardsPie = () => {
  const [progress, setProgress] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [promoCodes, setPromoCodes] = useState(getPromoCodes);
  const [copied, setCopied] = useState(null);

  // ── progress: only wash service orders count ──────────
  const calculateProgress = useCallback(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const codes = getPromoCodes();

      // Filter out orders that used a reward promo code
      const validWashOrders = orders.filter((order) => {
        const hasWash = order.items?.some((item) => isWashServiceItem(item));
        const usedPromo = order.bill?.promoCode?.startsWith("R2B-WASH");
        return hasWash && !usedPromo;
      });

      const totalWashOrders = validWashOrders.length;
      const totalGeneratedCodes = codes.filter(c => c.type === "FREE_WASH" || c.code?.startsWith("R2B-WASH")).length;
      
      const effectiveCount = totalWashOrders - (totalGeneratedCodes * 5);

      if (effectiveCount >= 5) {
        setIsEligible(true);
        setProgress(100);
        setOrderCount(5);
      } else {
        setIsEligible(false);
        const displayCount = Math.max(0, effectiveCount);
        setOrderCount(displayCount);
        setProgress((displayCount / 5) * 100);
      }
    } catch (err) {
      console.error("Rewards calc error:", err);
    }
  }, []);

  useEffect(() => {
    calculateProgress();
    window.addEventListener("orderPlaced", calculateProgress);
    window.addEventListener("storage", calculateProgress);
    const timer = setInterval(calculateProgress, 2000);
    return () => {
      window.removeEventListener("orderPlaced", calculateProgress);
      window.removeEventListener("storage", calculateProgress);
      clearInterval(timer);
    };
  }, [calculateProgress]);

  // Keep promo list in sync after checkout uses a code
  useEffect(() => {
    const sync = () => setPromoCodes(getPromoCodes());
    window.addEventListener("promoUsed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("promoUsed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // ── redeem ────────────────────────────────────────────
  const handleRedeem = (e) => {
    e.stopPropagation();
    const code = generateCode();
    const newCode = {
      code,
      type: "FREE_WASH",
      value: FREE_WASH_VALUE,           // max discount = ₹279
      label: FREE_WASH_LABEL,
      note: FREE_WASH_NOTE,
      servicesOnly: true,               // ← checkout enforces this
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString("en-IN"),
      used: false,
      created: new Date().toISOString(),
    };
    const updated = [...promoCodes, newCode];
    savePromoCodes(updated);
    setPromoCodes(updated);
    setIsEligible(false);
    setProgress(0);
  };

  // ── copy ──────────────────────────────────────────────
  const handleCopy = (e, code) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code).catch(() => {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    });
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const unusedCodes = promoCodes.filter((c) => !c.used);
  const hasUnused = unusedCodes.length > 0;

  return (
    <div
      className="rewards-container"
      onClick={() => setShowDropdown((s) => !s)}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {/* ── PIE ICON ── */}
      <div className={`pie-wrapper ${isEligible || hasUnused ? "shake-animation" : ""}`}>
        <div
          className="pie-chart"
          style={{ background: `conic-gradient(#0066ff ${progress}%, #e3f2fd 0)` }}
        >
          <div className="pie-inner-hole">
            <span className="pie-number">{orderCount}/5</span>
          </div>
          {(isEligible || hasUnused) && <span className="notification-dot" />}
        </div>
      </div>

      {/* ── DROPDOWN ── */}
      {showDropdown && (
        <div className="rewards-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="rewards-header">
            <h4>Loyalty Rewards</h4>
            <span className="badge-blue">Wash Services</span>
          </div>

          <div className="rewards-content">

            {/* Goal reached — show Redeem */}
            {isEligible && (
              <div className="success-state">
                <PartyPopper size={36} color="#00b894" className="confetti-icon" />
                <h5>Goal Reached! 🎉</h5>
                <p>
                  You've earned <strong>1 Free Basic Wash!</strong>
                </p>
                <div className="reward-detail-box">
                  <span className="reward-detail-icon"><Droplets size={14} /></span>
                  Water Wash — Free
                  <span className="reward-detail-icon" style={{ marginLeft: 8 }}>
                    <Wind size={14} />
                  </span>
                  Steam Wash — Free
                </div>
                <p className="reward-cap-note">
                  Covers up to ₹{FREE_WASH_VALUE} on your next basic wash booking
                </p>
                <button className="redeem-btn" onClick={handleRedeem}>
                  🎁 Get My Free Wash Code
                </button>
              </div>
            )}

            {/* Unused promo codes */}
            {hasUnused && (
              <div className="promo-codes-section">
                {!isEligible && (
                  <p className="promo-section-label">
                    <Tag size={13} /> Your Free Wash Codes
                  </p>
                )}
                {unusedCodes.map((c) => (
                  <div key={c.code} className="promo-code-card">
                    <div className="promo-code-top">
                      <span className="promo-code-text">{c.code}</span>
                      <button
                        className={`copy-btn ${copied === c.code ? "copied" : ""}`}
                        onClick={(e) => handleCopy(e, c.code)}
                        title="Copy code"
                      >
                        {copied === c.code ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="promo-code-meta">
                      <span className="promo-label">{c.label}</span>
                      <span className="promo-discount">Up to ₹{c.value} OFF</span>
                    </div>
                    <p className="promo-note-text">
                      ⚠️ {c.note}
                    </p>
                    <p className="promo-expires">Expires: {c.expires}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Not eligible yet, no codes */}
            {!isEligible && !hasUnused && (
              <>
                <p className="progress-text">
                  Book <strong>{5 - orderCount}</strong> more wash services to earn 1 Free Wash!
                </p>
                <div className="segments-track">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`segment-bar ${step <= orderCount ? "active" : ""}`}
                    />
                  ))}
                </div>
                <div className="reward-hint-box">
                  <div className="reward-hint-row">
                    <Droplets size={13} color="#0066ff" /> Water Wash &nbsp;·&nbsp;
                    <Wind size={13} color="#0066ff" /> Steam Wash
                  </div>
                  <p className="reward-hint">
                    Every 5 bookings = 1 Free Basic Wash (up to ₹{FREE_WASH_VALUE})
                  </p>
                </div>
              </>
            )}

            {/* Mini progress when codes exist */}
            {!isEligible && hasUnused && (
              <div className="mini-progress">
                <p className="mini-progress-text">
                  Next free wash in <strong>{5 - orderCount}</strong> bookings
                </p>
                <div className="segments-track">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`segment-bar ${step <= orderCount ? "active" : ""}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="dropdown-arrow" />
        </div>
      )}
    </div>
  );
};

/** Helper: returns true if a cart item is a wash service (not detailing) */
export const isWashServiceItem = (item) => {
  const name = (item.name || "").toLowerCase();
  const cat = (item.category || item.categoryName || item.companyName || "").toLowerCase();

  // Detailing items always have companyName or categoryName (set in detailing flow)
  if (item.companyName || item.categoryName) return false;

  // Must look like a wash service
  return (
    name.includes("wash") ||
    name.includes("clean") ||
    name.includes("foam") ||
    name.includes("steam") ||
    name.includes("interior") ||
    name.includes("exterior") ||
    name.includes("360") ||
    cat.includes("wash") ||
    cat.includes("service")
  );
};

export default RewardsPie;