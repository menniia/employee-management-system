import React, { useState, useEffect } from "react";
import SummaryCards from "./SummaryCards";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [leaveCounts, setLeaveCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    // Fetch employee count
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployeeCount(storedEmployees.length);

    // Fetch department count
    const storedDepartments =
      JSON.parse(localStorage.getItem("departments")) || [];
    setDepartmentCount(storedDepartments.length);

    // Fetch leave data
    const storedLeaves =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const totalLeaves = storedLeaves.length;
    const approvedLeaves = storedLeaves.filter(
      (leave) => leave.status === "Approved"
    ).length;
    const rejectedLeaves = storedLeaves.filter(
      (leave) => leave.status === "Rejected"
    ).length;
    const pendingLeaves = storedLeaves.filter(
      (leave) => !leave.status || leave.status === "Pending"
    ).length;

    // Update leave counts state
    setLeaveCounts({
      total: totalLeaves,
      pending: pendingLeaves,
      approved: approvedLeaves,
      rejected: rejectedLeaves,
    });
  }, []);

  return (
    <div className="p-6 font-jakarta">
      <h3 className="text-left text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <SummaryCards
          icon={<FaUsers />}
          text="Total Employees"
          number={employeeCount}
          color="bg-blue-600"
        />
        <SummaryCards
          icon={<FaBuilding />}
          text="Total Departments"
          number={departmentCount}
          color="bg-yellow-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-left text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCards
            icon={<FaFileAlt />}
            text="Leaves Applied"
            number={leaveCounts.total}
            color="bg-blue-600"
          />
          <SummaryCards
            icon={<FaCheckCircle />}
            text="Leaves Approved"
            number={leaveCounts.approved}
            color="bg-green-600"
          />
          <SummaryCards
            icon={<FaHourglassHalf />}
            text="Leaves Pending"
            number={leaveCounts.pending}
            color="bg-yellow-600"
          />
          <SummaryCards
            icon={<FaTimesCircle />}
            text="Leaves Rejected"
            number={leaveCounts.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
