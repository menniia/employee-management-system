import { Link } from "react-router-dom";
import ManagerHeader from "../../components/ManagerHeader";
import {
    Activity,
    AlertCircle,
    Calendar,
    FileText,
    FileTextIcon,
    User,
    User2Icon,
    Users,
    CircleCheck,
    XCircle,
    Clock,
    BarChart3,
    CalendarDays,
} from "lucide-react";

const ManagerDashboard = ({ user }) => {
    // Mock data for Manager dashboard
    const stats = {
        teamMembers: 23,
        workingToday: 20,
        pendingApprovals: 1,
        totalRequests: 5,
        approvedThisWeek: 2,
        rejectedThisWeek: 3,
    };

    const recentLeaveRequests = [
        {
            id: "1",
            employeeName: "Donatus Menniia",
            department: "Engineering",
            position: "Frontend Developer",
            leaveType: "Vacation",
            startDate: "2025-09-15",
            endDate: "2025-09-19",
            days: 5,
            status: "pending",
            appliedDate: "2025-08-28",
            reason: "Vacation to Jo'burg",
            urgency: "normal",
        },
        {
            id: "2",
            employeeName: "Menniia Quansah",
            department: "Engineering",
            position: "Frontend Developer",
            leaveType: "Sick",
            startDate: "2025-10-10",
            endDate: "2024-12-13",
            days: 2,
            status: "pending",
            appliedDate: "2025-09-05",
            reason: "Flu symptoms",
            urgency: "urgent",
        },
        {
            id: "3",
            employeeName: "Quan Donatus",
            department: "Engineering",
            position: "UI/UX Designer",
            leaveType: "Personal",
            startDate: "2025-05-08",
            endDate: "2025-05-09",
            days: 1,
            status: "approved",
            appliedDate: "2024-04-01",
            reason: "Medical appointment",
            urgency: "normal",
            approvedDate: "2025-04-02",
        },
    ];

    const teamMembers = [
        {
            id: "1",
            name: "Donatus Menniia",
            position: "Frontend Developer",
            status: "working",
            leaveBalance: { vacation: 15, sick: 8, personal: 3 },
            currentLeave: null,
        },
        {
            id: "2",
            name: "Menniia Quansah",
            position: "Frontend Developer",
            status: "on-leave",
            leaveBalance: { vacation: 20, sick: 12, personal: 5 },
            currentLeave: { type: "sick", until: "2024-04-11" },
        },
        {
            id: "3",
            name: "Quan Donatus",
            position: "UI/UX Designer",
            status: "working",
            leaveBalance: { vacation: 18, sick: 10, personal: 4 },
            currentLeave: null,
        },
        {
            id: "4",
            name: "Menniia Donatus",
            position: "Backend Developer",
            status: "working",
            leaveBalance: { vacation: 22, sick: 9, personal: 2 },
            currentLeave: null,
        },
    ];

    const leaveStatistics = [
        { type: "Vacation", count: 15, color: "bg-blue-500" },
        { type: "Sick Leave", count: 8, color: "bg-red-500" },
        { type: "Personal", count: 5, color: "bg-yellow-500" },
    ];

    const upcomingLeaves = [
        {
            employee: "Donatus",
            type: "Vacation",
            date: "Dec 15-19",
            days: 5,
        },
        { employee: "Menniia", type: "Personal", date: "Nov 22", days: 1 },
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]";
            case "pending":
                return "bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]";
            case "rejected":
                return "bg-red-100 text-red-700 border border-[#F04438]";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getUrgencyColor = (urgency) => {
        return urgency === "urgent" ? "border-l-4 border-red-500" : "";
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const handleApprove = (requestId) => {
        console.log("Approving request:", requestId);
        // API call when i integrate the backend
    };

    const handleReject = (requestId) => {
        console.log("Rejecting request:", requestId);
        // API call when i integrate the backend
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <ManagerHeader />
            <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#212121]">
                            Manager Dashboard
                        </h1>
                        <p className="text-[#64748B] mt-2">
                            Manage your team's leave requests and monitor
                            department activity
                        </p>
                    </div>

                    {/* quick actions */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/manager/leave-requests"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta bg-[#111827] text-[#F9FAFB] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                            >
                                <FileTextIcon size={18} className="mr-2" />
                                Review Requests ({stats.pendingApprovals})
                            </Link>
                            <Link
                                to="/manager/team"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta border border-[#E5E7EB] bg-[#FFFFFF]  text-[#212121] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                            >
                                <User2Icon size={18} className="mr-2" />
                                Manage Team
                            </Link>
                            <Link
                                to="/manager/team"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta border border-[#E5E7EB] bg-[#FFFFFF]  text-[#212121] text-sm px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                            >
                                <Calendar size={18} className="mr-2" />
                                Team Calendar
                            </Link>
                        </div>
                    </div>

                    {/* stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Team Members
                                </h3>
                                <Users size={16} className="text-[#6B7280]" />
                            </div>
                            <div className="text-2xl font-bold text-[#212121]">
                                {stats.teamMembers}
                            </div>
                            <p className="text-sm text-[#64748B]">
                                In your department
                            </p>
                        </div>

                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Working Today
                                </h3>
                                <Activity
                                    size={16}
                                    className="text-[#4CAF50]"
                                />
                            </div>
                            <div className="text-2xl font-bold text-[#212121]">
                                {stats.workingToday}
                            </div>
                            <p className="text-sm text-[#64748B]">
                                Available team members
                            </p>
                        </div>

                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Pending Approvals
                                </h3>
                                <AlertCircle
                                    size={16}
                                    className="text-[#F9A825]"
                                />
                            </div>
                            <div className="text-2xl font-bold text-[#212121]">
                                {stats.pendingApprovals}
                            </div>
                            <p className="text-sm text-[#64748B]">
                                Require your approval
                            </p>
                        </div>

                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">
                                    Total Request
                                </h3>
                                <FileText
                                    size={16}
                                    className="text-[#6B7280]"
                                />
                            </div>
                            <div className="text-2xl font-bold text-[#212121]">
                                {stats.totalRequests}
                            </div>
                            <p className="text-sm text-[#64748B]">This month</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* pending leave requests */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="font-bold text-xl sm:text-2xl">
                                            Pending Leave Requests
                                        </h2>
                                        <p className="text-sm text-[#6B7280] mt-2 mb-6">
                                            Requests requiring your approval
                                        </p>
                                    </div>
                                    <Link
                                        to="/manager/leave-requests"
                                        className="text-[#4500FF] text-sm font-medium"
                                    >
                                        View All
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {recentLeaveRequests
                                        .filter(
                                            (req) => req.status === "pending"
                                        )
                                        .map((request) => (
                                            <div
                                                key={request.id}
                                                className={`border border-[#E5E7EB] rounded-xl p-4 ${getUrgencyColor(
                                                    request.urgency
                                                )}`}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <User
                                                            size={20}
                                                            className="text-[#6B7280]"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-[#212121]">
                                                                {
                                                                    request.employeeName
                                                                }
                                                            </div>
                                                            <div className="text-sm text-[#64748B]">
                                                                {
                                                                    request.position
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        {request.urgency ===
                                                            "urgent" && (
                                                            <span className="px-2 py-1 text-xs font-medium bg-[#FFCDD2] text-[#D32F2F] border border-[#F04438] rounded-lg">
                                                                Urgent
                                                            </span>
                                                        )}
                                                        <span
                                                            className={`px-2 py-1 text-sm font-medium rounded-lg ${getStatusColor(
                                                                request.status
                                                            )}`}
                                                        >
                                                            {request.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-[#212121]">
                                                    <div>
                                                        <span className="font-medium">
                                                            Type:{" "}
                                                        </span>
                                                        {request.leaveType}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">
                                                            Duration:{" "}
                                                        </span>
                                                        {request.days} day
                                                        {request.days > 1
                                                            ? "s"
                                                            : ""}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">
                                                            From:{" "}
                                                        </span>
                                                        {formatDate(
                                                            request.startDate
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">
                                                            To:{" "}
                                                        </span>
                                                        {formatDate(
                                                            request.endDate
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <span className="text-sm font-medium text-[#212121]">
                                                        Reason:{" "}
                                                    </span>
                                                    <p className="text-sm text-[#64748B]">
                                                        {request.reason}
                                                    </p>
                                                </div>

                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleApprove(
                                                                request.id
                                                            )
                                                        }
                                                        className="px-4 py-2 bg-[#43A047] text-[#FFFFFF] text-sm rounded hover:bg-[#388E3C] transition-colors duration-200 cursor-pointer"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleReject(
                                                                request.id
                                                            )
                                                        }
                                                        className="px-4 py-2 bg-[#E53935] text-[#FFFFFF] text-sm rounded hover:bg-[#D32F2F] transition-colors duration-200 cursor-pointer"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                    {recentLeaveRequests.filter(
                                        (req) => req.status === "pending"
                                    ).length === 0 && (
                                        <div className="text-center py-8 text-[#94A3B8]">
                                            <CircleCheck
                                                size={128}
                                                className="mx-auto mb-4 text-[#E2E8F0]"
                                            />
                                            <p>
                                                No pending leave requests at the
                                                moment
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* team overview */}
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6 mt-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Users size={20} />
                                    <h2 className="text-lg font-semibold text-[#212121]">
                                        Team Overview
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {teamMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="border border-[#E5E7EB] rounded-lg p-4"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <h3 className="font-medium text-[#212121]">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-sm text-[#64748B]">
                                                        {member.position}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        member.status ===
                                                        "working"
                                                            ? "bg-[#C8E6C9] text-[#2E7D32] border border-[#2E7D32]"
                                                            : "bg-[#FFF9C4] text-[#854D0E] border border-[#854D0E]"
                                                    }`}
                                                >
                                                    {member.status === "working"
                                                        ? "Working"
                                                        : "On Leave"}
                                                </span>
                                            </div>

                                            {member.currentLeave && (
                                                <div className="mb-2 text-sm text-[#64748B]">
                                                    <span className="font-medium">
                                                        Current Leave:{" "}
                                                    </span>
                                                    {member.currentLeave.type}{" "}
                                                    until{" "}
                                                    {member.currentLeave.until}
                                                </div>
                                            )}

                                            <div className="text-xs text-[#64748B]">
                                                Leave Balance: Vacation:{" "}
                                                {member.leaveBalance.vacation}{" "}
                                                day
                                                {member.leaveBalance.vacation >
                                                1
                                                    ? "s"
                                                    : ""}
                                                <p>
                                                    Sick Leave:{" "}
                                                    {member.leaveBalance.sick}{" "}
                                                    day
                                                    {member.leaveBalance.sick >
                                                    1
                                                        ? "s"
                                                        : ""}
                                                </p>
                                                <p>
                                                    Personal:{" "}
                                                    {
                                                        member.leaveBalance
                                                            .personal
                                                    }{" "}
                                                    day
                                                    {member.leaveBalance
                                                        .personal > 1
                                                        ? "s"
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* side */}
                        <div className="space-y-6">
                            {/* activity for the week */}
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                                <h3 className="font-semibold text-[#212121] mb-4">
                                    This Week's Activity
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <CircleCheck
                                                size={16}
                                                className="text-[#4CAF50]"
                                            />
                                            <span className="text-sm text-[#64748B]">
                                                Approved
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-[#212121]">
                                            {stats.approvedThisWeek}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <XCircle
                                                size={16}
                                                className="text-[#F44336]"
                                            />
                                            <span className="text-sm text-[#64748B]">
                                                Rejected
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-[#212121]">
                                            {stats.rejectedThisWeek}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Clock
                                                size={16}
                                                className="text-[#854D0E]"
                                            />
                                            <span className="text-sm text-[#64748B]">
                                                Pending
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-[#212121]">
                                            {stats.pendingApprovals}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* leave stats */}
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <BarChart3 size={20} />
                                    <h3 className="font-semibold text-[#212121]">
                                        Department Leave Stats
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
                                                <span className="text-sm font-medium text-[#212121]">
                                                    {stat.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-16 bg-[#E2E8F0] rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${stat.color}`}
                                                        style={{
                                                            width: `${
                                                                (stat.count /
                                                                    20) *
                                                                100
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {stat.count}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* upcoming leaves */}
                            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <CalendarDays size={25} />
                                    <h3 className="font-semibold text-[#212121]">
                                        Upcoming Leaves
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {upcomingLeaves.map((leave, index) => (
                                        <div key={index} className="text-sm">
                                            <div className="font-medium text-[#212121]">
                                                {leave.employee}
                                            </div>
                                            <div className="text-[#64748B]">
                                                {leave.type} • {leave.date} (
                                                {leave.days} day
                                                {leave.days > 1
                                                    ? "s"
                                                    : ""}){" "}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagerDashboard;
