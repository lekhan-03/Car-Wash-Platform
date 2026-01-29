import React, { useEffect, useState } from "react";
import "./style/Addresses.css";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    setAddresses(saved);
  }, []);

  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
  };

  return (
    <div className="addr-section">
      <h3 className="section-head">Saved Addresses</h3>
      
      {addresses.length === 0 ? (
        <div className="empty-state-box"><p>No addresses saved.</p></div>
      ) : (
        <div className="addr-list">
          {addresses.map((addr, index) => (
            <div key={index} className="addr-card-v2">
              <div className="addr-icon">📍</div>
              <div className="addr-info">
                <h4>{addr.fullName}</h4>
                <p>{addr.street}, {addr.city} - {addr.pincode}</p>
                <p className="ph">📞 {addr.phone}</p>
              </div>
              <button onClick={() => handleDelete(index)} className="del-text-btn">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;