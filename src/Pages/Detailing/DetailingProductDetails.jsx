import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/296/296216.png";

export default function DetailingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = parseInt(id, 10);
  const { addToCart } = useCart();

  const handleBack = () => {
    if (location.state?.returnView) {
      navigate('/detailing', { state: location.state });
    } else {
      navigate(-1);
    }
  };

  let product = null;
  for (const category of detailingData) {
    if (!category.companies) continue; 
    for (const company of category.companies) {
      if (!company.products) continue; 
      const found = company.products.find((p) => p.id === productId);
      if (found) {
        product = { ...found, companyName: company.name, categoryName: category.categoryName };
        break;
      }
    }
    if (product) break;
  }

  const [mainImage, setMainImage] = useState(product?.images?.[0] || fallbackImage);
  const [configValues, setConfigValues] = useState({ Front: "", Rear: "", Sides: "" });

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
          <button className="back-btn-modern" onClick={handleBack} style={{ margin: '20px auto' }}>
            <ChevronLeft size={24} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const displayPrice = typeof product.price === 'object' && product.price !== null 
    ? (product.price.sedan || Object.values(product.price)[0]) 
    : product.price;

  const originalPrice = product.originalPrice || Math.round(displayPrice * 1.2);
  const discountLabel = product.discountLabel || "Save 20%";

  const isConfigurable = product.categoryName?.toUpperCase().includes("TINT");

  const handleAddClick = () => {
    if (!product.stock) return; 

    if (isConfigurable) {
        const activeConfigs = Object.entries(configValues)
            .filter(([key, val]) => val.trim() !== "")
            .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

        if (Object.keys(activeConfigs).length === 0) {
            alert("Please specify the tint percentage for at least one window.");
            return;
        }

        addToCart({ ...product, config: activeConfigs, price: displayPrice, quantity: 1 });
    } else {
        addToCart({ ...product, price: displayPrice, quantity: 1 });
    }
  };

  return (
    <div className="detailing-details-wrapper">
      <div className="details-header">
        <button className="back-btn-modern" onClick={handleBack}>
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
            <span className="original-price">₹{originalPrice}</span> 
            <span className="discount-tag">{discountLabel}</span>
          </div>

          {/* CRITICAL FIX: Only render this entire block if it's a TINT product. 
              This perfectly removes the redundant inline "Add to Cart" button for normal products! */}
          {isConfigurable && (
            <div className="main-action-block">
               <div className="tint-configurator-inline">
                 <h4><Zap size={16} /> Configure Tint Darkness (VLT)</h4>
                 <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', marginBottom: '12px' }}>
                   Enter the desired darkness percentage (e.g., 50, 70).
                 </p>
                 
                 <div className="tint-grid">
                   {['Front', 'Rear', 'Sides'].map((side) => (
                     <div key={side} className="tint-field">
                       <label>{side}</label>
                       <div style={{ position: 'relative' }}>
                         <input 
                           type="number" 
                           placeholder="70" 
                           min="0"
                           max="100"
                           className="tint-input"
                           value={configValues[side]}
                           onChange={(e) => setConfigValues({...configValues, [side]: e.target.value})}
                           style={{ paddingRight: '28px' }} 
                         />
                         <span style={{ position: 'absolute', right: '12px', top: '12px', color: '#94a3b8', fontSize: '13px', fontWeight: 'bold' }}>
                           %
                         </span>
                       </div>
                     </div>
                   ))}
                 </div>
                 <button 
                   className={`add-cart-hero-btn ${!product.stock ? 'disabled' : ''}`} 
                   onClick={handleAddClick}
                   disabled={!product.stock}
                 >
                   <ShoppingCart size={18} /> {product.stock ? "Add Configuration" : "Out of Stock"}
                 </button>
               </div>
            </div>
          )}

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