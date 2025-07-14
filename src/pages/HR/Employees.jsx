import { useState } from "react";

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
        const matchSearch =
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="text-center">
            <div>hello</div>
        </div>
    );
};

export default Employees;
