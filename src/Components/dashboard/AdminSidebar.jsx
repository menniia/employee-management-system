// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaBuilding,
//   FaUsers,
//   FaCalendarAlt,
//   // FaMoneyBillWave,
//   FaCogs,
// } from "react-icons/fa";

// const AdminSidebar = () => {
//   return (
//     <div className="bg-gray-900 font-jakarta text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 ">
//       {/* Header */}
//       <div className="bg-[#69E07A] h-16 flex items-center justify-center ">
//         <h3 className="text-xl text-gray-800 text-center font-semibold tracking-wide">
//           Mojo Employee M.S.
//         </h3>
//       </div>
//       <div>
//         <NavLink
//           to="/admin-dashboard"
//           className={({ isActive }) =>
//             `${
//               isActive
//                 ? "text-white flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
//                 : "hover:text-gray-100 flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
//             }` + (isActive ? " bg-[#4500ff]" : " hover:bg-[#4500ff]")
//           }
//           end
//         >
//           <FaTachometerAlt />
//           <span>Dashboard</span>
//         </NavLink>
//         <NavLink
//           to="/admin-dashboard/employees"
//           className={({ isActive }) =>
//             `${
//               isActive
//                 ? "text-white flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
//                 : "hover:text-gray-100 flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
//             }` + (isActive ? " bg-[#4500ff]" : " hover:bg-[#4500ff]")
//           }
//         >
//           <FaUsers />
//           <span>Employees</span>
//         </NavLink>
//         <NavLink
//           to="/admin-dashboard/departments"
//           className={({ isActive }) =>
//             `${
//               isActive
//                 ? "text-white flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
//                 : "hover:text-gray-100 flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
//             }` + (isActive ? " bg-[#4500ff]" : " hover:bg-[#4500ff]")
//           }
//         >
//           <FaBuilding />
//           <span>Departments</span>
//         </NavLink>
//         <NavLink
//           to="/admin-dashboard/leave"
//           className={({ isActive }) =>
//             `${
//               isActive
//                 ? "text-white flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
//                 : "hover:text-gray-100 flex items-center m-1 space-x-4 block py-3 px-6 rounded-md transition"
//             }` + (isActive ? " bg-[#4500ff]" : " hover:bg-[#4500ff]")
//           }
//         >
//           <FaCalendarAlt />
//           <span>Leaves</span>
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard"
//           className="flex items-center space-x-4 block py-2.5 px-4 rounded"
//         >
//           <FaCogs />
//           <span>Settings</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
