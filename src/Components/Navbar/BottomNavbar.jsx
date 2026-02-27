// src/components/Navbar/BottomNavbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Droplets, Wind, Sparkles, ShieldCheck, User } from "lucide-react";

import "./BottomNavbar.css";

const BottomNavbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="bottom-navbar mobile-only">
      <Link to="/waterwash" className={`nav-item ${isActive("/waterwash")}`}>
        <div className="icon-wrapper">
          <Droplets size={22} strokeWidth={2} />
        </div>
        <span>Water Wash</span>
      </Link>
      
      <Link to="/steamwash" className={`nav-item ${isActive("/steamwash")}`}>
        <div className="icon-wrapper">
          <Wind size={22} strokeWidth={2} />
        </div>
        <span>Steam Wash</span>
      </Link>

      <Link to="/Detailing" className={`nav-item ${isActive("/Detailing")}`}>
        <div className="icon-wrapper">
          <Sparkles size={22} strokeWidth={2} />
        </div>
        <span>Detailing</span>
      </Link>

      <Link to="/insurance" className={`nav-item ${isActive("/insurance")}`}>
        <div className="icon-wrapper">
          <ShieldCheck size={22} strokeWidth={2} />
        </div>
        <span>Insurance</span>
      </Link>

      <Link to={user ? "/account" : "/login"} className={`nav-item ${isActive(user ? "/account" : "/login")}`}>
        <div className="icon-wrapper">
          <User size={22} strokeWidth={2} />
        </div>
        <span>{user ? "Account" : "Login"}</span>
      </Link>

    </div>
  );
};

export default BottomNavbar;