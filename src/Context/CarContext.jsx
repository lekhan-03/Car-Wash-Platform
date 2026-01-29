// src/Context/CarContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(() => {
    const savedCar = localStorage.getItem("selectedCar");
    return savedCar ? JSON.parse(savedCar) : null;
  });

  const [savedCars, setSavedCars] = useState(() => {
    const cars = localStorage.getItem("savedCars");
    return cars ? JSON.parse(cars) : [];
  });

  // Store selected car in localStorage (existing feature)
  useEffect(() => {
    if (selectedCar) {
      localStorage.setItem("selectedCar", JSON.stringify(selectedCar));
    }
  }, [selectedCar]);

  // Store saved cars in localStorage
  useEffect(() => {
    localStorage.setItem("savedCars", JSON.stringify(savedCars));
  }, [savedCars]);

  // ✅ Add car to saved list
  const addSavedCar = (car) => {
    setSavedCars((prev) => {
      const exists = prev.find((c) => c.id === car.id);
      if (exists) return prev; // prevent duplicates
      return [...prev, car];
    });
  };

  // ✅ Remove car from saved list
  const removeSavedCar = (id) => {
    setSavedCars((prev) => prev.filter((c) => c.id !== id));
  };

  // ✅ Helper to handle selection and saving at once
  const handleCarSelection = (car) => {
    setSelectedCar(car);
    addSavedCar(car);
  };

  return (
    <CarContext.Provider
      value={{
        selectedCar,
        setSelectedCar,
        handleCarSelection, // use this for new selection logic
        savedCars,
        addSavedCar,
        removeSavedCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => useContext(CarContext);
