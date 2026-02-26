import React, { useState } from "react";
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

export default function DetailingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id, 10);
  const { addToCart } = useCart();

  let product = null;
  for (const category of detailingData) {
    for (const company of category.companies) {
      const found = company.products.find((p) => p.id === productId);
      if (found) {
        product = { ...found, companyName: company.name, categoryName: category.categoryName };
        break;
      }
    }
    if (product) break;
  }

  const [mainImage, setMainImage] = useState(product?.images?.[0] || "");
  const [tintValues, setTintValues] = useState({ Front: "", Rear: "", Side: "" });

  if (!product) {
    return (
      <div className="detailing-details-wrapper error-state">
        <div className="error-card">
          <h2>Product Not Found</h2>
          <button className="back-btn-modern" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
        </div>
      </div>
    );
  }

  const handleAddClick = () => {
    if (product.categoryName === "TINT") {
        const hasValue = Object.values(tintValues).some(val => val.trim() !== "");
        if (!hasValue) {
            alert("Please specify tint measurements.");
            return;
        }
        addToCart({ ...product, tintConfig: tintValues });
    } else {
        addToCart(product);
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
            <img src={mainImage} alt={product.name} />
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
                  <img src={img} alt="Thumbnail" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-info-section">
          <div className="info-header">
            <span className="brand-pill">{product.companyName}</span>
            <div className="rating-pill">
              <Star size={14} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating} ({product.reviewCount} Reviews)</span>
            </div>
          </div>

          <h1 className="product-title">{product.name}</h1>
          
          <div className="price-row">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{Math.round(product.price * 1.2)}</span> 
            <span className="discount-tag">Save 20%</span>
          </div>

          <div className="main-action-block">
             {product.categoryName === "TINT" ? (
                <div className="tint-configurator-inline">
                  <h4><Zap size={16} /> Configure Tint (Microns)</h4>
                  <div className="tint-grid">
                    {['Front', 'Rear', 'Side'].map((side) => (
                      <div key={side} className="tint-field">
                        <label>{side}</label>
                        <input 
                          type="number" 
                          placeholder="0" 
                          className="tint-input"
                          onChange={(e) => setTintValues({...tintValues, [side]: e.target.value})}
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
            <div className="promo-content">
              <Zap size={18} fill="white" />
              <span><strong>Bulk Discount:</strong> Extra 50% OFF on Monthly Packages</span>
            </div>
            <ChevronRight size={18} />
          </div>

          <div className="description-box">
            <h3><Info size={18} /> Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="highlights-box">
            <h3><CheckCircle2 size={18} /> Key Highlights</h3>
            <ul>
              {product.highlights?.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        </div>
      </div>

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
          {product.stock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}