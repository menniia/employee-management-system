import React, { useState, useEffect } from "react";

const Profile = () => {
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (loggedInUser) {
      const employee = employees.find(
        (emp) => emp.email === loggedInUser.email
      );
      if (employee) {
        setLoggedInEmployee(employee);
      }
    }
  }, []);

  if (!loggedInEmployee) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md text-center">
        <p className="text-lg font-semibold text-gray-700">
          No user is logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl sm:max-w-full mx-auto bg-gray-100 p-10 rounded-lg shadow-lg flex flex-col sm:flex-row gap-10">
      {/* Left Section: Image, Name */}
      <div className="w-full sm:w-1/3 text-gray-900 flex flex-col items-center">
        {/* Profile Image */}
        {loggedInEmployee.image ? (
          <img
            src={loggedInEmployee.image}
            alt={loggedInEmployee.name}
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-gray-300"
          />
        ) : (
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <h1 className="text-xl sm:text-2xl font-bold mt-4 text-center">
          {loggedInEmployee.name}
        </h1>
      </div>

      {/* Right Section: Display-Only Details */}
      <div className="w-full sm:w-2/3">
        <p className="text-lg font-semibold border-b-2 border-gray-300 pb-1">
          Personal Information
        </p>
        <br />
        <div className="text-sm sm:text-base">
          <p>
            <strong>Email:</strong> {loggedInEmployee.email}
          </p>
          <p>
            <strong>Employee ID:</strong> {loggedInEmployee.employeeId}
          </p>
          <p>
            <strong>DOB:</strong> {loggedInEmployee.dob}
          </p>
          <p>
            <strong>Gender:</strong> {loggedInEmployee.gender}
          </p>
          <p>
            <strong>Phone Number:</strong> {loggedInEmployee.phoneNumber}
          </p>
          <p>
            <strong>Role:</strong> {loggedInEmployee.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
