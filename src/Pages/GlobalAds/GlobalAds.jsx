import React from "react";
import { useNavigate } from "react-router-dom";
import adsData from "../../data/adsData";
import "./GlobalAds.css";

const GlobalAds = () => {
  const navigate = useNavigate();

  return (
    <div className="global-ads-container">
      <div className="ads-scroll">
        {adsData.map((ad) => (
          <div
            key={ad.id}
            className="ad-item"
            onClick={() => navigate(ad.redirect)}
          >
            <img src={ad.image} alt={ad.title} className="ad-img" />
            <p className="ad-caption">{ad.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalAds;
