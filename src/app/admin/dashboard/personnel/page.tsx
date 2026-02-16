"use client";

import React, {useEffect, useRef, useState} from 'react';
import {
    Search, UserPlus, FileDown, Edit2, Eye, Users,
    BookOpen, Briefcase, Clock, X, ChevronRight, Filter, ChevronDown
} from 'lucide-react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stats = [
    { label: "Total Personnel", count: "1,248", icon: <Users size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Teaching", count: "850", icon: <BookOpen size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Non-Teaching", count: "398", icon: <Briefcase size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "On Leave", count: "12", icon: <Clock size={20} />, color: "text-red-600", bg: "bg-red-50" },
];

// Inside your PersonnelPage component:
interface Personnel {
    id: string | number;
    firstName: string;
    lastName: string;
    middleName?: string;
    employeeId: string;
    position: string;
    division: string;
    category: string;
}

// Define the unit options based on DepEd structure
const unitOptions: Record<string, { label: string; value: string }[]> = {
    OSDS: [
        { label: "Administrative Unit", value: "OSDS-ADMIN" },
        { label: "ICT Unit", value: "OSDS-ICT" },
        { label: "Cash Unit", value: "OSDS-CASH" },
        { label: "Records Unit", value: "OSDS-RECORDS" },
        { label: "Personnel Unit", value: "OSDS-PERSONNEL" },
        { label: "Supply Unit", value: "OSDS-SUPPLY" },
        { label: "Legal Unit", value: "OSDS-LEGAL" },
        { label: "Finance / Accounting", value: "OSDS-FINANCE" },
    ],
    CID: [
        { label: "Alternative Learning System (ALS)", value: "CID-ALS" },
        { label: "Learning Resource Management (LRMS)", value: "CID-LRMS" },
        { label: "Instructional Management", value: "CID-IMPL" },
    ],
    SGOD: [
        { label: "Planning and Research", value: "SGOD-PLAN" },
        { label: "Human Resource Development", value: "SGOD-HRD" },
        { label: "Monitoring and Evaluation", value: "SGOD-M&E" },
        { label: "School Health and Nutrition", value: "SGOD-HEALTH" },
        { label: "Social Mobilization and Networking", value: "SGOD-SOCMOB" },
        { label: "Education Facilities", value: "SGOD-FAC" },
    ]
};

const positions = [
    // LEADERSHIP
    { label: "Schools Division Superintendent", group: "OSDS" },
    { label: "Assistant Schools Division Superintendent", group: "OSDS" },
    { label: "Chief Education Supervisor", group: "CID/SGOD" },

    // SUPERVISORY & SPECIALISTS
    ...["V", "IV", "III", "II", "I"].flatMap(lv => [
        { label: `Education Program Supervisor ${lv}`, group: "CID" },
        { label: `Public Schools District Supervisor`, group: "CID" }, // Usually one level
        { label: `Senior Education Program Specialist`, group: "SGOD" },
        { label: `Education Program Specialist II`, group: "SGOD" },
        { label: `Education Program Specialist I`, group: "SGOD" },
    ]),

    // ADMINISTRATIVE OFFICERS
    ...["V", "IV", "III", "II", "I"].map(lv => ({
        label: `Administrative Officer ${lv}`, group: "OSDS"
    })),

    // ADMINISTRATIVE ASSISTANTS & AIDES
    ...["VI", "V", "IV", "III", "II", "I"].flatMap(lv => [
        { label: `Administrative Assistant ${lv}`, group: "OSDS" },
        { label: `Administrative Aide ${lv}`, group: "OSDS" },
    ]),

    // TECHNICAL & PROFESSIONAL
    { label: "Attorney III", group: "OSDS - Legal" },
    { label: "Accountant III", group: "OSDS - Finance" },
    { label: "Accountant II", group: "OSDS - Finance" },
    { label: "Accountant I", group: "OSDS - Finance" },
    { label: "Information Technology Officer I", group: "OSDS - ICT" },
    { label: "Planning Officer III", group: "SGOD" },
    { label: "Planning Officer II", group: "SGOD" },
    { label: "Planning Officer I", group: "SGOD" },
    { label: "Librarian II", group: "CID - LRMS" },
    { label: "Librarian I", group: "CID - LRMS" },
    { label: "Project Development Officer II", group: "SGOD" },
    { label: "Project Development Officer I", group: "SGOD" },

    // MEDICAL & HEALTH
    { label: "Medical Officer III", group: "SGOD - Health" },
    { label: "Dentist II", group: "SGOD - Health" },
    { label: "Nurse II", group: "SGOD - Health" },
    { label: "Nurse I", group: "SGOD - Health" },

    // OTHERS
    { label: "Communications Equipment Operator II", group: "OSDS" },
    { label: "Communications Equipment Operator I", group: "OSDS" },
];
// 1. Define the interface so TS knows exactly what the form needs
interface PersonnelForm {
    lastName: string;
    firstName: string;
    middleName: string;
    suffix: string;
    email: string;
    contactNumber: string;
    employeeId: string;
    category: string;
    selectedDivision: string; // Must be here
    specificUnit: string;
}
interface Personnel {
    id: number | string;
    employee_id: string;      // Matches DB
    last_name: string;        // Matches DB
    first_name: string;       // Matches DB
    middle_name?: string;
    suffix?: string;
    email?: string;
    contact_number?: string;
    position_title: string;
    personnel_category: string;
    sdo_division: string;
    specific_unit: string;
    created_at: string;
}

