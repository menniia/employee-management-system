import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CircleCheckBig,
    Clock,
    Plus,
    Search,
    XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LeaveCard from "../components/LeaveCard";

const MyLeaves = ({ user }) => {
    // mock data for user's leave requests
    const myLeaveRequests = [
        {
            id: "1",
            employeeId: "emp1",
            employeeName: "Menniia Donatus",
            type: "vacation",
            leaveType: "vacation",
            startDate: "2024-04-15",
            endDate: "2024-04-19",
            totalDays: 5,
            days: 5,
            reason: "Family vacation to Hawaii",
            status: "Pending",
            appliedDate: "2024-03-28",
        },
        {
            id: "2",
            employeeId: "emp1",
            employeeName: "Sarah Johnson",
            type: "vacation",
            leaveType: "vacation",
            startDate: "2024-03-15",
            endDate: "2024-03-19",
            totalDays: 5,
            days: 5,
            reason: "Spring break with family",
            status: "Approved",
            appliedDate: "2024-02-28",
            approvedBy: "Rasna",
            approvedDate: "2024-03-01",
        },
        {
            id: "3",
            employeeId: "emp1",
            employeeName: "Sarah Johnson",
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
            id: "4",
            employeeId: "emp1",
            employeeName: "Sarah Johnson",
            type: "personal",
            leaveType: "personal",
            startDate: "2024-01-25",
            endDate: "2024-01-25",
            totalDays: 1,
            days: 1,
            reason: "Dental appointment",
            status: "Rejected",
            appliedDate: "2024-01-20",
            approvedBy: "Rasna",
            approvedDate: "2024-01-21",
        },
        {
            id: "5",
            employeeId: "emp1",
            employeeName: "Sarah Johnson",
            type: "sick",
            leaveType: "sick",
            startDate: "2024-01-15",
            endDate: "2024-01-16",
            totalDays: 2,
            days: 2,
            reason: "Medical checkup",
            status: "Approved",
            appliedDate: "2024-01-10",
            approvedBy: "Rasna",
            approvedDate: "2024-01-11",
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTab, setSelectedTab] = useState("all");

    const pendingRequests = myLeaveRequests.filter(
        (req) => req.status.toLowerCase() === "pending"
    );
    const approvedRequests = myLeaveRequests.filter(
        (req) => req.status.toLowerCase() === "approved"
    );
    const rejectedRequests = myLeaveRequests.filter(
        (req) => req.status.toLowerCase() === "rejected"
    );

    const filteredRequests = (requests) => {
        return requests.filter(
            (req) =>
                req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.reason.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const getRequestsByTab = () => {
        switch (selectedTab) {
            case "pending":
                return filteredRequests(pendingRequests);
            case "approved":
                return filteredRequests(approvedRequests);
            case "rejected":
                return filteredRequests(rejectedRequests);
            default:
                return filteredRequests(myLeaveRequests);
        }
    };
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-jakarta">
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center font-medium text-sm text-[#111827] hover:bg-[#F3F4F6] rounded-lg cursor-pointer transition-colors mb-4 px-5 py-3"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Dashboard
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            My Leave Requests
                        </h1>
                        <p className="mt-2 text-[#6B7280] text-sm">
                            View and manage all your leave requests.
                        </p>
                    </div>
                    <Link
                        to="/request-leave"
                        className="inline-flex items-center justify-center font-jakarta bg-[#111827] text-[#F9FAFB] text-sm px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                    >
                        <Plus size={18} className="mr-2" />
                        New Request
                    </Link>
                </div>
            </div>

            {/* stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* total requests */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold">
                            Total Requests
                        </h3>
                        <Calendar size={16} className="text-[#6B7280]" />
                    </div>
                    <div className="text-2xl font-bold">
                        {myLeaveRequests.length}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">This year</p>
                </div>

                {/* pending */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold">Pending</h3>
                        <AlertCircle size={18} className="text-[#EAB308]" />
                    </div>
                    <div className="text-2xl font-bold">
                        {pendingRequests.length}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">
                        Awaiting approval
                    </p>
                </div>

                {/* approved */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold">Approved</h3>
                        <CircleCheckBig size={18} className="text-[#22C55E]" />
                    </div>
                    <div className="text-2xl font-bold">
                        {approvedRequests.length}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">This year</p>
                </div>

                {/* rejected */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold">Rejected</h3>
                        <XCircle size={16} className="text-[#EF4444]" />
                    </div>
                    <div className="text-2xl font-bold">
                        {myLeaveRequests.length}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">This year</p>
                </div>
            </div>

            {/* leave request history main content */}
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                <div className="mb-6">
                    <h2 className="text-[22px] font-semibold mb-1">
                        Leave Request History
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                        View all your leave requests and their current status
                    </p>
                </div>

                {/* search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search
                            size={16}
                            className="absolute left-3 top-3 text-[#6B7280]"
                        />
                        <input
                            type="text"
                            placeholder="Search by leave type or reason..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-sm focus:ring-2 focus:ring-[#4500FF] focus:border-[#4500FF] transition-colors"
                        />
                    </div>
                </div>

                {/* navigation tabs */}
                <div className="mb-6">
                    <div className="bg-[#F3F4F6] rounded-xl py-1.5">
                        <nav className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar px-2 sm:px-0">
                            <button
                                onClick={() => setSelectedTab("all")}
                                className={`p-2 text-xs sm:text-sm font-medium text-center min-w-[200px] sm:w-[245px] rounded-lg cursor-pointer ${
                                    selectedTab === "all"
                                        ? "bg-[#FFFFFF]"
                                        : "text-[#6B7280]"
                                }`}
                            >
                                All ({myLeaveRequests.length})
                            </button>

                            <button
                                onClick={() => setSelectedTab("pending")}
                                className={`p-2 text-xs sm:text-sm font-medium min-w-[200px] sm:w-[245px] rounded-lg cursor-pointer flex items-center justify-center gap-2 ${
                                    selectedTab === "pending"
                                        ? "bg-[#FFFFFF]"
                                        : "text-[#6B7280]"
                                }`}
                            >
                                <Clock size={16} />
                                Pending ({pendingRequests.length})
                            </button>

                            <button
                                onClick={() => setSelectedTab("approved")}
                                className={`p-2 text-xs sm:text-sm font-medium min-w-[200px] sm:w-[245px] rounded-lg cursor-pointer flex items-center justify-center gap-2 ${
                                    selectedTab === "approved"
                                        ? "bg-[#FFFFFF]"
                                        : "text-[#6B7280]"
                                }`}
                            >
                                <CircleCheckBig size={16} />
                                Approved ({approvedRequests.length})
                            </button>

                            <button
                                onClick={() => setSelectedTab("rejected")}
                                className={`p-2 text-xs sm:text-sm font-medium min-w-[200px] sm:w-[245px] rounded-lg cursor-pointer flex items-center justify-center gap-2 ${
                                    selectedTab === "rejected"
                                        ? "bg-[#FFFFFF]"
                                        : "text-[#6B7280]"
                                }`}
                            >
                                <XCircle size={16} />
                                Rejected ({pendingRequests.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* content */}
                <div className="mt-6">
                    {getRequestsByTab().length === 0 ? (
                        <div className="text-center py-12 text-[#6B7280]">
                            <Calendar
                                size={48}
                                className="mx-auto mb-4 text-[#D1D5DB]"
                            />
                            <h3 className="font-bold mb-2 text-lg">
                                No requests found
                            </h3>
                            <p className="mb-6">
                                {searchTerm
                                    ? "No leave requests match your search criteria."
                                    : selectedTab === "all"
                                    ? "You haven't submitted any leave requests yet"
                                    : `No ${selectedTab} leave requests found`}
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {getRequestsByTab()
                                .sort(
                                    (a, b) =>
                                        new Date(b.appliedDate).getTime() -
                                        new Date(a.appliedDate).getTime()
                                )
                                .map((request) => (
                                    <LeaveCard
                                        key={request.id}
                                        leave={request}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyLeaves;
