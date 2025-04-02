import React, { useState, useEffect } from "react";

const ghanaHolidays = [
  "2025-01-01",
  "2025-03-06",
  "2025-04-18",
  "2025-04-21",
  "2025-05-01",
  "2025-05-25",
  "2025-07-01",
  "2025-07-11",
  "2025-08-04",
  "2025-09-21",
  "2025-12-25",
  "2025-12-26",
];

const countLeaveDays = (start, end) => {
  let currentDate = new Date(start);
  let endDate = new Date(end);
  let leaveDays = 0;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const formattedDate = currentDate.toISOString().split("T")[0];

    if (
      dayOfWeek !== 0 &&
      dayOfWeek !== 6 &&
      !ghanaHolidays.includes(formattedDate)
    ) {
      leaveDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return leaveDays;
};

const AdminLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedLeaves =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(storedLeaves);
  }, []);

  const handleDelete = (id) => {
    const updatedLeaves = leaveRequests.filter((leave) => leave.id !== id);
    setLeaveRequests(updatedLeaves);
    localStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setDropdownOpen(false);
  };

  const filteredLeaves =
    filterStatus === "All"
      ? leaveRequests
      : leaveRequests.filter((leave) =>
          filterStatus === "Pending"
            ? !leave.status || leave.status === "Pending"
            : leave.status === filterStatus
        );

  return (
    <div className="p-6">
      {/* Header and Filter Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin - Leave Requests</h2>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="py-2 px-4 bg-gray-800 text-white rounded focus:outline-none"
          >
            Filter: {filterStatus} ▼
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-400 ${
                  filterStatus === "All" ? "bg-gray-100" : ""
                }`}
                onClick={() => handleFilterChange("All")}
              >
                Show All
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-400 ${
                  filterStatus === "Pending" ? "bg-blue-400" : ""
                }`}
                onClick={() => handleFilterChange("Pending")}
              >
                Pending
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-400 ${
                  filterStatus === "Approved" ? "bg-green-400" : ""
                }`}
                onClick={() => handleFilterChange("Approved")}
              >
                Approved
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-400 ${
                  filterStatus === "Rejected" ? "bg-red-400" : ""
                }`}
                onClick={() => handleFilterChange("Rejected")}
              >
                Rejected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table View */}
      <div className="hidden sm:block">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">Employee ID</th>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Days</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <tr key={leave.id} className="bg-white border-b">
                  <td className="px-6 py-3">{leave.employeeId}</td>
                  <td className="px-6 py-3">{leave.name}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">{leave.startDate}</td>
                  <td className="px-6 py-3">{leave.endDate}</td>
                  <td className="px-6 py-3">
                    {countLeaveDays(leave.startDate, leave.endDate)}
                  </td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      leave.status === "Approved"
                        ? "text-green-600"
                        : leave.status === "Rejected"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {leave.status ? leave.status : "Pending"}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      onClick={() => setSelectedLeave(leave)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 ml-2 text-white py-1 px-1 rounded"
                      onClick={() => handleDelete(leave.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing Leave Details */}

      {selectedLeave && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl border border-gray-300 w-full max-w-md">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Leave Details
            </h3>
            <div className="mb-2 text-gray-900">
              <strong>Employee ID:</strong> {selectedLeave.employeeId}
            </div>
            <div className="mb-2 text-gray-900">
              <strong>Employee Name:</strong> {selectedLeave.name}
            </div>
            <div className="mb-2 text-gray-900">
              <strong>Email:</strong> {selectedLeave.email}
            </div>
            <div className="mb-2 text-gray-900">
              <strong>Leave Type:</strong> {selectedLeave.leaveType}
            </div>
            <div className="mb-2 text-gray-900">
              <strong>From:</strong> {selectedLeave.startDate}
            </div>
            <div className="mb-2 text-gray-900">
              <strong>To:</strong> {selectedLeave.endDate}
            </div>
            <div className="mb-2 text-gray-900">
              <strong>Total Days:</strong>{" "}
              {countLeaveDays(selectedLeave.startDate, selectedLeave.endDate)}
            </div>
            <div className="mb-2 text-gray-900">
              <strong>Reason:</strong> {selectedLeave.reason}
            </div>
            <div className="mb-4">
              <strong>Status: </strong>
              <span
                className={`font-semibold ${
                  selectedLeave.status === "Approved"
                    ? "text-green-700"
                    : selectedLeave.status === "Rejected"
                    ? "text-red-700"
                    : "text-blue-700"
                }`}
              >
                {selectedLeave.status || "Pending"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              {selectedLeave.status === "Approved" ||
              selectedLeave.status === "Rejected" ? (
                <>
                  <button
                    className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() => setSelectedLeave(null)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded w-full ml-10 sm:w-auto"
                    onClick={() => {
                      const mailtoLink = `mailto:${selectedLeave.email}?subject=Leave Request ${selectedLeave.status}&body=Dear ${selectedLeave.name}, Your leave request for ${selectedLeave.leaveType} from ${selectedLeave.startDate} to ${selectedLeave.endDate} has been ${selectedLeave.status}.`;
                      window.location.href = mailtoLink;
                    }}
                  >
                    Send Email
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-green-700 text-white py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() => handleStatusUpdate("Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-700 text-white py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() => handleStatusUpdate("Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() => setSelectedLeave(null)}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile View */}
      <div className="block sm:hidden">
        {filteredLeaves.length > 0 ? (
          filteredLeaves.map((leave) => (
            <div
              key={leave.id}
              className="bg-white p-2 rounded-md shadow-md mb-4"
            >
              <p className="text-sm">
                <strong>Employee:</strong> {leave.name} ({leave.employeeId})
              </p>
              <p className="text-sm">
                <strong>Leave Type:</strong> {leave.leaveType}
              </p>
              <p className="text-sm">
                <strong>From:</strong> {leave.startDate}
              </p>
              <p className="text-sm">
                <strong>To:</strong> {leave.endDate}
              </p>
              <p className="text-sm">
                <strong>Days:</strong>{" "}
                {countLeaveDays(leave.startDate, leave.endDate)}
              </p>
              <p className="text-sm font-semibold">
                <strong>Status:</strong>
                <span
                  className={`${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Rejected"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {" "}
                  {leave.status ? leave.status : "Pending"}
                </span>
              </p>
              <div className="mt-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded w-full"
                  onClick={() => setSelectedLeave(leave)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No leave requests found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminLeave;
