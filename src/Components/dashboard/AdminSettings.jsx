import React, { useState, useEffect } from "react";

const Setting = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      setMessage("No user is logged in.");
      return;
    }

    if (currentPassword !== loggedInUser.password) {
      setMessage("Current password is incorrect.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.id === loggedInUser.id ? { ...user, password: newPassword } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update logged-in user
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ ...loggedInUser, password: newPassword })
    );

    setMessage("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="max-w-md font-jakarta mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
