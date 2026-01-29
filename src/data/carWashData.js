// src/data/carWashData.js
const carWashCenters = [
  {
    id: 1,
    name: "Speedy Shine",
    location: "Koramangala, Bangalore",
    image: "http://geraldaustin.weebly.com/uploads/4/2/4/6/42461997/3022737_orig.jpg",
    timeSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM"],
    pricing: {
      hatchback: 300,
      sedan: 400,
      suv: 500,
    },
  },
  {
    id: 2,
    name: "Sparkle Auto Spa",
    location: "Indiranagar, Bangalore",
    image: "https://i.pinimg.com/originals/6b/8c/51/6b8c510453e8c0045afea1852391ec19.jpg",
    timeSlots: ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"],
    pricing: {
      hatchback: 350,
      sedan: 450,
      suv: 550,
    },
  },
  {
    id: 3,
    name: "Detailing Gang",
    location: "Whitefield, Bangalore",
    image: "https://olacarwash.com/inside/images/services/car-wash-center-near-me-delhi.webp",
    timeSlots: ["8:00 AM", "11:00 AM", "1:30 PM", "4:00 PM"],
    pricing: {
      hatchback: 320,
      sedan: 420,
      suv: 520,
    },
  },
];

export default carWashCenters;
