import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUser = async (search = "") => {
    try {
      const response = await axios.get(`/allusers?search=${search}`);
      console.log(users);
      console.log(response);
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    fetchUser(searchTerm);
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);

  const handleSearch = () => {
    fetchUser(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="ml-64 mt-16  h-full">
      <div className="flex items-center ">
        <h1 className="text-4xl p-4 font-semibold text-cyan-900">Users</h1>
        <input
          type="text"
          placeholder="Search User"
          className="border border-gray-300 w-full rounded px-3 py-1 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="cursor-pointer m-4 text-gray-900 text-xl"
          onClick={handleSearch}
        >
          <BsSearch />
        </button>
      </div>

      {/**All users */}
      <div className="bg-gray-800 rounded-xl m-3 ml-4 mt-2 h-full p-2">
        <div className="bg-white rounded-xl shadow-md p-6 h-full ">
          {/**add map funtion and fetch data from database */}

          {users?.length === 0 ? (
            <p> User not found</p>
          ) : (
            users?.map((user) => (
              <div key={user._id} className="border mt-2 rounded-md p-2">
                <h2 className="text-2xl font-semibold text-gray-800">{user.name} </h2>
                <p className="text-gray-600 mt-2">Email: {user.email}</p>
                <p className="text-gray-600 mt-2">username: {user.username}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
