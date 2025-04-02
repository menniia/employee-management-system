import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Summary = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve logged-in user from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="p-6 font-jakarta">
      <div className=" rounded flex bg-white  shadow-md">
        <div
          className={`text-3xl flex justify-center items-center bg-blue-600 text-white px-4 `}
        >
          <FaUser />
        </div>

        <div className="pl-10 py-5">
          <p className="text-lg font-jakarta font-semibold">Welcome Back</p>
          <p className="text-xl font-jakarta font-bold">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;

// // import React from "react";

// // const View = () => {
// //   return <div>View Details</div>;
// // };

// // export default View;

// import React, { useState, useEffect } from "react";

// const View = () => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   useEffect(() => {
//     // Fetch employees from local storage
//     const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
//     setEmployees(storedEmployees);
//   }, []);

//   const handleView = (employee) => {
//     setSelectedEmployee(employee);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Employee Details</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {employees.map((employee) => (
//           <div
//             key={employee.id}
//             className="border p-4 rounded-md shadow-md bg-gray-100 flex justify-between items-center"
//           >
//             <div>
//               <h3 className="font-bold text-lg">{employee.name}</h3>
//               <p className="text-sm">Email: {employee.email}</p>
//               <p className="text-sm">ID: {employee.employeeId}</p>
//               <button
//                 onClick={() => handleView(employee)}
//                 className="mt-3 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 View
//               </button>
//             </div>
//             {employee.image && (
//               <img
//                 src={employee.image}
//                 alt={employee.name}
//                 className="w-20 h-20 object-cover rounded ml-4"
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {selectedEmployee && (
//         <div className="mt-10 border p-6 rounded-md bg-gray-50 shadow-md flex justify-between items-start">
//           <div className="flex-1">
//             <h3 className="text-xl font-bold">Detailed Information</h3>
//             <p>Name: {selectedEmployee.name}</p>
//             <p>Email: {selectedEmployee.email}</p>
//             <p>Employee ID: {selectedEmployee.employeeId}</p>
//             <p>DOB: {selectedEmployee.dob}</p>
//             <p>Gender: {selectedEmployee.gender}</p>
//             <p>Marital Status: {selectedEmployee.maritalStatus}</p>
//             <p>Designation: {selectedEmployee.designation}</p>
//             <p>Department: {selectedEmployee.department}</p>
//             <p>Phone Number: {selectedEmployee.phoneNumber}</p>
//             <p>Role: {selectedEmployee.role}</p>
//             <button
//               onClick={() => setSelectedEmployee(null)}
//               className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//           {selectedEmployee.image && (
//             <img
//               src={selectedEmployee.image}
//               alt={selectedEmployee.name}
//               className="w-100 h-100 object-cover rounded ml-10"
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default View;
