import {
    AlertCircle,
    Building2,
    CircleCheck,
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
    User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "employee",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // demo logins for testing
    const demoLogins = {
        employee: {
            email: "menniia@company.com",
            password: "employee123",
            name: "Donatus Menniia",
        },
        hr: {
            email: "hr@company.com",
            password: "hr123",
            name: "HR Admin",
        },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // clear error when a user begins typing
        if (error) setError("");
    };

    const handleRoleChanges = (role) => {
        setFormData((prev) => ({
            ...prev,
            role,
            email: demoLogins[role].email,
            password: demoLogins[role].password,
        }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // setTimeOut to make it seem like an API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // validate login credentials
        const expectedLogins = demoLogins[formData.role];

        if (
            formData.email === expectedLogins.email &&
            formData.password === expectedLogins.password
        ) {
            // store this user data in authentication state management later
            const userData = {
                name: expectedLogins.name,
                email: formData.email,
                role: formData.role,
            };
            localStorage.setItem("user", JSON.stringify(userData));

            // navigate to user's dashboard
            if (formData.role === "hr") {
                navigate("/hr");
            } else {
                navigate("/");
            }
        } else {
            setError("Invalid email or password, please try again");
        }

        setIsLoading(false);
    };

    const fillDemoLogins = (role) => {
        const cred = demoLogins[role];
        setFormData({
            email: cred.email,
            password: cred.password,
            role,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#FFFFFF] to-purple-50 flex items-center justify-center p-4 font-jakarta">
            <div className="max-w-md w-full space-y-8">
                {/* header */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <img
                            width="70"
                            height="70"
                            src="https://img.icons8.com/fluency/48/groups--v2.png"
                            alt="groups--v2"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to MojoPay HR
                    </h1>
                    <p className="text-gray-600">
                        Sign in to manage your leave requests
                    </p>
                </div>

                {/* role selection */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-1 flex">
                    <button
                        type="button"
                        onClick={() => handleRoleChanges("employee")}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                            formData.role === "employee"
                                ? "bg-[#111827] text-[#F9FAFB] shadow-sm"
                                : "text-[#212121] hover:text-gray-900"
                        }`}
                    >
                        <User size={16} className="inline mr-2" />
                        Employee
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChanges("hr")}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                            formData.role === "hr"
                                ? "bg-[#111827] text-[#F9FAFB] shadow-sm"
                                : "text-[#212121] hover:text-gray-900"
                        }`}
                    >
                        <Building2 size={16} className="inline mr-2" />
                        HR
                    </button>
                </div>

                {/* login form */}
                <div className="bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E5E7EB] p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#1d2228] mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={16}
                                    className="absolute left-3 top-3 text-[#4B5563] pointer-events-none"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                    placeholder="Please enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#1d2228] mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={16}
                                    className="absolute left-3 top-3 text-[#4B5563] pointer-events-none"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-12 px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3 text-[#4B5563]"
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* error message */}
                        {error && (
                            <div className="flex items-center space-x-2 text-[#E53935] bg-[#FFEBEE] border border-[#EF9A9A] rounded-lg p-3">
                                <AlertCircle size={16} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {/* submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
                                formData.role === "hr"
                                    ? "bg-[#111827] text-[#F9FAFB] shadow-sm"
                                    : "text-[#212121] bg-[#ECEFF1] border border-[#CFD8DC]"
                            } `}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center cursor-not-allowed">
                                    <Loader2
                                        size={16}
                                        className="mr-1 animate-spin"
                                    />
                                    Signing in...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* forgot password link */}
                    <div className="text-center mt-4">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-[#5e26f7] hover:text-[#4500FF] font-medium"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                {/* demo logins */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <h3 className="text-sm font-semibold text-[#455A64] mb-4 flex items-center">
                        <CircleCheck size={16} className="mr-2" />
                        Demo Logins
                    </h3>

                    <div className="space-y-3">
                        {/* employee access */}
                        <div className="p-3 bg-gradient-to-br from-[#90CAF9] via-[#BBDEFB] to-[#E3F2FD] rounded-lg border border-[#90CAF9]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-[#0D47A1]">
                                    Employee Access
                                </span>
                                <button
                                    type="button"
                                    onClick={() => fillDemoLogins("employee")}
                                    className="text-sm font-medium text-[#37474F] hover:text-[#263238]"
                                    title="Click to use login"
                                >
                                    Use These
                                </button>
                            </div>
                            <div className="text-sm text-[#212121] space-y-1">
                                <div>Email: menniia@company.com</div>
                                <div>Password: employee123</div>
                            </div>
                        </div>

                        {/* hr access */}
                        <div className="p-3 bg-gradient-to-br from-[#80DEEA] via-[#B2EBF2] to-[#E0F7FA] rounded-lg border border-[#90CAF9]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-[#0D47A1]">
                                    HR Admin Access
                                </span>
                                <button
                                    type="button"
                                    onClick={() => fillDemoLogins("hr")}
                                    className="text-sm font-medium text-[#37474F] hover:text-[#263238]"
                                    title="Click to use login"
                                >
                                    Use These
                                </button>
                            </div>
                            <div className="text-sm text-[#212121] space-y-1">
                                <div>Email: hr@company.com</div>
                                <div>Password: hr123</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-[#757575] mb-4">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#5e26f7] hover:text-[#4500FF]"
                        >
                            Sign Up Here
                        </Link>
                    </p>

                    <div className="mt-3 text-[#757575] text-sm">
                        <p>
                            &copy; {new Date().getFullYear()} Mojo Payment
                            Limited
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
