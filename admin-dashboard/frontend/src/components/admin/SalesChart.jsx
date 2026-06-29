import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
import { FaChartSimple } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const datadonut = [
  { name: "Electroics", value: 40 },
  { name: "Food", value: 25 },
  { name: "Clothing", value: 20 },
  { name: "Others", value: 15 },
];

export default function SalesChart() {
  
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/getOrders");
        
        setTotalCount(response.data.totalOrders);
        console.log("Total Orders from API:", response.data.totalOrders);
        console.log(response.data)

      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Something went wrong");
      }
    };
    fetchOrders();
  }, []);

  

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = months.map((month , index) => ({
    month,
    sales: totalCount + index,
  }));

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444"];

  const [isDark, setIsDark] = useState(true);
  const handleToDark = () => {
    console.log("click");
    setIsDark(true);
  };
  const handleToLight = () => {
    console.log("click");
    setIsDark(false);
  };

  return (
    <>
      <div className="flex gap- ">
        {/**Area chart */}

        <div className={`rounded-xl w-250 m-4 p-6 shadow-md ${isDark ? "bg-gray-800 text-blue-500" : "bg-gray-100"}`}>
          <div className="flex items-center justify-between ">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <FaChartSimple className="text-blue-500" />
              Sales
            </h2>
            <div className="flex gap-2">
              <button onClick={handleToDark} className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-md">
                Dark
              </button>
              <button onClick={handleToLight} className="bg-gray-100 cursor-pointer px-6 py-2 rounded-md">
                Light
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#93c5fd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/**Donut or pie chart */}
        <div className="bg-white rounded-xl shadow-md m-4 w-150 p-6 ">
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={datadonut} cx="50%" cy="60%" innerRadius={50} outerRadius={100} paddingAngle={0} dataKey="value">
                  {datadonut.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
              <h1 className="text-blue-900 font-extrabold ml-60 mt-10 text-2xl">Values</h1>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
