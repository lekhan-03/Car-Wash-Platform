// src/data/insuranceData.js

export const insuranceCategories = [
  {
    id: "bike",
    title: "Bike Insurance",
    icon: "https://cdn-icons-png.flaticon.com/512/3097/3097039.png", // Motorbike icon
    bannerTitle: "Compare & Save up to 95%*",
    bannerSubtitle: "Get Expert Help with Claims",
    placeholder: "Eg: KA01BD2525",
    color: "#0047ff"
  },
  {
    id: "car",
    title: "Car Insurance",
    icon: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png", // Car icon
    bannerTitle: "Compare & Save up to 91%*",
    bannerSubtitle: "Choose from 20+ Insurers!",
    placeholder: "Eg: KA05MS7777",
    color: "#206aff"
  }
];

export const trustedPartners = [
  { name: "Acko", logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Acko_General_Insurance_Logo.svg" },
  { name: "HDFC Ergo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/HDFC_ERGO_General_Insurance_Company_Limited_Logo.svg" },
  { name: "Bajaj Allianz", logo: "https://upload.wikimedia.org/wikipedia/en/2/22/Bajaj_Allianz_General_Insurance_Logo.svg" },
  { name: "ICICI Lombard", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/ICICI_Lombard_Logo.svg" },
  { name: "Digit", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Go_Digit_General_Insurance_Logo.svg" },
  { name: "Reliance", logo: "https://upload.wikimedia.org/wikipedia/en/e/e3/Reliance_General_Insurance_Logo.svg" }
];

export const testimonials = [
  {
    id: 1,
    name: "Nitesh Deotale",
    text: "Trusted Rev2Blush for years, now rely on it for my bike & car insurance.",
    initial: "N",
    color: "#f1c40f" // Yellow
  },
  {
    id: 2,
    name: "Gopal",
    text: "Upgraded from third-party to comprehensive bike insurance hassle-free.",
    initial: "G",
    color: "#00b894" // Teal
  }
];

export const processSteps = [
  { step: 1, title: "Choose plan", desc: "Select best option" },
  { step: 2, title: "Submit details", desc: "Easy documentation" },
  { step: 3, title: "Complete KYC", desc: "Instant verification" },
  { step: 4, title: "Get policy", desc: "Instant download" }
];