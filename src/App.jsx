import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import AdminSummary from "./Components/dashboard/AdminSummary";
import DepartmentList from "./Components/department/DepartmentList";
import AddDepartment from "./Components/department/AddDepartment";
import List from "./Components/employee/List";
import Add from "./Components/employee/Add";
import View from "./Components/employee/View";
import ViewDepartment from "./Components/department/ViewDepartment";
import Summary from "./Components/EmployeeDashboard/Summary";
import Profile from "./Components/EmployeeDashboard/Profile";
import LeaveList from "./Components/leave/LeaveList";
import AddLeave from "./Components/leave/AddLeave";
import AdminLeave from "./Components/AdminLeaves/AdminLeave";
import Setting from "./Components/EmployeeDashboard/Setting";
import AdminSettings from "./Components/dashboard/AdminSettings";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }
  return children;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminSummary />}></Route>

          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/view-department"
            element={<ViewDepartment />}
          ></Route>

          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route
            path="/admin-dashboard/view-employee"
            element={<View />}
          ></Route>
          <Route path="/admin-dashboard/leave" element={<AdminLeave />}></Route>

          <Route
            path="/admin-dashboard/admin-settings"
            element={<AdminSettings />}
          ></Route>
        </Route>

        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route
            path="/employee-dashboard/profile"
            element={<Profile />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/employee-dashboard/add-leaves"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/setting"
            element={<Setting />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
