import { useState } from "react";
import HRHeader from "../../components/HRHeader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Employees = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Mock employee data
    const employees = [
        {
            id: "001",
            name: "Donatus Menniia",
            email: "donatus.mennia@company.com",
            phone: "+233 123-4567",
            department: "Engineering",
            position: "Senior Developer",
            status: "active",
            joinDate: "2025-03-03",
            location: "Ashaley Botwe, Accra",
            manager: "Godfred",
            leaveBalance: {
                family: 15,
                sick: 8,
                personal: 3,
            },
            profileImage: null,
        },
        {
            id: "002",
            name: "Gerald",
            email: "gerald@company.com",
            phone: "+233 234-5678",
            department: "Sales",
            position: "Sales Executive",
            status: "active",
            joinDate: "2021-08-20",
            location: "Accra",
            manager: "Sohail",
            leaveBalance: {
                family: 20,
                sick: 12,
                personal: 5,
            },
            profileImage: null,
        },
        {
            id: "003",
            name: "Benjamin",
            email: "benjamin@company.com",
            phone: "+233 345-6789",
            department: "Sales",
            position: "Digital",
            status: "active",
            joinDate: "2025-06-22",
            location: "Accra",
            manager: "Chris",
            leaveBalance: {
                family: 25,
                sick: 10,
                personal: 4,
            },
            profileImage: null,
        },
        {
            id: "004",
            name: "Some Name",
            email: "example@company.com",
            phone: "+233 456-7890",
            department: "Example Department",
            position: "Sample Officer",
            status: "inactive",
            joinDate: "2022-11-05",
            location: "Ghana",
            manager: "Sample Manager",
            leaveBalance: {
                family: 10,
                sick: 6,
                personal: 2,
            },
            profileImage: null,
        },
    ];

    const departments = [
        { value: "engineering", label: "Engineering" },
        { value: "marketing", label: "Marketing" },
        { value: "sales", label: "Sales" },
        { value: "hr", label: "HR" },
        { value: "finance", label: "Finance" },
        { value: "operations", label: "Operations" },
    ];

    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch =
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment =
            departmentFilter === "all" ||
            employee.department === departmentFilter;
        const matchesStatus =
            statusFilter === "all" || employee.status === statusFilter;

        return matchesSearch && matchesDepartment && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-[#DCFCE7] text-[#166534] border-2 border-[#BBF7D0]";
            case "on-leave":
                return "bg-[#FEF9C3] text-[#854D0E] border-2 border-[#FEF08A]";
            case "inactive":
                return "bg-red-100 text-red-700 border-2 border-[#F04438]";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getUserInitials = (name) => {
        return name
            .split("")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleDeleteEmployee = (employeeId) => {
        if (
            window.confirm(
                "Are you sure you want to delete this employee? This action cannot be undone"
            )
        ) {
            console.log("Deleting employee", employeeId);
            // when backend is integrated this will delete from the database
        }
    };

    const activeCount = employees.filter((e) => e.status === "active").length;
    const inactiveCount = employees.filter(
        (e) => e.status === "inactive"
    ).length;

    return (
        <div className="min-h-screen">
            <HRHeader user={user} />
            <main className="pt-16 font-jakarta">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* header */}
                    <div className="mb-8">
                        <Link
                            to="/hr"
                            className="inline-flex items-center text-[#4B5563] hover:text-[#373d45] transition-colors cursor-pointer mb-4"
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Dashboard
                        </Link>
                        <div>
                            <h1 className="text-3xl font-semibold text-[#1d2228]">
                                Employee Management
                            </h1>
                            <p className="text-[#3c444f] mt-2">
                                Manage employee information and access
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Employees;
