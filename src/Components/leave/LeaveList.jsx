// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const LeaveList = () => {
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [employeeId, setEmployeeId] = useState("");
//   const [searchTerm, setSearchTerm] = useState(""); // NEW: Search term state

//   useEffect(() => {
//     const fetchLeaves = () => {
//       const user = JSON.parse(localStorage.getItem("loggedInUser"));
//       setLoggedInUser(user);

//       const employees = JSON.parse(localStorage.getItem("employees")) || [];
//       if (user) {
//         const employee = employees.find((emp) => emp.email === user.email);
//         if (employee) {
//           setEmployeeId(employee.employeeId);
//         }
//       }

//       const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];

//       if (user) {
//         const userLeaves = allLeaves.filter(
//           (leave) => leave.userId === user.id
//         );
//         setLeaveRequests(userLeaves);
//       }
//     };

//     fetchLeaves();

//     // Listen for storage changes
//     window.addEventListener("storage", fetchLeaves);

//     return () => {
//       window.removeEventListener("storage", fetchLeaves);
//     };
//   }, []);

//   // Filter leave requests based on the search term
//   const filteredLeaves = leaveRequests.filter((leave) =>
//     leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 font-jakarta">
//       <div className="text-center">
//         <h3 className="text-2xl font-bold">Manage Leaves</h3>
//       </div>

//       {/* Search Input and Add Button */}
//       <div className="flex justify-between items-center my-4">
//         <input
//           type="text"
//           placeholder="Search By Leave Type"
//           className="px-5 py-1.5   rounded  bg-gray-400"
//           value={searchTerm} // NEW: Controlled input
//           onChange={(e) => setSearchTerm(e.target.value)} // NEW: Update search term
//         />
//         <Link
//           to="/employee-dashboard/add-leaves"
//           className="px-4 py-1 bg-blue-600 hover:bg-blue-800 rounded text-white"
//         >
//           Add New Leave
//         </Link>
//       </div>

//       {/* Leave Requests Table */}
//       <table className="w-full text-sm text-left text-gray-500 mt-6">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
//           <tr>
//             <th className="px-6 py-3">Serial No.</th>
//             <th className="px-6 py-3">Employee Name</th>
//             <th className="px-6 py-3">Employee ID</th>
//             <th className="px-6 py-3">Leave Type</th>
//             <th className="px-6 py-3">From</th>
//             <th className="px-6 py-3">To</th>
//             <th className="px-6 py-3">Description</th>
//             <th className="px-6 py-3">Applied Date</th>
//             <th className="px-6 py-3">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredLeaves.length > 0 ? (
//             filteredLeaves.map((leave, index) => (
//               <tr
//                 key={leave.id}
//                 className="bg-white border-b dark:bg-gray-200 dark:border-gray-700"
//               >
//                 <td className="px-4 py-3">{index + 1}</td>
//                 <td className="px-4 py-3">{leave.name}</td>
//                 <td className="px-4 py-3">{leave.employeeId || employeeId}</td>
//                 <td className="px-4 py-3">{leave.leaveType}</td>
//                 <td className="px-4 py-3">{leave.startDate}</td>
//                 <td className="px-4 py-3">{leave.endDate}</td>
//                 <td className="px-4 py-3">{leave.reason}</td>
//                 <td className="px-4 py-3">
//                   {new Date(leave.id).toLocaleDateString()}
//                 </td>
//                 <td
//                   className={`px-4 py-3 font-semibold ${
//                     leave.status === "Approved"
//                       ? "text-green-600"
//                       : leave.status === "Rejected"
//                       ? "text-red-600"
//                       : "text-blue-600"
//                   }`}
//                 >
//                   {leave.status ? leave.status : "Pending"}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9" className="text-center py-4">
//                 No leave requests found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeaveList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LeaveList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchLeaves = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);

      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      if (user) {
        const employee = employees.find((emp) => emp.email === user.email);
        if (employee) {
          setEmployeeId(employee.employeeId);
        }
      }

      const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
      if (user) {
        const userLeaves = allLeaves.filter(
          (leave) => leave.userId === user.id
        );
        setLeaveRequests(userLeaves);
      }
    };

    fetchLeaves();

    // Listen for screen resize to toggle mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter leave requests based on the search term
  const filteredLeaves = leaveRequests.filter((leave) =>
    leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 font-jakarta">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      {/* Search & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-3">
        <input
          type="text"
          placeholder="Search By Leave Type"
          className="px-4 py-2 bg-gray-200 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          to="/employee-dashboard/add-leaves"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded w-full md:w-auto text-center"
        >
          Add New Leave
        </Link>
      </div>

      {/* Responsive View: Grid (Mobile) & Table (Desktop) */}
      <div className="mt-6">
        {isMobile ? (
          // Mobile Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave, index) => (
                <div
                  key={leave.id}
                  className="bg-white p-4 shadow-md rounded-lg space-y-4 border"
                >
                  {/* Leave Details */}
                  <div>
                    <p className="text-gray-700 font-bold">
                      Employee: {leave.name}
                    </p>
                    <p className="text-gray-600">
                      Employee ID: {leave.employeeId || employeeId}
                    </p>
                    <p className="text-gray-600">
                      Leave Type: {leave.leaveType}
                    </p>
                    <p className="text-gray-600">From: {leave.startDate}</p>
                    <p className="text-gray-600">To: {leave.endDate}</p>
                    <p className="text-gray-600">Description: {leave.reason}</p>
                    <p className="text-gray-600">
                      Applied Date: {new Date(leave.id).toLocaleDateString()}
                    </p>
                    <p
                      className={`font-semibold ${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Rejected"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      Status: {leave.status ? leave.status : "Pending"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full">
                No leave requests found.
              </p>
            )}
          </div>
        ) : (
          // Desktop Table View (Scrollable on small screens)
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 mt-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">Serial No.</th>
                  <th className="px-6 py-3">Employee Name</th>
                  <th className="px-6 py-3">Employee ID</th>
                  <th className="px-6 py-3">Leave Type</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Applied Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave, index) => (
                    <tr
                      key={leave.id}
                      className="bg-white border-b dark:bg-gray-200 dark:border-gray-700"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{leave.name}</td>
                      <td className="px-4 py-3">
                        {leave.employeeId || employeeId}
                      </td>
                      <td className="px-4 py-3">{leave.leaveType}</td>
                      <td className="px-4 py-3">{leave.startDate}</td>
                      <td className="px-4 py-3">{leave.endDate}</td>
                      <td className="px-4 py-3">{leave.reason}</td>
                      <td className="px-4 py-3">
                        {new Date(leave.id).toLocaleDateString()}
                      </td>
                      <td
                        className={`px-4 py-3 font-semibold ${
                          leave.status === "Approved"
                            ? "text-green-600"
                            : leave.status === "Rejected"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {leave.status ? leave.status : "Pending"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveList;
