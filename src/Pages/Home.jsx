import React from "react";
import Hero from "../Components/Hero/Hero";
import Services from "../Components/Services/Services";
import ServiceVideos from "../Components/ServiceVideos/ServiceVideo";

const Home = () => {
  return (
    <div style={{ width: "100%", overflowX: "hidden", background: "var(--bg-primary)" }}>
      <Hero />
      <Services />
      <ServiceVideos /> {/* Added Section */}
    </div>
  );
};

export default Home;