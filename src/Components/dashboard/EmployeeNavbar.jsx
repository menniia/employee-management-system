import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo1 from "./logo1.png";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCogs,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const EmployeeNavbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="font-jakarta bg-[#69E07A] text-gray-800 shadow-md">
      <div className="flex justify-between items-center h-16 px-6">
        <div className="flex items-center space-x-2">
          <img
            src={logo1}
            className="h-6 w-36 brightness-80 contrast-150"
            alt="Logo"
          />
          <p className="text-lg font-medium hidden md:block">
            Welcome, {user?.name}
          </p>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center ml-40 space-x-2">
          <li>
            <NavLink
              to="/employee-dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[#00416A] text-white"
                    : "hover:bg-[#009DC4] hover:text-black"
                }`
              }
              end
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employee-dashboard/profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[#00416A] text-white"
                    : "hover:bg-[#009DC4] hover:text-black"
                }`
              }
            >
              <FaUsers />
              <span>My Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employee-dashboard/leaves"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[#00416A] text-white"
                    : "hover:bg-[#009DC4] hover:text-black"
                }`
              }
            >
              <FaBuilding />
              <span>Leaves</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employee-dashboard/setting"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[#00416A] text-white"
                    : "hover:bg-[#009DC4] hover:text-black"
                }`
              }
            >
              <FaCogs />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>

        {/* Desktop Logout Button */}
        <button
          onClick={handleLogout}
          className="hidden md:block px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-md transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#004953] text-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>

        {/* Mobile Navigation Links */}
        <ul className="mt-16 flex flex-col space-y-4 p-4">
          <li>
            <NavLink
              to="/employee-dashboard"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-4 rounded-md transition ${
                  isActive
                    ? "bg-[#4500ff] text-white"
                    : "hover:bg-[#4500ff] hover:text-white"
                }`
              }
              end
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employee-dashboard/profile"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-4 rounded-md transition ${
                  isActive
                    ? "bg-[#4500ff] text-white"
                    : "hover:bg-[#4500ff] hover:text-white"
                }`
              }
            >
              <FaUsers />
              <span>My Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employee-dashboard/leaves"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-4 rounded-md transition ${
                  isActive
                    ? "bg-[#4500ff] text-white"
                    : "hover:bg-[#4500ff] hover:text-white"
                }`
              }
            >
              <FaBuilding />
              <span>Leaves</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employee-dashboard/setting"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-4 rounded-md transition ${
                  isActive
                    ? "bg-[#4500ff] text-white"
                    : "hover:bg-[#4500ff] hover:text-white"
                }`
              }
            >
              <FaCogs />
              <span>Settings</span>
            </NavLink>
          </li>

          {/* Mobile Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center space-x-2 p-4 bg-red-600 text-white rounded-md transition hover:bg-red-700"
            >
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
