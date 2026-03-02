import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  X, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck, 
  Download, 
  Globe,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";
import detailingData from "../../data/detailingData";
import adsData from "../../data/detailAdsData";
import { useCart } from "../../Context/CartContext";
import "./Detailing.css";

// --- SMART SORTING LOGIC ---
const getOrderIndex = (name) => {
  if (!name) return 99;
  const upperName = name.toUpperCase();
  if (upperName.includes("PPF")) return 1;
  if (upperName.includes("CERAMIC")) return 2;
  if (upperName.includes("RUBBING") || upperName.includes("POLISH")) return 3;
  if (upperName.includes("TINT")) return 4;
  return 99; 
};

const sortedCategories = [...detailingData].sort((a, b) => 
  getOrderIndex(a.categoryName) - getOrderIndex(b.categoryName)
);

export default function Detailing() {
  const [currentView, setCurrentView] = useState("categories"); 
  const [selectedCategory, setSelectedCategory] = useState(sortedCategories[0]);
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

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedCompany(null);
    setSearchQuery("");
    setCurrentView("products");
    window.scrollTo(0, 0); 
  };

  return (
    <div className="detailing-page-container">

      <div className="scrollable-content">
        
        {/* =========================================
            VIEW 1: CATEGORIES & ADS
            ========================================= */}
        {currentView === "categories" && (
          <div className="view-fade-in">
            {/* SEARCH BAR */}
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

            {/* BANNER / ADS */}
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

            {/* --- PREMIUM BENTO GRID --- */}
            <div className="section-header">
              <h3>Services Categories</h3>
            </div>
            
            {sortedCategories.length >= 4 && (
              <div className="category-bento-grid">
                
                {/* 1. HERO CARD: PPF */}
                <div className="bento-card-detailing hero-wash-card-detailing" onClick={() => handleCategoryClick(sortedCategories[0])}>
                  <div className="bento-content-detailing">
                    <div className="icon-wrapper glass">
                      <ShieldCheck size={20} className="accent-icon" style={{ color: '#fff' }} />
                    </div>
                    <h3>{sortedCategories[0].categoryName}</h3>
                    <p>Ultimate paint protection film</p>
                    <span className="bento-action">Explore <ArrowRight size={14} /></span>
                  </div>
                  <div className="image-wrapper hero-img-detailing">
                    <img
                      src={sortedCategories[0].image || "https://res.cloudinary.com/ddgxphtda/image/upload/v1771850857/HomeService/Hero/0E1A4424.jpg"}
                      alt="PPF"
                    />
                  </div>
                </div>

                {/* 2 & 3. SUB-GRID: Ceramic & Polish */}
                <div className="bento-row-split">
                  {/* Ceramic Coating */}
                  <div className="bento-card-detailing square-card" onClick={() => handleCategoryClick(sortedCategories[1])}>
                    <div className="bento-content-detailing z-10">
                      <Sparkles size={18} className="dark-icon mb-2" />
                      <h4>{sortedCategories[1].categoryName}</h4>
                      {/* <p className="sub-text-light" style={{ fontSize: '11px', color: '#64748b', marginTop: '4px'}}>Long-lasting 9H gloss</p> */}
                    </div>
                    <div className="image-wrapper products-img-wrapper">
                      <img
                        src={sortedCategories[1].image || "https://res.cloudinary.com/ddgxphtda/image/upload/v1771853385/HomeService/Hero/Detailing_final.jpg"}
                        alt="Ceramic Coating"
                      />
                    </div>
                  </div>

                  {/* Rubbing Polish */}
                  <div className="bento-card square-card dark-card" onClick={() => handleCategoryClick(sortedCategories[2])}>
                    <div className="bento-content z-10">
                      <h4 className="text-white">{sortedCategories[2].categoryName}</h4>
                      <p className="text-light-blue" style={{ fontSize: '11px', marginTop: '4px'}}>Flawless correction</p>
                    </div>
                    <div className="image-wrapper bottom-right-img">
                      <img
                        src={sortedCategories[2].image || "https://res.cloudinary.com/ddgxphtda/image/upload/v1771856081/HomeService/Hero/Monthly_Membership.jpg"}
                        alt="Rubbing Polish"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. WIDE CARD: TINT */}
                <div className="bento-card-detailing wide-row-card" onClick={() => handleCategoryClick(sortedCategories[3])}>
                  <div className="bento-content-detailing row-content z-10">
                    <div className="icon-wrapper soft-blue">
                      <Layers size={20} className="accent-icon" />
                    </div>
                    <div className="text-group">
                      <h3>{sortedCategories[3].categoryName}</h3>
                      <p>Premium sun control films</p>
                    </div>
                  </div>
                  <div className="image-wrapper insurance-img-wrapper">
                    <img
                      src={sortedCategories[3].image || "https://res.cloudinary.com/ddgxphtda/image/upload/v1771853971/HomeService/Hero/Insurance.jpg"}
                      alt="Window TINT"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TRUST SECTION */}
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
        )}

        {/* =========================================
            VIEW 2: PRODUCT LIST
            ========================================= */}
        {currentView === "products" && (
          <div className="view-fade-in">
            
            {/* PRODUCTS HEADER */}
            <div className="products-view-header">
              <button 
                className="back-btn-circle" 
                onClick={() => setCurrentView("categories")}
              >
                <ChevronLeft size={24} />
              </button>
              <h2>{selectedCategory?.categoryName}</h2>
            </div>

            {/* COMPANY FILTER */}
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

            {/* PRODUCT LIST */}
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
                             <span className="price-tag">₹{typeof product.price === 'object' ? Object.values(product.price)[0] : product.price}</span>
                             <span className={`stock-tag ${product.stock ? 'in' : 'out'}`}>
                                {product.stock ? "Available" : "Sold Out"}
                             </span>
                          </div>
                        </div>
                      </div>

                      <div className="card-media">
                        <img src={product.images?.[0] || "https://cdn-icons-png.flaticon.com/512/296/296216.png"} alt={product.name} />
                        <button 
                          className="add-btn"
                          disabled={!product.stock}
                          onClick={(e) => {
                            e.stopPropagation();
                            if(product.stock) addToCart({...product, price: typeof product.price === 'object' ? Object.values(product.price)[0] : product.price});
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
                  <p>No products found in this category.</p>
                </div>
              )}
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}