import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const userStr = localStorage.getItem("user");

    if (!userStr) {
        return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(userStr);

    if (requiredRole && user.role !== requiredRole) {
        // redirect the user to the appropriate dashboard based on the user role
        if (user.role === "hr") {
            return <Navigate to="/hr" replace />;
        } else if (user.role === "manager") {
            return <Navigate to="/manager" replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
