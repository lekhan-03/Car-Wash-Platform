// src/components/CategoryCard.jsx
import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={category.image} alt={category.name} />
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
