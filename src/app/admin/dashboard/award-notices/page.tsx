"use client";
import React, {useEffect, useState} from 'react';
import {
    Award,
    FileText,
    Plus,
    X,
    Eye,
    UploadCloud,
    FileCheck,
    ChevronRight,
    Edit3,
    Archive,
    Loader2,
    Search, RotateCcw
} from 'lucide-react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Cookies from "js-cookie";

export default function AdminAwardsPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState<number | null>(null);

    // Data State
    const [awards, setAwards] = useState<any[]>([]);
    const [awardPage, setAwardPage] = useState(1);
    const awardsPerPage = 10;

    // Form/Auth State
    const [userId, setUserId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        awardee: '',
        refId: ''
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"active" | "archived">("active");

    // 1. Fetch Awards Logic
    const fetchAwards = async () => {
        try {
            const response = await fetch('/api/admin/awards');
            const data = await response.json();
            if (!data.error) {
                setAwards(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to load awards.");
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Auth Sync & Initial Load
    useEffect(() => {
        const checkAuth = () => {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                try {
                    const parsedUser = JSON.parse(userCookie);
                    setUserId(parsedUser.id);
                } catch (e) {
                    console.error("Auth sync error", e);
                }
            }
            setIsMounted(true);
        };
        checkAuth();
        fetchAwards();
    }, []);
    // 3. Status Counters
    const activeCount = awards.filter(a => a.status === 0).length;
    const archivedCount = awards.filter(a => a.status === 1).length;

    // 3. Pagination Calculations
    const indexOfLastAward = awardPage * awardsPerPage;
    const indexOfFirstAward = indexOfLastAward - awardsPerPage;

    const totalAwardPages = Math.ceil(awards.length / awardsPerPage);

    // 4. Action Handlers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        toast.dismiss();
        if (file) {
            if (file.type !== 'application/pdf') {
                toast.error("Please upload a PDF file.");
                return;
            }
            if (previewUrl && !previewUrl.startsWith('http')) URL.revokeObjectURL(previewUrl);
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            toast.info("Award document attached.");
        }
    };

    const handleEdit = (award: any) => {
        setEditingId(award.id);
        setFormData({
            title: award.title,
            date: award.publish_date.split('T')[0],
            awardee: award.awardee,
            refId: award.ref_id || ''
        });
        setPreviewUrl(award.pdf_url);
        setIsModalOpen(true);
    };

    const handleArchiveToggle = async (id: number, currentStatus: number) => {
        const newStatus = currentStatus === 0 ? 1 : 0;
        setIsUpdating(id);
        try {
            const res = await fetch('/api/admin/awards', {
                method: 'PUT',
                body: new URLSearchParams({
                    id: id.toString(),
                    status: newStatus.toString()
                })
            });
            if (res.ok) {
                toast.success(newStatus === 1 ? "Notice Archived" : "Notice Restored");
                fetchAwards();
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Failed to update status.");
        } finally {
            setIsUpdating(null);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingId && !selectedFile) {
            toast.warning("Please attach the NOA document.");
            return;
        }

        const loadingToast = toast.loading(editingId ? "Updating Award..." : "Publishing Award...");

        try {
            const data = new FormData();
            if (editingId) data.append('id', editingId.toString());
            if (selectedFile) data.append('file', selectedFile);

            data.append('title', formData.title);
            data.append('awardee', formData.awardee);
            data.append('refId', formData.refId);
            data.append('date', formData.date);
            data.append('author_id', userId || "1");

            const response = await fetch('/api/admin/awards', {
                method: editingId ? 'PUT' : 'POST',
                body: data,
            });

            if (!response.ok) throw new Error("Failed to save award notice");

            toast.update(loadingToast, {
                render: editingId ? "Award updated successfully!" : "Notice successfully published!",
                type: "success",
                isLoading: false,
                autoClose: 3000
            });

            // Reset UI
            setIsModalOpen(false);
            setEditingId(null);
            setSelectedFile(null);
            setFormData({title: '', awardee: '', refId: '', date: new Date().toISOString().split('T')[0]});
            fetchAwards();
        } catch (error: any) {
            toast.update(loadingToast, {render: error.message, type: "error", isLoading: false, autoClose: 3000});
        }
    };
    const filteredAwards = awards.filter((award: any) => {
        // Check if title or awardee matches search
        const matchesSearch =
            award.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            award.awardee.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (award.ref_id && award.ref_id.toLowerCase().includes(searchQuery.toLowerCase()));

        // Check if status matches the selected tab
        const matchesStatus = filterStatus === "active" ? award.status === 0 : award.status === 1;

        return matchesSearch && matchesStatus;
    });

    useEffect(() => {
        setAwardPage(1);
    }, [searchQuery, filterStatus]);

    if (!isMounted) return null;
    const currentAwards = filteredAwards.slice(indexOfFirstAward, indexOfLastAward)
    return (
        <div className="min-h-screen bg-background pb-20">

            <div className="max-w-5xl mx-auto px-4 mt-10">
                {/* Header Section */}
                <div
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-border shadow-sm">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-primary italic">Award Notice Management</h2>
                        <p className="text-sm text-muted-foreground font-medium">Post and archive Notice of Awards &
                            Abstracts.</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setFormData({
                                title: '',
                                awardee: '',
                                refId: '',
                                date: new Date().toISOString().split('T')[0]
                            });
                            setPreviewUrl(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold uppercase px-4 py-2.5 rounded hover:bg-accent transition-all shadow-md shadow-primary/20"
                    >
                        <Plus size={16}/> Post New Award
                    </button>
                </div>

                <div className="flex justify-start mt-4">
                    <Link href="/admin/dashboard/bids-and-awards"
                          className="flex items-center gap-3 px-4 py-2 bg-white border border-border rounded-lg shadow-sm hover:border-accent group transition-all">
                        <div
                            className="bg-slate-50 p-1.5 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                            <ChevronRight size={16}
                                          className="rotate-180 group-hover:-translate-x-0.5 transition-transform"/>
                        </div>
                        <div className="flex flex-col items-start">
                            <span
                                className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">Previous Section</span>
                            <span className="text-[11px] font-bold text-primary uppercase tracking-tighter">Back to Bidding Ops</span>
                        </div>
                    </Link>
                </div>
            </div>

                {/* Table List */}
            <div className="max-w-6xl mx-auto px-4 mt-12 pb-20">
                {/* 1. Header Section */}
                <div className="flex items-center justify-between mb-6 border-b pb-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        Recent Award Notices
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">
            Total Records: {Array.isArray(awards) ? awards.length : 0}
        </span>
                </div>

                {/* 2. Filter & Search Controls (Styled exactly like Bids) */}


                {/* 4. Table Container */}
                <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
                    {/* Search and Filters Header Section */}
                    <div className="max-w-6xl mx-auto px-4 mt-8 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* Search Bar */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                                <input
                                    type="text"
                                    placeholder="Search project name, awardee, or ref id..."
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setAwardPage(1);
                                    }}
                                />
                            </div>

                            {/* Status Tabs */}
                            <div className="flex bg-slate-100 p-1 rounded-lg border border-border">
                                <button
                                    onClick={() => setFilterStatus("active")}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'active' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'}`}
                                >
                                    Active
                                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${filterStatus === 'active' ? 'bg-accent text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {activeCount}
                    </span>
                                </button>
                                <button
                                    onClick={() => setFilterStatus("archived")}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === 'archived' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'}`}
                                >
                                    Archived
                                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${filterStatus === 'archived' ? 'bg-slate-300 text-slate-600' : 'bg-slate-200 text-slate-500'}`}>
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
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="text-[9px] text-accent underline font-bold uppercase tracking-tighter">
                                    Clear Search
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-slate-50 border-b border-border">
                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Project Description / Awardee</th>
                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Ref. ID</th>
                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Date Approved</th>
                                <th className="px-6 py-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center">
                                        <div className="flex flex-col items-center opacity-50">
                                            <div className="animate-spin mb-2"><FileText size={20}/></div>
                                            <p className="text-[10px] font-black uppercase tracking-widest">Fetching Database...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentAwards.length > 0 ? (
                                currentAwards.map((award) => {
                                    const isArchived = award.status === 1;
                                    return (
                                        <tr key={award.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-primary/40 group-hover:text-accent transition-colors">
                                                        <Award size={18}/>
                                                    </div>
                                                    <div className="flex flex-col">
                                            <span className="text-sm font-serif font-bold text-primary leading-tight line-clamp-1">
                                                {award.title}
                                            </span>
                                                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter italic mt-1">
                                                Awarded to: {award.awardee}
                                            </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                    <span className="text-[10px] font-mono text-muted-foreground bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                        {award.ref_id || 'N/A'}
                                    </span>
                                            </td>
                                            <td className="px-6 py-4">
                                    <span className="text-[11px] text-muted-foreground font-medium">
                                        {new Date(award.publish_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">


                                                    {!isArchived && (
                                                        <button onClick={() => handleEdit(award)}
                                                                className="p-2 hover:bg-amber-50 hover:text-amber-600 rounded-md transition-colors"
                                                                title="Edit"><Edit3 size={16}/>
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => handleArchiveToggle(award.id, award.status)}
                                                        className={`p-2 rounded-md transition-colors ${
                                                            !isArchived
                                                                ? 'hover:bg-slate-100 text-muted-foreground hover:text-slate-600'
                                                                : 'hover:bg-green-50 text-green-600'
                                                        }`}
                                                        title={!isArchived ? "Archive" : "Restore to Active"}
                                                    >
                                                        {isUpdating === award.id ? <Loader2 size={16} className="animate-spin"/> : (!isArchived ? <Archive size={16}/> : <RotateCcw size={16}/>)}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-2 opacity-40">
                                            <Search size={32} className="text-slate-300"/>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                                                No {filterStatus} award notices found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                        {!isLoading && currentAwards.length > 0 && (
                            <div
                                className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border bg-slate-50/30">
                                {/* Result Info */}

                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    Showing {indexOfFirstAward + 1} to {Math.min(indexOfLastAward, currentAwards.length)} of {filteredAwards.length}
                                </p>

                                {/* Controls */}
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setAwardPage(p => Math.max(p - 1, 1))}
                                        disabled={awardPage === 1}
                                        className="px-3 py-1.5 text-[10px] font-black uppercase border border-border rounded bg-white disabled:opacity-40 hover:bg-slate-50 transition-all"
                                    >
                                        Prev
                                    </button>

                                    <div className="flex gap-1">
                                        {[...Array(totalAwardPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setAwardPage(i + 1)}
                                                className={`w-8 h-8 text-[10px] font-bold rounded border transition-all ${
                                                    awardPage === i + 1
                                                        ? 'bg-primary text-white border-primary shadow-md'
                                                        : 'bg-white text-muted-foreground border-border hover:border-accent'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setAwardPage(p => Math.min(p + 1, totalAwardPages))}
                                        disabled={awardPage === totalAwardPages}
                                        className="px-3 py-1.5 text-[10px] font-black uppercase border border-border rounded bg-white disabled:opacity-40 hover:bg-slate-50 transition-all"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div
                        className="bg-white w-full max-w-5xl h-[85vh] overflow-hidden rounded-lg shadow-2xl flex flex-col border border-border">
                        <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50">
                            <h3 className="font-serif font-bold text-xl text-primary italic">{editingId ? 'Edit Award Notice' : 'New Award Notice'}</h3>
                            <button onClick={() => setIsModalOpen(false)}
                                    className="text-muted-foreground hover:text-primary"><X size={20}/></button>
                        </div>
                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                            <form onSubmit={handleSave}
                                  className="w-full md:w-2/5 p-6 border-r overflow-y-auto space-y-5 bg-slate-50/50">
                                <div>
                                    <label
                                        className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Project
                                        Name</label>
                                    <textarea required rows={3} value={formData.title}
                                              onChange={(e) => setFormData({...formData, title: e.target.value})}
                                              className="w-full border border-border rounded p-3 text-sm font-serif outline-none focus:border-accent"/>
                                </div>
                                <div>
                                    <label
                                        className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Winning
                                        Bidder</label>
                                    <input type="text" required value={formData.awardee}
                                           onChange={(e) => setFormData({...formData, awardee: e.target.value})}
                                           className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent"/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label
                                        className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Reference
                                        ID</label>
                                        <input type="text" value={formData.refId}
                                               onChange={(e) => setFormData({...formData, refId: e.target.value})}
                                               className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent"/>
                                    </div>
                                    <div><label
                                        className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Notice
                                        Date</label>
                                        <input type="date" value={formData.date}
                                               onChange={(e) => setFormData({...formData, date: e.target.value})}
                                               className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <input type="file" accept=".pdf" onChange={handleFileChange}
                                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                                    <div
                                        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all ${selectedFile ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 group-hover:border-accent bg-white'}`}>
                                        {selectedFile ? <><FileCheck size={28} className="text-emerald-600 mb-2"/><span
                                                className="text-[10px] font-bold text-emerald-800 text-center truncate w-full px-2">{selectedFile.name}</span></>
                                            : <><UploadCloud size={28} className="text-slate-400 mb-2"/><span
                                                className="text-[10px] font-bold text-slate-500 uppercase">Attach Notice of Award</span></>}
                                    </div>
                                </div>
                                <button type="submit"
                                        className="w-full bg-primary text-white font-bold py-3 rounded uppercase tracking-widest text-xs hover:bg-accent transition-all">
                                    {editingId ? "Update Notice" : "Finalize and Publish"}
                                </button>
                            </form>
                            <div
                                className="hidden md:flex flex-1 bg-slate-100 relative items-center justify-center p-4">
                                {previewUrl ? <embed src={`${previewUrl}#toolbar=1`} type="application/pdf" width="100%"
                                                     height="100%" className="shadow-2xl border border-slate-300"/>
                                    : <div className="text-center opacity-30"><FileText size={64}
                                                                                        className="text-slate-400 mx-auto mb-4"/>
                                        <p className="text-xs font-black uppercase">Document Previewer</p></div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}