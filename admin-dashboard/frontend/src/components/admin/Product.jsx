import React, { useEffect, useState, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import axios from "../../api/axios";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("view"); // "view" or "add"
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    brand: ""
  });

  const fetchProduct = useCallback(async (searchValue = "") => {
    try {
      const response = await axios.get(`/getProduct?search=${searchValue}`);
      console.log("Fetched Products:", response.data.data); // Debug log
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Something went wrong");
      return null;
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchProduct().then(data => {
      if (active && data) {
        setProducts(data);
      }
    });
    return () => {
      active = false;
    };
  }, [fetchProduct]);

  const handleSearch = async () => {
    const data = await fetchProduct(search);
    if (data) setProducts(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/createProduct", formData);
      if (response.data.success) {
        alert("Product created successfully");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          brand: "",
          image: ""
        });
        setActiveTab("view");
        const data = await fetchProduct();
        if (data) setProducts(data);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error creating product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`/deleteProduct/${id}`);
        if (response.data.success) {
          alert("Product deleted successfully");
          const data = await fetchProduct(); // refresh list
          if (data) setProducts(data);
        }
      } catch (error) {
        alert(error.response?.data?.message || "Error deleting product");
      }
    }
  };

  const handleStockUpdate = async (id, currentStock, change) => {
    const newStock = Math.max(0, currentStock + change);
    try {
      const response = await axios.put(`/updateProduct/${id}`, { stock: newStock });
      if (response.data.success) {
        // Optimistically update local state or just refetch
        const data = await fetchProduct(search);
        if (data) setProducts(data);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update stock");
    }
  };

  return (
    <div className="ml-64 mt-16 h-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-cyan-900">Product Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("view")}
            className={`px-4 py-2 rounded-md ${activeTab === "view" ? "bg-cyan-900 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            View Products
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 rounded-md ${activeTab === "add" ? "bg-cyan-900 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Add Product
          </button>
        </div>
      </div>

      {activeTab === "view" ? (
        <>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search product (name, category, brand...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border border-gray-300 w-full rounded px-3 py-1 focus:outline-none"
            />
            <button onClick={handleSearch} className="cursor-pointer m-4 text-gray-900 text-xl">
              <BsSearch />
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-2">
            <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto">
              {products.length === 0 ? (
                <p className="text-gray-500 text-center col-span-full">No products found</p>
              ) : (
                products.map((product) => (
                  <div key={product._id} className="border rounded-lg hover:shadow-lg transition-shadow bg-gray-50 overflow-hidden flex flex-col">
                    {product.image ? (
                      <div className="h-48 w-full bg-gray-200 border-b">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-gray-100 flex items-center justify-center border-b text-gray-400">
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                    <div className="p-4 flex flex-col grow">
                      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">{product.name}</h2>
                      <div className="mt-3 space-y-2 grow">
                        <p className="text-sm text-gray-600 line-clamp-2" title={product.description}>
                          <span className="font-semibold text-cyan-800">Desc:</span> {product.description}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-cyan-800">Category:</span> {product.category}
                        </p>
                        <p className="text-lg font-bold text-green-700 mt-2">₹{product.price}</p>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStockUpdate(product._id, product.stock, -1)}
                            className="bg-red-100 text-red-600 px-2 py-0.5 rounded hover:bg-red-200 transition-colors font-bold"
                          >
                            -
                          </button>
                          <span className={`text-xs px-2 py-1 rounded font-medium ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            Stock: {product.stock}
                          </span>
                          <button
                            onClick={() => handleStockUpdate(product._id, product.stock, 1)}
                            className="bg-green-100 text-green-600 px-2 py-0.5 rounded hover:bg-green-200 transition-colors font-bold"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          {product.brand && <span className="text-xs text-gray-500 italic font-medium">{product.brand}</span>}
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                            title="Delete Product"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Category*</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none h-24"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Stock*</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              {formData.image && (
                <div className="mt-2 h-32 w-32 border rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-cyan-900 text-white font-semibold py-3 rounded-md hover:bg-cyan-800 transition-colors shadow-md"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


