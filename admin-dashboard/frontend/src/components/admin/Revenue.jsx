import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Revenue() {
  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    const fetchRevenue = async () => {
        try {
            const res = await axios.get("/getTotalRevenue"); 
            setRevenue(res.data.totalRevenue);
            console.log(res.data.totalRevenue)
        
      } catch (error) {
        console.error("Server error:", error);
      }
    };
    fetchRevenue()
  }, []);

  return (
    <div className="ml-64 mt-16  h-full">
      <div className="flex items-center ">
        <h1 className="text-4xl p-4 font-semibold text-cyan-900">Revenue</h1>
      </div>
      <div className="bg-gray-800 rounded-xl m-3 ml-4 mt-2 h-full p-2">
        <div className="bg-white rounded-xl shadow-md p-6 h-full grid grid-cols-4 gap-4 ">
          <div className="border rounded-md p-2 ">
            <p className="text-gray-600 font-bold ">Revenue: {revenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
