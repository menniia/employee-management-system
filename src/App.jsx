import { BrowserRouter as Router } from "react-router-dom";

function App() {
    const mockUser = {
        name: "Menniia Donatus",
        email: "md@example.com",
        role: "employee",
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <main className="pt-16"></main>
            </div>
        </Router>
    );
}
