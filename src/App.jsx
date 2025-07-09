import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeHeader from "./components/EmployeeHeader";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RequestLeave from "./pages/RequestLeave";
import MyLeaves from "./pages/MyLeaves";
import HRDashboard from "./pages/HR/HRDashboard";
import AddEmployee from "./pages/HR/AddEmployee";

function App() {
    const mockUser = {
        name: "Menniia Donatus",
        email: "md@example.com",
        role: "employee",
    };

    const mockHRUser = {
        name: "HR Admin",
        email: "hr@company.com",
        role: "hr",
    };

    return (
        <Router>
            <div className="min-h-screen bg-[#F9FAFB]">
                <Routes>
                    {/* employee routes */}
                    <Route
                        path="/"
                        element={
                            <>
                                <EmployeeHeader user={mockUser} />
                                <main className="pt-16">
                                    <EmployeeDashboard user={mockUser} />
                                </main>
                            </>
                        }
                    />
                    <Route
                        path="/request-leave"
                        element={
                            <>
                                <EmployeeHeader user={mockUser} />
                                <main className="pt-16">
                                    <RequestLeave user={mockUser} />
                                </main>
                            </>
                        }
                    />
                    <Route
                        path="/my-leaves"
                        element={
                            <>
                                <EmployeeHeader user={mockUser} />
                                <main className="pt-16">
                                    <MyLeaves user={mockUser} />
                                </main>
                            </>
                        }
                    />

                    {/* hr routes */}
                    <Route
                        path="/hr"
                        element={<HRDashboard user={mockHRUser} />}
                    />
                    <Route
                        path="/hr/employees/add"
                        element={<AddEmployee user={mockHRUser} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
