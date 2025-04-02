import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendCode = () => {
    // Mock sending reset code (store in localStorage for now)
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("resetCode", resetCode);
    localStorage.setItem("resetEmail", email);
    alert(`Reset code sent to ${email} (Mock: ${resetCode})`);
    navigate("/reset-password");
  };

  return (
    <div className="relative flex font-jakarta flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-700 to-green-300">
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
        Forgot Password
      </h2>
      {message && <p className="text-green-600">{message}</p>}
      <div className="relative border shadow-lg p-6 w-80 bg-white z-10">
        <label className="block text-gray-700">Enter your email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border mb-4"
          placeholder="Enter Email..."
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-sky-700 hover:bg-sky-900 text-white py-2 mb-3"
          onClick={handleSendCode}
        >
          Send Reset Code
        </button>
        <Link to="/login" className="text-sky-800 text-center block">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
