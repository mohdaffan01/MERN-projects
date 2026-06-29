import React, { useEffect, useState, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "../../api/axios";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async (searchValue = "") => {
    try {
      setLoading(true);
      const response = await axios.get(`/getOrders?search=${searchValue}`);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = () => {
    fetchOrders(search);
  };

  return (
    <div className="ml-64 mt-16 h-full">
      <div className="flex items-center gap-4 p-4">
        <h1 className="text-4xl font-semibold text-cyan-900">Orders</h1>

        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 w-full rounded px-3 py-2 focus:outline-none"
        />

        <button onClick={handleSearch} className="cursor-pointer text-gray-900 text-xl">
          <BsSearch />
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl m-3 ml-4 mt-2 p-2">
        <div className="bg-white rounded-xl shadow-md p-6 min-h-75">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found</p>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-md p-3 hover:shadow-lg transition">
                  <p className="text-gray-600 font-bold mt-2">Buyer: {order.user?.name}</p>
                  <p className="text-gray-600 font-bold mt-2">Product: {order.product?.name}</p>
                  <p className="text-gray-600 mt-2">No of Items: {order.noOfItem}</p>
                  <p className="text-gray-600 mt-2">Total Amount: ₹{order.totalAmount}</p>
                  <p className="text-gray-600 mt-2">Order Status: {order.orderStatus}</p>
                  <p className="text-gray-600 mt-2">Payment Status: {order.paymentStatus}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
