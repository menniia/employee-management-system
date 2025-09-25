import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeHeader from "./components/EmployeeHeader";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RequestLeave from "./pages/RequestLeave";
import MyLeaves from "./pages/MyLeaves";
import HRDashboard from "./pages/HR/HRDashboard";
import AddEmployee from "./pages/HR/AddEmployee";
import Employees from "./pages/HR/Employees";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerLeaveRequests from "./pages/manager/ManagerLeaveRequests";

function App() {
    //    get user from localstorage
    const getUserFromStorage = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }

        return null;
    };

    return (
        <Router>
            <div className="min-h-screen bg-[#F9FAFB] font-jakarta">
                <Routes>
                    {/* login route */}
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                    {/* employee routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute requiredRole="employee">
                                <>
                                    <EmployeeHeader
                                        user={getUserFromStorage()}
                                    />
                                    <main className="pt-16">
                                        <EmployeeDashboard
                                            user={getUserFromStorage()}
                                        />
                                    </main>
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/request-leave"
                        element={
                            <ProtectedRoute requiredRole="employee">
                                <>
                                    <EmployeeHeader
                                        user={getUserFromStorage()}
                                    />
                                    <main className="pt-16">
                                        <RequestLeave
                                            user={getUserFromStorage()}
                                        />
                                    </main>
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-leaves"
                        element={
                            <ProtectedRoute requiredRole="employee">
                                <>
                                    <EmployeeHeader
                                        user={getUserFromStorage()}
                                    />
                                    <main className="pt-16">
                                        <MyLeaves user={getUserFromStorage()} />
                                    </main>
                                </>
                            </ProtectedRoute>
                        }
                    />

                    {/* hr routes */}
                    <Route
                        path="/hr"
                        element={
                            <ProtectedRoute requiredRole="hr">
                                <HRDashboard user={getUserFromStorage()} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hr/employees"
                        element={
                            <ProtectedRoute requiredRole="hr">
                                <Employees user={getUserFromStorage()} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hr/employees/add"
                        element={
                            <ProtectedRoute requiredRole="hr">
                                <AddEmployee user={getUserFromStorage()} />
                            </ProtectedRoute>
                        }
                    />

                    {/* manager routes */}
                    <Route
                        path="/manager"
                        element={
                            <ProtectedRoute requiredRole="manager">
                                <ManagerDashboard user={getUserFromStorage()} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/manager/leave-requests"
                        element={
                            <ProtectedRoute requiredRole="manager">
                                <ManagerLeaveRequests
                                    user={getUserFromStorage()}
                                />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
