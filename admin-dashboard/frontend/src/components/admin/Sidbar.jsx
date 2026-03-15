import React from "react";
import { RxExit } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Sidbar() {
  return (
    <div className="bg-linear-to-br from-gray-900 to-slate-800 w-64 h-screen fixed left-0 top-0">
      <h1 className="text-2xl text-cyan-700 mt-3 text-center">Admin-Dashboard</h1>
      {/* profile */}
      <Link to={"/admin/profile"}>
        <div className="flex items-center gap-4 my-6 hover:bg-gray-800/50 p-2 rounded-lg transition-colors cursor-pointer mx-2">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-800 overflow-hidden bg-gray-50 flex-shrink-0">
            <img
              src="https://www.clipartmax.com/png/middle/17-172602_computer-icons-user-profile-male-portrait-of-a-man.png"
              alt="profile image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-gray-300 text-lg hover:text-white transition-colors truncate">
            <p className="font-medium">Mohd Affan</p>
            <p className="text-xs text-gray-500 font-normal">Admin Profile</p>
          </div>
        </div>
      </Link>
      <div className="w-full h-px bg-gray-700 my-4"></div>

      {/**components */}
      <div className="bg-gray-800 text-gray-300 rounded-lg h-screen w-64 flex flex-col p-4">
        <h2 className="text-white text-lg font-semibold mb-4">Admin Panel</h2>
        <Link to={"/admin/dashboard"}>
          <p className="bg-gray-700 text-white cursor-pointer px-3 py-2 rounded mb-1">📊 Dashboard</p>
        </Link>

        <p className="text-xs text-gray-400 uppercase mt-3">Management</p>

        <Link to={"/admin/products"}>
          <p className="px-3 py-2 cursor-pointer rounded hover:bg-gray-700">📦 Products</p>
        </Link>

        <Link to={"/admin/orders"}>
          <p className="px-3 py-2 cursor-pointer rounded hover:bg-gray-700">🛒 Orders</p>
        </Link>

        <Link to={"/admin/users"}>
          <p className="px-3 py-2 cursor-pointer rounded hover:bg-gray-700">👥 Users</p>
        </Link>
        <p className="px-3 py-2 cursor-pointer rounded hover:bg-gray-700">💳 Payment</p>

        <Link to={"/admin/revenue"}>
          <p className="px-3 py-2 cursor-pointer rounded hover:bg-gray-700">💹 Revenue</p>
        </Link>

        <p className="px-3 py-2 cursor-pointer rounded hover:bg-gray-700">🏷️ Discounts</p>

        <p className="text-xs text-gray-400 uppercase mt-3">Insights</p>
        <p className="px-3 py-2 cursor-pointer rounded hover:bg-gray-700">⭐ Reviews</p>
        <p className="px-3 py-2 cursor-pointer rounded hover:bg-gray-700">📈 Reports</p>

        <Link to={"/login"}>
          <p className="mt-10 text-xl text-gray-400 hover:text-red-300 cursor-pointer flex items-center gap-2">
            <RxExit />
            Logout
          </p>
        </Link>
      </div>
    </div>
  );
}
