import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { useAuth } from "../../Context/AuthContext";
import {
  Sun, Moon, Monitor, Bell, MapPin, Lock, Trash2,
  ChevronRight, Volume2, Globe, Smartphone, Shield,
  Info, Star, MessageSquare, Eye, EyeOff, X,
  CheckCircle, AlertTriangle, Check,
} from "lucide-react";
import "./style/AccountSettings.css";

// ─────────────────────────────────────────────
// Tiny Web-Audio helper for UI click sounds
// ─────────────────────────────────────────────
const playTone = (type = "on") => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = type === "on" ? 880 : 440;
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch (_) {}
};

// ─────────────────────────────────────────────
// Toast Component
// ─────────────────────────────────────────────
const Toast = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map((t) => (
      <div key={t.id} className={`toast toast-${t.type}`}>
        {t.type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
        <span>{t.message}</span>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// Toggle Switch Component
// ─────────────────────────────────────────────
const ToggleSwitch = ({ enabled, onToggle, disabled }) => (
  <button
    className={`settings-toggle ${enabled ? "on" : "off"} ${disabled ? "disabled" : ""}`}
    onClick={onToggle}
    disabled={disabled}
    aria-label="Toggle"
  >
    <span className="toggle-knob" />
  </button>
);

// ─────────────────────────────────────────────
// Modal Backdrop
// ─────────────────────────────────────────────
const Modal = ({ children, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close-btn" onClick={onClose}><X size={18} /></button>
      {children}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const AccountSettings = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // ── Toast state ──
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const showToast = useCallback((message, type = "success") => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  // ── Notification prefs (persisted) ──
  const [notifications, setNotifications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("r2b_notifications")) || {
        push: true, email: false, sms: true, promotions: false,
      };
    } catch { return { push: true, email: false, sms: true, promotions: false }; }
  });

  // ── App preferences (persisted) ──
  const [preferences, setPreferences] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("r2b_preferences")) || {
        sound: true, locationAccess: false, dataSharing: false,
      };
    } catch { return { sound: true, locationAccess: false, dataSharing: false }; }
  });

  const [locationLoading, setLocationLoading] = useState(false);

  // Persist notification changes
  useEffect(() => {
    localStorage.setItem("r2b_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Persist preference changes
  useEffect(() => {
    localStorage.setItem("r2b_preferences", JSON.stringify(preferences));
  }, [preferences]);

  // ── Modal states ──
  const [modal, setModal] = useState(null); // 'password' | 'rate' | 'about' | 'delete'

  // ── Change Password state ──
  const [pwForm, setPwForm] = useState({ old: "", newPw: "", confirm: "" });
  const [pwShow, setPwShow] = useState({ old: false, newPw: false, confirm: false });
  const [pwError, setPwError] = useState("");

  // ── Rating state ──
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(() =>
    localStorage.getItem("r2b_rating_submitted") === "true"
  );

  // ── Delete Account state ──
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // ─────────────────────────
  // Handlers
  // ─────────────────────────

  const notifLabels = {
    push: "Push Notifications",
    email: "Email Notifications",
    sms: "SMS Alerts",
    promotions: "Promotions & Offers",
  };

  const toggleNotification = (key) => {
    const nextValue = !notifications[key];
    if (preferences.sound) playTone(nextValue ? "on" : "off");
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast(
      `${notifLabels[key]} ${nextValue ? "enabled" : "disabled"}`,
      "success"
    );
  };

  const handleLocationToggle = () => {
    if (preferences.locationAccess) {
      // Disable location
      if (preferences.sound) playTone("off");
      setPreferences((prev) => ({ ...prev, locationAccess: false }));
      localStorage.removeItem("userLocation");
      showToast("Location access disabled", "success");
      return;
    }

    // Enable — request real geolocation
    if (!navigator.geolocation) {
      showToast("Geolocation not supported by your browser", "error");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          );
          const data = await res.json();
          const addr = data.address;
          const area = addr.suburb || addr.neighbourhood || addr.residential || "";
          const city = addr.city || addr.town || addr.state_district || "Unknown";
          const loc = area ? `${area}, ${city}` : city;
          localStorage.setItem("userLocation", loc);
          if (preferences.sound) playTone("on");
          setPreferences((prev) => ({ ...prev, locationAccess: true }));
          showToast(`Location set to ${loc}`, "success");
        } catch (_e) {
          setPreferences((prev) => ({ ...prev, locationAccess: true }));
          showToast("Location enabled (address lookup failed)", "success");
        }
        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);
        showToast("Location permission denied", "error");
      }
    );
  };

  const handlePrefToggle = (key) => {
    if (key === "locationAccess") { handleLocationToggle(); return; }
    const next = !preferences[key];
    if (key === "sound") {
      // Play sound before potentially muting
      if (next) playTone("on");
    } else {
      if (preferences.sound) playTone(next ? "on" : "off");
    }
    setPreferences((prev) => ({ ...prev, [key]: next }));
    const labels = { sound: "In-App Sounds", dataSharing: "Data Sharing" };
    showToast(`${labels[key]} ${next ? "enabled" : "disabled"}`, "success");
  };

  // Change Password
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwError("");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!currentUser) { setPwError("No user session found."); return; }

    const userIdx = users.findIndex(
      (u) => u.username === currentUser.username && u.password === pwForm.old
    );
    if (userIdx === -1) { setPwError("Current password is incorrect."); return; }
    if (pwForm.newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError("Passwords do not match."); return; }

    users[userIdx].password = pwForm.newPw;
    const updatedUser = { ...currentUser, password: pwForm.newPw };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setPwForm({ old: "", newPw: "", confirm: "" });
    setModal(null);
    if (preferences.sound) playTone("on");
    showToast("Password changed successfully!", "success");
  };

  // Rate the App
  const handleRatingSubmit = () => {
    if (rating === 0) { showToast("Please select a star rating", "error"); return; }
    localStorage.setItem("r2b_rating", JSON.stringify({ stars: rating, review: ratingText }));
    localStorage.setItem("r2b_rating_submitted", "true");
    setRatingSubmitted(true);
    setModal(null);
    if (preferences.sound) playTone("on");
    showToast("Thanks for your feedback! ⭐", "success");
  };

  // Delete Account
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== "DELETE") {
      showToast('Type "DELETE" to confirm', "error");
      return;
    }

    // ✅ Read currentUser BEFORE clearing localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    // Remove account from the users registry first
    if (currentUser) {
      try {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const filtered = users.filter((u) => u.username !== currentUser.username);
        localStorage.setItem("users", JSON.stringify(filtered));
      } catch (_e) { /* ignore */ }
    }

    // Now clear all user-specific data
    localStorage.removeItem("user");
    localStorage.removeItem("r2b_notifications");
    localStorage.removeItem("r2b_preferences");
    localStorage.removeItem("r2b_rating");
    localStorage.removeItem("r2b_rating_submitted");
    localStorage.removeItem("userLocation");
    localStorage.removeItem("cart");
    localStorage.removeItem("theme-mode");

    logout();
    navigate("/login");
  };

  // ─────────────────────────
  // Theme config
  // ─────────────────────────
  const themes = [
    { id: "light", label: "Light", icon: <Sun size={22} />, desc: "Classic white" },
    { id: "dark", label: "Dark", icon: <Moon size={22} />, desc: "Easy on eyes" },
    { id: "system", label: "System", icon: <Monitor size={22} />, desc: "Follows device" },
  ];

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

  // ─────────────────────────
  // RENDER
  // ─────────────────────────
  return (
    <div className="settings-page">
      <Toast toasts={toasts} />

      {/* ── APPEARANCE ── */}
      <section className="settings-section">
        <div className="section-label"><Monitor size={15} />Appearance</div>
        <div className="theme-cards-row">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-card ${themeMode === t.id ? "active" : ""}`}
              onClick={() => {
                toggleTheme(t.id);
                if (preferences.sound) playTone("on");
                showToast(`Theme set to ${t.label}`, "success");
              }}
            >
              <div className="theme-card-icon">{t.icon}</div>
              <span className="theme-card-label">{t.label}</span>
              <span className="theme-card-desc">{t.desc}</span>
              {themeMode === t.id && <div className="theme-active-dot" />}
            </button>
          ))}
        </div>
      </section>

      {/* ── NOTIFICATIONS ── */}
      <section className="settings-section">
        <div className="section-label"><Bell size={15} />Notifications</div>
        <div className="settings-list">
          {[
            { key: "push", label: "Push Notifications", sub: "Order updates & alerts", icon: <Smartphone size={18} />, color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
            { key: "email", label: "Email Notifications", sub: "Receipts & summaries", icon: <Globe size={18} />, color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
            { key: "sms", label: "SMS Alerts", sub: "Service reminders via SMS", icon: <MessageSquare size={18} />, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
            { key: "promotions", label: "Promotions & Offers", sub: "Deals, discounts & rewards", icon: <Star size={18} />, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
          ].map(({ key, label, sub, icon, color, bg }) => (
            <div className="settings-row" key={key}>
              <div className="settings-row-left">
                <div className="settings-row-icon" style={{ background: bg, color }}>{icon}</div>
                <div>
                  <p className="settings-row-title">{label}</p>
                  <p className="settings-row-sub">{sub}</p>
                </div>
              </div>
              <ToggleSwitch enabled={notifications[key]} onToggle={() => toggleNotification(key)} />
            </div>
          ))}
        </div>
      </section>

      {/* ── PREFERENCES ── */}
      <section className="settings-section">
        <div className="section-label"><Shield size={15} />Privacy & Preferences</div>
        <div className="settings-list">

          {/* Sound */}
          <div className="settings-row">
            <div className="settings-row-left">
              <div className="settings-row-icon" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}>
                <Volume2 size={18} />
              </div>
              <div>
                <p className="settings-row-title">In-App Sounds</p>
                <p className="settings-row-sub">UI feedback tones</p>
              </div>
            </div>
            <ToggleSwitch enabled={preferences.sound} onToggle={() => handlePrefToggle("sound")} />
          </div>

          {/* Location */}
          <div className="settings-row">
            <div className="settings-row-left">
              <div className="settings-row-icon" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                <MapPin size={18} className={locationLoading ? "spin" : ""} />
              </div>
              <div>
                <p className="settings-row-title">Location Access</p>
                <p className="settings-row-sub">
                  {locationLoading ? "Detecting location…" : preferences.locationAccess
                    ? `📍 ${localStorage.getItem("userLocation") || "Enabled"}`
                    : "For nearby service detection"}
                </p>
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.locationAccess}
              onToggle={() => handlePrefToggle("locationAccess")}
              disabled={locationLoading}
            />
          </div>

          {/* Data Sharing */}
          <div className="settings-row">
            <div className="settings-row-left">
              <div className="settings-row-icon" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
                <Shield size={18} />
              </div>
              <div>
                <p className="settings-row-title">Anonymous Data Sharing</p>
                <p className="settings-row-sub">Help us improve the app</p>
              </div>
            </div>
            <ToggleSwitch enabled={preferences.dataSharing} onToggle={() => handlePrefToggle("dataSharing")} />
          </div>

        </div>
      </section>

      {/* ── MORE ── */}
      <section className="settings-section">
        <div className="section-label"><Info size={15} />More</div>
        <div className="settings-list">

          <button className="settings-row settings-nav-row" onClick={() => setModal("password")}>
            <div className="settings-row-left">
              <div className="settings-row-icon" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}><Lock size={18} /></div>
              <div>
                <p className="settings-row-title">Change Password</p>
                <p className="settings-row-sub">Update your credentials</p>
              </div>
            </div>
            <ChevronRight size={18} className="chevron-icon" />
          </button>

          <button className="settings-row settings-nav-row" onClick={() => setModal("rate")}>
            <div className="settings-row-left">
              <div className="settings-row-icon" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}><Star size={18} /></div>
              <div>
                <p className="settings-row-title">Rate the App</p>
                <p className="settings-row-sub">{ratingSubmitted ? "Thanks for your review! ⭐" : "Share your experience"}</p>
              </div>
            </div>
            <ChevronRight size={18} className="chevron-icon" />
          </button>

          <button className="settings-row settings-nav-row" onClick={() => setModal("about")}>
            <div className="settings-row-left">
              <div className="settings-row-icon" style={{ background: "rgba(99,102,241,0.12)", color: "#6366f1" }}><Info size={18} /></div>
              <div>
                <p className="settings-row-title">About Rev2Blush</p>
                <p className="settings-row-sub">Version 2.0.0</p>
              </div>
            </div>
            <ChevronRight size={18} className="chevron-icon" />
          </button>

          <button className="settings-row settings-nav-row danger-row" onClick={() => setModal("delete")}>
            <div className="settings-row-left">
              <div className="settings-row-icon" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}><Trash2 size={18} /></div>
              <div>
                <p className="settings-row-title">Delete Account</p>
                <p className="settings-row-sub">This action is irreversible</p>
              </div>
            </div>
            <ChevronRight size={18} className="chevron-icon" />
          </button>

        </div>
      </section>

      <p className="settings-version">Rev2Blush • v2.0.0 • Made with ♥ in India</p>

      {/* ════════════════════════════════════
          MODAL: Change Password
      ════════════════════════════════════ */}
      {modal === "password" && (
        <Modal onClose={() => { setModal(null); setPwError(""); setPwForm({ old: "", newPw: "", confirm: "" }); }}>
          <div className="modal-icon-header" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}>
            <Lock size={28} />
          </div>
          <h3 className="modal-title">Change Password</h3>
          <p className="modal-sub">Enter your current password and choose a new one.</p>

          <form onSubmit={handleChangePassword} className="modal-form">
            {[
              { field: "old", label: "Current Password", key: "old" },
              { field: "newPw", label: "New Password", key: "newPw" },
              { field: "confirm", label: "Confirm New Password", key: "confirm" },
            ].map(({ field, label, key }) => (
              <div className="form-group" key={field}>
                <label>{label}</label>
                <div className="pw-input-wrap">
                  <input
                    type={pwShow[key] ? "text" : "password"}
                    value={pwForm[key]}
                    onChange={(e) => setPwForm((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={label}
                    required
                  />
                  <button type="button" className="pw-eye-btn" onClick={() => setPwShow((p) => ({ ...p, [key]: !p[key] }))}>
                    {pwShow[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            ))}

            {pwError && <p className="form-error"><AlertTriangle size={14} /> {pwError}</p>}

            <button type="submit" className="modal-submit-btn">
              <Check size={16} /> Update Password
            </button>
          </form>
        </Modal>
      )}

      {/* ════════════════════════════════════
          MODAL: Rate the App
      ════════════════════════════════════ */}
      {modal === "rate" && (
        <Modal onClose={() => setModal(null)}>
          <div className="modal-icon-header" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>
            <Star size={28} />
          </div>
          <h3 className="modal-title">Rate Rev2Blush</h3>
          <p className="modal-sub">How was your experience?</p>

          <div className="star-row">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                className={`star-btn ${s <= (hoverRating || rating) ? "filled" : ""}`}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => { setRating(s); if (preferences.sound) playTone("on"); }}
              >
                <Star size={36} />
              </button>
            ))}
          </div>

          {(hoverRating || rating) > 0 && (
            <p className="rating-label-text">{ratingLabels[hoverRating || rating]}</p>
          )}

          <textarea
            className="rating-textarea"
            placeholder="Tell us more (optional)…"
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
            rows={3}
          />

          <button className="modal-submit-btn" style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)" }} onClick={handleRatingSubmit}>
            <Star size={16} /> Submit Review
          </button>
        </Modal>
      )}

      {/* ════════════════════════════════════
          MODAL: About
      ════════════════════════════════════ */}
      {modal === "about" && (
        <Modal onClose={() => setModal(null)}>
          <div className="about-logo-circle">R2B</div>
          <h3 className="modal-title">Rev2Blush</h3>
          <p className="modal-sub">Premium Car Care Platform</p>

          <div className="about-info-grid">
            {[
              { label: "Version", value: "2.0.0" },
              { label: "Build", value: "2026.03" },
              { label: "Platform", value: "Web App" },
              { label: "Developer", value: "Rev2Blush Team" },
              { label: "Contact", value: "support@rev2blush.in" },
              { label: "License", value: "MIT © 2026" },
            ].map(({ label, value }) => (
              <div className="about-info-row" key={label}>
                <span className="about-info-label">{label}</span>
                <span className="about-info-value">{value}</span>
              </div>
            ))}
          </div>

          <p className="about-tagline">🚗 Your car, our passion. Made with ♥ in India.</p>
        </Modal>
      )}

      {/* ════════════════════════════════════
          MODAL: Delete Account
      ════════════════════════════════════ */}
      {modal === "delete" && (
        <Modal onClose={() => { setModal(null); setDeleteConfirmText(""); }}>
          <div className="modal-icon-header" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
            <Trash2 size={28} />
          </div>
          <h3 className="modal-title" style={{ color: "#ef4444" }}>Delete Account</h3>
          <p className="modal-sub">
            This will permanently erase your account, orders, cars and all data. <strong>This cannot be undone.</strong>
          </p>

          <div className="delete-warning-box">
            <AlertTriangle size={16} style={{ color: "#f59e0b" }} />
            <span>Type <strong>DELETE</strong> below to confirm</span>
          </div>

          <input
            className="delete-confirm-input"
            type="text"
            placeholder='Type "DELETE" here'
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
          />

          <button
            className="modal-submit-btn danger-btn"
            onClick={handleDeleteAccount}
            disabled={deleteConfirmText !== "DELETE"}
          >
            <Trash2 size={16} /> Yes, Delete My Account
          </button>
        </Modal>
      )}

    </div>
  );
};

export default AccountSettings;
