import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers, updateUserPassword } from "../Data/mockData.js";

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    const storedCode = localStorage.getItem("resetCode");
    const storedEmail = localStorage.getItem("resetEmail");

    if (code !== storedCode) {
      setError("Invalid reset code!");
      return;
    }

    // Update password in mock data
    const users = getUsers();
    const user = users.find((user) => user.email === storedEmail);
    if (user) {
      updateUserPassword(storedEmail, newPassword);
      alert("Password reset successfully! Please log in.");
      navigate("/");
    } else {
      setError("User not found!");
    }
  };

  return (
    <div className="relative flex flex-col items-center font-jakarta h-screen justify-center bg-gradient-to-b from-teal-700 to-green-300">
      {/* Book Stickers Background */}
      <div className="absolute inset-0 flex flex-wrap gap-6 p-10 opacity-20">
        <div className="w-20 h-28 bg-yellow-300 rotate-12 rounded-lg shadow-lg"></div>
        <div className="w-24 h-32 bg-blue-400 -rotate-6 rounded-lg shadow-lg"></div>
        <div className="w-20 h-28 bg-red-400 rotate-3 rounded-lg shadow-lg"></div>
        <div className="w-24 h-32 bg-green-400 -rotate-12 rounded-lg shadow-lg"></div>
        <div className="w-20 h-28 bg-purple-400 rotate-8 rounded-lg shadow-lg"></div>
      </div>

      {/* Content */}
      <h2 className="font-plus jakarta text-3xl text-white mb-6">
        Reset Password
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="relative border shadow-lg p-6 w-80 bg-white z-10">
        <label className="block text-gray-700">Enter reset code</label>
        <input
          type="text"
          className="w-full px-3 py-2 border mb-4"
          placeholder="Enter Code..."
          onChange={(e) => setCode(e.target.value)}
        />
        <label className="block text-gray-700">New Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border mb-4"
          placeholder="*********"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="w-full bg-sky-700 hover:bg-sky-900 text-white py-2 mb-3"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
        <Link to="/forgot-password" className="text-sky-800 text-center block">
          Back to Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
