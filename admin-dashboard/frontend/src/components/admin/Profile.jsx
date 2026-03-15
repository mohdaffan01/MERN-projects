import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Profile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        if (response.data.success) {
          setAdmin(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="ml-64 mt-16 p-8">Loading...</div>;

  return (
    <div className="ml-64 mt-16 p-8 h-full bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-linear-to-r from-cyan-900 to-slate-800 h-48 flex items-end px-8 pb-8">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
              <img
                src="https://www.clipartmax.com/png/middle/17-172602_computer-icons-user-profile-male-portrait-of-a-man.png"
                alt="admin profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white mb-2">
              <h1 className="text-4xl font-bold">{admin?.name}</h1>
              <p className="text-cyan-200 capitalize font-medium">{admin?.role} Account</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Full Name</label>
                <p className="text-lg text-gray-800 font-semibold">{admin?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Username</label>
                <p className="text-lg text-gray-800 font-semibold">@{admin?.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email Address</label>
                <p className="text-lg text-gray-800 font-semibold">{admin?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Account Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100">
                <p className="text-sm text-cyan-600 font-medium">Account Type</p>
                <p className="text-xl font-bold text-cyan-900 capitalize">{admin?.role}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-600 font-medium">Status</p>
                <p className="text-xl font-bold text-slate-900">Active</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-gray-50 border-t flex justify-end">
          <button className="bg-cyan-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-800 transition-colors shadow-md">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
