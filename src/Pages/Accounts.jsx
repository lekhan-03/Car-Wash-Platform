import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, CarFront, MapPin, CreditCard, Wrench, Package, User } from "lucide-react";
import "./Accounts.css";

const Accounts = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Reads from local storage as per your current backend setup
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

  const navItems = [
    { path: "details", name: "Profile", icon: <User size={26} strokeWidth={1.5} /> },
    { path: "cars", name: "Cars", icon: <CarFront size={26} strokeWidth={1.5} /> },
    { path: "addresses", name: "Address", icon: <MapPin size={26} strokeWidth={1.5} /> },
    { path: "orders", name: "Orders", icon: <Package size={26} strokeWidth={1.5} /> },
    { path: "payments", name: "Payments", icon: <CreditCard size={26} strokeWidth={1.5} /> },
    { path: "help", name: "Help", icon: <Wrench size={26} strokeWidth={1.5} /> },
    
  ];

  return (
    <div className="account-page-wrapper">
      <div className="account-top-bg">
        <div className="profile-header-content">
          <div className="avatar-circle-lrg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-details-text">
            <h2>{user.name}</h2>
            <p>+91 {user.mobile || "06364105424"}</p>
          </div>
          <button className="logout-icon-btn" onClick={handleLogout} title="Logout">
            <LogOut size={22} />
          </button>
        </div>

        <div className="floating-nav-scroll">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className="nav-card-float">
              <div className="nav-icon">{item.icon}</div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="account-bottom-content">
        <Outlet context={{ user }} />
      </div>
      
      <div style={{height: "80px"}}></div>
    </div>
  );
};

export default Accounts;