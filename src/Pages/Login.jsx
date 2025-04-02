// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");

//     try {
//       const response = await axios.post(
//         "https://leave-management-system-qh49.onrender.com/api/auth/login",
//         { email, password }
//       );

//       if (response.status === 200) {
//         const { accessToken, user } = response.data;
//         localStorage.setItem("token", accessToken);
//         localStorage.setItem("loggedInUser", JSON.stringify(user));

//         setSuccessMessage("Successfully logged in! Redirecting...");
//         setTimeout(() => {
//           navigate(
//             user.roleName === "hr manager"
//               ? "/admin-dashboard"
//               : "/employee-dashboard"
//           );
//         }, 2000);
//         console.log("Role Name:", user.roleName);
//         console.log(
//           "Navigating to:",
//           user.roleName === "admin" ? "/admin-dashboard" : "/employee-dashboard"
//         );
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-800 to-green-400 overflow-hidden px-4 sm:px-6 lg:px-8">
//       {/* Success/Error Messages */}
//       {successMessage && (
//         <div className="absolute top-5 bg-green-500 text-white px-6 py-2 rounded shadow-lg">
//           {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="absolute top-5 bg-red-500 text-white px-6 py-2 rounded shadow-lg">
//           {error}
//         </div>
//       )}
//       {/* Background Elements */}
//       <div className="absolute inset-0 flex flex-wrap gap-8 p-12 opacity-25">
//         {/* Cluster of books at bottom-left */}
//         <div className="absolute bottom-6 left-6 flex flex-col gap-3">
//           <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-6 shadow-lg"></div>
//           <div className="w-32 h-16 bg-white border-4 border-gray-500 -rotate-3 shadow-lg"></div>
//           <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-1 shadow-lg"></div>
//         </div>

//         {/* Scattered books */}
//         <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-6 shadow-lg absolute top-16 right-14"></div>
//         <div className="w-32 h-16 bg-white border-4 border-gray-500 -rotate-3 shadow-lg absolute top-40 left-28"></div>

//         {/* Pens */}
//         <div className="w-1 h-24 bg-red-600 rotate-12 shadow-lg absolute top-20 left-20"></div>
//         <div className="w-1 h-24 bg-blue-700 -rotate-6 shadow-lg absolute top-60 right-16"></div>

//         {/* Human Stickers */}
//         <div className="w-16 h-16 bg-yellow-500 rounded-full shadow-lg absolute top-12 left-40"></div>
//         <div className="w-20 h-20 bg-green-500 rounded-full shadow-lg absolute bottom-10 right-16"></div>
//         <div className="w-12 h-12 bg-purple-600 rounded-full shadow-lg absolute bottom-24 left-14"></div>
//       </div>

//       {/* App Title */}
//       <h2 className="font-jakarta text-xl sm:text-3xl text-white mb-4 sm:mb-6 text-center">
//         Mojo Employee Management System
//       </h2>

//       {/* Login Form */}
//       <div className="relative border shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md bg-white rounded-md z-10">
//         <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
//           Login
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//               placeholder="Enter Email..."
//               id="email"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//               placeholder="*********"
//               id="password"
//               required
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="inline-flex items-center">
//               <input type="checkbox" className="form-checkbox text-blue-600" />
//               <span className="ml-2 text-gray-700">Remember me</span>
//             </label>
//             <Link to="/forgot-password" className="text-sky-800">
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-sky-700 hover:bg-sky-900 text-white py-2 text-sm rounded-md"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { getUsers } from "../Data/mockData.js";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const users = getUsers();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      setSuccessMessage("Successfully logged in!");

      setTimeout(() => {
        if (foundUser.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }, 2000);
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="relative flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-800 to-green-400 overflow-hidden px-4">
      {successMessage && (
        <div className="absolute top-5 bg-green-500 text-white px-6 py-2 rounded shadow-lg">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="absolute top-5 bg-red-500 text-white px-6 py-2 rounded shadow-lg">
          {error}
        </div>
      )}
      {/* Background Elements */}
      <div className="absolute inset-0 flex flex-wrap gap-8 p-12 opacity-25">
        {/* Cluster of books at bottom-left */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-3">
          <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-6 shadow-lg"></div>
          <div className="w-32 h-16 bg-white border-4 border-gray-500 -rotate-3 shadow-lg"></div>
          <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-1 shadow-lg"></div>
        </div>

        {/* Scattered books */}
        <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-6 shadow-lg absolute top-16 right-14"></div>
        <div className="w-32 h-16 bg-white border-4 border-gray-500 -rotate-3 shadow-lg absolute top-40 left-28"></div>

        {/* Pens */}
        <div className="w-1 h-24 bg-red-600 rotate-12 shadow-lg absolute top-20 left-20"></div>
        <div className="w-1 h-24 bg-blue-700 -rotate-6 shadow-lg absolute top-60 right-16"></div>

        {/* Human Stickers */}
        <div className="w-16 h-16 bg-yellow-500 rounded-full shadow-lg absolute top-12 left-40"></div>
        <div className="w-20 h-20 bg-green-500 rounded-full shadow-lg absolute bottom-10 right-16"></div>
        <div className="w-12 h-12 bg-purple-600 rounded-full shadow-lg absolute bottom-24 left-14"></div>
      </div>

      {/* App Title */}
      <h2 className="text-2xl sm:text-3xl text-white mb-4 sm:mb-6 text-center">
        Mojo Employee Management System
      </h2>

      {/* Login Form */}
      <div className="relative border shadow-lg p-4 sm:p-6 w-full sm:w-96 bg-white rounded-md z-10">
        <h2 className="text-xl sm:text-2xl text-center font-bold mb-4">
          Login
        </h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-3 sm:mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter Email..."
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="*********"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-1 text-gray-700">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sky-800">
              Forgot password?
            </Link>
          </div>

          <div className="mb-3 sm:mb-4">
            <button
              type="submit"
              className="w-full bg-sky-700 hover:bg-sky-900 text-white py-2 sm:py-3 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
