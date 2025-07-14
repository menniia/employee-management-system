import { differenceInBusinessDays, format } from "date-fns";
import {
    ArrowLeft,
    CalendarDays,
    CalendarIcon,
    CircleCheck,
    CircleCheckBig,
    FileImage,
    Info,
    Upload,
    X,
} from "lucide-react";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const RequestLeave = ({ user }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: "",
        startDate: "",
        endDate: "",
        reason: "",
        supportingDocument: null,
    });
    const [submitted, setIsSubmitted] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const leaveBalances = [
        { type: "annual", allocated: 20, used: 3, remaining: 17 },
        { type: "sick", allocated: 20, used: 13, remaining: 7 },
        { type: "personal", allocated: 20, used: 5, remaining: 15 },
    ];

    const leaveTypes = [
        {
            value: "annual",
            label: "Annual",
            description: "Total number of leaves in the year",
        },
        {
            value: "sick",
            label: "Sick Leave",
            description: "Medical leave for illness or injury",
        },
        {
            value: "personal",
            label: "Personal Leave",
            description: "Personal matters and appointments",
        },
        {
            value: "unpaid",
            label: "Unpaid Leave",
            description: "Extended leave without pay",
        },
        {
            value: "emergency",
            label: "Emergency Leave",
            description: "Unexpected urgent situations",
        },
    ];

    const calculateBusinessDays = (start, end) => {
        return differenceInBusinessDays(end, start) + 1;
    };

    const totalDays =
        formData.startDate && formData.endDate
            ? calculateBusinessDays(formData.startDate, formData.endDate)
            : 0;

    const selectedBalance = leaveBalances.find((b) => b.type === formData.type);
    const hasEnoughBalance = selectedBalance
        ? totalDays <= selectedBalance.remaining
        : true;

    // handle file upload
    const handleFileSelect = (file) => {
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file (JPG, PNG, GIF, etc.)");
            return;
        }

        // validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        setFormData((prev) => ({ ...prev, supportingDocument: file }));
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const removeFile = () => {
        setFormData((prev) => ({ ...prev, supportingDocument: null }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !formData.type ||
            !formData.startDate ||
            !formData.endDate ||
            !formData.reason.trim()
        ) {
            return;
        }

        // when i get the api this will submit
        console.log("Submitting leave request:", {
            ...formData,
            totalDays,
            // startDate: format(formData.startDate, "yyyy-MM-dd"),
            startDate: format(formData.startDate, "yyyy-MM-dd"),
            endDate: format(formData.endDate, "yyyy-MM-dd"),
            hasDocument: !!formData.supportingDocument,
            documentName: formData.supportingDocument?.name,
            documentSize: formData.supportingDocument?.size,
        });

        setIsSubmitted(true);
    };

    const isFormValid =
        formData.type &&
        formData.startDate &&
        formData.endDate &&
        formData.reason.trim() &&
        hasEnoughBalance;

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <CircleCheckBig
                        size={60}
                        className="text-green-500 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Request Submitted!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Your leave request has been submitted successfully.
                        You'll receive an email notification once your manager
                        reviews your request.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate("/")}
                            className="w-full sm:w-auto font-medium font-jakarta bg-[#111827] text-[#F9FAFB] px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-300"
                        >
                            Return to Dashboard
                        </button>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormData({
                                    type: "",
                                    startDate: undefined,
                                    endDate: undefined,
                                    reason: "",
                                    supportingDocument: null,
                                });
                            }}
                            className="w-full sm:w-auto sm:ml-3 font-jakarta bg-[#FFFFFF] text-[#212121] border border-[#E5E7EB] px-6 py-2 rounded-lg cursor-pointer font-medium hover:bg-[#F3F4F6] transition-colors duration-300"
                        >
                            Submit Another Request
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-jakarta">
            {/* header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center text-[#111827] hover:bg-[#F3F4F6] rounded-lg cursor-pointer transition-colors mb-4 px-5 py-3"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to dashboard
                </button>
                <h1 className="text-[#212121] text-2xl font-bold">
                    Request Leave
                </h1>
                <p className="text-[#6B7280] mt-2">
                    Submit a new leave request for approval.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* leave details card */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Leave Details</h2>
                        <p className="text-sm text-[#6B7280]">
                            Please provide the details for your leave request.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* leave type */}
                        <div className="space-y-2">
                            <label
                                htmlFor="leave-type"
                                className="block text-sm font-medium"
                            >
                                Leave Type{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <Select
                                inputId="leave-type"
                                options={leaveTypes.map((type) => {
                                    const balance = leaveBalances.find(
                                        (b) => b.type === type.value
                                    );
                                    return {
                                        value: type.value,
                                        label:
                                            type.label +
                                            (balance &&
                                            balance.type !== "unpaid"
                                                ? ` (${balance.remaining} left)`
                                                : ""),
                                    };
                                })}
                                placeholder="Select leave type"
                                value={leaveTypes
                                    .map((type) => {
                                        const balance = leaveBalances.find(
                                            (b) => b.type === type.value
                                        );
                                        return {
                                            value: type.value,
                                            label:
                                                type.label +
                                                (balance &&
                                                balance.type !== "unpaid"
                                                    ? ` (${balance.remaining} left)`
                                                    : ""),
                                        };
                                    })
                                    .find(
                                        (option) =>
                                            option.value === formData.type
                                    )}
                                onChange={(selectedOption) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        type: selectedOption?.value || "",
                                    }))
                                }
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                            {selectedBalance &&
                                selectedBalance.type !== "unpaid" && (
                                    <p className="text-sm text-[#6B7280]">
                                        You have {selectedBalance.remaining}{" "}
                                        {selectedBalance.type} days remaining
                                    </p>
                                )}
                        </div>

                        {/* date range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="startDate"
                                    className="block text-sm font-medium"
                                >
                                    Start Date{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative w-full">
                                    <CalendarDays
                                        size={16}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                    />
                                    <DatePicker
                                        id="startDate"
                                        selected={
                                            formData.startDate
                                                ? new Date(formData.startDate)
                                                : null
                                        }
                                        onChange={(date) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                startDate: date,
                                            }))
                                        }
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="YYYY-MM-DD"
                                        filterDate={(date) =>
                                            date.getDay() !== 0 &&
                                            date.getDay() !== 6
                                        }
                                        minDate={new Date()}
                                        className="w-full border border-[#E5E7EB] pl-10 pr-3 py-2 rounded-lg text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="endDate"
                                    className="block text-sm font-medium"
                                >
                                    End Date{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative w-full">
                                    <CalendarDays
                                        size={16}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                    />
                                    <DatePicker
                                        id="endDate"
                                        selected={
                                            formData.endDate
                                                ? new Date(formData.endDate)
                                                : null
                                        }
                                        onChange={(date) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                endDate: date,
                                            }))
                                        }
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="YYYY-MM-DD"
                                        filterDate={(date) =>
                                            date.getDay() !== 0 &&
                                            date.getDay() !== 6
                                        }
                                        minDate={
                                            formData.startDate
                                                ? new Date(formData.startDate)
                                                : new Date()
                                        }
                                        className="w-full border border-[#E5E7EB] pl-10 pr-3 py-2 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* duration delay */}
                        {totalDays > 0 && (
                            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-4">
                                <div className="flex items-center">
                                    <Info size={18} className="mr-2" />
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-sm">
                                            Total duration:{" "}
                                            <strong>
                                                {totalDays} business day
                                                {totalDays > 1 ? "s" : ""}
                                            </strong>
                                        </span>
                                        {!hasEnoughBalance && (
                                            <span className="text-sm text-red-500">
                                                Insufficient Leave Days
                                                Remaining
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* reason */}
                        <div className="space-y-2">
                            <label
                                htmlFor="reason"
                                className="block text-sm font-medium"
                            >
                                Reason <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="reason"
                                placeholder="Please provide a reason for your leave request..."
                                value={formData.reason}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        reason: e.target.value,
                                    }))
                                }
                                rows={4}
                                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4500FF] focus:border-[#4500FF] transition-colors resize-none"
                            />
                            <p className="text-sm text-[#6B7280]">
                                Please provide a clear and concise reason for
                                your leave request.
                            </p>
                        </div>

                        {/* supporting document */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">
                                Supporting Documents{" "}
                                <span className="text-[#6B7280]">
                                    (Optional)
                                </span>
                            </label>

                            {!formData.supportingDocument ? (
                                <div
                                    className={`relative border-2 border-[#E5E7EB] border-dashed rounded-xl p-6 transition-colors ${
                                        dragActive
                                            ? "border-[#4500FF] bg-[#F5FAFF]"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/"
                                        onChange={handleFileInputChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="text-center">
                                        <Upload
                                            size={32}
                                            className="text-[#6B7280] mx-auto mb-2"
                                        />
                                        <div className="text-sm text-[#6B7280]">
                                            <span className="font-medium text-[#4500FF]">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="border border-[#E5E7EB] rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                                <FileImage
                                                    size={25}
                                                    className="text-[#4500FF]"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {
                                                        formData
                                                            .supportingDocument
                                                            .name
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="p-1 text-[#6B7280] hover:text-[#212121] transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                            <p className="text-sm text-[#6B7280]">
                                Upload supporting documents such as medical
                                reports, appointment letters etc.
                            </p>
                        </div>
                    </div>
                </div>

                {/* guidelines */}
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6">
                    <h3 className="font-semibold mb-4">
                        📋Leave Request Guidelines
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-[#EFF6FF] rounded-xl">
                            <h4 className="text-[#1E3AA8] font-semibold mb-1.5">
                                Advance Notice
                            </h4>
                            <p className="text-[#1E40AF]">
                                Submit requests at least 2 weeks in advance when
                                possible.
                            </p>
                        </div>

                        <div className="p-3 bg-[#F0FDF4] rounded-xl">
                            <h4 className="text-[#145353] font-semibold mb-1.5">
                                Documentation
                            </h4>
                            <p className="text-[#166534]">
                                Medical certificates may be required for sick
                                leave over 3 days.
                            </p>
                        </div>

                        <div className="p-3 bg-[#FAF5FF] rounded-xl">
                            <h4 className="text-[#581C87] font-semibold mb-1.5">
                                Peak Periods
                            </h4>
                            <p className="text-[#6B21A8]">
                                Leave during busy periods may require additional
                                approval.
                            </p>
                        </div>

                        <div className="p-3 bg-[#FFF7ED] rounded-xl">
                            <h4 className="text-[#7C2D12] font-semibold mb-1.5">
                                Emergency
                            </h4>
                            <p className="text-[#9A3412]">
                                For emergencies, contact your manager
                                immediately by phone.
                            </p>
                        </div>
                    </div>
                </div>

                {/* submit */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="flex-1 px-6 py-2 bg-[#FFFFFF] text-sm sm:text-base text-[#212121] border border-[#E5E7EB] cursor-pointer rounded-lg font-medium hover:bg-[#F3F4F6] transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`flex-1 px-6 py-2 rounded-lg text-sm sm:text-base font-medium text-[#F9FAFB] transition-colors duration-300 ${
                            isFormValid
                                ? "bg-[#212121] hover:bg-gray-800 cursor-pointer"
                                : "bg-[#858991] cursor-not-allowed"
                        }`}
                    >
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestLeave;
