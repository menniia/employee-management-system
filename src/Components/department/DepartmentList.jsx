// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../Utils/DepartmentHelper";

// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);

//   useEffect(() => {
//     const fetchDepartments = () => {
//       const storedDepartments =
//         JSON.parse(localStorage.getItem("departments")) || [];

//       // Format departments correctly
//       const formattedDepartments = storedDepartments.map((dep, index) => ({
//         ...dep,
//         sno: index + 1,
//         action: <DepartmentButtons Id={dep.id} />,
//       }));

//       setDepartments(formattedDepartments);
//       setFilteredDepartments(formattedDepartments);
//     };

//     fetchDepartments();
//   }, []);

//   const filterDepartments = (e) => {
//     const records = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredDepartments(records);
//   };

//   return (
//     <div className="p-5 font-jakarta">
//       {/* Header */}
//       <div className="text-center">
//         <h3 className="text-[2rem] font-bold">Manage Departments</h3>
//       </div>

//       {/* Search & Add Button */}
//       <div className="flex justify-between items-center mt-4">
//         <input
//           type="text"
//           placeholder="Search By Dep. Name"
//           className="px-4 py-2 bg-gray-300  rounded w-full md:w-1/3"
//           onChange={filterDepartments}
//         />
//         <Link
//           to="/admin-dashboard/add-department"
//           className="px-4 py-1 bg-blue-600 hover:bg-blue-800 rounded text-white ml-2 flex sm:flex-row flex-col items-center leading-tight text-center"
//         >
//           <span className="text-lg">Add</span>
//           <span className="text-lg sm:ml-1">Department</span>
//         </Link>

//         {/* <Link
//           to="/admin-dashboard/add-department"
//           className="px-4 py-0.1 bg-blue-600 hover:bg-blue-800 rounded text-white ml-2 flex flex-col items-center leading-tight text-center"
//         >
//           <span className="text-lg ">Add</span>
//           <span className="text-lg ">Department</span>
//         </Link> */}
//       </div>

//       {/* Table View (For Large Screens) */}
//       <div className="hidden md:block mt-5">
//         <DataTable columns={columns} data={filteredDepartments} pagination />
//       </div>

//       {/* Grid View (For Mobile Screens) */}
//       <div className="md:hidden mt-5 grid gap-4">
//         {filteredDepartments.length > 0 ? (
//           filteredDepartments.map((dep) => (
//             <div
//               key={dep.id}
//               className="bg-white p-4 rounded shadow-md flex flex-col space-y-2"
//             >
//               <h4 className="text-lg font-bold">{dep.dep_name}</h4>
//               <p className="text-gray-600">ID: {dep.id}</p>
//               <div className="flex justify-end">{dep.action}</div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No departments found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DepartmentList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../Utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "https://leave-management-system-qh49.onrender.com/api/department"
        );

        if (response.status === 200) {
          // Format departments correctly
          const formattedDepartments = response.data.map((dep, index) => ({
            ...dep,
            sno: index + 1,
            action: <DepartmentButtons Id={dep.id} />,
          }));

          setDepartments(formattedDepartments);
          setFilteredDepartments(formattedDepartments);
        }
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const records = departments.filter((dep) =>
      dep.departmentName.toLowerCase().includes(searchQuery)
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="p-5 font-jakarta">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-[2rem] font-bold">Manage Departments</h3>
      </div>

      {/* Search & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search By Dep. Name"
          className="px-4 py-2 bg-gray-300 rounded w-full md:w-1/3"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-blue-600 hover:bg-blue-800 rounded text-white ml-2 flex sm:flex-row flex-col items-center leading-tight text-center"
        >
          <span className="text-lg">Add</span>
          <span className="text-lg sm:ml-1">Department</span>
        </Link>
      </div>

      {/* Display Loading, Error, or Data */}
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading departments...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-4">{error}</p>
      ) : (
        <>
          {/* Table View (For Large Screens) */}
          <div className="hidden md:block mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
            />
          </div>

          {/* Grid View (For Mobile Screens) */}
          <div className="md:hidden mt-5 grid gap-4">
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dep) => (
                <div
                  key={dep.id}
                  className="bg-white p-4 rounded shadow-md flex flex-col space-y-2"
                >
                  <h4 className="text-lg font-bold">{dep.departmentName}</h4>
                  <p className="text-gray-600">ID: {dep.id}</p>
                  <div className="flex justify-end">{dep.action}</div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No departments found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentList;
