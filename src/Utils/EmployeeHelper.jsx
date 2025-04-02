// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const storedImage = localStorage.getItem("uploadedImage");

// const customStyles = {
//   rows: {
//     style: {
//       marginBottom: "10px", // Adds space between rows
//     },
//   },
// };

// const customStyles = {
//   rows: {
//     style: {
//       marginBottom: "10px", // Adds space between rows
//     },
//   },
// };

export const columns = [
  {
    name: "S No",
    selector: (row, index) => index + 1,
    width: "60px",
  },

  {
    name: "image",
    selector: (row) => row.image,
    cell: (row) => (
      <img
        src={row.image || storedImage} // Fallback to stored image
        alt="Employee"
        className="w-10 h-10 rounded-full object-cover"
      />
    ),
    sortable: false,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Department",
    selector: (row) => row.department || "N/A",
    center: "trueS",
    width: "150px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob || "N/A",
    center: "true",
    width: "150px",
  },
  {
    name: "Action",
    width: "300px",
    cell: (row) => <EmployeeButtons Id={row.id} />,
    center: "true",
  },
];

export const EmployeeButtons = ({ Id }) => {
  // const navigate = useNavigate();

  // const handleEdit = () => {
  //   navigate(`/admin-dashboard/edit-employee/${Id}`);
  // };
  // const handleView = () => {
  //   navigate(`/admin-dashboard/view-employee/${Id}`);
  // };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      let employees = JSON.parse(localStorage.getItem("employees")) || [];
      const updatedEmployees = employees.filter((emp) => emp.id !== Id);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      window.location.reload();
    }
  };

  return (
    <div className="flex space-x-2 font-jakarta">
      {/* <button
      // onClick={handleView}
      > */}
      <Link
        to="/admin-dashboard/view-employee"
        className="px-2 py-1 bg-blue-500 hover:bg-blue-900 rounded text-white"
      >
        View & Edit
      </Link>
      {/* </button> */}

      <button
        onClick={handleDelete}
        className="px-2 py-1 bg-red-600 hover:bg-red-900 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};
