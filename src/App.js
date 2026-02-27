import React, { useState } from 'react'; // 1. Added React and useState import
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Insurance from './Pages/Insurance/Insurance';
// import CarWash from './Pages/CarWash/CarWashPage';
import SteamService from './Components/SteamServices/SteamService';
import HomeService from './Components/HomeServices/HomeService';
import ServiceDetail from './Components/HomeServices/ServiceDetail';
import Detailing from './Pages/Detailing/Detailing';
import Cart from './Pages/Cart/Cart';
import LoginSignup from './Pages/LoginSIgnup';
// import CarWashDetails from './Pages/CarWash/CarWashDetails';
import SteamServiceDetail from './Components/SteamServices/ServiceDetail';
// import SelectCarModal from './Components/Navbar/SelectCarModal';
// import ProductDetails from './Pages/Products/ProductDetails';
import ProductDetailing from './Pages/Detailing/DetailingProductDetails';
import BottomNavbar from './Components/Navbar/BottomNavbar';
import Signup from './Pages/Signup';
import Accounts from './Pages/Accounts';
import AccountDetails from "./Pages/AccountSections/AccountDetails";
import AccountOrders from "./Pages/AccountSections/AccountOrders";
import AccountCars from "./Pages/AccountSections/AccountCars";
import AccountAddresses from "./Pages/AccountSections/AccountAddresses";
import AccountPayments from "./Pages/AccountSections/AccountPayments";
import AccountHelp from "./Pages/AccountSections/AccountHelp";
import Checkout from "./Pages/Checkout/Checkout";
import MonthlyPackagePageWater from './Components/HomeServices/MonthlyPackages';
import ChatbotWidget from './Components/ChatbotWidget/ChatbotWidget';

// 2. Added SplashScreen import (Adjust the path if your folder structure is different)
import SplashScreen from './Components/SplashScreen/SplashScreen'; 


function App() {
  // 3. Added the state to control the splash screen
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      <Router>
        {/* Show Splash Screen if true. Pass setShowSplash(false) to hide it */}
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <>
            {/* Your main app content goes here and is only rendered after splash finishes! */}
            <Navbar />
            {/* <GlobalAds/> */}
            <BottomNavbar />
            <ChatbotWidget />
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Car Wash */}
              <Route path="/steamwash" element={<SteamService />} />
              <Route path="/steamwash/:id" element={<SteamServiceDetail />} />
              
              {/* Home Service */}
              <Route path="/waterwash" element={<HomeService />} />
              <Route path="/waterwash/service/:id" element={<ServiceDetail />} />
              <Route path="/monthly-packages" element={<MonthlyPackagePageWater />} />

              {/* Detailing */}
              <Route path="/detailing" element={<Detailing />} />
              <Route path="/detailing/:id" element={<ProductDetailing />} />

              {/* Products */}
              <Route path="/insurance" element={<Insurance />} />
              {/* <Route path="/products/product/:id" element={<ProductDetails />} /> */}

              {/* Cart & Login */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Accounts />}>
                <Route index element={<Navigate to="details" replace />} />
                <Route path="details" element={<AccountDetails />} />
                <Route path="orders" element={<AccountOrders />} />
                <Route path="cars" element={<AccountCars />} />
                <Route path="addresses" element={<AccountAddresses />} />
                <Route path="payments" element={<AccountPayments />} />
                <Route path="help" element={<AccountHelp />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </> 
        )} {/* 4. Added missing closing tags for the fragment and ternary operator here! */}
      </Router>
    </div>
  );
}

export default App;