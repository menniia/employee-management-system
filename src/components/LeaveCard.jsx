import { Calendar, Clock, User } from "lucide-react";

const LeaveCard = ({ leave }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "bg-[#DCFCE7] text-[#166534] border-2 border-[#BBF7D0]";
            case "pending":
                return "bg-[#FEF9C3] text-[#854D0E] border-2 border-[#FEF08A]";
            case "rejected":
                return "bg-red-100 text-red-700 border-2 border-[#F04438]";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="border border-[#E5E7EB] rounded-xl p-4 font-jakarta hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center">
                        <User size={20} className="text-[#6B7280]" />
                    </div>
                    <div>
                        <div className="font-medium capitalize text-[#212121]">
                            {leave.type || leave.leaveType} Leave
                        </div>
                        <div className="text-sm text-[#999EA7]">
                            {leave.totalDays || leave.days} day
                            {(leave.totalDays || leave.days) > 1 ? "s" : ""}
                        </div>
                    </div>
                </div>
                <div>
                    <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                            leave.status
                        )}`}
                    >
                        {leave.status}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-[#999EA7]">
                <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-[#999EA7]" />

                    {/* change this design when I'm done */}
                    <span className="font-semibold text-[#212121]">
                        Start Date: {formatDate(leave.startDate)}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-[#999EA7]" />

                    {/* change this design when I'm done */}
                    <span className="font-semibold text-[#212121]">
                        End Date: {formatDate(leave.startDate)}
                    </span>
                </div>
            </div>

            {/* Check This */}
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-[#999EA7]">
                <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-[#999EA7]" />

                    {/* change this design when I'm done */}
                    <span className="font-semibold text-[#212121]">
                        Applied on: {formatDate(leave.appliedDate)}
                    </span>
                </div>
            </div>

            <div className="mb-3">
                <span className="text-sm text-[#999EA7] font-medium">
                    Reason
                </span>
                <p className="text-sm text-[#212121] bg-[#F9FAFB] p-3 rounded-lg">
                    {leave.reason}
                </p>
            </div>

            {leave.status.toLowerCase() === "approved" && leave.approvedBy && (
                <div className="text-sm text-[#999EA7]">
                    Approved by {leave.approvedBy} on{" "}
                    {formatDate(leave.approvedDate || leave.appliedDate)}
                </div>
            )}
        </div>
    );
};

export default LeaveCard;
