import React from 'react';
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
    <div className="video-section">
      <div className="video-header">
        <h2>See Us in Action 🎥</h2>
        <p>Watch how we treat your car with care.</p>
      </div>
      
      <div className="video-scroll-container">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail">
              <iframe
                className="video-player"
                /* UPDATED SRC EXPLAINED:
                   autoplay=1  -> Starts video automatically
                   mute=1      -> REQUIRED for autoplay to work
                   loop=1      -> Loops the video forever
                   playlist=ID -> Required for loop to work on YouTube
                   controls=0  -> Hides the YouTube player bar (cleaner look)
                */
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}&controls=0&rel=0&modestbranding=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceVideos;