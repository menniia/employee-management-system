import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Clock,
    Eye,
    EyeOff,
    Key,
    Loader2,
    Lock,
    Mail,
    Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        step: "email",
        email: "",
        verificationCode: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [generateCode, setGenerateCode] = useState("");

    // countdown timer for code to be resent
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError("");
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return (
            password.length > 6 &&
            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
        );
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        // setting the delay for it to be like an api call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // check if the email exists
        const registeredUsers = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        );
        const demoEmails = ["menniia@company.com", "hr@company.com"];

        const userExists = registeredUsers.some(
            (user) =>
                user.email === formData.email ||
                demoEmails.includes(formData.email)
        );

        if (!userExists) {
            setError("No account found with email address");
            setIsLoading(false);
            return;
        }

        // generate verification code - this would be later sent through email
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGenerateCode(code);

        // store the reset request with expiration
        const resetRequest = {
            email: formData.email,
            code: code,
            timestamp: Date.now(),
            expires: Date.now() + 15 * 60 * 1000,
        };
        localStorage.setItem(
            "passwordResetRequest",
            JSON.stringify(resetRequest)
        );

        setFormData((prev) => ({
            ...prev,
            step: "verification",
        }));

        // setting the time left before the user could request another reset
        setTimeLeft(60);
        setIsLoading(false);
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (formData.verificationCode.length !== 6) {
            setError("Please enter the 6 digit verification code");
            setIsLoading(false);
            return;
        }

        // setting the delay for it to be like an api call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // check verification code
        const resetRequest = JSON.parse(
            localStorage.getItem("passwordResetRequest") || "{}"
        );

        if (
            !resetRequest.code ||
            Date.now() > resetRequest.expires ||
            timeLeft === 0
        ) {
            setError(
                "Verification code has expired, please request a new one."
            );
            setIsLoading(false);
            return;
        }

        if (formData.verificationCode !== resetRequest.code) {
            setError("Invalid verification, please try again");
            setIsLoading(false);
            return;
        }

        setFormData((prev) => ({
            ...prev,
            step: "reset",
        }));
        setIsLoading(false);
    };

    const handlePasswordResetSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!validatePassword(formData.newPassword)) {
            setError(
                "Password must be at least 6 characters with uppercase, lowercase, and number"
            );
            setIsLoading(false);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Password does not match");
            setIsLoading(false);
            return;
        }

        // setting the delay for it to be like an api call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // update the password in the registered users
        const registeredUsers = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        );

        const updatedUsers = registeredUsers.map((user) =>
            user.email === formData.email
                ? { ...user, password: formData.newPassword }
                : user
        );
        localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

        // clean reset request
        localStorage.removeItem("passwordResetRequest");

        setFormData((prev) => ({
            ...prev,
            step: "success",
        }));
        setIsLoading(false);
    };

    const handleResendCode = async () => {
        if (timeLeft > 0) return;

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // new code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGenerateCode(code);

        const resetRequest = {
            email: formData.email,
            code: code,
            timestamp: Date.now(),
            expires: Date.now() + 15 * 60 * 1000,
        };
        localStorage.setItem(
            "passwordResetRequest",
            JSON.stringify(resetRequest)
        );

        // setting the time left before the user could request another reset
        setTimeLeft(60);
        setIsLoading(false);
    };

    const renderEmailStep = () => {
        return (
            <div className="bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E5E7EB] p-8 font-jakarta">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-[#BBDEFB] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={32} className="text-[#1E88E5]" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#212121] mb-2">
                        Reset Password
                    </h2>
                    <p className="text-[#757575] text-sm">
                        Enter the email address with your account and we'll send
                        an email with confirmation to reset your password
                    </p>
                    <p className="mt-3 text-sm text-[#757575]">
                        Use <strong>menniia@company.com</strong> as demo email
                    </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
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

                    {error.email && (
                        <p className="mt-1 flex items-center text-sm text-[#E53935]">
                            <AlertCircle size={16} className="mr-1" />
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-[#1E88E5] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center cursor-not-allowed">
                                <Loader2
                                    size={16}
                                    className="mr-1 animate-spin"
                                />
                                Sending Code...
                            </div>
                        ) : (
                            <div className="cursor-pointer">
                                Send Verification Code
                            </div>
                        )}
                    </button>
                </form>
            </div>
        );
    };

    const renderVerificationStep = () => {
        return (
            <div className="bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E5E7EB] p-8 font-jakarta">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-[#C8E6C9] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield size={24} className="text-[#43A047]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#212121] mb-2">
                        Enter verification code
                    </h2>
                    <p className="text-[#757575] mb-4">
                        A six digit verification code has been sent to{" "}
                        <strong>{formData.email}</strong>
                    </p>

                    {/* demo code to display for testing */}
                    <div className="bg-[#f7f7f7] border border-[#f3f3f3] rounded-lg p-3 mb-4">
                        <p className="text-sm text-[#71501c]">
                            <strong>Demo Code:</strong> {generateCode}
                        </p>
                        <p className="text-sm text-[#71501c] mt-1">
                            This is for testing sake, and will be made to be
                            sent to the user's email
                        </p>
                    </div>
                </div>

                <form onSubmit={handleVerificationSubmit} className="space-y-6">
                    {/* verification code */}
                    <div>
                        <label
                            htmlFor="verificationCode"
                            className="block text-sm font-medium text-[#1d2228] mb-2"
                        >
                            Verification Code
                        </label>
                        <div className="relative">
                            <Mail
                                size={16}
                                className="absolute left-3 top-3 text-[#4B5563] pointer-events-none"
                            />
                            <input
                                type="text"
                                name="verificationCode"
                                id="verificationCode"
                                value={formData.verificationCode}
                                onChange={handleInputChange}
                                maxLength={6}
                                className="w-full pl-10 px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                placeholder="000000"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="mt-1 flex items-center text-sm text-[#E53935]">
                            <AlertCircle size={16} className="mr-1" />
                            {error}
                        </p>
                    )}

                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 px-4 bg-[#1E88E5] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center cursor-not-allowed">
                                    <Loader2
                                        size={16}
                                        className="mr-1 animate-spin"
                                    />
                                    Verifying...
                                </div>
                            ) : (
                                <div className="cursor-pointer">
                                    Verify Code
                                </div>
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={timeLeft > 0 || isLoading}
                                className="w-full py-2.5 px-4 disabled:text-[#3d3a3a] disabled:cursor-not-allowed rounded-lg font-medium"
                            >
                                {timeLeft > 0 ? (
                                    <span className="flex items-center justify-center cursor-not-allowed">
                                        <Clock size={16} className="mr-1" />
                                        Resend code in {timeLeft}s
                                    </span>
                                ) : (
                                    <div className="cursor-pointer text-[#6b3fe3]">
                                        Resend verification code
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    const renderResetStep = () => {
        return (
            <div className="bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E5E7EB] p-8 font-jakarta">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-[#DCEDC8] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Key size={24} className="text-[#7CB342]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#212121] mb-2">
                        Create New Password
                    </h2>
                    <p className="text-[#757575]">
                        Enter your new password below
                    </p>
                </div>

                <form
                    onSubmit={handlePasswordResetSubmit}
                    className="space-y-6"
                >
                    {/* new password */}
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-[#1d2228] mb-2"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <Lock
                                size={16}
                                className="absolute left-3 top-3 text-[#4B5563] pointer-events-none"
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                placeholder="Enter a new password"
                                required
                            />
                            <div className="text-xs text-[#9E9E9E] mt-1">
                                Must contain uppercase, lowercase, and a number
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
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

                    {/* confim password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-[#1d2228] mb-2"
                        >
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <Lock
                                size={16}
                                className="absolute left-3 top-3 text-[#4B5563] pointer-events-none"
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                placeholder="Confirm your new password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
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

                    {error && (
                        <p className="mt-1 flex items-center text-sm text-[#E53935]">
                            <AlertCircle size={16} className="mr-1" />
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-[#1E88E5] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center cursor-not-allowed">
                                <Loader2
                                    size={16}
                                    className="mr-1 animate-spin"
                                />
                                Resetting Password...
                            </div>
                        ) : (
                            <div className="cursor-pointer">Reset Password</div>
                        )}
                    </button>
                </form>
            </div>
        );
    };

    const renderSuccessStep = () => {
        return (
            <div className="bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E5E7EB] p-8 font-jakarta">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#C8E6C9] rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} className="text-[#43A047]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#212121] mb-2">
                        Password Reset Successful
                    </h2>
                    <p className="text-[#757575] mb-6">
                        Your password has been successfully reset. You can now
                        Sign In with your new password
                    </p>
                    <Link
                        to="/login"
                        className="w-full bg-[#43A047] py-2.5 px-4 rounded-xl font-medium hover:bg-[#388E3C] transition-colors inline-block"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#FFFFFF] to-purple-50 flex items-center justify-center p-4 font-jakarta">
            <div className="max-w-md w-full space-y-8">
                {/* header */}
                <div className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-[#757575] hover:text-[#212121] transition-colors mb-6"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Sign In
                    </Link>
                </div>

                {/* step counts */}
                {formData.step === "email" && renderEmailStep()}
                {formData.step === "verification" && renderVerificationStep()}
                {formData.step === "reset" && renderResetStep()}
                {formData.step === "success" && renderSuccessStep()}

                {/* to show the progress */}
                {formData.step !== "success" && (
                    <div className="flex items-center justify-center space-x-2">
                        <div
                            className={`w-2 h-2 rounded-full transition-colors ${
                                formData.step === "email"
                                    ? "bg-[#1E88E5]"
                                    : "bg-[#E0E0E0]"
                            }`}
                        />
                        <div
                            className={`w-2 h-2 rounded-full transition-colors ${
                                formData.step === "verification"
                                    ? "bg-[#43A047]"
                                    : "bg-[#E0E0E0]"
                            }`}
                        />
                        <div
                            className={`w-2 h-2 rounded-full transition-colors ${
                                formData.step === "reset"
                                    ? "bg-[#FB8C00]"
                                    : "bg-[#E0E0E0]"
                            }`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
