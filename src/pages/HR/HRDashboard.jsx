import { Link } from "react-router-dom";
import HRHeader from "../../components/HRHeader";
import {
    Activity,
    BarChart3,
    Calendar,
    CalendarDays,
    CheckCircle,
    Clock,
    FileText,
    Plus,
    User,
    Users,
    XCircle,
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
            name: "Kwame Nkrumah Memorial Day",
            date: "2025-09-22",
            type: "National",
        },
        {
            id: "2",
            name: "Farmers Day",
            date: "2025-12-05",
            type: "National",
        },
        {
            id: "3",
            name: "Christmas Day",
            date: "2025-12-25",
            type: "National",
        },
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "bg-[#DCFCE7] text-[#166534] border-2 border-[#BBF7D0]";
            case "pending":
                return "bg-[#FEF9C3] text-[#854D0E] border-2 border-[#FEF08A]";
            case "rejected":
                return "bg-red-100 text-red-700 border-2 border-[#F04438]";
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

    const getHolidayTypeColor = (type) => {
        const colors = {
            National: "bg-blue-100 text-blue-800 border border-[#E5E7EB]",
            Company: "bg-purple-100 text-purple-800 border border-[#E5E7EB]",
        };
        return colors[type] || "bg-gray-100 text-gray-800";
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
                                to="/hr/employees/add"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta bg-[#111827] text-[#F9FAFB] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                            >
                                <Plus size={18} className="mr-2" />
                                Add Employee
                            </Link>
                            <Link
                                to="/hr/leave-requests"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta border border-[#E5E7EB] bg-[#FFFFFF]  text-[#212121] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                            >
                                <FileText size={18} className="mr-2" />
                                Leave Requests
                            </Link>
                            <Link
                                to="/hr/calendar"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta border border-[#E5E7EB] bg-[#FFFFFF] text-[#212121] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                            >
                                <Calendar size={18} className="mr-2" />
                                View Calendar
                            </Link>
                        </div>
                    </div>

                    {/* stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
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

                        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Working Today
                                </h3>
                                <Activity className="h-4 w-4 text-[#4CAF50]" />
                            </div>
                            <div className="text-2xl font-bold">
                                {stats.workingEmployees}
                            </div>
                            <p className="text-xs text-[#6B7280]">
                                Active employees
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Pending Approvals
                                </h3>
                                <Clock className="h-4 w-4 text-[#F9A825]" />
                            </div>
                            <div className="text-2xl font-bold">
                                {stats.pendingApprovals}
                            </div>
                            <p className="text-xs text-[#6B7280]">
                                Require action
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* recent leave requests */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="font-bold text-xl sm:text-2xl">
                                            Recent Leave Requests
                                        </h2>
                                        <p className="text-sm text-[#6B7280] mt-2 mb-6">
                                            Latest request that require
                                            attention
                                        </p>
                                    </div>
                                    <Link
                                        to="/hr/leave-requests"
                                        className="text-[#4500FF] text-sm font-medium"
                                    >
                                        View all
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {recentLeaveRequests.map((request) => (
                                        <div
                                            key={request.id}
                                            className="rounded-xl border border-[#E5E7EB] p-6 hover:shadow-sm transition-shadow"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center justify-center">
                                                        <User
                                                            size={20}
                                                            className="text-[#6B7280]"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-[#212121]">
                                                            {
                                                                request.employeeName
                                                            }
                                                        </div>
                                                        <div className="text-sm text-[#999EA7]">
                                                            {request.department}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 text-sm font-medium capitalize rounded-full ${getStatusColor(
                                                        request.status
                                                    )}`}
                                                >
                                                    {request.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-[#212121]">
                                                <div>
                                                    <span className="font-medium">
                                                        Type:
                                                    </span>{" "}
                                                    {request.leaveType}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Duration:
                                                    </span>{" "}
                                                    {request.days} day
                                                    {request.days > 1
                                                        ? "s"
                                                        : ""}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        From:
                                                    </span>{" "}
                                                    {formatDate(
                                                        request.startDate
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        To:
                                                    </span>{" "}
                                                    {formatDate(
                                                        request.endDate
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-sm">
                                                <span className="font-medium">
                                                    Reason:
                                                </span>{" "}
                                                {request.reason}
                                            </div>

                                            {request.status === "pending" && (
                                                <div className="mt-3 flex space-x-2">
                                                    <button className="px-3 py-1 bg-[#90e09c] text-[#0a3911] text-sm leading-[140%] rounded-sm hover:bg-green-500 transition-colors">
                                                        Approve
                                                    </button>
                                                    <button className="px-3 py-1 bg-[#f7461e] text-[#FFFFFF] text-sm leading-[140%] rounded-sm hover:bg-red-500 transition-colors">
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* leave statistics */}
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6 mt-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <BarChart3 size={25} />
                                    <h3 className="text-lg font-semibold">
                                        Leave Statistics
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {leaveStatistics.map((stat) => (
                                        <div
                                            key={stat.type}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${stat.color}`}
                                                />
                                                <span className="text-sm font-medium text-[#3a3838]">
                                                    {stat.type}
                                                </span>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${stat.color}`}
                                                        style={{
                                                            width: `${
                                                                (stat.count /
                                                                    100) *
                                                                100
                                                            }%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-[#3a3838]">
                                                    {stat.count}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* sidebar */}
                        <div className="space-y-6">
                            {/* stats */}
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                                <h3 className="font-semibold text-[#444546] text-lg mb-4">
                                    Todays Activity
                                </h3>

                                <div className="space-y-4">
                                    {/* approved */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle
                                                size={16}
                                                className="text-[#00C951]"
                                            />
                                            <span className="text-sm text-[#3a3838]">
                                                Approved
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-[#3a3838]">
                                            {stats.approvedToday}
                                        </span>
                                    </div>

                                    {/* rejected */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <XCircle
                                                size={16}
                                                className="text-[#F7451F]"
                                            />
                                            <span className="text-sm text-[#3a3838]">
                                                Rejected
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-[#3a3838]">
                                            {stats.rejectedToday}
                                        </span>
                                    </div>

                                    {/* pending */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Clock
                                                size={16}
                                                className="text-[#F0B100]"
                                            />
                                            <span className="text-sm text-[#3a3838]">
                                                Pending
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-[#3a3838]">
                                            {stats.pendingApprovals}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* holidays */}
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                                <div className="flex items-center gap-2 mb-4 text-[#444546]">
                                    <CalendarDays size={18} />
                                    <h2 className="font-jakarta font-semibold text-lg">
                                        Upcoming Holidays
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {upcomingHolidays.map((holiday) => (
                                        <div
                                            key={holiday.id}
                                            className="flex items-center justify-between py-2"
                                        >
                                            <div className="font-jakarta">
                                                <p className="font-medium text-sm">
                                                    {holiday.name}
                                                </p>
                                                <p className="text-xs text-[#6B7280]">
                                                    {formatDate(holiday.date)}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${getHolidayTypeColor(
                                                    holiday.type
                                                )}`}
                                            >
                                                {holiday.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* quick actions */}
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                                <h3 className="text-[#444546] text-lg font-semibold mb-4">
                                    Quick Actions
                                </h3>

                                <div className="space-y-3">
                                    <Link
                                        to="/hr/employees"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-[#E5E7EB] rounded-xl text-[#444546] font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        <Users size={18} className="mr-2" />
                                        Manage Employees
                                    </Link>

                                    <Link
                                        to="/hr/reports"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-[#E5E7EB] rounded-xl text-[#444546] font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        <BarChart3 size={18} className="mr-2" />
                                        View Reports
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HRDashboard;
