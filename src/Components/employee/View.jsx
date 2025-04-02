import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const View = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch employees from local storage
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee); // Populate form data for editing
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Update the employee in local storage
    const updatedEmployees = employees.map((emp) =>
      emp.id === selectedEmployee.id ? formData : emp
    );
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setSelectedEmployee(formData); // Update the selected employee details
    setEditMode(false); // Disable edit mode
    alert("Employee details updated successfully!");
  };

  return (
    <div className="max-w-4xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee Details</h2>

        {/* Return Button */}
        <Link
          to="/admin-dashboard/employees"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Return
        </Link>
      </div>

      {/* Show employees list only if no employee is selected */}
      {!selectedEmployee && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="border p-4 rounded-md shadow-md bg-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{employee.name}</h3>
                <p className="text-sm">Email: {employee.email}</p>
                <p className="text-sm">ID: {employee.employeeId}</p>
                <button
                  onClick={() => handleView(employee)}
                  className="mt-3 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                >
                  View
                </button>
              </div>
              {employee.image && (
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-20 h-20 object-cover rounded ml-4"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Show selected employee details */}
      {selectedEmployee && (
        <div className="mt-10 border p-6 rounded-md bg-gray-50 shadow-md flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold">
              {editMode ? "Edit Employee Details" : "Detailed Information"}
            </h3>
            {editMode ? (
              <form>
                <p>
                  <label className="block text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </p>
                <p>
                  <label className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </p>
                <p>
                  <label className="block text-sm font-medium text-gray-700">
                    Employee ID:
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </p>
                <p>
                  <label className="block text-sm font-medium text-gray-700">
                    DOB:
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </p>
                <p>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender:
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </p>
                <p>
                  <label className="block text-sm font-medium text-gray-700">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </p>
                <p>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number:
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                </p>
                <p>
                  <label className="block text-sm font-medium text-gray-700">
                    Role:
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                  </select>
                </p>
                <button
                  type="button"
                  onClick={handleSave}
                  className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <p>Name: {selectedEmployee.name}</p>
                <p>Email: {selectedEmployee.email}</p>
                <p>Employee ID: {selectedEmployee.employeeId}</p>
                <p>DOB: {selectedEmployee.dob}</p>
                <p>Gender: {selectedEmployee.gender}</p>
                <p>Password: {selectedEmployee.password}</p>
                <p>Phone Number: {selectedEmployee.phoneNumber}</p>
                <p>Role: {selectedEmployee.role}</p>

                <button
                  onClick={handleEdit}
                  className="mt-4 bg-blue-600 hover:bg-blue-900 text-white font-bold py-2.5 px-5.5 rounded mr-4"
                >
                  Edit
                </button>

                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </>
            )}
          </div>
          {selectedEmployee.image && (
            <img
              src={selectedEmployee.image}
              alt={selectedEmployee.name}
              className="w-40 h-40 object-cover rounded ml-10"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default View;
