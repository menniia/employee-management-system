import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeHeader from "./components/EmployeeHeader";
import Dashboard from "./pages/Dashboard";
import RequestLeave from "./pages/RequestLeave";
import MyLeaves from "./pages/MyLeaves";

function App() {
    const mockUser = {
        name: "Menniia Donatus",
        email: "md@example.com",
        role: "employee",
    };

    return (
        <Router>
            <div className="min-h-screen bg-[#F9FAFB]">
                <EmployeeHeader user={mockUser} />
                <main className="pt-16">
                    <Routes>
                        <Route
                            path="/"
                            element={<Dashboard user={mockUser} />}
                        />
                        <Route
                            path="/request-leave"
                            element={<RequestLeave user={mockUser} />}
                        />
                        <Route path="/my-leaves" element={<MyLeaves />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
