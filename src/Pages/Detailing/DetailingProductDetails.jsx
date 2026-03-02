import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  
  Star, 
  ShoppingCart, 
  Zap, 
  CheckCircle2, 
  Info, 
  ChevronRight,
  ChevronLeft 
} from "lucide-react";
import detailingData from "../../data/detailingData";
import { useCart } from "../../Context/CartContext";
import "./DetailingProductDetails.css";

// Fallback image in case the product data doesn't have an image
const fallbackImage = "https://cdn-icons-png.flaticon.com/512/296/296216.png";

export default function DetailingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id, 10);
  const { addToCart } = useCart();

  // 1. SAFE DATA EXTRACTION
  let product = null;
  for (const category of detailingData) {
    if (!category.companies) continue; // Prevent crashes if companies array is missing
    for (const company of category.companies) {
      if (!company.products) continue; // Prevent crashes if products array is missing
      const found = company.products.find((p) => p.id === productId);
      if (found) {
        product = { ...found, companyName: company.name, categoryName: category.categoryName };
        break;
      }
    }
    if (product) break;
  }

  const [mainImage, setMainImage] = useState(product?.images?.[0] || fallbackImage);
  const [configValues, setConfigValues] = useState({ Front: "", Rear: "", Side: "" });

  // Update image correctly if navigating directly between products
  useEffect(() => {
    if (product?.images?.[0]) {
      setMainImage(product.images[0]);
    } else if (product) {
      setMainImage(fallbackImage);
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="detailing-details-wrapper error-state">
        <div className="error-card" style={{ padding: '50px', textAlign: 'center' }}>
          <h2>Product Not Found</h2>
          <button className="back-btn-modern" onClick={() => navigate(-1)} style={{ margin: '20px auto' }}>
            <ChevronLeft size={24} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  // 2. SAFE PRICE RENDER (Prevents "Objects are not valid as a React child" crash)
  const displayPrice = typeof product.price === 'object' && product.price !== null 
    ? (product.price.sedan || Object.values(product.price)[0]) 
    : product.price;

  // 3. ALLOW PPF AND TINTS TO USE THE CONFIGURATOR
  const isConfigurable = product.categoryName?.toUpperCase().includes("TINT") || product.categoryName?.toUpperCase().includes("PPF");

  const handleAddClick = () => {
    if (isConfigurable) {
        const hasValue = Object.values(configValues).some(val => val.trim() !== "");
        if (!hasValue) {
            alert("Please specify measurements/microns for at least one panel.");
            return;
        }
        addToCart({ ...product, config: configValues, price: displayPrice });
    } else {
        addToCart({ ...product, price: displayPrice });
    }
  };

  return (
    <div className="detailing-details-wrapper">
      <div className="details-header">
        <button className="back-btn-modern" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="details-content">
        {/* Gallery */}
        <div className="gallery-section">
          <div className="main-image-card">
            <img 
              src={mainImage} 
              alt={product.name} 
              onError={(e) => e.target.src = fallbackImage} 
            />
            <span className={`status-badge ${product.stock ? 'in-stock' : 'out-stock'}`}>
              {product.stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          {product.images?.length > 1 && (
            <div className="thumbnails-row">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumb-item ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt="Thumbnail" onError={(e) => e.target.src = fallbackImage} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-info-section">
          <div className="info-header">
            <span className="brand-pill">{product.companyName || "Premium Brand"}</span>
            <div className="rating-pill">
              <Star size={14} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating || "4.8"} ({product.reviewCount || "50+"} Reviews)</span>
            </div>
          </div>

          <h1 className="product-title">{product.name}</h1>
          
          <div className="price-row">
            <span className="current-price">₹{displayPrice}</span>
            <span className="original-price">₹{Math.round(displayPrice * 1.2)}</span> 
            <span className="discount-tag">Save 20%</span>
          </div>

          <div className="main-action-block">
             {isConfigurable ? (
                <div className="tint-configurator-inline">
                  <h4><Zap size={16} /> Configure Details (Microns / Panel)</h4>
                  <div className="tint-grid">
                    {['Front', 'Rear', 'Side'].map((side) => (
                      <div key={side} className="tint-field">
                        <label>{side}</label>
                        <input 
                          type="number" 
                          placeholder="0" 
                          className="tint-input"
                          onChange={(e) => setConfigValues({...configValues, [side]: e.target.value})}
                        />
                      </div>
                    ))}
                  </div>
                  <button className="add-cart-hero-btn" onClick={handleAddClick}>
                    <ShoppingCart size={18} /> Add Configuration
                  </button>
                </div>
             ) : (
                <button 
                  className={`add-cart-hero-btn ${!product.stock ? 'disabled' : ''}`}
                  onClick={handleAddClick}
                  disabled={!product.stock}
                >
                  <ShoppingCart size={18} /> {product.stock ? "Add to Cart" : "Out of Stock"}
                </button>
             )}
          </div>

          <div className="promo-banner-embedded">
            <div className="promo-content-detailing">
              <Zap size={18} fill="white" />
              <span><strong>Bulk Discount:</strong> Extra 50% OFF on Monthly Packages</span>
            </div>
            <ChevronRight size={18} />
          </div>

          <div className="description-box">
            <h3><Info size={18} /> Description</h3>
            <p>{product.description || "Premium detailing product to protect and enhance your vehicle's look."}</p>
          </div>

          <div className="highlights-box">
            <h3><CheckCircle2 size={18} /> Key Highlights</h3>
            <ul>
              {/* 4. SAFE MAP EXECUTION (Prevents crashes if highlights aren't array formatted) */}
              {product.highlights && Array.isArray(product.highlights) ? (
                product.highlights.map((h, i) => <li key={i}>{h}</li>)
              ) : (
                <>
                  <li>High durability and protection</li>
                  <li>Easy application and maintenance</li>
                  <li>Premium finish guarantee</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky-action-bar">
        <div className="price-summary">
          <span className="label">Total Price</span>
          <span className="value">₹{displayPrice}</span>
        </div>
        <button 
          className={`add-btn-primary ${!product.stock ? 'disabled' : ''}`}
          onClick={handleAddClick}
          disabled={!product.stock}
        >
          {product.stock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}