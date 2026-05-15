import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-[300px]">

        <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>

        <p className="text-gray-700"><b>Name:</b> {user?.name}</p>
        <p className="text-gray-700"><b>Email:</b> {user?.email}</p>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            navigate("/login");
          }}
          className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;