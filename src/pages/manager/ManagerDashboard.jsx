import ManagerHeader from "../../components/ManagerHeader";

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
    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <ManagerHeader />
            <div></div>
        </div>
    );
};

export default ManagerDashboard;
