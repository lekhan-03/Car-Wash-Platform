import React from "react";
import { useCar } from "../../Context/CarContext";
import "./style/SavedCarsSection.css";

export default function AccountCars() {
  const { savedCars, removeSavedCar } = useCar();

  return (
    <div className="cars-section">
      <h3 className="section-head">Saved Vehicles</h3>
      
      {savedCars.length === 0 ? (
        <div className="empty-state-box">
          <p>No cars saved yet.</p>
        </div>
      ) : (
        <div className="cars-grid-v2">
          {savedCars.map((car) => (
            <div className="car-card-v2" key={car.id}>
              <img src={car.img} alt={car.name} />
              <div className="car-details">
                <h4>{car.name}</h4>
                <p>{car.brand}</p>
              </div>
              <button className="del-btn-round" onClick={() => removeSavedCar(car.id)}>🗑</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}