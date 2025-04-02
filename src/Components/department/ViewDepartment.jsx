// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";

// // const ViewDepartment = () => {
// //   const [departments, setDepartments] = useState([]);
// //   const [selectedDepartment, setSelectedDepartment] = useState(null);
// //   const [formData, setFormData] = useState({});
// //   const [editMode, setEditMode] = useState(false);

// //   useEffect(() => {
// //     // Fetch departments from local storage
// //     const storedDepartments =
// //       JSON.parse(localStorage.getItem("departments")) || [];
// //     setDepartments(storedDepartments);
// //   }, []);

// //   const handleView = (department) => {
// //     setSelectedDepartment(department);
// //     setFormData(department); // Populate form data for editing
// //     setEditMode(false);
// //   };

// //   const handleEdit = () => {
// //     setEditMode(true); // Enable edit mode and hide other departments
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSave = () => {
// //     // Update the department in local storage
// //     const updatedDepartments = departments.map((dep) =>
// //       dep.id === selectedDepartment.id ? formData : dep
// //     );
// //     localStorage.setItem("departments", JSON.stringify(updatedDepartments));
// //     setDepartments(updatedDepartments);
// //     setSelectedDepartment(formData); // Update the selected department details
// //     setEditMode(false); // Disable edit mode
// //     alert("Department details updated successfully!");
// //   };

// //   const handleCancelEdit = () => {
// //     setEditMode(false);
// //     setFormData(selectedDepartment); // Reset form data if edit is canceled
// //   };

// //   return (
// //     <div className="max-w-4xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
// //       {/* Header with Department Details and Return Button */}
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-2xl font-bold">Department Details</h2>
// //         <Link
// //           to="/admin-dashboard/departments"
// //           className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
// //         >
// //           Return
// //         </Link>
// //       </div>

// //       {/* Show List Only If No Department is Selected */}
// //       {!selectedDepartment && (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {departments.map((department) => (
// //             <div
// //               key={department.id}
// //               className="border p-4 rounded-md shadow-md bg-gray-100 flex justify-between items-center"
// //             >
// //               <div>
// //                 <h3 className="font-bold text-lg">{department.dep_name}</h3>
// //                 <p className="text-sm">Description: {department.description}</p>
// //                 <button
// //                   onClick={() => handleView(department)}
// //                   className="mt-3 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
// //                 >
// //                   View
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Selected Department Details */}
// //       {selectedDepartment && (
// //         <div className="mt-10 border p-6 rounded-md bg-gray-50 shadow-md">
// //           <h3 className="text-xl font-bold">
// //             {editMode ? "Edit Department Details" : "Detailed Information"}
// //           </h3>

