import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";


export default function SignUP() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      
      const res = await axios.post("/signup", {
        name,
        username,
        email,
        password,
        confirmPassword,
        role,
      });
      if(res){
        navigate("/login")
      }
      setName("")
      setUsername("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setRole("admin")
           
    } catch (err) {
      alert("Something went wrong: " + (err.response?.data?.message || err.message));
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-slate-800 to-blue-900 px-4">
      <div className="w-full max-w-5xl bg-slate-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Section */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-linear-to-br from-slate-900 to-blue-900">
            <h2 className="text-4xl font-bold text-gray-100">Create Account ✨</h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed">
              Join us and start building amazing things. Create your account to access all features and stay productive.
            </p>
          </div>

          {/* Right Section */}
          <div className="p-10">
            <h3 className="text-2xl font-semibold text-gray-100 mb-6">Sign Up</h3>

            {/* Form */}
            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-white border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  placeholder="Choose a username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-white border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Create a password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-white rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-xl text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 rounded-xl text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              </div>

              {/* Sign Up Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-linear-to-r cursor-pointer from-blue-600 to-slate-700 text-white font-semibold text-lg shadow-lg hover:opacity-90 active:scale-95 transition"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="grow h-px bg-slate-700" />
              <span className="px-3 text-sm text-gray-400">OR</span>
              <div className="grow h-px bg-slate-700" />
            </div>

            {/* Google Signup */}
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 shadow-sm transition">
              <FcGoogle size={22} />
              <span className="font-medium cursor-pointer text-gray-200">Sign up with Google</span>
            </button>

            {/* Login text */}
            <p className="text-center text-gray-300 mt-6">
              Already have an account?{" "}
              <Link to="/login">
                <button className="text-blue-400 cursor-pointer font-semibold hover:underline">Login</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
