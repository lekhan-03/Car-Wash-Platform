import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Insurance from './Pages/Insurance/Insurance';
import CarWash from './Pages/CarWash/CarWashPage';
import HomeService from './Components/HomeServices/HomeService';
import ServiceDetail from './Components/HomeServices/ServiceDetail';
import Detailing from './Pages/Detailing/Detailing';
import Cart from './Pages/Cart/Cart';
import LoginSignup from './Pages/LoginSIgnup';
import CarWashDetails from './Pages/CarWash/CarWashDetails';
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


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {/* <GlobalAds/> */}
        <BottomNavbar />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Car Wash */}
          <Route path="/carwash" element={<CarWash />} />
          <Route path="/carwash/:id" element={<CarWashDetails />} />

          {/* Home Service */}
          <Route path="/homeservice" element={<HomeService />} />
          <Route path="/homeservice/service/:id" element={<ServiceDetail />} />

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
      </BrowserRouter>
    </div>
  );
}

export default App;