// 2. Use that interface in your useState
const initialFormState: PersonnelForm = {
    lastName: "",
    firstName: "",
    middleName: "",
    suffix: "",
    email: "",
    contactNumber: "",
    employeeId: "",
    category: "Non-Teaching",
    selectedDivision: "", // Ensure this is initialized
    specificUnit: ""
};




export default function PersonnelPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [posSearch, setPosSearch] = useState("");
    const [isPosOpen, setIsPosOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Start as true

    const [formData, setFormData] = useState<PersonnelForm>(initialFormState);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Logic for Contact Number: Only allow digits
        if (name === "contactNumber") {
            // This regex removes anything that isn't a number
            const onlyNums = value.replace(/[^0-9]/g, '');

            setFormData(prev => ({
                ...prev,
                [name]: onlyNums
            }));
            return; // Exit early so it doesn't run the default update below
        }

        // Default update for all other fields
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const filteredPositions = positions.filter(p =>
        p.label.toLowerCase().includes(posSearch.toLowerCase())
    );

    // 1. Raw Data (from your state or props)
    // Change this:
    const [personnel, setPersonnel] = useState<Personnel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

// 2. Filter Logic (This is the variable TS is missing)
    const filteredPersonnel = personnel.filter((p: Personnel) => {
        const searchStr = searchTerm.toLowerCase();

        // Combine fields into one searchable string
        // Format: "Juan Santos Dela Cruz"
        const fullName = `${p.firstName} ${p.middleName || ''} ${p.lastName}`.toLowerCase();

        // Also check "Dela Cruz, Juan" format in case the user types a comma
        const reverseName = `${p.lastName}, ${p.firstName}`.toLowerCase();

        return (
            fullName.includes(searchStr) ||
            reverseName.includes(searchStr) ||
            p.employeeId.toLowerCase().includes(searchStr)
        );
    });

// 3. Pagination Logic (Uses the filtered list)
    const [personnelPage, setPersonnelPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastPersonnel = personnelPage * itemsPerPage;
    const indexOfFirstPersonnel = indexOfLastPersonnel - itemsPerPage;

// This is what you map in your <tbody>
    const currentPersonnel = filteredPersonnel.slice(indexOfFirstPersonnel, indexOfLastPersonnel);

    const totalPersonnelPages = Math.ceil(filteredPersonnel.length / itemsPerPage);
    const handleCreatePersonnel = async (e: React.FormEvent) => {
        e.preventDefault();

        // Safety check: Don't submit if position is empty
        if (!posSearch) {
            alert("Please select a Position / Designation");
            return;
        }

        setIsLoading(true);

        try {
            const newRecord = {
                // Accessing from formData object
                employee_id: formData.employeeId,
                last_name: formData.lastName.trim().toUpperCase(),
                first_name: formData.firstName.trim().toUpperCase(),
                middle_name: formData.middleName?.trim().toUpperCase() || "",
                suffix: formData.suffix,
                email: formData.email,
                contact_number: formData.contactNumber,

                // Accessing from separate states
                position_title: posSearch.toUpperCase(),
                sdo_division: selectedDivision, // The state used in your dropdown

                // Map the 'category' from formData
                personnel_category: formData.category,
                specific_unit: formData.specificUnit,
            };

            const response = await fetch('/api/admin/personnel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord),
            });

            if (response.ok) {
                const savedData = await response.json();
                toast.success("Personnel Record Created Successfully!", {
                    toastId: "success-create", // This prevents the 'ghosting' effect
                    onClose: () => console.log("Toast closed")
                });
                // This fixes Error #1 (setPersonnel will now accept savedData)
                setPersonnel(prev => [savedData, ...prev]);

                setIsModalOpen(false);
                setPosSearch("");

                // This fixes Error #2 (Uses the complete object)
                setFormData(initialFormState);

                // If selectedDivision is a separate state, reset it too
                setSelectedDivision("");


            } else {
                const error = await response.json();
                alert(`Error: ${error.message || 'Failed to save'}`);
            }
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Server connection failed. Check if your backend is running.");
        } finally {
            setIsLoading(false);
        }
    };

    // Inside your Component

// Fetch data on component mount
    useEffect(() => {
        const fetchPersonnel = async () => {
            try {
                const response = await fetch('/api/admin/personnel');
                if (response.ok) {
                    const data = await response.json();
                    setPersonnel(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPersonnel();
    }, []);

// Helper to get initials for the JD circle
    const getInitials = (first: string, last: string) => {
        return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="min-h-screen bg-background">

            {/* PERSONNEL ADD/EDIT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="font-serif font-bold text-xl text-primary uppercase">
                                    Add New Personnel
                                </h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">
                                    Official Service Record Entry • Digital 201 File
                                </p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-full hover:bg-slate-200 text-muted-foreground hover:text-primary transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleCreatePersonnel} className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-10">

                                {/* SECTION 1: PERSONAL INFORMATION */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap">Personal Information</span>
                                        <div className="h-px w-full bg-gradient-to-r from-border to-transparent"></div>
                                    </div>

                                    {/* Names Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="DELA CRUZ"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm uppercase font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="JUAN"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm uppercase font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Middle Name</label>
                                            <input
                                                type="text"
                                                name="middleName"
                                                value={formData.middleName}
                                                onChange={handleInputChange}
                                                placeholder="SANTOS"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm uppercase font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                        <div className="md:col-span-1 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Suffix</label>
                                            <select
                                                name="suffix"
                                                value={formData.suffix}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm font-bold uppercase focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all cursor-pointer"
                                            >
                                                <option value="">N/A</option>
                                                <option value="JR.">JR.</option>
                                                <option value="SR.">SR.</option>
                                                <option value="III">III</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Contact Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Official Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="juan.delacruz@deped.gov.ph"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Contact Number</label>
                                            <div className="flex group">
                        <span className="inline-flex items-center px-4 text-sm font-bold text-primary bg-slate-100 border border-r-0 border-border rounded-l-lg group-focus-within:border-primary transition-all">
                            +63
                        </span>
                                                <input
                                                    type="tel"
                                                    name="contactNumber"
                                                    value={formData.contactNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="9123456789"
                                                    maxLength={10}
                                                    className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-r-lg text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: EMPLOYMENT DETAILS */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap">Work Assignment</span>
                                        <div className="h-px w-full bg-gradient-to-r from-border to-transparent"></div>
                                    </div>

                                    {/* Row 1: ID, Searchable Position, Category */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Employee ID / Item No.</label>
                                            <input
                                                type="text"
                                                name="employeeId"
                                                value={formData.employeeId}
                                                onChange={handleInputChange}
                                                placeholder="2026-MC-0000"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm font-mono font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none uppercase transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                                                Position / Designation
                                            </label>
                                            <select
                                                name="position_title"
                                                value={posSearch}
                                                onChange={(e) => setPosSearch(e.target.value)}
                                                required
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm font-bold uppercase focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all cursor-pointer"
                                            >
                                                <option value="">-- SELECT POSITION --</option>
                                                {positions.map((pos, idx) => (
                                                    <option key={idx} value={pos.label}>
                                                        {pos.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Personnel Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm font-bold uppercase focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all cursor-pointer"
                                            >
                                                <option value="Teaching">TEACHING</option>
                                                <option value="Non-Teaching">NON-TEACHING</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 2: SDO Division & Unit */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">SDO Division</label>
                                            <select
                                                name="selectedDivision"
                                                value={selectedDivision}
                                                onChange={(e) => setSelectedDivision(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm font-bold uppercase focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all cursor-pointer"
                                                required
                                            >
                                                <option value="">-- SELECT DIVISION --</option>
                                                <option value="OSDS">OSDS (Office of the SDS)</option>
                                                <option value="CID">CID (Curriculum Implementation)</option>
                                                <option value="SGOD">SGOD (School Governance)</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Specific Unit / Section</label>
                                            <select
                                                name="specificUnit"
                                                value={formData.specificUnit}
                                                onChange={handleInputChange}
                                                disabled={!selectedDivision}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-lg text-sm font-bold uppercase focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all cursor-pointer"
                                                required
                                            >
                                                <option value="">
                                                    {!selectedDivision ? "SELECT DIVISION FIRST" : "-- SELECT UNIT --"}
                                                </option>
                                                {selectedDivision && unitOptions[selectedDivision as keyof typeof unitOptions].map((unit) => (
                                                    <option key={unit.value} value={unit.value}>
                                                        {unit.label.toUpperCase()}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex justify-end items-center gap-4 mt-12 pt-8 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-10 py-3 text-[11px] font-black uppercase tracking-[0.2em] bg-primary text-white rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "CREATING..." : "Create Record"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT WRAPPER */}
            <main className="space-y-8 mx-auto">

                {/* PAGE HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary tracking-tight">Personnel Directory</h1>
                        <p className="text-muted-foreground mt-1">Unified human resources database and 201 file management.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest border border-border bg-white rounded-xl hover:bg-slate-50 transition-all">
                            <FileDown size={16} /> Export CSV
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest bg-primary text-white rounded-xl hover:shadow-lg transition-all active:scale-95"
                        >
                            <UserPlus size={16} /> Add Personnel
                        </button>
                    </div>
                </div>

                {/* STATS SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white border border-border p-5 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-primary tracking-tight">{stat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DATA TABLE WRAPPER */}
                <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
                    {/* Filter Bar */}
                    <div className="p-5 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                placeholder="Search personnel name, ID, or position..."
                                className="w-full pl-12 pr-4 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold text-primary cursor-pointer hover:bg-slate-50">
                                <Filter size={14}/>
                                <span>Filter Dept</span>
                            </div>
                        </div>
                    </div>

                    {/* Table Implementation */}
                    {/* Personnel Table Container */}
                    <div className="w-full bg-white  border border-border overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-slate-50 border-b border-border">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        Employee Name
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        Position & ID
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    Loading Records...
                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : currentPersonnel.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                                No Personnel Records Found
                            </span>
                                        </td>
                                    </tr>
                                ) : (
                                    currentPersonnel.map((person) => (
                                        <tr
                                            key={person.id}
                                            className="hover:bg-slate-50/80 transition-all group border-transparent"
                                        >
                                            {/* COLUMN 1: NAME & EMAIL */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary text-[11px] font-black border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                                                        {person.first_name && person.last_name
                                                            ? (person.first_name[0] + person.last_name[0]).toUpperCase()
                                                            : "??"
                                                        }
                                                    </div>
                                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-primary leading-tight uppercase">
                                            {person.first_name} {person.last_name}
                                        </span>
                                                        <span className="text-[11px] text-muted-foreground lowercase">
                                            {person.email || "no-email@deped.gov.ph"}
                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* COLUMN 2: POSITION & ID */}
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-primary uppercase">
                                        {person.position_title}
                                    </span>
                                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-slate-100 rounded text-muted-foreground/70">
                                            ID
                                        </span>
                                                        <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-tighter">
                                            {person.employee_id}
                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* COLUMN 3: ACTIONS */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        title="View Details"
                                                        className="p-2 text-muted-foreground hover:text-primary hover:bg-white rounded-lg border border-transparent hover:border-border transition-all shadow-none hover:shadow-sm"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        title="Edit Record"
                                                        className="p-2 text-muted-foreground hover:text-accent hover:bg-white rounded-lg border border-transparent hover:border-border transition-all shadow-none hover:shadow-sm"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {!isLoading && currentPersonnel.length > 0 && (
                        <div
                            className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border bg-slate-50/30">
                            {/* Result Info */}

                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Showing {indexOfFirstPersonnel + 1} to {Math.min(indexOfLastPersonnel, currentPersonnel.length)} of {currentPersonnel.length}
                            </p>

                            {/* Controls */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setPersonnelPage(p => Math.max(p - 1, 1))}
                                    disabled={personnelPage === 1}
                                    className="px-3 py-1.5 text-[10px] font-black uppercase border border-border rounded bg-white disabled:opacity-40 hover:bg-slate-50 transition-all"
                                >
                                    Prev
                                </button>

                                <div className="flex gap-1">
                                    {[...Array(totalPersonnelPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setPersonnelPage(i + 1)}
                                            className={`w-8 h-8 text-[10px] font-bold rounded border transition-all ${
                                                personnelPage === i + 1
                                                    ? 'bg-primary text-white border-primary shadow-md'
                                                    : 'bg-white text-muted-foreground border-border hover:border-accent'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setPersonnelPage(p => Math.min(p + 1,totalPersonnelPages))}
                                    disabled={personnelPage === totalPersonnelPages}
                                    className="px-3 py-1.5 text-[10px] font-black uppercase border border-border rounded bg-white disabled:opacity-40 hover:bg-slate-50 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}