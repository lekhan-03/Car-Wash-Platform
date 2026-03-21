// src/data/vehicleInsuranceData.js

export const vehicleInsuranceData = [
  {
    vehicleNumber: "KA01AB1234",
    make: "Hyundai",
    model: "Creta SX",
    year: 2022,
    fuelType: "Petrol",
    ownerName: "Rahul Gowda K",
    activeInsurance: {
      provider: "HDFC Ergo",
      policyNumber: "POL-847392819",
      expiryDate: "2026-11-15",
      idv: 850000,
      type: "Comprehensive",
      premiumPaid: 18500,
      status: "Active"
    },
    quotes: [
      { id: "q1", provider: "Acko", plan: "Zero Dep + Consumables", idv: 800000, premium: 14200, tag: "Best Value" },
      { id: "q2", provider: "Digit", plan: "Comprehensive", idv: 820000, premium: 15500, tag: "" },
      { id: "q3", provider: "Tata AIG", plan: "Bumper to Bumper", idv: 850000, premium: 17800, tag: "Highest Claim Settlement" }
    ]
  },
  {
    vehicleNumber: "MH02CD5678",
    make: "Honda",
    model: "City ZX",
    year: 2020,
    fuelType: "Diesel",
    ownerName: "Priya Sharma",
    activeInsurance: {
      provider: "ICICI Lombard",
      policyNumber: "POL-102938475",
      expiryDate: "2026-03-25", // Expiring soon
      idv: 720000,
      type: "Third Party",
      premiumPaid: 5600,
      status: "Expiring Soon"
    },
    quotes: [
      { id: "q4", provider: "PolicyBazaar", plan: "Comprehensive (Upgrade)", idv: 700000, premium: 12000, tag: "Recommended" },
      { id: "q5", provider: "Acko", plan: "Third Party", idv: 0, premium: 4800, tag: "Cheapest" }
    ]
  },
  {
    vehicleNumber: "DL03EF9012",
    make: "Maruti Suzuki",
    model: "Baleno Alpha",
    year: 2019,
    fuelType: "Petrol",
    ownerName: "Rahul Verma",
    activeInsurance: {
      provider: "Bajaj Allianz",
      policyNumber: "POL-564738291",
      expiryDate: "2025-12-10", 
      idv: 550000,
      type: "Comprehensive",
      premiumPaid: 13000,
      status: "Expired"
    },
    quotes: [
      { id: "q6", provider: "Digit", plan: "Comprehensive (Inspection Req)", idv: 520000, premium: 11500, tag: "Instant Inspection" },
      { id: "q7", provider: "HDFC Ergo", plan: "Third Party", idv: 0, premium: 3500, tag: "" }
    ]
  }
];