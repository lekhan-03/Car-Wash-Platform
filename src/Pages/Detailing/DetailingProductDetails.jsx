import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import detailingData from "../../data/detailingData";
import { useCart } from "../../Context/CartContext";
import "./DetailingProductDetails.css";

export default function DetailingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id, 10);
  const { addToCart } = useCart();

  // --- Logic to Find Product ---
  let product = null;
  for (const category of detailingData) {
    for (const company of category.companies) {
      const found = company.products.find((p) => p.id === productId);
      if (found) {
        product = {
          ...found,
          companyName: company.name,
          categoryName: category.categoryName,
        };
        break;
      }
    }
    if (product) break;
  }

  const [mainImage, setMainImage] = useState(
    product ? product.images?.[0] || "" : ""
  );

  // --- NEW: State for Tint Configuration ---
  const [tintValues, setTintValues] = useState({
    Front: "",
    Rear: "",
    Side: ""
  });

  const handleTintChange = (field, value) => {
    setTintValues(prev => ({ ...prev, [field]: value }));
  };

  const handleImageError = (e) => {
    e.target.src = "https://cdn-icons-png.flaticon.com/512/296/296216.png"; 
  };

  // --- Add To Cart Handler ---
  const handleAddClick = () => {
    if (product.categoryName === "TINT") {
        // Validate: At least one field should be filled
        const hasValue = Object.values(tintValues).some(val => val.trim() !== "");
        
        if (!hasValue) {
            alert("Please enter a value for at least one tint area (Front, Rear, or Side).");
            return;
        }
        // Pass specific config to cart
        addToCart({ ...product, tintConfig: tintValues });
    } else {
        addToCart(product);
    }
    // navigate('/cart'); // Optional: redirect to cart
  };

  if (!product) {
    return (
      <div className="detailing-details-wrapper error-state">
        <h2>Product Not Found</h2>
        <button className="back-btn-modern" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="detailing-details-wrapper">
      
      {/* 1. Header */}
      <div className="details-header">
        <button className="back-btn-modern" onClick={() => navigate(-1)}>
          <span className="icon">←</span> Back
        </button>
      </div>

      <div className="details-content">
        
        {/* 2. LEFT: Gallery Section */}
        <div className="gallery-section">
          <div className="main-image-card">
            <img
              src={mainImage || product.images?.[0]}
              alt={product.name}
              onError={handleImageError}
            />
            {product.stock ? (
              <span className="status-badge in-stock">In Stock</span>
            ) : (
              <span className="status-badge out-stock">Out of Stock</span>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbnails-row">
              {product.images.map((img, index) => (
                <div 
                  key={index}
                  className={`thumb-item ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`thumb-${index}`} onError={handleImageError} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. RIGHT: Product Info */}
        <div className="product-info-section">
          <div className="info-header">
            <span className="brand-pill">{product.companyName}</span>
            <div className="rating-pill">⭐ {product.rating} ({product.reviewCount} Reviews)</div>
          </div>

          <h1 className="product-title">{product.name}</h1>
          
          <div className="price-row">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{Math.round(product.price * 1.2)}</span> 
            <span className="discount-tag">20% OFF</span>
          </div>

          {/* MAIN ACTION BLOCK (Desktop) */}
          <div className="main-action-block">
             {product.categoryName === "TINT" ? (
                <div className="tint-configurator-inline">
                  <h4>Configure Tint (Microns)</h4>
                  <div className="tint-grid">
                    {['Front', 'Rear', 'Side'].map((side) => (
                      <div key={side} className="tint-field">
                        <label>{side} Windshield</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 50" 
                          className="tint-input"
                          value={tintValues[side]}
                          onChange={(e) => handleTintChange(side, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                  <button className="add-cart-hero-btn" onClick={handleAddClick}>
                    Add Configuration to Cart
                  </button>
                </div>
             ) : (
                <button 
                  className={`add-cart-hero-btn ${!product.stock ? 'disabled' : ''}`}
                  onClick={handleAddClick}
                  disabled={!product.stock}
                >
                  {product.stock ? "Add to Cart" : "Out of Stock"}
                </button>
             )}
          </div>

          {/* Promo Banner */}
          <div className="promo-banner-embedded">
            <div className="promo-content">
              <span className="sparkle">✨</span>
              <span><strong>Extra 50% OFF</strong> With Monthly Packages</span>
            </div>
            <span className="arrow">➔</span>
          </div>

          <div className="description-box">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="highlights-box">
            <h3>Highlights</h3>
            <ul>
              {(product.highlights || []).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Spacer for mobile to prevent footer overlap */}
          <div className="mobile-spacer"></div>
        </div>
      </div>

      {/* 4. Sticky Footer (Mobile Only) */}
      <div className="sticky-action-bar">
        <div className="price-summary">
          <span className="label">Total Price</span>
          <span className="value">₹{product.price}</span>
        </div>
        
        <button 
          className={`add-btn-primary ${!product.stock ? 'disabled' : ''}`}
          onClick={handleAddClick}
          disabled={!product.stock}
        >
          {product.stock 
            ? (product.categoryName === "TINT" ? "Add Config" : "Add to Cart") 
            : "Out of Stock"
          }
        </button>
      </div>
    </div>
  );
}