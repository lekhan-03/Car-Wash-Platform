// src/components/Navbar/SelectCarModal.jsx
import React, { useState } from "react";
import { carBrands, vehiclesByBrand } from "../../data/carData";
import { useCar } from "../../Context/CarContext";
import { toast } from "react-toastify";
import { X, ArrowLeft } from "lucide-react";
import "./SelectCarModel.css";

const SelectCarModal = ({ onClose }) => {
  const { handleCarSelection } = useCar();
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleSelectCar = (brand, vehicle) => {
    const selected = { 
      id: `${brand}-${vehicle.name}`, 
      brand, 
      name: vehicle.name, 
      type: vehicle.type, 
      img: vehicle.img 
    };
    
    handleCarSelection(selected);
    
    toast.success(`${vehicle.name} selected! 🚗`, {
      position: "bottom-center",
      autoClose: 2000,
      theme: "colored",
      style: { background: "#0066ff", color: "#fff" }
    });
    
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} strokeWidth={2.5} />
        </button>

        <h2>{selectedBrand ? `Select ${selectedBrand} Model` : "Select Your Car Brand"}</h2>

        {!selectedBrand ? (
          <div className="brand-grid">
            {carBrands.map((brand) => (
              <div
                key={brand.name}
                className="brand-card"
                onClick={() => setSelectedBrand(brand.name)}
              >
                <div className="img-box">
                  <img src={brand.logo} alt={brand.name} loading="lazy" />
                </div>
                <p>{brand.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="models-section">
            <button className="modal-back-btn" onClick={() => setSelectedBrand(null)}>
              <ArrowLeft size={16} strokeWidth={2.5} /> Back to Brands
            </button>
            
            <div className="vehicles-list">
              {vehiclesByBrand[selectedBrand]?.map((vehicle) => (
                <div
                  key={vehicle.name}
                  className="vehicle-card"
                  onClick={() => handleSelectCar(selectedBrand, vehicle)}
                >
                  <img src={vehicle.img} alt={vehicle.name} />
                  <div className="vehicle-info">
                    <p className="v-name">{vehicle.name}</p>
                    <span className="v-type">{vehicle.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCarModal;