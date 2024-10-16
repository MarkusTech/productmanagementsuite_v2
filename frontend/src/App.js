import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AboutPage from "./pages/about/About";
import ContactPage from "./pages/contact/Contact";

// admin
import Home from "./admin/pages/Home";
import Inventory from "./admin/pages/Inventory";
import Products from "./admin/pages/Products";
import Categories from "./admin/pages/Categories";
import CompanyProfile from "./admin/pages/CompanyProfile";
import Report from "./admin/pages/Report";
import SalesManagement from "./admin/pages/SalesManagement";
import Users from "./admin/pages/Users";
import Setting from "./admin/pages/Settings";
import InventoryAdjustment from "./admin/pages/InventoryAdjustment";
import InventoryType from "./admin/pages/InventoryType";
import Location from "./admin/pages/Location";
import AdjustmentTypeReason from "./admin/pages/AdjustmentTypeReason";
import AdjustmentType from "./admin/pages/AdjustmentType";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<HomePage />} />
        {/* admin routes */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/items" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/users" element={<Users />} />
        <Route path="/company" element={<CompanyProfile />} />
        <Route path="/sales" element={<SalesManagement />} />
        <Route path="/report" element={<Report />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/inventory/inventory-type" element={<InventoryType />} />
        <Route path="/inventory-adjustment" element={<InventoryAdjustment />} />
        <Route path="/location" element={<Location />} />
        <Route path="/adjustment-type" element={<AdjustmentType />} />
        <Route
          path="/adjustment-type-reason"
          element={<AdjustmentTypeReason />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
