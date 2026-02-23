import React from 'react';
import { PlayCircle, Star } from 'lucide-react';
import './ServiceVideo.css';

const videos = [
  {
    id: 1,
    title: "Premium Foam Wash",
    videoId: "rgQcF0TLNjk"
  },
  {
    id: 2,
    title: "Interior Deep Cleaning",
    videoId: "n_bOoOlOfLU"
  },
  {
    id: 3,
    title: "Ceramic Coating Process",
    videoId: "vyTYr9W-8ZQ"
  },
  {
    id: 4,
    title: "Detailing Perfection",
    videoId: "vNp8fk9bSf0"
  }
];

const ServiceVideos = () => {
  return (
    <div className="video-section-premium">
      
      {/* Modernized Header */}
      <div className="video-header-modern">
        <div className="header-title-row">
          <PlayCircle size={22} className="video-icon" />
          <h2>See Us in Action</h2>
        </div>
        <p>Watch how we treat your vehicle with ultimate care</p>
      </div>
      
      {/* Snap-Scrolling Carousel */}
      <div className="video-carousel">
        {videos.map((video) => (
          <div key={video.id} className="video-card-premium">
            <div className="video-thumbnail-wrapper">
              <iframe
                className="video-player"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Website Footer Tag (Matches your image) */}
      <div className="app-footer-tag">
        <h3 className="tag-subtitle">India's Best</h3>
        <h2 className="tag-title">Car Care App</h2>
        <div className="trust-stars">
          <Star size={16} fill="#a0b2c6" color="#a0b2c6" />
          <Star size={16} fill="#a0b2c6" color="#a0b2c6" />
          <Star size={16} fill="#a0b2c6" color="#a0b2c6" />
          <Star size={16} fill="#a0b2c6" color="#a0b2c6" />
          <Star size={16} fill="#a0b2c6" color="#a0b2c6" />
        </div>
      </div>

    </div>
  );
};

export default ServiceVideos;