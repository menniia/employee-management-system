// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddDepartment = () => {
//   const navigate = useNavigate();
//   const [department, setDepartment] = useState({
//     dep_name: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDepartment({ ...department, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Get existing departments or initialize an empty array
//     const departments = JSON.parse(localStorage.getItem("departments")) || [];

//     // Create a new department object
//     const newDepartment = {
//       id: departments.length + 1, // Convert to string
//       dep_name: department.dep_name,
//       description: department.description,
//     };

//     // Add the new department to the array
//     departments.push(newDepartment);

//     // Save updated list back to localStorage
//     localStorage.setItem("departments", JSON.stringify(departments));

//     // Reset input fields
//     setDepartment({ dep_name: "", description: "" });

//     // Show success alert
//     alert("Department added successfully!");
//     navigate("/admin-dashboard/departments");
//   };

//   return (
//     <div className="max-w-3xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
//       <h2 className="text-2xl   font-bold mb-6 ">Add Department</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label
//             htmlFor="dep_name"
//             className="text-sm font-medium text-gray-700"
//           >
//             Department Name
//           </label>
//           <input
//             type="text"
//             name="dep_name"
//             onChange={handleChange}
//             placeholder="Department Name"
//             className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div className="mt-3">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             placeholder="Descrition"
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             rows="4"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
//         >
//           {loading ? "Adding..." : "Add Department"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddDepartment;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    departmentName: "",
    Description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://leave-management-system-qh49.onrender.com/api/department",
        department
      );

      if (response.status === 201) {
        alert("Department added successfully!");
        setDepartment({ departmentName: "", Description: "" });
        navigate("/admin-dashboard/departments"); // Redirect after success
      }
    } catch (err) {
      console.error(
        "Error details:",
        err.response ? err.response.data : err.message
      );

      setError("Failed to add department. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Add Department</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="departmentName"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            name="departmentName"
            value={department.dep_name}
            onChange={handleChange}
            placeholder="Department Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="Description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="Description"
            value={department.description}
            onChange={handleChange}
            placeholder="Description"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Department"}
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
