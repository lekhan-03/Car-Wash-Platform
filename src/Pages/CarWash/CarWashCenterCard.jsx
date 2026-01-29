import React from "react";
import { Link } from "react-router-dom";
import { useCar } from "../../Context/CarContext";
import "./CarWash.css";

const CarWashCenterCard = ({ center }) => {
  const { selectedCar } = useCar();
  const price = selectedCar ? center.pricing[selectedCar.type] : "Select Car";

  return (
    <Link to={`/carwash/${center.id}`} className="carwash-card-link">
      <div className="carwash-card">
        <img src={center.image} alt={center.name} className="carwash-image" />
        <h3>{center.name}</h3>
        <p>{center.location}</p>
        <p className="carwash-price">₹{price}</p>
      </div>
    </Link>
  );
};

export default CarWashCenterCard;
