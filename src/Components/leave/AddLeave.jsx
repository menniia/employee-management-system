// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const AddLeave = () => {
//   const navigate = useNavigate();
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [leave, setLeave] = useState({
//     userId: "",
//     name: "",
//     employeeId: "",
//     email: "",
//     leaveType: "",
//     startDate: "",
//     endDate: "",
//     reason: "",
//     status: "Pending",
//     attachment: null, // New field for the document attachment
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     const employees = JSON.parse(localStorage.getItem("employees")) || [];

//     if (user) {
//       setLoggedInUser(user);

//       // Find the logged-in employee details
//       const employee = employees.find((emp) => emp.email === user.email);
//       if (employee) {
//         setLeave((prevLeave) => ({
//           ...prevLeave,
//           userId: user.id,
//           name: employee.name,
//           employeeId: employee.employeeId,
//           email: user.email,
//         }));
//       }
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLeave((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setLeave((prevState) => ({ ...prevState, attachment: file }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!loggedInUser) {
//       alert("No user is logged in.");
//       return;
//     }

//     const existingLeaves =
//       JSON.parse(localStorage.getItem("leaveRequests")) || [];

//     const newLeaveRequest = {
//       id: Date.now(),
//       image: loggedInUser.image,
//       ...leave,
//     };

//     // Save to localStorage
//     const updatedLeaves = [...existingLeaves, newLeaveRequest];
//     localStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves));

//     alert("Leave request submitted successfully!");
//     navigate("/employee-dashboard/leaves");

//     // Clear form but keep user details
//     setLeave({
//       userId: loggedInUser.id,
//       name: loggedInUser.name,
//       employeeId: loggedInUser.employeeId,
//       leaveType: "",
//       startDate: "",
//       endDate: "",
//       reason: "",
//       status: "Pending",
//       attachment: null,
//     });
//   };

//   return (
//     <div className="max-w-4xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold">Request for Leave</h2>
//         <Link
//           to="/employee-dashboard/leaves"
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//         >
//           Return
//         </Link>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Employee Name
//             </label>
//             <input
//               type="text"
//               value={leave.name}
//               readOnly
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Employee ID
//             </label>
//             <input
//               type="text"
//               value={leave.employeeId}
//               readOnly
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Leave Type
//             </label>
//             <select
//               name="leaveType"
//               value={leave.leaveType}
//               onChange={handleChange}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Select Leave Type</option>
//               <option value="Sick Leave">Sick Leave</option>
//               <option value="Vacation Leave">Vacation Leave</option>
//               <option value="Maternity Leave">Maternity Leave</option>
//               <option value="Paternity Leave">Paternity Leave</option>
//               <option value="Emergency Leave">Emergency Leave</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 From Date
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={leave.startDate}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 To Date
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={leave.endDate}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               name="reason"
//               value={leave.reason}
//               placeholder="Reason"
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded-md"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddLeave;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddLeave = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [leave, setLeave] = useState({
    userId: "",
    name: "",
    employeeId: "",
    email: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
    attachment: null, // New field for the document attachment
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (user) {
      setLoggedInUser(user);

      // Find the logged-in employee details
      const employee = employees.find((emp) => emp.email === user.email);
      if (employee) {
        setLeave((prevLeave) => ({
          ...prevLeave,
          userId: user.id,
          name: employee.name,
          employeeId: employee.employeeId,
          email: user.email,
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLeave((prevState) => ({ ...prevState, attachment: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      setSuccessMessage("No user is logged in.");
      return;
    }

    const existingLeaves =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];

    const newLeaveRequest = {
      id: Date.now(),
      image: loggedInUser.image,
      ...leave,
    };

    // Save to localStorage
    const updatedLeaves = [...existingLeaves, newLeaveRequest];
    localStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves));

    setSuccessMessage("Leave request submitted successfully!");
    setTimeout(() => {
      navigate("/employee-dashboard/leaves");
    }, 2000);

    // Clear form but keep user details
    setLeave({
      userId: loggedInUser.id,
      name: loggedInUser.name,
      employeeId: loggedInUser.employeeId,
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      status: "Pending",
      attachment: null,
    });
  };

  return (
    <div className="max-w-4xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md relative">
      {/* Success Message */}
      {successMessage && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Request for Leave</h2>
        <Link
          to="/employee-dashboard/leaves"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Return
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Name
            </label>
            <input
              type="text"
              value={leave.name}
              readOnly
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              value={leave.employeeId}
              readOnly
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation Leave">Vacation Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="reason"
              value={leave.reason}
              placeholder="Reason"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
