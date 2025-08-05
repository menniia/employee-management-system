import { useState } from "react";
import {
    Bell,
    Calendar,
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const EmployeeHeader = ({ user }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    const navigationItems = [
        {
            name: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            current: location.pathname === "/",
        },
        {
            name: "Request Leave",
            href: "/request-leave",
            icon: FileText,
            current: location.pathname === "/request-leave",
        },
        {
            name: "My Leaves",
            href: "/my-leaves",
            icon: Calendar,
            current: location.pathname === "/my-leaves",
        },
    ];

    const getUserInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                to="/"
                                className="text-[#4500FF] font-bold text-xl"
                            >
                                {/* <img
                                    src="/images/mojoLogo.svg"
                                    alt="mojo-pay logo"
                                    className="w-32 h-6"
                                /> */}
                                Menniia HR
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`inline-flex font-jakarta items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                                            item.current
                                                ? "border-blue-500 text-gray-900"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                    >
                                        <Icon className="w-4 h-4 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <div className="w-8 h-8 bg-[#4500FF] rounded-full flex items-center justify-center">
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white text-sm font-medium">
                                            {getUserInitials(
                                                user?.name || "Menniia Donatus"
                                            )}
                                        </span>
                                    )}
                                </div>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-[#E5E7EB] ring-opacity-5 z-50">
                                    <div className="py-1">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-jakarta font-medium text-gray-900">
                                                    {user?.name ||
                                                        "Menniia Donatus"}
                                                </p>
                                                <p className="text-xs font-jakarta text-gray-500">
                                                    {user?.email ||
                                                        "md@example.com"}
                                                </p>
                                                <p className="text-xs text-[#4500FF] font-jakarta font-medium capitalize">
                                                    {user?.role || "employee"}{" "}
                                                    Role
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm font-jakarta text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <Settings className="mr-3 h-4 w-4" />
                                            Settings
                                        </a>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                localStorage.removeItem("user");
                                                window.location.href = "/login";
                                            }}
                                            className="flex items-center px-4 py-2 text-sm font-jakarta text-red-600 hover:bg-gray-100 transition-colors"
                                        >
                                            <LogOut className="mr-3 h-4 w-4" />
                                            Log out
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="sm:hidden bg-white border-t border-gray-200">
                    <div className="pt-2 pb-3 space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                                        item.current
                                            ? "bg-blue-50 border-blue-500 text-[#4500FF]"
                                            : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center">
                                        <Icon className="w-4 h-4 mr-3" />
                                        {item.name}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-[#4500FF] rounded-full flex items-center justify-center">
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white text-sm font-medium">
                                            {getUserInitials(
                                                user?.name || "Menniia Donatus"
                                            )}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-jakarta font-medium text-gray-800">
                                    {user?.name || "Menniia Donatus"}
                                </div>
                                <div className="text-sm font-jakarta text-gray-500">
                                    {user?.email || "md@example.com"}
                                </div>
                            </div>
                            <button className="ml-auto relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-1">
                            <a
                                href="#"
                                className="block px-4 py-2 text-base font-medium font-jakarta text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Settings
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-base font-medium font-jakarta text-red-600 hover:text-red-800 hover:bg-gray-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Log out
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default EmployeeHeader;
