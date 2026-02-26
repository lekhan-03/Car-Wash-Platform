import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  X, 
  Star, 
  ChevronRight, 
  ShieldCheck, 
  Download, 
  Globe 
} from "lucide-react";
import detailingData from "../../data/detailingData";
import adsData from "../../data/detailAdsData";
import { useCart } from "../../Context/CartContext";
import "./Detailing.css";

const fallbackIcons = [
  "https://cdn-icons-png.flaticon.com/512/296/296216.png",
  "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
];

export default function Detailing() {
  const [selectedCategory, setSelectedCategory] = useState(detailingData[0]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % adsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentProducts = useMemo(() => {
    if (!selectedCategory) return [];
    let allProducts = [];

    if (selectedCompany) {
      allProducts = selectedCompany.products.map(p => ({...p, companyName: selectedCompany.name}));
    } else {
      selectedCategory.companies.forEach(comp => {
        const productsWithCompany = comp.products.map(p => ({...p, companyName: comp.name}));
        allProducts = [...allProducts, ...productsWithCompany];
      });
    }

    if (searchQuery.trim()) {
      const lowerQ = searchQuery.toLowerCase();
      return allProducts.filter(p => 
        p.name.toLowerCase().includes(lowerQ) ||
        p.companyName.toLowerCase().includes(lowerQ) ||
        (p.highlights && p.highlights.some(h => h.toLowerCase().includes(lowerQ)))
      );
    }
    return allProducts;
  }, [selectedCategory, selectedCompany, searchQuery]);

  return (
    <div className="detailing-page-container">
      {/* 1. HEADER */}
    
        {/* <div className="location-info">
          <MapPin size={20} className="location-icon" />
          <div className="loc-text">
            <span className="loc-label">Your Location</span>
            <span className="loc-city">Bengaluru, KA</span>
          </div>
        </div>
        <div className="car-selector">
          <Car size={16} />
          <span>My Car</span>
        </div> */}
      

      <div className="scrollable-content">
        {/* 2. SEARCH BAR */}
        <div className="search-section">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products, brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* 3. BANNER */}
        <div className="top-banner-section">
          {adsData.length > 0 ? (
            <img src={adsData[bannerIndex].image} alt="Promotion" className="banner-img" />
          ) : (
            <div className="banner-placeholder">Premium Detailing Offers</div>
          )}
          <div className="dots-indicator">
            {adsData.map((_, i) => (
              <span key={i} className={`dot ${i === bannerIndex ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* 4. CATEGORIES */}
        <div className="section-header">
          <h3>Services Categories</h3>
        </div>
        
        <div className="category-grid">
          {detailingData.map((cat, index) => (
            <div 
              key={cat.categoryId} 
              className={`cat-item ${selectedCategory?.categoryId === cat.categoryId ? "selected" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedCompany(null);
                setSearchQuery("");
              }}
            >
              <div className="cat-icon-box">
                <img src={cat.image || fallbackIcons[0]} alt={cat.categoryName} />
              </div>
              <span className="cat-name">{cat.categoryName}</span>
            </div>
          ))}
        </div>

        {/* 5. COMPANY FILTER */}
        {selectedCategory && (
          <div className="company-filter-strip">
             <button 
                className={`company-chip ${selectedCompany === null ? 'active' : ''}`}
                onClick={() => setSelectedCompany(null)}
             >
               All Brands
             </button>
             {selectedCategory.companies.map((comp) => (
               <button 
                 key={comp.id}
                 className={`company-chip ${selectedCompany?.id === comp.id ? 'active' : ''}`}
                 onClick={() => setSelectedCompany(comp)}
               >
                 {comp.name}
               </button>
             ))}
          </div>
        )}

        {/* 6. PRODUCT LIST */}
        <div className="section-header">
          <h3>{searchQuery ? `Results for "${searchQuery}"` : "Featured Services"}</h3>
        </div>

        <div className="service-list-container">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.id} className="card-group">
                <div className="detailing-card" onClick={() => navigate(`/detailing/${product.id}`)}>
                  <div className="card-content">
                    <div className="card-header">
                      <h3>{product.name}</h3>
                      <div className="brand-tag">By {product.companyName}</div>
                      <div className="rating-badge">
                        <Star size={12} fill="#f5a623" color="#f5a623" /> 
                        {product.rating || "4.5"} <span className="rating-count">({product.reviewCount || 50})</span>
                      </div>
                    </div>

                    <div className="card-actions">
                      <div className="price-wrapper">
                         <span className="price-tag">₹{product.price}</span>
                         <span className={`stock-tag ${product.stock ? 'in' : 'out'}`}>
                            {product.stock ? "Available" : "Sold Out"}
                         </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-media">
                    <img src={product.images?.[0] || fallbackIcons[0]} alt={product.name} />
                    <button 
                      className="add-btn"
                      disabled={!product.stock}
                      onClick={(e) => {
                        e.stopPropagation();
                        if(product.stock) addToCart(product);
                      }}
                    >
                      {product.stock ? "ADD" : "N/A"}
                    </button>
                  </div>
                </div>

                <div className="promo-banner-strip">
                  <div className="promo-left">
                    <ShieldCheck size={14} />
                    <span>Premium Quality Guaranteed</span>
                  </div>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))
          ) : (
            <div className="no-services">
              <p>No products found matching "{searchQuery}".</p>
              <button className="reset-btn" onClick={() => setSearchQuery("")}>Reset Search</button>
            </div>
          )}
        </div>

        {/* 7. TRUST SECTION */}
        <div className="trust-section">
          <h3>Why Choose Rev2Blush?</h3>
          <div className="stats-row">
            <div className="stat-card">
              <Globe size={24} className="stat-icon" />
              <span className="stat-val">10+</span>
              <span className="stat-lbl">Cities</span>
            </div>
            <div className="stat-card">
              <Download size={24} className="stat-icon" />
              <span className="stat-val">10k+</span>
              <span className="stat-lbl">Users</span>
            </div>
            <div className="stat-card">
              <Star size={24} className="stat-icon" />
              <span className="stat-val">4.8</span>
              <span className="stat-lbl">Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}