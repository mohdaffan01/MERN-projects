import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidbar from "./Sidbar";
import Dashboard from "./Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import Product from "./Product";
import Users from "./Users";
import Order from "./Order"
import Revenue from "./Revenue"

export default function AdminDashboard() {
  
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
        


        <Route path="" element={<Navigate to={"dashboard"} />} />
      </Routes>
    </div>
  );
}
