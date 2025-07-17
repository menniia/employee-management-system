import {
    ArrowLeft,
    CheckCircle,
    User,
    Building2,
    Mail,
    AlertCircle,
    Lock,
    EyeOff,
    Eye,
    Loader2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "employee",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // clear the error when the user begins typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleRoleChange = (role) => {
        setFormData((prev) => ({
            ...prev,
            role,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password =
                "Password must contain uppercase, lowercase and number";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm) {
            return;
        }

        setIsLoading(true);

        // setTimeOut to make it seem like an API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            // check if the user already exists
            const existingUsers = JSON.parse(
                localStorage.getItem("registeredUsers") || "[]"
            );
            const userExists = existingUsers.some(
                (user) => user.email === formData.email
            );

            if (userExists) {
                setErrors({
                    email: "An account with this email already exists",
                });

                setIsLoading(false);
                return;
            }

            // to create a new user
            const newUser = {
                email: formData.email,
                password: formData.password,
                role: formData.role,
            };

            // saved to local storage, will be later saved to API or something
            const updatedUsers = [...existingUsers, newUser];
            localStorage.setItem(
                "registeredUsers",
                JSON.stringify(updatedUsers)
            );

            setSuccess(true);

            // auto direct user to login after they create their account
            setTimeout(() => {
                navigate("/login");
            }, 8500);
        } catch (error) {
            setErrors({ email: "Registration failed, please try again" });
        }

        setIsLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#FFFFFF] to-[#E3F2FD] flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E5E7EB] p-8 font-jakarta">
                        <div className="w-16 h-16 bg-[#C8E6C9] rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} className="text-[#43A047]" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#212121] mb-2">
                            Account Created
                        </h1>
                        <p className="text-[#757575] mb-6">
                            Your {formData.role} account has been created
                            successfully. You can now Sign In to access your
                            dashboard.
                        </p>
                        <div className="space-y-3">
                            <Link
                                to="/login"
                                className="w-full bg-[#8BC34A] text-[#FFFFFF] py-2.5 px-4 rounded-lg font-medium hover:bg-[#7CB342] transition-colors inline-block"
                            >
                                Sign In Now
                            </Link>
                            <p className="text-sm text-[#9E9E9E]">
                                Redirecting to login page
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#FFFFFF] to-purple-50 flex justify-center items-center p-4">
            <div className="max-w-md w-full space-y-8 font-jakarta">
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
                    <h1 className="font-bold text-3xl text-[#212121] mb-2">
                        Create Account
                    </h1>
                    <p className="text-sm text-[#757575]">
                        A Leave Management System to manage your leave requests
                    </p>
                </div>

                {/* role selection */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-1 flex">
                    <button
                        type="button"
                        onClick={() => handleRoleChange("employee")}
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
                        onClick={() => handleRoleChange("hr")}
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

                {/* sign up form */}
                <div className="bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E5E7EB] p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#1d2228] mb-2"
                            >
                                Email Address{" "}
                                <span className="text-[#F44336]">*</span>
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
                                    className={`w-full pl-10 px-3 py-2 rounded-lg border border-[#E5E7EB] ${
                                        errors.email
                                            ? "border border-[#E57373] focus:border-[#F44336]"
                                            : ""
                                    }`}
                                    placeholder="Please enter your email"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 flex items-center text-sm text-[#E53935]">
                                    <AlertCircle size={12} className="mr-1" />
                                    {errors.email}
                                </p>
                            )}
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
                                    className={`w-full pl-10 px-3 py-2 rounded-lg border border-[#E5E7EB] ${
                                        errors.password
                                            ? "border border-[#E57373] focus:border-[#F44336]"
                                            : ""
                                    }`}
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
                            {errors.password && (
                                <p className="mt-1 flex items-center text-sm text-[#E53935]">
                                    <AlertCircle size={12} className="mr-1" />
                                    {errors.password}
                                </p>
                            )}
                            <div className="mt-2 text-xs text-[#9E9E9E]">
                                Password must contain uppercase, lowercase, and
                                number
                            </div>
                        </div>

                        {/* some small information for the different roles */}
                        <div
                            className={`p-4 rounded-lg border ${
                                formData.role === "hr"
                                    ? "bg-gradient-to-br from-[#80DEEA] via-[#B2EBF2] to-[#E0F7FA] border-[#90CAF9]"
                                    : "bg-gradient-to-br from-[#90CAF9] via-[#BBDEFB] to-[#E3F2FD] border-[#90CAF9]"
                            }`}
                        >
                            <div className="flex items-center space-x-2 mb-2">
                                {formData.role === "hr" ? (
                                    <Building2
                                        size={16}
                                        className="text-[#0c4148]"
                                    />
                                ) : (
                                    <User
                                        size={16}
                                        className="text-[#182d4d]"
                                    />
                                )}
                                <span
                                    className={`text-sm font-medium ${
                                        formData.role === "hr"
                                            ? "text-[#0c4148]"
                                            : "text-[#182d4d]"
                                    }`}
                                >
                                    {formData.role === "hr"
                                        ? "HR Administrator"
                                        : "Employee"}{" "}
                                    Account
                                </span>
                            </div>
                            <p
                                className={`text-sm ${
                                    formData.role === "hr"
                                        ? "text-[#0c4148]"
                                        : "text-[#182d4d]"
                                }`}
                            >
                                {formData.role === "hr"
                                    ? "You will have access to manage employees, approve leave requests, and view company-wide reports"
                                    : "You will be able to request leave, view your leave history and track your leave balances"}
                            </p>
                        </div>

                        {/* sign up button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
                                formData.role === "hr"
                                    ? "bg-[#111827] text-[#F9FAFB] shadow-sm"
                                    : "text-[#212121] bg-[#ECEFF1] border border-[#CFD8DC]"
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center cursor-not-allowed">
                                    <Loader2
                                        size={16}
                                        className="mr-1 animate-spin"
                                    />
                                    Creating Account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="text-sm text-[#757575] mb-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#5e26f7] hover:text-[#4500FF]"
                        >
                            Sign In Here
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

export default SignUp;
