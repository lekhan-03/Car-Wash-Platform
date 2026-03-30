// src/Components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCar } from "../../Context/CarContext";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import SelectCarModal from "./SelectCarModal";
import RewardsPie from "./RewardsPie"; 

// Premium Lucide Icons
import { MapPin, CarFront, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";

import "./Navbar.css";

const Navbar = () => {
  const { cartCount } = useCart();
  const { selectedCar } = useCar();
  const { user, logout } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationName, setLocationName] = useState("Select Location");
  const [isLocating, setIsLocating] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedLoc = localStorage.getItem("userLocation");
    if (savedLoc) setLocationName(savedLoc);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


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
      <motion.div 
        className="navbar-container glass"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      >
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="logo">
            Rev2Blush
          </Link>

          {/* Desktop Menu */}
          <ul className="nav-menu desktop-only">
            <li><Link to="/waterwash">Water wash</Link></li>
            <li><Link to="/steamwash">Steam Wash</Link></li>
            <li><Link to="/detailing">Detailing</Link></li>
            <li><Link to="/insurance">Insurance</Link></li>
          </ul>

          <div className="navbar-icons">
            <RewardsPie /> 

            {/* Desktop Location Pill */}
            <motion.div 
              className="nav-pill desktop-only" 
              onClick={detectLocation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className={`pill-icon ${isLocating ? "spin" : ""}`} />
              <div className="pill-text">
                <span className="pill-label">Current Location</span>
                <span className="pill-value" title={locationName}>
                  {locationName.length > 15 ? locationName.substring(0, 12) + "..." : locationName}
                </span>
              </div>
            </motion.div>

            {/* Desktop Car Pill */}
            <motion.button 
              className="nav-pill desktop-only" 
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CarFront className="pill-icon" />
              <div className="pill-text">
                <span className="pill-label">My Car</span>
                <span className="pill-value">
                  {selectedCar ? selectedCar.name : "Select"}
                </span>
              </div>
            </motion.button>
            
            {/* Cart Icon */}
            <motion.div whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.9 }}>
              <Link to="/cart" className="icon-btn cart-btn">
                <ShoppingCart size={22} className="svg-icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </motion.div>

            {/* Desktop Profile */}
            <div className="profile-section desktop-only">
              {user ? (
                <>
                  <motion.button className="icon-btn profile-btn" whileHover={{ scale: 1.15 }}>
                    <User size={22} className="svg-icon" />
                  </motion.button>
                  <div className="profile-dropdown glass">
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
          <div className="mobile-location" onClick={detectLocation}>
            <MapPin className={`mob-loc-icon ${isLocating ? "spin" : ""}`} size={20} />
            <div className="mob-loc-text">
              <span className="mob-label">
                {isLocating ? "Detecting..." : "Location"}
              </span>
              <span className="mob-value">
                {locationName.length > 20 ? locationName.substring(0, 18) + "..." : locationName}
              </span>
            </div>
          </div>

          <button className="mobile-car-pill" onClick={() => setIsModalOpen(true)}>
            <span className="mob-car-text">
              {selectedCar ? selectedCar.name : "Select"}
            </span>
            <CarFront size={18} className="mob-car-icon" />
          </button>
        </div>
      </motion.div>

      {isModalOpen && <SelectCarModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Navbar;