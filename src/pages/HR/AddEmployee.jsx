import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HRHeader from "../../components/HRHeader";
import { ArrowLeft, Mail, Phone, User } from "lucide-react";

const AddEmployee = ({ user }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        manager: "",
        startDate: "",
        location: "",
        employeeId: "",
        status: "active",
        salary: "",
        leaveBalances: {
            sick: 10,
            personal: 5,
        },
    });

    const departments = [
        "Engineering",
        "Marketing",
        "Sales",
        "HR",
        "Finance",
        "Operations",
    ];

    const managers = ["Godfred", "Keelson", "Sohail"];
    const locations = ["Kasoa", "Adenta", "Botwe", "Dansoman"];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.department
        ) {
            alert("Please fill in all required fields");
            return;
        }

        // when an employee is addBusinessDays, this will be submitted to the api
        console.log("Adding new employee", formData);

        // show success message and redirect to hr dashboard
        alert("Employee added successfully");
        navigate("/hr/employees");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLeaveBalanceChange = (type, value) => {
        setFormData((prev) => ({
            ...prev,
            leaveBalances: {
                ...prev.leaveBalances,
                [type]: value,
            },
        }));
    };

    const generateEmployeeId = () => {
        const prefix = formData.department.substring(0, 3).toUpperCase();
        const randomNumber = Math.floor(Math.random() * 1000)
            .toString()
            .padStart(4, "0");
        const id = `${prefix}${randomNumber}`;
        setFormData((prev) => ({ ...prev, employeeId: id }));
    };
    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <HRHeader user={user} />

            <main className="pt-16 font-jakarta">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate("/hr/employees")}
                            className="inline-flex items-center text-[#4B5563] hover:text-[#373d45] transition-colors cursor-pointer mb-4"
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Employees
                        </button>
                        <h1 className="text-3xl font-semibold text-[#1d2228]">
                            Add New Employee
                        </h1>
                        <p className="text-[#3c444f] mt-2">
                            Create a new employee and set up their access
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* personal information */}
                        <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <User size={20} className="text-[#4500FF]" />
                                <h2 className="text-lg font-semibold text-[#1d2228]">
                                    Personal Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* first name  */}
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium text-[#1d2228] mb-2"
                                    >
                                        First Name{" "}
                                        <span className="text-red-500">*</span>{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                        required
                                    />
                                </div>

                                {/* last name  */}
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium text-[#1d2228] mb-2"
                                    >
                                        Last Name{" "}
                                        <span className="text-red-500">*</span>{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                        required
                                    />
                                </div>

                                {/* email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Email{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail
                                            size={16}
                                            className="absolute text-[#4B5563] left-3 top-3"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className=" w-full pl-10 px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* phone number */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Phone Number{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone
                                            size={16}
                                            className="absolute text-[#4B5563] left-3 top-3"
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className=" w-full pl-10 px-3 py-2 rounded-lg border border-[#E5E7EB]"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddEmployee;
