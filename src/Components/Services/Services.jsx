import React from "react";
import './Services.css';
import { Link } from "react-router-dom";

// Import your static images/icons matching the theme
// You can fallback to the URLs if local assets are missing
const services = [
  {
    id: 1,
    title: "Car Wash",
    desc: "Doorstep high-pressure foam wash",
    link: "/CarWash",
    image: "https://cdn-icons-png.flaticon.com/512/2052/2052352.png", // Replace with your carIcon
    bg: "#eef4ff",
    color: "#0047ff"
  },
  {
    id: 2,
    title: "Home Service",
    desc: "Complete interior & exterior care",
    link: "/HomeService",
    image: "https://cdn-icons-png.flaticon.com/512/2954/2954886.png", // Replace with serviceIcon
    bg: "#fdf4ff",
    color: "#9c27b0"
  },
  {
    id: 3,
    title: "Detailing",
    desc: "Ceramic coating & deep polishing",
    link: "/Detailing",
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png", // Replace with detailIcon
    bg: "#fff8e1",
    color: "#f5a623"
  },
  {
    id: 4,
    title: "Insurance",
    desc: "Premium car care accessories",
    link: "/insurance",
    image: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
    bg: "#e0f7fa",
    color: "#00acc1"
  }
];

const Services = () => {
  return (
    <div className="our-services">
      <div className="services-header">
        <h2>Our Services</h2>
        <p>Select a service to get started</p>
      </div>

      <div className="service-items">
        {services.map((service) => (
          <Link to={service.link} key={service.id} className="service-card-link">
            <div className="service-card">
              <div className="icon-box" style={{ background: service.bg }}>
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
              <span className="arrow-btn" style={{ color: service.color }}>➔</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Promo Banner from Screenshot */}
      <div className="home-promo-banner">
        <span className="sparkle">✨</span>
        <span>Extra 50% OFF With Monthly Packages</span>
        <span className="arrow">➔</span>
      </div>
    </div>
  );
};

export default Services;