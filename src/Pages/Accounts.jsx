import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Accounts.css";

const Accounts = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <div className="account-loading">Loading...</div>;

  return (
    <div className="account-container">
      {/* 1. Header Card */}
      <div className="account-header-card">
        <div className="user-profile-row">
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-text">
            <h2>Hello, {user.name.split(" ")[0]}</h2>
            <p>+91 {user.mobile || "9876543210"}</p>
          </div>
        </div>
        <button className="logout-btn-pill" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* 2. Scrollable Navigation (Pills) */}
      <div className="account-nav-scroll">
        <NavLink to="details" className="nav-pill-item">👤 Details</NavLink>
        <NavLink to="orders" className="nav-pill-item">📦 Orders</NavLink>
        <NavLink to="cars" className="nav-pill-item">🚗 Garage</NavLink>
        <NavLink to="addresses" className="nav-pill-item">📍 Address</NavLink>
        <NavLink to="payments" className="nav-pill-item">💳 Payments</NavLink>
        <NavLink to="help" className="nav-pill-item">🛠 Help</NavLink>
      </div>

      {/* 3. Dynamic Content Area */}
      <div className="account-content-area">
        <Outlet context={{ user }} />
      </div>
      
      {/* Spacer for bottom nav */}
      <div style={{height: "80px"}}></div>
    </div>
  );
};

export default Accounts;