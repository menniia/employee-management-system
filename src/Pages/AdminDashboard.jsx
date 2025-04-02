import React, { useState, useEffect } from "react";
import { getUsers, saveUsers } from "../Data/mockData";
// import AdminSidebar from "../Components/dashboard/AdminSidebar";
import Navbar from "../Components/dashboard/Navbar";
// import AdminSummary from "../Components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve logged-in user from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateEmployee = (e) => {
    e.preventDefault();

    const users = getUsers();
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role: "employee",
    };

    users.push(newUser);
    saveUsers(users);

    alert("Employee created successfully!");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex font-jakarta">
      {/* <AdminSidebar /> */}
      <div className="flex-1  bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
