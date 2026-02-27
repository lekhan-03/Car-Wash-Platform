// src/components/HomeService/serviceData.js
// FULL EXPANDED VERSION WITH COMPLETE GALLERY ARRAYS

export const categories = [
  {
    id: "with-water",
    title: "With Water",
    image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Main/CarWash.png",
  },
  
];

// COMMON GALLERY ARRAY
const fullGallery = [
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Bumpper_Clean.png", title: "Bumper Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Dashboard_Clean.png", title: "Dashboard Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Dashboard_POlish.png", title: "Dashboard Polish" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Dicky_Vaccum.png", title: "Dicky Vacuum" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Door_Clean.png", title: "Door Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Engine_Vacum.png", title: "Engine Vacuum" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Foam_Wash.png", title: "Foam Wash" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Foaming.png", title: "Foaming" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Headlight_Clean.png", title: "Headlight Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Pressure_Wash.png", title: "Pressure Wash" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Rim_Clean.png", title: "Rim Cleaning" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Roof_Clean.png", title: "Roof Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Seat_Cleaning.png", title: "Seat Cleaning" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Side_Door_Clean.png", title: "Interior Door Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Steering_Clean.png", title: "Steering Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Tire_Polish.png", title: "Tire Polish" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Upper_Cover_Clean.png", title: "Upper Cover Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Vacumming.png", title: "Vacuuming" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Window_Clean.png", title: "Window Clean" },
  { image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Windsheld_Clean.png", title: "Windshield Clean" },
];

export const services = {
  "with-water": [
    {
      id: 1,
      name: "Exterior + Underbody Foam Wash",
      description: "Exterior foam wash with underbody cleaning.",
      price: { hatchback: 279, sedan: 279, suv: 349, lux:389 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Seat_Cleaning.png",
      video: "/videos/washDemo.mp4",
      features: ["Body Foam Wash", "Underbody Cleaning", "Tyre Polish"],
      gallery: [...fullGallery],
    },
    {
      id: 2,
      name: "Interior + Exterior Foam Wash",
      description: "High pressure foam wash with interior cleaning.",
      price: { hatchback: 349, sedan: 349, suv: 399, lux: 419 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Main/CarWash.png",
      video: "/videos/washDemo.mp4",
      features: ["Foam Wash", "Interior Vacuum", "Polish Coat"],
      gallery: [...fullGallery],
    },
    {
      id: 3,
      name: "Interior + Exterior + Quality Ceramic Coating",
      description: "Interior and exterior cleaning with high-quality ceramic coating.",
      price: { hatchback: 440, sedan: 440, suv: 479, lux: 499 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Foaming.png",
      video: "/videos/washDemo.mp4",
      features: ["Body Foam Wash", "Hybrid Ceramic Coating", "Interior Vacuum"],
      gallery: [...fullGallery],
    },
    
    {
      id: 4,
      name: "Interior + Exterior + Underbody Foam Wash",
      description: "Complete interior and exterior cleaning with underbody wash.",
      price: { hatchback: 389, sedan: 389, suv: 419, lux: 447 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Windsheld_Clean.png",
      video: "/videos/washDemo.mp4",
      features: ["Foam Wash", "Interior Vacuum + Polish", "Underbody Pressure Wash"],
      gallery: [...fullGallery],
    },
    {
      id: 5,
      name: "Interior + Exterior + Underbody + Odor Blaster + Ceramic Coat",
      description: "Deep cleaning with odor treatment and ceramic protection.",
      price: { hatchback: 579, sedan: 579, suv: 630, lux: 699 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Foaming.png",
      video: "/videos/washDemo.mp4",
      features: ["Foam Wash", "Odor Eliminator", "Hybrid CeramicCoating"],
      gallery: [...fullGallery],
    },
    {
      id: 6,
      name: "360 Wash",
      description: "Full 360° wash including ceramic coat, engine, wheel, odor removal & underbody wash.",
      price: { hatchback: 879, sedan: 879, suv: 937, lux: 999 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Foam_Wash.png",
      video: "/videos/washDemo.mp4",
      features: [
        "Hard Foam Wash + Odor Eliminator + Vacuum",
        "Pressure Underbody + Engine Wash",
        "Wheel + Full Body Ceramic Coating",
      ],
      gallery: [...fullGallery],
    },
    {
      id: 7,
      name: "Interior + Exterior + Underbody + Pet Hair & Smell Removal",
      description: "Pet hair extraction + deep wash + odor removal.",
      price: { hatchback: 589, sedan: 589, suv: 619, lux: 647 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Dashboard_POlish.png",
      video: "/videos/washDemo.mp4",
      features: ["Deep Interior Vacuum", "Odor Removal", "Hybrid Ceramic Coating"],
      gallery: [...fullGallery],
    },
    {
      id: 8,
      name: "High Quality Hydrophobic Wash + 360 Wash",
      description: "Premium hydrophobic coating combined with 360° wash.",
      price: { hatchback: 999, sedan: 999, suv: 1179, lux: 1249 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Upper_Cover_Clean.png",
      video: "/videos/washDemo.mp4",
      features: ["Foam Wash + Vacuum", "Full Body Hydrophobic Cleaning", "360 Wash"],
      gallery: [...fullGallery],
    },
    {
      id: 9,
      name: "Before Selling / After Taking — 360 + AC Wing Clean",
      description: "Full restoration wash with AC vent cleaning.",
      price: { hatchback: 1389, sedan: 1389, suv: 1579, lux: 1712 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Upper_Cover_Clean.png",
      video: "/videos/washDemo.mp4",
      features: [
        "360 Clean + Odor Removal + Ceramic Coating",
        "AC Vent Clean + Hydrophobic Coat",
        "Interior Polish + Deep Clean",
      ],
      gallery: [...fullGallery],
    },
    {
      id: 10,
      name: " 0' Dust + 360 + Hydrophobic Wash",
      description: "Deep cleaning with hydrophobic coating and 360 wash.",
      price: { hatchback: 1689, sedan: 1689, suv: 1893, lux: 2097 },
      image: "https://res.cloudinary.com/ddgxphtda/image/upload/HomeService/Services/Upper_Cover_Clean.png",
      video: "/videos/washDemo.mp4",
      features: ["360 Clean + Odor Treatment", "Deep Clean Interior + Exterior", "Crystal Clear Finish"],
      gallery: [...fullGallery],
    },
  ]
  
};
