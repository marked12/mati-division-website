"use client";
import React, {useEffect, useState} from 'react';
import {
    FileText,
    Calendar,
    ChevronRight,
    Plus,
    X,
    Eye,
    UploadCloud,
    FileCheck,
    Gavel,
    Clock,
    Edit,
    Archive, Search, RotateCcw
} from 'lucide-react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatCard from "@/src/components/StatCard";
import Link from "next/link";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function AdminBidsPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Auth States
    const [userId, setUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState("");
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"active" | "archived">("active");

// 1. Calculate Counts
    const activeCount = bids.filter((b: any) => b.status === 0).length;
    const archivedCount = bids.filter((b: any) => b.status === 1).length;

    const [bidPage, setBidPage] = useState(1);
    const bidsPerPage = 10;

    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Goods & Services' // Matches your new VARCHAR plan
    });
    const fetchBids = async () => {
        try {
            const res = await fetch('/api/admin/bids');
            const data = await res.json();
            setBids(data);
        } catch (error) {
            toast.error("Failed to load records");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchBids();
    }, []);

    // 1. Sync Auth from Cookies
    useEffect(() => {
        const checkAuth = () => {
            const userCookie = Cookies.get('user');
            // console.log("Raw Cookie Content:", userCookie); // Debug: Check if cookie exists

            if (userCookie) {
                try {
                    const parsedUser = JSON.parse(userCookie);
                    // console.log("Parsed User ID:", parsedUser.id); // Debug: Check if ID exists

                    setUserId(parsedUser.id);
                    setUserName(parsedUser.firstName);
                } catch (e) {
                    console.error("Auth sync error", e);
                }
            }
            setIsMounted(true);
        };
        checkAuth();
    }, []);

    // 2. Handle File Selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        toast.dismiss();

        if (file) {
            if (file.type !== 'application/pdf') {
                toast.error("Invalid file type. Please upload a PDF.");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File too large (Max 10MB).");
                return;
            }

            if (previewUrl) URL.revokeObjectURL(previewUrl);

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            toast.info("PDF attached!");
        }
    };
    const handleCloseModal = () => {
        // If we were editing, we must clear the state so it's fresh for next time
        if (editingId) {
            setEditingId(null);
            setFormData({
                title: "",
                category: "Goods & Services", // or your default
                date: ""
            });
            setPreviewUrl(null);
            setSelectedFile(null);
        }

        // If it was a "New" entry (editingId was null), we do NOTHING to the state.
        // This allows you to close it and come back to your draft.
        setIsModalOpen(false);
    };

    // 3. Save Logic
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // CHANGE: Only require a file if it's a NEW post.
        // If editing, allow it to be null (meaning keep the old file).
        if (!editingId && !selectedFile) {
            toast.warning("Please attach a bidding document (PDF).");
            return;
        }

        if (!userId) {
            toast.error("You must be logged in to publish.");
            return;
        }

        const loadingToast = toast.loading(editingId ? "Updating record..." : "Publishing to portal...");

        try {
            const data = new FormData();

            // Only append the file if the user actually selected a new one
            if (selectedFile) {
                data.append('file', selectedFile);
            }

            // Always append these
            if (editingId) data.append('id', editingId.toString());
            data.append('title', formData.title);
            data.append('date', formData.date);
            data.append('category', formData.category);
            data.append('author_id', userId);

            const response = await fetch('/api/admin/bids', {
                method: editingId ? 'PUT' : 'POST', // Use PUT for updates
                body: data,
            });

            if (!response.ok) throw new Error('Save failed');

            toast.update(loadingToast, {
                render: editingId ? "Updated successfully!" : "Published successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000
            });

            setIsModalOpen(false);
            fetchBids();

            // Reset state...
        } catch (error: any) {
            toast.update(loadingToast, { render: error.message, type: "error", isLoading: false, autoClose: 3000 });
        }
    };
    const handleEdit = (bid: any) => {
        setEditingId(bid.id);

        let formattedDate = "";
        if (bid.publish_date) {
            const d = new Date(bid.publish_date);

            // Extract local components to ensure it matches what you see on the screen
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');

            formattedDate = `${year}-${month}-${day}`; // Result: "2026-02-12"
        }

        setFormData({
            title: bid.title || "",
            category: bid.category || "",
            date: formattedDate
        });

        setPreviewUrl(bid.pdf_url);
        setIsModalOpen(true);
    };



    // Accept 'id' AND the 'newStatus' (0 or 1)
    const handleArchive = async (id: number, newStatus: number) => {
        const isArchiving = newStatus === 1;
        const actionText = isArchiving ? "archive" : "restore";

        // 1. SweetAlert2 Confirmation Dialog
        const result = await Swal.fire({
            title: `<span class="font-serif">${isArchiving ? 'Archive' : 'Restore'} Posting?</span>`,
            text: isArchiving
                ? "This will hide the notice from the public view."
                : "This will make the notice visible to the public again.",
            icon: isArchiving ? 'warning' : 'question',
            showCancelButton: true,
            confirmButtonColor: isArchiving ? '#f59e0b' : '#10b981', // Amber for archive, Emerald for restore
            cancelButtonColor: '#64748b',
            confirmButtonText: `Yes, ${actionText} it!`,
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-xl border border-border shadow-2xl',
                title: 'text-primary font-bold',
                confirmButton: 'rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wider',
                cancelButton: 'rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wider'
            }
        });

        // Exit if user cancels
        if (!result.isConfirmed) return;

        // 2. Proceed with the API call
        const loadingToast = toast.loading(`${isArchiving ? 'Archiving' : 'Restoring'} record...`);

        try {
            const data = new FormData();
            data.append('id', id.toString());
            data.append('status', newStatus.toString());

            const response = await fetch('/api/admin/bids', {
                method: 'PUT',
                body: data,
            });

            if (!response.ok) throw new Error(`Failed to ${actionText}`);

            toast.update(loadingToast, {
                render: `Notice successfully ${isArchiving ? 'archived' : 'restored'}`,
                type: "success",
                isLoading: false,
                autoClose: 3000
            });

            fetchBids(); // Refresh the list
        } catch (error: any) {
            toast.update(loadingToast, {
                render: error.message,
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
        }
    };

    const filteredBids = bids.filter((bid: any) => {
        const matchesSearch = bid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bid.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "active" ? bid.status === 0 : bid.status === 1;
        return matchesSearch && matchesStatus;
    });
    useEffect(() => {
        setBidPage(1);
    }, [searchQuery, filterStatus]);
    if (!isMounted) return null; // Prevent hydration flash

    // Pagination Logic
    const totalBidPages = Math.ceil(filteredBids.length / bidsPerPage);
    const indexOfLastBid = bidPage * bidsPerPage;
    const indexOfFirstBid = indexOfLastBid - bidsPerPage;

// This is what you will .map() in your table body
    const currentBids = filteredBids.slice(indexOfFirstBid, indexOfLastBid);

// Reset to page 1 when searching or changing tabs


    return (
        <div className="min-h-screen bg-background pb-20">
            <ToastContainer/>

            {/* Header Banner */}

            <div className="max-w-5xl mx-auto px-4 mt-10 space-y-4">
                {/* Main Management Card */}
                <div
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-border shadow-sm">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-primary italic">Bids Opportunities
                            Management</h2>
                        <p className="text-sm text-muted-foreground font-medium">Post procurement opportunities and
                            manage bidding documents.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold uppercase px-4 py-2.5 rounded hover:bg-accent transition-all shadow-md shadow-primary/20"
                    >
                        <Plus size={16}/> New Bid Opportunity
                    </button>
                </div>

                {/* Navigation Utility Bar */}


                <div className="flex justify-end mt-4">
                    <Link
                        href="/admin/dashboard/award-notices"
                        className="flex items-center gap-3 px-4 py-2 bg-white border border-border rounded-lg shadow-sm hover:border-accent group transition-all"
                    >
                        <div className="flex flex-col items-end">
                        <span
                            className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                            Next Section
                        </span>
                            <span className="text-[11px] font-bold text-primary uppercase tracking-tighter">
                            Manage Award Notices
                        </span>
                        </div>
                        <div
                            className="bg-slate-50 p-1.5 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform"/>
                        </div>
                    </Link>
                </div>
            </div>


            {/* List Container */}
            <div className="max-w-6xl mx-auto px-4 mt-12 pb-20">
                <div className="flex items-center justify-between mb-6 border-b pb-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        Recent Postings
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">
            Total Records: {Array.isArray(bids) ? bids.length : 0}
        </span>
                </div>

                <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 mt-8 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* Search Bar */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        size={16}/>
                                <input
                                    type="text"
                                    placeholder="Search by title or category..."
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Status Tabs */}
                            <div className="flex bg-slate-100 p-1 rounded-lg border border-border">
                                <button
                                    onClick={() => setFilterStatus("active")}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'active' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'}`}
                                >
                                    Active
                                    <span
                                        className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${filterStatus === 'active' ? 'bg-accent text-white' : 'bg-slate-200 text-slate-500'}`}>
                                        {activeCount}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setFilterStatus("archived")}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'archived' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'}`}
                                >
                                    Archived
                                    <span
                                        className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${filterStatus === 'archived' ? 'bg-slate-300 text-slate-600' : 'bg-slate-200 text-slate-500'}`}>
                                        {archivedCount}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Table Header Counter Info */}
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                {filterStatus} Postings
                            </h3>
                        </div>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-slate-50 border-b border-border">
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Title</th>
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Category</th>
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Publish Date</th>
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground text-center">Author</th>
                            <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-20 text-center">
                                    <div className="flex flex-col items-center opacity-50">
                                        <div className="animate-spin mb-2"><FileText size={20}/></div>
                                        <p className="text-[10px] font-black uppercase tracking-widest">Fetching Database...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : currentBids.length > 0 ? (
                            currentBids.map((bid: any) => (
                                <tr key={bid.id} className="group hover:bg-slate-50/50 transition-colors">
                                    {/* Title Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="text-primary/40 group-hover:text-accent transition-colors">
                                                <FileText size={18}/>
                                            </div>
                                            <div className="flex flex-col">
                            <span className="text-sm font-serif font-bold text-primary leading-tight line-clamp-1">
                                {bid.title}
                            </span>
                                                {bid.status === 1 && (
                                                    <span className="w-fit text-[7px] bg-slate-200 text-slate-500 px-1 rounded uppercase font-bold mt-1">
                                    Archived
                                </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category Column (NEW) */}
                                    <td className="px-6 py-4">
                    <span className="text-[9px] font-black text-accent border border-accent/20 px-2 py-0.5 rounded-full uppercase tracking-tighter bg-accent/5">
                        {bid.category}
                    </span>
                                    </td>

                                    {/* Date Column */}
                                    <td className="px-6 py-4">
                  <span className="text-[11px] text-muted-foreground font-medium">
    {(() => {
        // Create the date object
        const d = new Date(bid.publish_date);

        // Use local methods instead of UTC
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[d.getMonth()];
        const day = d.getDate();
        const year = d.getFullYear();

        return `${month} ${day}, ${year}`;
    })()}
</span>
                                    </td>

                                    {/* Author Column */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[11px] text-primary font-bold">{bid.authorName || 'N/A'}</span>
                                        </div>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">

                                            {/* Edit Button */}
                                            <div className="flex items-center gap-1">
                                                {/* Edit Button - Only shows if NOT archived (status 0) */}
                                                {bid.status === 0 && (
                                                    <button
                                                        onClick={() => handleEdit(bid)}
                                                        className="p-2 hover:bg-amber-50 hover:text-amber-600 rounded-md transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16}/>
                                                    </button>
                                                )}

                                                {/* Archive/Restore Button - Always visible, changes icon based on status */}
                                                <button
                                                    onClick={() => handleArchive(bid.id, bid.status === 0 ? 1 : 0)}
                                                    className={`p-2 rounded-md transition-colors ${
                                                        bid.status === 0
                                                            ? 'hover:bg-slate-100 text-muted-foreground hover:text-slate-600'
                                                            : 'hover:bg-green-50 text-green-600'
                                                    }`}
                                                    title={bid.status === 0 ? "Archive" : "Restore to Active"}
                                                >
                                                    {bid.status === 0 ? <Archive size={16}/> : <RotateCcw size={16}/>}
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-2 opacity-40">
                                        <Search size={32} className="text-slate-300" />
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                                            No {filterStatus} notices found
                                        </p>
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery("")}
                                                className="text-[9px] text-accent underline font-bold uppercase tracking-tighter"
                                            >
                                                Clear Search
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {!loading && filteredBids.length > 0 && (
                        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border bg-slate-50/30">
                            {/* Result Info */}
                            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                                Showing <span className="text-primary font-bold">{indexOfFirstBid + 1}</span> to{" "}
                                <span className="text-primary font-bold">
                {Math.min(indexOfLastBid, filteredBids.length)}
            </span>{" "}
                                of <span className="text-primary font-bold">{filteredBids.length}</span> notices
                            </p>

                            {/* Controls */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setBidPage(p => Math.max(p - 1, 1))}
                                    disabled={bidPage === 1}
                                    className="px-3 py-1.5 text-[10px] font-black uppercase border border-border rounded bg-white disabled:opacity-40 hover:bg-slate-50 transition-all"
                                >
                                    Prev
                                </button>

                                <div className="flex gap-1">
                                    {[...Array(totalBidPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setBidPage(i + 1)}
                                            className={`w-8 h-8 text-[10px] font-bold rounded border transition-all ${
                                                bidPage === i + 1
                                                    ? 'bg-primary text-white border-primary shadow-md'
                                                    : 'bg-white text-muted-foreground border-border hover:border-accent'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setBidPage(p => Math.min(p + 1, totalBidPages))}
                                    disabled={bidPage === totalBidPages}
                                    className="px-3 py-1.5 text-[10px] font-black uppercase border border-border rounded bg-white disabled:opacity-40 hover:bg-slate-50 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-5xl h-[85vh] overflow-hidden rounded-lg shadow-2xl flex flex-col border border-border">

                        {/* Dynamic Header */}
                        <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
                            <h2 className="font-serif font-bold text-primary uppercase text-sm tracking-[0.2em]">
                                {editingId ? 'Edit Procurement Notice' : 'New Procurement Notice'}
                            </h2>
                            <button
                                onClick={handleCloseModal} // Use the new function here
                                className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                            >
                                <X size={20}/>
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                            {/* Left Side: Form */}
                            <form onSubmit={handleSave} className="w-full md:w-2/5 p-6 border-r overflow-y-auto space-y-5 bg-slate-50/50">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2 text-primary">
                                        Project Description
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        /* ADDED VALUE HERE */
                                        value={formData.title}
                                        className="w-full border border-border rounded p-3 text-sm font-serif focus:border-accent outline-none bg-white"
                                        placeholder="Full title as per PR..."
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2 text-primary">
                                            Publish Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent"
                                            value={formData.date}
                                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2 text-primary">
                                            Classification
                                        </label>
                                        <select
                                            className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent"
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        >
                                            <option value="Goods & Services">Goods & Services</option>
                                            <option value="Civil Works">Civil Works</option>
                                            <option value="Consulting">Consulting</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Upload Component */}
                                <div className="relative group">
                                    <input type="file" accept=".pdf" onChange={handleFileChange}
                                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                                    <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all ${selectedFile ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 group-hover:border-accent bg-white'}`}>
                                        {selectedFile ? (
                                            <>
                                                <FileCheck size={28} className="text-emerald-600 mb-2"/>
                                                <span className="text-[10px] font-bold text-emerald-800 text-center">{selectedFile.name}</span>
                                            </>
                                        ) : (
                                            <>
                                                <UploadCloud size={28} className="text-slate-400 mb-2"/>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                        {editingId ? 'Change PDF Opportunity' : 'Attach PDF Opportunity'}
                                    </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Dynamic Submit Button */}
                                <button type="submit"
                                        className="w-full bg-primary text-white font-black py-4 rounded uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all shadow-md active:scale-95">
                                    {editingId ? 'Update Notice' : 'Publish to Portal'}
                                </button>
                            </form>

                            {/* Right Side: Preview */}
                            <div className="hidden md:flex flex-1 bg-slate-100 relative items-center justify-center border-l border-border">
                                {previewUrl ? (
                                    <div className="w-full h-full p-4">
                                        <div className="w-full h-full bg-white shadow-2xl rounded-sm overflow-hidden border border-slate-300">
                                            <embed
                                                src={`${previewUrl}#toolbar=1&navpanes=0&view=FitH`}
                                                type="application/pdf"
                                                width="100%"
                                                height="100%"
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <FileText size={48} className="text-slate-300 mx-auto mb-4"/>
                                            <Eye size={18} className="text-primary absolute bottom-4 -right-2"/>
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            Document Previewer
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}