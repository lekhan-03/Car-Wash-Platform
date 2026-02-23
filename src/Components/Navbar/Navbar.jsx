// src/Components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCar } from "../../Context/CarContext";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import SelectCarModal from "./SelectCarModal";
import RewardsPie from "./RewardsPie"; // <--- 1. IMPORT THIS

import cartIcon from "../Assets/cart_icon.png";
import carIcon from "../Assets/Icons/Car.svg";
import locationIcon from "../Assets/Icons/location-pin-svgrepo-com.svg";
import profileIcon from "../Assets/Icons/Profile.svg";

import "./Navbar.css";

const Navbar = () => {
  const { cartCount } = useCart();
  const { selectedCar } = useCar();
  const { user, logout } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationName, setLocationName] = useState("Select Location");
  const [isLocating, setIsLocating] = useState(false);
  
  const navigate = useNavigate();

  // Load saved location from local storage on mount
  useEffect(() => {
    const savedLoc = localStorage.getItem("userLocation");
    if (savedLoc) setLocationName(savedLoc);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // --- LOCATION LOGIC ---
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationName("Locating...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const address = data.address;
          const area = address.suburb || address.neighbourhood || address.residential;
          const city = address.city || address.town || address.state_district;
          
          const formattedLocation = area ? `${area}, ${city}` : city;

          setLocationName(formattedLocation);
          localStorage.setItem("userLocation", formattedLocation); 
        } catch (error) {
          console.error("Error fetching address:", error);
          setLocationName("Bengaluru"); 
          alert("Could not fetch address details.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        setLocationName("Bengaluru"); 
        alert("Location permission denied or unavailable.");
      }
    );
  };

  return (
    <>
      <div className="navbar-container">
        {/* --- MAIN NAVBAR (Top Row) --- */}
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="logo">
            Rev2Blush
          </Link>

          {/* Desktop Menu */}
          <ul className="nav-menu desktop-only">
            <li><Link to="/waterwash">Water wash</Link></li>
            <li><Link to="/steamwash">Steam Wash</Link></li>
            
            <li><Link to="/Detailing">Detailing</Link></li>
            <li><Link to="/insurance">Insurance</Link></li>
          </ul>

          {/* Icons & Desktop Actions */}
          <div className="navbar-icons">
            
            {/* 2. ADD REWARDS PIE HERE */}
            <RewardsPie /> 

            {/* Desktop Location Pill */}
            <div className="nav-pill desktop-only" onClick={detectLocation}>
              <img src={locationIcon} alt="Loc" className={`pill-icon ${isLocating ? "spin" : ""}`} />
              <div className="pill-text">
                <span className="pill-label">Current Location</span>
                <span className="pill-value" title={locationName}>
                  {locationName.length > 15 ? locationName.substring(0, 12) + "..." : locationName}
                </span>
              </div>
            </div>

            {/* Desktop Car Pill */}
            <button className="nav-pill desktop-only" onClick={() => setIsModalOpen(true)}>
              <img src={carIcon} alt="Car" className="pill-icon" />
              <div className="pill-text">
                <span className="pill-label">My Car</span>
                <span className="pill-value">
                  {selectedCar ? selectedCar.name : "Select"}
                </span>
              </div>
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="icon-btn cart-btn">
              <img src={cartIcon} alt="Cart" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {/* Desktop Profile */}
            <div className="profile-section desktop-only">
              {user ? (
                <>
                  <button className="icon-btn profile-btn">
                    <img src={profileIcon} alt="Profile" />
                  </button>
                  <div className="profile-dropdown">
                    <div className="dropdown-header">Hi, {user.name}</div>
                    <Link to="/account">My Account</Link>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </div>
                </>
              ) : (
                <Link to="/login" className="login-link">Login</Link>
              )}
            </div>
          </div>
        </nav>

        {/* --- MOBILE SUB-HEADER (Second Row) --- */}
        <div className="mobile-action-bar mobile-only">
          
          {/* Mobile Location */}
          <div className="mobile-location" onClick={detectLocation}>
            <img src={locationIcon} alt="Pin" className={`mob-loc-icon ${isLocating ? "spin" : ""}`} />
            <div className="mob-loc-text">
              <span className="mob-label">
                {isLocating ? "Detecting..." : "Current Location"}
              </span>
              <span className="mob-value">
                {locationName.length > 20 ? locationName.substring(0, 18) + "..." : locationName}
              </span>
            </div>
          </div>

          {/* Mobile Car Selector */}
          <button className="mobile-car-pill" onClick={() => setIsModalOpen(true)}>
            <span className="mob-car-text">
              {selectedCar ? selectedCar.name : "Select Car"}
            </span>
            <img src={carIcon} alt="Car" className="mob-car-icon" />
          </button>
        </div>
      </div>

      {/* Car Selection Modal */}
      {isModalOpen && <SelectCarModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Navbar;