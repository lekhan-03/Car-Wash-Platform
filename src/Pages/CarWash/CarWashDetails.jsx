import React, { useState } from "react";
import { useParams } from "react-router-dom";
import carWashCenters from "../../data/carWashData";
import { useCart } from "../../Context/CartContext";
import { useCar } from "../../Context/CarContext";
import "./CarWash.css";

const CarWashDetails = () => {
  const { id } = useParams();
  const center = carWashCenters.find((c) => c.id === parseInt(id));
  const { addToCart } = useCart();
  const { selectedCar } = useCar();
  const [selectedTime, setSelectedTime] = useState("");

  if (!center) return <h2>Car Wash Center Not Found</h2>;
  if (!selectedCar) return <h2>Please select a car first!</h2>;

  const price = center.pricing[selectedCar.type];

  const handleAddToCart = () => {
    if (!selectedTime) {
      alert("Please select a time slot before adding to cart.");
      return;
    }
    addToCart({ ...center, timeSlot: selectedTime, price });
  };

  return (
    <div className="carwash-details">
      <img src={center.image} alt={center.name} className="carwash-details-img" />
      <h2>{center.name}</h2>
      <p>{center.location}</p>
      <p className="carwash-price">₹{price}</p>

      <h4>Select a Time Slot</h4>
      <div className="time-slots">
        {center.timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`time-slot ${selectedTime === slot ? "selected" : ""}`}
            onClick={() => setSelectedTime(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default CarWashDetails;
