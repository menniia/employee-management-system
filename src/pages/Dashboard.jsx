import {
    AlertCircle,
    Calendar,
    CircleCheckBig,
    Clock,
    FileText,
    Plus,
    TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import LeaveCard from "../components/LeaveCard";

const Dashboard = ({ user }) => {
    //mock data, I'll later fix this from API
    const leaveBalances = [
        { type: "annual", allocated: 20, used: 3, remaining: 17 },
        { type: "sick", allocated: 20, used: 13, remaining: 7 },
        { type: "personal", allocated: 20, used: 5, remaining: 15 },
    ];

    const recentLeaves = [
        {
            id: "1",
            employeeId: "emp1",
            employeeName: "Menniia Donatus",
            type: "vacation",
            leaveType: "vacation",
            startDate: "2024-03-15",
            endDate: "2024-03-19",
            totalDays: 5,
            days: 5,
            reason: "Family vacation to Hawaii",
            status: "Approved",
            appliedDate: "2024-02-28",
            approvedBy: "Rasna",
            approvedDate: "2024-03-01",
        },
        {
            id: "2",
            employeeId: "emp1",
            employeeName: "Menniia Donatus",
            type: "sick",
            leaveType: "sick",
            startDate: "2024-02-10",
            endDate: "2024-02-11",
            totalDays: 2,
            days: 2,
            reason: "Flu symptoms",
            status: "Approved",
            appliedDate: "2024-02-10",
            approvedBy: "Rasna",
            approvedDate: "2024-02-10",
        },
        {
            id: "3",
            employeeId: "emp1",
            employeeName: "Menniia Donatus",
            type: "personal",
            leaveType: "personal",
            startDate: "2024-04-05",
            endDate: "2024-04-05",
            totalDays: 1,
            days: 1,
            reason: "Medical appointment",
            status: "Pending",
            appliedDate: "2024-03-20",
        },
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const getHolidayTypeColor = (type) => {
        const colors = {
            National: "bg-blue-100 text-blue-800",
            Company: "bg-purple-100 text-purple-800",
        };
        return colors[type];
    };

    const totalAllocated = leaveBalances.reduce(
        (sum, balance) => sum + balance.allocated,
        0
    );
    const totalUsed = leaveBalances.reduce(
        (sum, balance) => sum + balance.used,
        0
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-jakarta text-[#212121]">
                    Welcome back, {user.name || "Menniia Donatus"}!
                </h1>
                <p className="mt-2 font-jakarta text-[#4B5563]">
                    Here's an overview of your leave status and recent activity.
                </p>
            </div>

            {/* leave request and view leaves */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/request-leave"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta bg-[#111827] text-[#F9FAFB] px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                    >
                        <Plus size={18} className="mr-2" />
                        Request Leave
                    </Link>
                    <Link
                        to="/my-leaves"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center font-jakarta bg-[#FFFFFF] text-[#212121] border border-[#E5E7EB] px-6 py-2 rounded-lg font-medium hover:bg-[#F3F4F6] transition-colors duration-300"
                    >
                        <FileText size={18} className="mr-2" />
                        View My Leaves
                    </Link>
                </div>
            </div>

            {/* leave cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-jakarta text-sm font-medium">
                            Total Requests
                        </h3>
                        <FileText size={18} />
                    </div>
                    <div className="font-jakarta text-2xl font-bold">12</div>
                    <p className="text-sm font-jakarta text-[#6B7280]">
                        This year
                    </p>
                </div>

                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-jakarta text-sm font-medium">
                            Pending
                        </h3>
                        <AlertCircle size={18} className="text-[#EAB308]" />
                    </div>
                    <div className="font-jakarta text-2xl font-bold">1</div>
                    <p className="text-sm font-jakarta text-[#6B7280]">
                        Awaiting approval
                    </p>
                </div>

                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-jakarta text-sm font-medium">
                            Approved
                        </h3>
                        <CircleCheckBig size={18} className="text-[#22C55E]" />
                    </div>
                    <div className="font-jakarta text-2xl font-bold">10</div>
                    <p className="text-sm font-jakarta text-[#6B7280]">
                        This year
                    </p>
                </div>

                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-jakarta text-sm font-medium">
                            Days Used
                        </h3>
                        <TrendingUp size={18} className="text-[#6B7280]" />
                    </div>
                    <div className="font-jakarta text-2xl font-bold">12</div>
                    <p className="text-sm font-jakarta text-[#6B7280]">
                        Out of 20 days total
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* leave balances */}
                <div className="lg:col-span-2">
                    <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar />
                            <h2 className="font-jakarta font-bold text-2xl">
                                Leave Balances
                            </h2>
                        </div>
                        <p className="font-jakarta text-sm text-[#6B7280] mb-6">
                            Your current leave allocation and usage
                        </p>

                        <div className="space-y-6">
                            {leaveBalances.map((balance) => (
                                <div key={balance.type} className="space-y-3">
                                    <div className="flex justify-between items-center font-jakarta">
                                        <div>
                                            <h3 className="capitalize font-medium">
                                                {balance.type} Leave
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {balance.remaining} of{" "}
                                                {balance.allocated} days
                                                remaining
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 text-sm font-medium bg-[#F9FAFB] border border-[#E5E7EB] rounded-full">
                                            {balance.used} used
                                        </span>
                                    </div>
                                    <div className="w-full bg-[#F9FAFB] rounded-full h-2">
                                        <div
                                            className="bg-[#212121] h-2 rounded-full transition-all duration-200"
                                            style={{
                                                width: `${
                                                    (balance.used /
                                                        balance.allocated) *
                                                    100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* recent leaves */}
                    <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6 mt-6">
                        <div className="flex items-center gap-2 mb-1 font-jakarta">
                            <Clock size={25} />
                            <h2 className="font-semibold text-2xl">
                                Recent Leave Requests
                            </h2>
                        </div>
                        <p className="text-sm text-[#6B7280] mb-6">
                            Your most recent leave applications
                        </p>

                        <div className="space-y-4">
                            {recentLeaves.slice(0, 3).map((leave) => (
                                <LeaveCard key={leave.id} leave={leave} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
