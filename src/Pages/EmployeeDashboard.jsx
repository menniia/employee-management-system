import React from "react";
// import Sidebar from "../Components/EmployeeDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import EmployeeNavbar from "../Components/dashboard/EmployeeNavbar";

const EmployeeDashboard = () => {
  return (
    <div className="flex font-jakarta">
      {/* <Sidebar /> */}
      <div className="flex-1  bg-gray-100 h-screen">
        <EmployeeNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
