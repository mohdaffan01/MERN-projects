import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "../../api/axios";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProduct = async (searchValue = "") => {
    try {
      const response = await axios.get(`/getProduct?search=${searchValue}`);
      setProducts(response.data.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProduct(); // load all products initially
  }, []);

  const handleSearch = () => {
    fetchProduct(search);
  };

  return (
    <div className="ml-64 mt-16 h-full">
      <div className="flex items-center">
        <h1 className="text-4xl p-4 font-semibold text-cyan-900">Products</h1>

        <input
          type="text"
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 w-full rounded px-3 py-1 focus:outline-none"
        />

        <button onClick={handleSearch} className="cursor-pointer m-4 text-gray-900 text-xl">
          <BsSearch />
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl m-3 ml-4 mt-2 h-full p-2">
        <div className="bg-white rounded-xl shadow-md p-6 h-full grid grid-cols-4 gap-4">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center col-span-4">No products found</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="border rounded-md p-2">
                <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">Description: {product.description}</p>
                <p className="text-gray-600 mt-2">Category: {product.category}</p>
                <p className="text-gray-600 mt-2">Price: ₹{product.price}</p>
                <p className="text-gray-600 mt-2">Stock: {product.stock}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


