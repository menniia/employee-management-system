import { Link } from "react-router-dom";
import HRHeader from "../../components/HRHeader";
import {
    Activity,
    AlertCircle,
    Calendar,
    FileText,
    Plus,
    Users,
} from "lucide-react";

const HRDashboard = ({ user }) => {
    // Mock data for HR dashboard
    const stats = {
        totalEmployees: 32,
        workingEmployees: 28,
        pendingApprovals: 9,
        totalRequests: 15,
        approvedToday: 12,
        rejectedToday: 3,
    };

    const recentLeaveRequests = [
        {
            id: "1",
            employeeName: "Donatus Menniia",
            department: "Engineering",
            leaveType: "Vacation",
            startDate: "2024-04-15",
            endDate: "2024-04-19",
            days: 5,
            status: "pending",
            appliedDate: "2024-03-28",
            reason: "Family vacation",
        },
        {
            id: "2",
            employeeName: "Boakye",
            department: "Finance",
            leaveType: "Sick",
            startDate: "2024-04-10",
            endDate: "2024-04-11",
            days: 2,
            status: "pending",
            appliedDate: "2024-04-09",
            reason: "Flu symptoms",
        },
        {
            id: "3",
            employeeName: "Gerald",
            department: "Sales",
            leaveType: "Personal",
            startDate: "2024-04-08",
            endDate: "2024-04-08",
            days: 1,
            status: "approved",
            appliedDate: "2024-04-01",
            reason: "Medical appointment",
        },
    ];

    const leaveStatistics = [
        { type: "Sick Leave", count: 45, color: "bg-blue-500" },
        { type: "Vacation", count: 78, color: "bg-green-500" },
        { type: "Personal", count: 23, color: "bg-yellow-500" },
        { type: "Emergency", count: 10, color: "bg-red-500" },
    ];

    const upcomingHolidays = [
        {
            id: "1",
            name: "Founders' Day",
            date: "2025-08-04",
            type: "National",
        },
        {
            id: "2",
            name: "Kwame Nkrumah Memorial Day",
            date: "2025-09-21",
            type: "National",
        },
        {
            id: "3",
            name: "Farmers Day",
            date: "2025-12-05",
            type: "National",
        },
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };
    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <HRHeader user={user} />
            <main className="pt-16 font-jakarta">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">HR Dashboard</h1>
                        <p className="mt-2 text-[#4B5563]">
                            Manage employees, leave requests, and company
                            policies
                        </p>
                    </div>

                    {/* quick links */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="hr/employees/add"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta bg-[#111827] text-[#F9FAFB] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                            >
                                <Plus size={18} className="mr-2" />
                                Add Employee
                            </Link>
                            <Link
                                to="/hr/leave-requests"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta bg-[#111827] text-[#F9FAFB] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                            >
                                <FileText size={18} className="mr-2" />
                                Leave Requests
                            </Link>
                            <Link
                                to="/hr/calendar"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta bg-[#111827] text-[#F9FAFB] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                            >
                                <Calendar size={18} className="mr-2" />
                                View Calendar
                            </Link>
                        </div>
                    </div>

                    {/* stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Total Employees
                                </h3>
                                <Users className="h-4 w-4 text-[#6B7280]" />
                            </div>
                            <div className="text-2xl font-bold">
                                {stats.totalEmployees}
                            </div>
                            <p className="text-xs text-[#6B7280]">
                                Company wide
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Working Today
                                </h3>
                                <Activity className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="text-2xl font-bold">
                                {stats.workingEmployees}
                            </div>
                            <p className="text-xs text-[#6B7280]">
                                Active employees
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Pending Approvals
                                </h3>
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                            </div>
                            <div className="text-2xl font-bold">
                                {stats.pendingApprovals}
                            </div>
                            <p className="text-xs text-[#6B7280]">
                                Require action
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Total Requests
                                </h3>
                                <FileText className="h-4 w-4 text-[#6B7280]" />
                            </div>
                            <div className="text-2xl font-bold">
                                {stats.totalRequests}
                            </div>
                            <p className="text-xs text-[#6B7280]">This month</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HRDashboard;
