import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBuilding, FaUsers, FaCogs } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 font-jakarta text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 ">
      {/* Header */}
      <div className="bg-[#69E07A] h-16 flex items-center justify-center ">
        <h3 className="text-xl  text-gray-800 text-center font-semibold tracking-wide">
          Mojo Employee M.S.
        </h3>
      </div>

      {/* Sidebar Links */}
      <div className="mt-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-white flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
                : "hover:text-gray-100 flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
            }` + (isActive ? " bg-[#4500ff]" : " hover:bg-[#4500ff]")
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/profile"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-white flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
                : "hover:text-gray-100 flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
            }` + (isActive ? " bg-[#4500ff]" : " hover:bg-[#4500ff]")
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-white flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
                : "hover:text-gray-100 flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
            }` + (isActive ? " bg-[#4500ff]" : " hover:bg-[#4500ff]")
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-white flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
                : "hover:text-gray-100 flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
            }` + (isActive ? " bg-[#4500ff]" : " hover:bg-[#4500ff]")
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
