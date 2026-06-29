import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await axios.post("/login", {
        username,
        password,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-slate-800 to-blue-900 px-4">
      <div className="w-full max-w-5xl bg-slate-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Section */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-linear-to-br from-slate-900 to-blue-900">
            <h2 className="text-4xl font-bold text-gray-100">Admin Login </h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed">This dashboard can be access only by admin!</p>
          </div>

          {/* Right Section */}
          <div className="p-10">
            {/* Form */}
            <form className="mt-8 space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-xl text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border text-white border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button type="button" className="text-sm text-blue-400 cursor-pointer hover:text-blue-300 font-medium">
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-slate-700 text-white font-semibold text-lg shadow-lg cursor-pointer hover:opacity-90 active:scale-95 transition"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="grow h-px bg-slate-700" />
              <span className="px-3 text-sm text-gray-400">OR</span>
              <div className="grow h-px bg-slate-700" />
            </div>

            {/* Google Signup */}
            <button
              onClick={() => alert("Google signup is not implemented yet. Please use username and password.")}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 shadow-sm transition"
            >
              <FcGoogle size={22} />
              <span className="font-medium cursor-pointer text-gray-200">Sign up with Google</span>
            </button>
            {/* Sign up text */}
            <p className="text-center text-gray-300 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup">
                <button className="text-blue-400 cursor-pointer font-semibold hover:underline">Sign up</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
