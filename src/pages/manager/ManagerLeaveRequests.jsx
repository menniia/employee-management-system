import { useState } from "react";
import ManagerHeader from "../../components/ManagerHeader";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    CircleCheck,
    Clock,
    Download,
    FileText,
    Search,
    XCircle,
} from "lucide-react";
import Select from "react-select";

const ManagerLeaveRequests = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [leaveTypeFilter, setLeaveTypeFilter] = useState("all");

    const leaveRequests = [
        {
            id: "1",
            employeeName: "Donatus Menniia",
            employeeId: "12345",
            position: "Frontend Developer",
            leaveType: "Vacation",
            startDate: "2025-09-15",
            endDate: "2025-09-19",
            days: 5,
            status: "pending",
            appliedDate: "2025-08-28",
            reason: "Vacation to Jo'burg",
            supportingDocument: "vacation-itinerary.pdf",
            urgency: "normal",
            leaveBalance: { vacation: 15, sick: 8, personal: 3 },
        },
        {
            id: "2",
            employeeName: "Menniia Quansah",
            employeeId: "23456",
            position: "Frontend Developer",
            leaveType: "Sick",
            startDate: "2025-10-10",
            endDate: "2024-12-13",
            days: 3,
            status: "pending",
            appliedDate: "2025-09-05",
            reason: "Flu symptoms",
            supportingDocument: "medical-certificate.pdf",
            urgency: "urgent",
            leaveBalance: { vacation: 20, sick: 9, personal: 5 },
        },
        {
            id: "3",
            employeeName: "Quan Donatus",
            employeeId: "34567",
            position: "UI/UX Designer",
            leaveType: "Personal",
            startDate: "2025-05-08",
            endDate: "2025-05-09",
            days: 1,
            status: "approved",
            appliedDate: "2024-04-01",
            reason: "Medical appointment",
            supportingDocument: "",
            urgency: "normal",
            approvedBy: "CFO",
            approvedDate: "2025-04-02",
            managerComments:
                "Approved for medical appointment. Please update on any follow-up needed.",
            leaveBalance: { vacation: 18, sick: 10, personal: 4 },
        },
        {
            id: "4",
            employeeName: "Menniia Quan",
            employeeId: "45678",
            position: "Backend Developer",
            leaveType: "Emergency",
            startDate: "2025-03-25",
            endDate: "2025-03-26",
            days: 2,
            status: "rejected",
            appliedDate: "2025-03-24",
            reason: "Family emergency - need to travel urgently",
            supportingDocument: "",
            urgency: "urgent",
            approvedBy: "CFO",
            approvedDate: "2025-03-25",
            managerComments:
                "Please follow emergency leave protocol and provide documentation. Resubmit with proper documentation.",
            leaveBalance: { vacation: 22, sick: 12, personal: 2 },
        },
    ];

    const statusOptions = [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
    ];

    const leaveTypes = ["Vacation", "Sick", "Personal", "Emergency"];

    const leaveTypeOptions = [
        { value: "all", label: "All Leave Types" },
        ...leaveTypes.map((type) => ({
            value: type.toLowerCase(),
            label: type,
        })),
    ];
    const filterLeaveRequests = leaveRequests.filter((request) => {
        const matchesSearch =
            request.employeeName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            request.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.leaveType
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            request.reason.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || request.status === statusFilter;

        const matchesLeaveType =
            leaveTypeFilter === "all" || request.leaveType === leaveTypeFilter;

        return matchesSearch && matchesStatus && matchesLeaveType;
    });

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
            year: "numeric",
        });
    };

    const handleApprove = (requestId) => {
        const comments = prompt("Add approval comments: ");
        console.log("Approving request:", requestId, "Comments: ", comments);
        // change this when i connect backend
    };

    const handleReject = (requestId) => {
        const comments = prompt("Provide reason for rejection: ");
        if (comments) {
            console.log("Rejection request:", requestId, "Comments:", comments);
        }
        // change this when i connect backend
    };

    const pendingCount = leaveRequests.filter(
        (r) => r.status === "pending"
    ).length;

    const approvedCount = leaveRequests.filter(
        (r) => r.status === "approved"
    ).length;

    const rejectedCount = leaveRequests.filter(
        (r) => r.status === "rejected"
    ).length;

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <ManagerHeader user={user} />
            <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* header */}
                    <div className="mb-8">
                        <Link
                            to="/manager"
                            className="inline-flex items-center text-[#757575] hover:text-[#616161] transition-colors duration-200 mb-4"
                        >
                            <ArrowLeft size={14} className="mr-2" />
                            Back to Dashboard
                        </Link>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-[#212121]">
                                    Team Leave Requests
                                </h1>
                                <p className="text-[#616161] mt-2">
                                    Review and approve leave requests from your
                                    team members
                                </p>
                            </div>
                            <button className="inline-flex items-center justify-center bg-[#4500FF] text-[#FFFFFF] px-6 py-3 rounded-lg font-medium leading-[100%] -tracking-[1%]">
                                <Download
                                    size={16}
                                    className="mr-2 pointer-events-none"
                                />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-[#495057]">
                                    Total Requests
                                </h3>
                                <FileText
                                    size={16}
                                    className="text-[#94A3B8]"
                                />
                            </div>
                            <div className="text-2xl font-bold text-[#212121]">
                                {leaveRequests.length}
                            </div>
                            <p className="text-xs text-[#64748B] mt-1">
                                From your team
                            </p>
                        </div>

                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-[#495057]">
                                    Pending
                                </h3>
                                <Clock size={16} className="text-[#F9A825]" />
                            </div>
                            <div className="text-2xl font-bold text-[#212121]">
                                {pendingCount}
                            </div>
                            <p className="text-xs text-[#64748B] mt-1">
                                Require your attention
                            </p>
                        </div>

                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-[#495057]">
                                    Approved
                                </h3>
                                <CircleCheck
                                    size={16}
                                    className="text-[#388E3C]"
                                />
                            </div>
                            <div className="text-2xl font-bold text-[#212121]">
                                {approvedCount}
                            </div>
                            <p className="text-xs text-[#64748B] mt-1">
                                This month
                            </p>
                        </div>

                        <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-[#495057]">
                                    Rejected
                                </h3>
                                <XCircle size={16} className="text-[#D32F2F]" />
                            </div>
                            <div className="text-2xl font-bold text-[#212121]">
                                {rejectedCount}
                            </div>
                            <p className="text-xs text-[#64748B] mt-1">
                                This month
                            </p>
                        </div>
                    </div>

                    {/* filter and search */}
                    <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-6 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search
                                        size={16}
                                        className="absolute left-3 top-3 text-[#94A3B8]"
                                    />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-1.5 border border-[#E5E7EB] rounded-sm"
                                        placeholder="Search by employee name, position or reason"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {/* <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                    className="px-3 py-2 border border-[#E5E7EB] rounded-lg"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>

                                <select
                                    value={leaveTypeFilter}
                                    onChange={(e) =>
                                        setLeaveTypeFilter(e.target.value)
                                    }
                                    className="px-3 py-2 border border-[#E5E7EB] rounded-lg"
                                >
                                    <option value="all">All Leave Types</option>
                                    {leaveTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select> */}

                                <Select
                                    options={statusOptions}
                                    value={statusOptions.find(
                                        (option) =>
                                            option.value === statusFilter
                                    )}
                                    onChange={(selectedOption) =>
                                        setStatusFilter(selectedOption.value)
                                    }
                                    isSearchable={false}
                                />

                                <Select
                                    options={leaveTypeOptions}
                                    value={leaveTypeOptions.find(
                                        (option) =>
                                            option.value === leaveTypeFilter
                                    )}
                                    onChange={(selectedOption) =>
                                        setLeaveTypeFilter(selectedOption.value)
                                    }
                                    isSearchable={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagerLeaveRequests;
