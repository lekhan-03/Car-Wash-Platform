import React from "react";
import "./CarWash.css";
import carWashCenters from "../../data/carWashData";
import CarWashCenterCard from "./CarWashCenterCard";

const CarWash = () => {
  return (
    <div className="carwash-page">
      <h2>Book a Car Wash</h2>
      <div className="carwash-list">
        {carWashCenters.map((center) => (
          <CarWashCenterCard key={center.id} center={center} />
        ))}
      </div>
    </div>
  );
};

export default CarWash;