// //           {editMode ? (
// //             <form>
// //               <p>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Department Name:
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="dep_name"
// //                   value={formData.dep_name}
// //                   onChange={handleChange}
// //                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
// //                 />
// //               </p>
// //               <p className="mt-4">
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Description:
// //                 </label>
// //                 <textarea
// //                   name="description"
// //                   value={formData.description}
// //                   onChange={handleChange}
// //                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
// //                   rows="4"
// //                 />
// //               </p>
// //               <button
// //                 type="button"
// //                 onClick={handleSave}
// //                 className="mt-4 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
// //               >
// //                 Save Changes
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={handleCancelEdit}
// //                 className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
// //               >
// //                 Cancel
// //               </button>
// //             </form>
// //           ) : (
// //             <>
// //               <p>
// //                 <strong>Name:</strong> {selectedDepartment.dep_name}
// //               </p>
// //               <p>
// //                 <strong>Description:</strong> {selectedDepartment.description}
// //               </p>
// //               <button
// //                 onClick={handleEdit}
// //                 className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
// //               >
// //                 Edit
// //               </button>
// //               <button
// //                 onClick={() => setSelectedDepartment(null)}
// //                 className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
// //               >
// //                 Close
// //               </button>
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ViewDepartment;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "https://leave-management-system-qh49.onrender.com/api/department"
        );
        if (response.status === 200) {
          setDepartments(response.data);
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

  const handleView = (department) => {
    setSelectedDepartment(department);
    setFormData(department); // Populate form for editing
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://leave-management-system-qh49.onrender.com/api/department/${selectedDepartment.id}`,
        formData
      );

      if (response.status === 200) {
        const updatedDepartments = departments.map((dep) =>
          dep.id === selectedDepartment.id ? formData : dep
        );

        setDepartments(updatedDepartments);
        setSelectedDepartment(formData);
        setEditMode(false);
        alert("Department updated successfully!");
      }
    } catch (err) {
      console.error("Error updating department:", err);
      alert("Failed to update department.");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData(selectedDepartment);
  };

  return (
    <div className="max-w-4xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Department Details</h2>
        <Link
          to="/admin-dashboard/departments"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Return
        </Link>
      </div>

      {/* Loading and Error Handling */}
      {loading ? (
        <p className="text-center text-gray-500">Loading departments...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Department List */}
          {!selectedDepartment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.length > 0 ? (
                departments.map((department) => (
                  <div
                    key={department.id}
                    className="border p-4 rounded-md shadow-md bg-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold text-lg">
                        {department.departmentName}
                      </h3>
                      <p className="text-sm">
                        Description: {department.Description}
                      </p>
                      <button
                        onClick={() => handleView(department)}
                        className="mt-3 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No departments found.
                </p>
              )}
            </div>
          )}

          {/* Selected Department Details */}
          {selectedDepartment && (
            <div className="mt-10 border p-6 rounded-md bg-gray-50 shadow-md">
              <h3 className="text-xl font-bold">
                {editMode ? "Edit Department Details" : "Detailed Information"}
              </h3>

              {editMode ? (
                <form>
                  <p>
                    <label className="block text-sm font-medium text-gray-700">
                      Department Name:
                    </label>
                    <input
                      type="text"
                      name="departmentName"
                      value={formData.departmentName}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                  </p>
                  <p className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description:
                    </label>
                    <textarea
                      type="text"
                      name="Description"
                      value={formData.Description}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      rows="4"
                    />
                  </p>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="mt-4 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p>
                    <strong>Name:</strong> {selectedDepartment.departmentName}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedDepartment.Description}
                  </p>
                  <button
                    onClick={handleEdit}
                    className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedDepartment(null)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewDepartment;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const ViewDepartment = () => {
//   const { id } = useParams(); // Get department ID from URL
//   const [department, setDepartment] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // navigate("/admin-dashboard/departments", {
//   //   state: {  },
//   // });

//   useEffect(() => {
//     const fetchDepartment = async () => {
//       // try {
//       //   const response = await axios.get(
//       //     `https://leave-management-system-qh49.onrender.com/api/department/${id}`
//       //   );
//       //   if (response.status === 200) {
//       //     setDepartment(response.data);
//       //     setFormData(response.data); // Populate form for editing
//       //   }
//       // } catch (err) {
//       //   console.error("Error fetching department:", err);
//       //   setError("Failed to load department details.");
//       // } finally {
//       //   setLoading(false);
//       // }

//       try {
//         const response = await fetch(
//           `https://leave-management-system-qh49.onrender.com/api/department/${id}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch department.");
//         }
//         const data = await response.json();
//         console.log(data);
//         setDepartment(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartment();
//   }, [id]);

//   const handleEdit = () => setEditMode(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(
//         `https://leave-management-system-qh49.onrender.com/api/department/${id}`,
//         formData
//       );

//       if (response.status === 200) {
//         setDepartment(formData);
//         setEditMode(false);
//         alert("Department updated successfully!");
//       }
//     } catch (err) {
//       console.error("Error updating department:", err);
//       alert("Failed to update department.");
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//     setFormData(department);
//   };

//   return (
//     <div className="max-w-4xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Department Details</h2>
//         <Link
//           to="/admin-dashboard/departments"
//           className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
//         >
//           Return
//         </Link>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading department...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div className="mt-10 border p-6 rounded-md bg-gray-50 shadow-md">
//           <h3 className="text-xl font-bold">
//             {editMode ? "Edit Department Details" : "Department Information"}
//           </h3>

//           {editMode ? (
//             <form>
//               <p>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Department Name:
//                 </label>
//                 <input
//                   type="text"
//                   name="departmentName"
//                   value={formData.departmentName}
//                   onChange={handleChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 />
//               </p>
//               <p className="mt-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Description:
//                 </label>
//                 <textarea
//                   name="Description"
//                   value={formData.Description}
//                   onChange={handleChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                   rows="4"
//                 />
//               </p>
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 className="mt-4 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
//               >
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancelEdit}
//                 className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
//               >
//                 Cancel
//               </button>
//             </form>
//           ) : (
//             <>
//               {/* <p>
//                 <strong>Name:</strong> {department.departmentName}
//               </p>
//               <p>
//                 <strong>Description:</strong> {department.Description}
//               </p> */}
//               <form>
//                 <div>
//                   <label htmlFor="departmentName">Name:</label>
//                   <input type="text" value={department.departmentName} />
//                 </div>
//               </form>
//               <button
//                 onClick={handleEdit}
//                 className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
//               >
//                 Edit
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewDepartment;
