import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserTie,
  FaBuilding,
  FaEnvelope,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import DataTable from "react-data-table-component"; // For table view on large screens
import { columns, EmployeeButtons } from "../../Utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect screen size

  useEffect(() => {
    const fetchEmployees = () => {
      const storedEmployees =
        JSON.parse(localStorage.getItem("employees")) || [];
      const storedDepartments =
        JSON.parse(localStorage.getItem("departments")) || [];

      // Create department map
      const departmentMap = storedDepartments.reduce((acc, dep) => {
        acc[dep.id] = dep.dep_name;
        return acc;
      }, {});

      // Map employees with department names
      const employeesWithData = storedEmployees.map((emp, index) => ({
        ...emp,
        id: emp.id,
        sno: index + 1,
        department: departmentMap[emp.department] || "N/A",
        action: <EmployeeButtons Id={emp.id} />,
        image: emp.image || "https://via.placeholder.com/50",
      }));

      setEmployees(employeesWithData);
      setFilteredEmployees(employeesWithData);
    };

    fetchEmployees();

    // Listen for window resize to switch between table & grid view
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      let employees = JSON.parse(localStorage.getItem("employees")) || [];
      const updatedEmployees = employees.filter((emp) => emp.id !== Id);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      window.location.reload();
    }
  };

  const filterEmployees = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-6 font-jakarta">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-[2rem]  font-bold">Manage Employees</h3>
      </div>

      {/* Search Input */}
      <div className="mt-4 flex justify-between items-cente">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-2 bg-gray-300  rounded w-full md:w-1/3"
          onChange={filterEmployees}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-blue-600 hover:bg-blue-800 rounded text-white ml-2 flex sm:flex-row flex-col items-center leading-tight text-center"
        >
          <span className="text-lg">Add</span>
          <span className="text-lg sm:ml-1">Employee</span>
        </Link>
      </div>

      {/* View Mode: Grid (Mobile) & Table (Desktop) */}
      <div className="mt-6">
        {isMobile ? (
          // Mobile Grid View
          <div className="grid grid-cols-1 gap-6">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4"
                >
                  {/* Employee Image */}
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="h-16 w-16 rounded-full object-cover border"
                  />

                  {/* Employee Details */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold flex items-center">
                      <FaUserTie className="mr-2 text-blue-600" /> {emp.name}
                    </h4>
                    <p className="text-gray-600 flex items-center">
                      <FaEnvelope className="mr-2 text-gray-500" /> {emp.email}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <FaBuilding className="mr-2 text-gray-500" />{" "}
                      {emp.department}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to="/admin-dashboard/view-employee"
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-900 rounded text-white"
                    >
                      <FaEdit size={18} />
                    </Link>

                    <button
                      onClick={handleDelete}
                      className="px-2 py-1 bg-red-600 hover:bg-red-900 text-white rounded"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full">
                No employees found.
              </p>
            )}
          </div>
        ) : (
          // Desktop Table View
          <DataTable columns={columns} data={filteredEmployees} pagination />
        )}
      </div>
    </div>
  );
};

export default List;
