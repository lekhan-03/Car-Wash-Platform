import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import detailingData from "../../data/detailingData";
import adsData from "../../data/detailAdsData";
import { useCart } from "../../Context/CartContext";
import "./Detailing.css";

// Placeholder icons for categories if missing in data
const fallbackIcons = [
  "https://cdn-icons-png.flaticon.com/512/296/296216.png",
  "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
];

export default function Detailing() {
  // Default to first category
  const [selectedCategory, setSelectedCategory] = useState(detailingData[0]);
  const [selectedCompany, setSelectedCompany] = useState(null); // Null means "All Companies"
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // NEW: Search State
  
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Auto-scroll banners
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % adsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Helper: Get products based on selection AND Search
  const currentProducts = useMemo(() => {
    if (!selectedCategory) return [];
    
    let allProducts = [];

    // 1. Filter by Company (or get all)
    if (selectedCompany) {
      allProducts = selectedCompany.products.map(p => ({...p, companyName: selectedCompany.name}));
    } else {
      selectedCategory.companies.forEach(comp => {
        const productsWithCompany = comp.products.map(p => ({...p, companyName: comp.name}));
        allProducts = [...allProducts, ...productsWithCompany];
      });
    }

    // 2. Filter by Search Query
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

  const handleImageError = (e) => {
    e.target.src = "https://cdn-icons-png.flaticon.com/512/296/296216.png"; 
  };

  return (
    <div className="detailing-page-container">
      {/* 1. HEADER */}
      {/* <div className="app-header">
        <div className="location-info">
          <span className="location-icon">📍</span>
          <div className="loc-text">
            <span className="loc-label">Your Location</span>
            <span className="loc-city">Bengaluru, KA</span>
          </div>
        </div>
        <div className="car-selector">
          <span>My Car</span>
          <img src="https://cdn-icons-png.flaticon.com/512/3202/3202926.png" alt="car" />
        </div>
      </div> */}

      <div className="scrollable-content">
        
        {/* 2. SEARCH BAR (NEW) */}
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search products, brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>✕</button>
            )}
          </div>
        </div>

        {/* 3. BANNER */}
        <div className="top-banner-section">
          {adsData.length > 0 ? (
            <img 
              src={adsData[bannerIndex].image} 
              alt={adsData[bannerIndex].title} 
              className="banner-img"
              onError={(e) => e.target.style.display = 'none'} 
            />
          ) : (
            <div className="banner-placeholder">Detailing Offers</div>
          )}
          <div className="dots-indicator">
            {adsData.map((_, i) => (
              <span key={i} className={`dot ${i === bannerIndex ? "active" : ""}`} />
            ))}
          </div>
        </div>

        {/* 4. CATEGORY GRID (Horizontal) */}
        <div className="section-header">
          <h3>Categories</h3>
        </div>
        
        <div className="category-grid">
          {detailingData.map((cat, index) => (
            <div 
              key={cat.categoryId} 
              className={`cat-item ${selectedCategory?.categoryId === cat.categoryId ? "selected" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedCompany(null);
                setSearchQuery(""); // Clear search on category switch
              }}
            >
              <div className="cat-icon-box">
                <img 
                  src={cat.image || fallbackIcons[index % fallbackIcons.length]} 
                  alt={cat.categoryName} 
                  onError={handleImageError} 
                />
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
               All
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
          <h3>{searchQuery ? `Results for "${searchQuery}"` : "Available Products"}</h3>
        </div>

        <div className="service-list-container">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <React.Fragment key={product.id}>
                <div 
                  className="detailing-card"
                  onClick={() => navigate(`/detailing/${product.id}`)}
                >
                  <div className="card-content">
                    <div className="card-header">
                      <h3>{product.name}</h3>
                      <div className="brand-tag">By {product.companyName}</div>
                      <div className="rating-badge">
                        ⭐ {product.rating || "4.5"} <span className="rating-count">({product.reviewCount || 50})</span>
                      </div>
                    </div>

                    <ul className="feature-bullets">
                      {(product.highlights || []).slice(0, 2).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>

                    <div className="card-actions">
                      <div className="price-wrapper">
                         <span className="price-tag">₹{product.price}</span>
                         {product.stock ? (
                           <span className="stock-tag in">In Stock</span>
                         ) : (
                           <span className="stock-tag out">Out of Stock</span>
                         )}
                      </div>
                      <span className="view-details">View Details</span>
                    </div>
                  </div>

                  <div className="card-media">
                    <img 
                      src={product.images?.[0]} 
                      alt={product.name} 
                      onError={handleImageError}
                    />
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

                {/* PROMO BANNER */}
                <div className="promo-banner-strip">
                  <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                    <span className="promo-icon">✨</span>
                    <span>High Quality Products Availabel at Low Price</span>
                  </div>
                  <span className="arrow-icon">➔</span>
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className="no-services">
              <p>No products found matching "{searchQuery}".</p>
              <button className="reset-btn" onClick={() => setSearchQuery("")}>Clear Search</button>
            </div>
          )}
        </div>

        {/* 7. TRUST SECTION */}
        <div className="trust-section">
          <h3>Why Choose Rev2Blush?</h3>
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-val">10+</span>
              <span className="stat-lbl">Cities</span>
            </div>
            <div className="stat-card">
              <span className="stat-val">10k+</span>
              <span className="stat-lbl">Downloads</span>
            </div>
            <div className="stat-card">
              <span className="stat-val">4.8 ★</span>
              <span className="stat-lbl">Rating</span>
            </div>
          </div>
        </div>

        <div style={{ height: "100px" }}></div>
      </div>
    </div>
  );
}