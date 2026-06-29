import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-linear-to-br from-gray-900 to-slate-800 flex items-center justify-between px-6 z-10">
      {/* Left side */}
      <Link to={"/admin/dashboard"}>
        <h1 className="text-lg font-semibold text-gray-300">Dashboard</h1>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border bg-gray-300 font-bold rounded px-3 py-1 focus:outline-none"
        />
        <span className="cursor-pointer text-gray-300 text-xl">
          <BsSearch />
        </span>
        <span className="cursor-pointer text-gray-300 text-2xl">
          <IoIosNotifications />
        </span>
      </div>
    </div>
  );
}
