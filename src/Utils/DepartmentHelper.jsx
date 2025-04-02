// import { Link } from "react-router-dom";

// // import { Link } from "react-router-dom";
// // import(useNavigate);

// export const columns = [
//   {
//     name: "S No",
//     selector: (row) => row.sno,
//   },
//   {
//     name: "Department Name",
//     selector: (row) => row.departmentName,
//     sortable: true,
//   },
//   {
//     name: "Action",
//     selector: (row) => row.action,
//   },
// ];

// export const DepartmentButtons = ({ Id, onDelete }) => {
//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this department?")) {
//       let departments = JSON.parse(localStorage.getItem("departments")) || [];

//       // Filter out the department that matches the selected Id
//       const updatedDepartments = departments.filter((dep) => dep.id !== Id);

//       // Save back to localStorage
//       localStorage.setItem("departments", JSON.stringify(updatedDepartments));

//       // Notify DepartmentList to update UI
//       onDelete(Id);
//     }
//   };

//   return (
//     <div className="flex space-x-3 font-jakarta">
//       <Link
//         to="/admin-dashboard/view-department"
//         className="px-2 py-1 bg-blue-500 hover:bg-blue-900 rounded text-white"
//       >
//         View & Edit
//       </Link>
//       {/* <Link to={`/admin-dashboard/view-department/${Id}`}>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">
//           View
//         </button>
//       </Link> */}

//       <button
//         onClick={handleDelete}
//         className="px-3 py-1 bg-red-600 hover:bg-red-900 text-white rounded"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

import { Link } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.departmentName,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ Id, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await axios.delete(
          `https://leave-management-system-qh49.onrender.com/api/department/${Id}`
        );

        if (response.status === 200) {
          onDelete(Id); // Notify DepartmentList to update UI
          alert("Department deleted successfully.");
        } else {
          alert("Failed to delete department.");
        }
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("An error occurred while deleting the department.");
      }
    }
  };

  return (
    <div className="flex space-x-3 font-jakarta">
      <Link
        to={`/admin-dashboard/view-department/`}
        className="px-2 py-1 bg-blue-500 hover:bg-blue-900 rounded text-white"
      >
        View & Edit
      </Link>

      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-600 hover:bg-red-900 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};
