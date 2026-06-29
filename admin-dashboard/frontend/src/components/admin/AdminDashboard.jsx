import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidbar from "./Sidbar";
import Dashboard from "./Dashboard";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Product from "./Product";
import Users from "./Users";
import Order from "./Order"
import Revenue from "./Revenue"
import Profile from "./Profile";
import axios from "../../api/axios";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/profile");
        if (response.data.success && response.data.data.role === "admin") {
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white font-semibold">
        Loading Admin Panel...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Sidbar />
      <Navbar />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Product  />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Order />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="profile" element={<Profile />} />
        
        <Route path="" element={<Navigate to={"dashboard"} />} />
      </Routes>
    </div>
  );
}
