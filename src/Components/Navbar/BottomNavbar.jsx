// src/components/Navbar/BottomNavbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

// Icons
import washIcon from "../Assets/Icons/WashIcon.svg";
import serviceIcon from "../Assets/Icons/HomeService.svg";
import detailIcon from "../Assets/Icons/Detailing.svg";
import insuranceIcon from "../Assets/Icons/InsuranceIcon.png";
import profileIcon from "../Assets/Icons/Profile.svg";

import "./BottomNavbar.css";

const BottomNavbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Helper to check active state
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="bottom-navbar mobile-only">
      
      <Link to="/CarWash" className={`nav-item ${isActive("/CarWash")}`}>
        <div className="icon-wrapper">
          <img src={washIcon} alt="Car Wash" />
        </div>
        <span>Car Wash</span>
      </Link>

      <Link to="/HomeService" className={`nav-item ${isActive("/HomeService")}`}>
        <div className="icon-wrapper">
          <img src={serviceIcon} alt="Service" />
        </div>
        <span>Service</span>
      </Link>

      <Link to="/Detailing" className={`nav-item ${isActive("/Detailing")}`}>
        <div className="icon-wrapper">
          <img src={detailIcon} alt="Detailing" />
        </div>
        <span>Detailing</span>
      </Link>

      <Link to="/insurance" className={`nav-item ${isActive("/insurance")}`}>
        <div className="icon-wrapper">
          <img src={insuranceIcon} alt="Insurance" />
        </div>
        <span>Insurance</span>
      </Link>

      {/* Profile/Login Switch */}
      <Link to={user ? "/account" : "/login"} className={`nav-item ${isActive(user ? "/account" : "/login")}`}>
        <div className="icon-wrapper">
          <img src={profileIcon} alt="Account" />
        </div>
        <span>{user ? "Account" : "Login"}</span>
      </Link>

    </div>
  );
};

export default BottomNavbar;