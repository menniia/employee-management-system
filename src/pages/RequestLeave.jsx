import { differenceInBusinessDays, format } from "date-fns";
import { ArrowLeft, CalendarIcon, CircleCheck, Info } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestLeave = ({ user }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: "",
        startDate: undefined,
        endDate: undefined,
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
                    <CircleCheck
                        size={30}
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
                            className="w-full sm:w-auto font-medium font-jakarta bg-[#111827] text-[#F9FAFB] px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                        >
                            {" "}
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
                            className="w-full sm:w-auto sm:ml-3 font-jakarta bg-[#FFFFFF] text-[#212121] border border-[#E5E7EB] px-6 py-2 rounded-lg font-medium hover:bg-[#F3F4F6] transition-colors duration-300"
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
                            <select
                                id="leave-type"
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        type: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4500FF] focus:border-[#4500FF] transition-colors"
                            >
                                <option value="">Select leave type</option>
                                {leaveTypes.map((type) => {
                                    const balance = leaveBalances.find(
                                        (b) => b.type === type.value
                                    );
                                    return (
                                        <option
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}{" "}
                                            {balance &&
                                                balance.type !== "unpaid" &&
                                                `(${balance.remaining} left)`}
                                        </option>
                                    );
                                })}
                            </select>
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
                                <label className="block text-sm font-medium">
                                    Start Date{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={
                                            formData.startDate
                                                ? format(
                                                      formData.startDate,
                                                      "yyyy-MM-dd"
                                                  )
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const date = e.target.value
                                                ? new Date(e.target.value)
                                                : undefined;
                                            setFormData((prev) => ({
                                                ...prev,
                                                startDate: date,
                                                endDate:
                                                    date &&
                                                    prev.endDate &&
                                                    date > prev.endDate
                                                        ? date
                                                        : prev.endDate,
                                            }));
                                        }}
                                        min={format(new Date(), "yyyy-MM-dd")}
                                        className="w-full px-3 py-2 pl-10 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4500FF] focus:border-[#4500FF] transition-colors"
                                    />
                                    <CalendarIcon
                                        size={18}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] pointer-events-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    End Date{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={
                                            formData.endDate
                                                ? format(
                                                      formData.endDate,
                                                      "yyyy-MM-dd"
                                                  )
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const date = e.target.value
                                                ? new Date(e.target.value)
                                                : undefined;
                                            setFormData((prev) => ({
                                                ...prev,
                                                endDate: date,
                                            }));
                                        }}
                                        min={
                                            formData.startDate
                                                ? format(
                                                      formData.startDate,
                                                      "yyyy-MM-dd"
                                                  )
                                                : format(
                                                      new Date(),
                                                      "yyyy-MM-dd"
                                                  )
                                        }
                                        className="w-full px-3 py-2 pl-10 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4500FF] focus:border-[#4500FF] transition-colors"
                                    />
                                    <CalendarIcon
                                        size={18}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] pointer-events-none"
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
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RequestLeave;
