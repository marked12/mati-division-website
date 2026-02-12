"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {toast, ToastContainer} from 'react-toastify'; // Using Toastify as requested
import Swal from 'sweetalert2';
import {
    Plus, Edit, Archive, RefreshCw,
    Megaphone, Loader2, X
} from 'lucide-react';
import BackButton from "@/src/components/BackButton";

export default function AnnouncementsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [statusFilter, setStatusFilter] = useState<0 | 1>(0); // 0 = Active, 1 = Archived
    const [annPage, setAnnPage] = useState(1);
    const itemsPerPage = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'General',
        author_id: 22
    });
    const [viewFilter, setViewFilter] = useState<'ALL' | 'ACTIVE' | 'ARCHIVED'>('ALL');

    // --- Fetch Logic ---
    const fetchAnnouncements = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/announcements');
            const data = await res.json();
            if (Array.isArray(data)) {
                setAnnouncements(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch announcements");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // --- Archive / Restore Handler ---
    const handleArchive = async (id: number, newStatus: number) => {
        const isArchiving = newStatus === 1;

        // 1. Create the promise
        const archivePromise = fetch('/api/admin/announcements', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus }),
        }).then(async (res) => {
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update status");
            }
            return res;
        });

        // 2. Feed the promise to toast.promise
        toast.promise(archivePromise, {
            pending: isArchiving ? "Archiving..." : "Restoring...",
            success: isArchiving ? "Announcement archived" : "Announcement restored",
            error: "Failed to update status"
        });

        try {
            await archivePromise;
            // 3. Refresh data ONLY after the promise is fully settled
            fetchAnnouncements();
        } catch (err) {
            console.error("Archive Error:", err);
        }
    };

    // --- Edit Handler ---
    const handleEditClick = (announcement: any) => {
        setEditingId(announcement.id);
        setFormData({
            title: announcement.title || '',
            excerpt: announcement.excerpt || '',
            content: announcement.content || '',
            category: announcement.category || 'General',
            author_id: announcement.author_id || 22
        });
        setIsModalOpen(true);
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ title: '', excerpt: '', content: '', category: 'General', author_id: 22 });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const body = editingId ? { ...formData, id: editingId } : formData;

        try {
            const res = await fetch('/api/admin/announcements', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                toast.success(editingId ? "Changes saved!" : "Published!");
                setIsModalOpen(false);
                setEditingId(null); // Reset
                setFormData({ title: '', excerpt: '', content: '', category: 'General', author_id: 22 });
                fetchAnnouncements();
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    // --- Pagination & Filter Logic ---

    const activeIds = React.useMemo(() => {
        // 1. Get all status 0 items sorted by date (newest first)
        const statusZeroItems = announcements
            .filter(a => Number(a.status) === 0)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        // 2. Identify items within the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const withinWeekIds = statusZeroItems
            .filter(a => new Date(a.created_at) >= sevenDaysAgo)
            .map(a => a.id);

        // 3. Identify the last 3 items overall (regardless of date)
        const top3Ids = statusZeroItems.slice(0, 3).map(a => a.id);

        // 4. Combine them (Set handles duplicates automatically)
        return Array.from(new Set([...withinWeekIds, ...top3Ids]));
    }, [announcements]);
    const filteredAnnouncements = announcements.filter((item) => {
        if (viewFilter === 'ARCHIVED') return Number(item.status) === 1;
        if (viewFilter === 'ACTIVE') return activeIds.includes(item.id);
        return true; // For 'ALL'
    });

    const counts = {
        ALL: announcements.length,
        ACTIVE: activeIds.length,
        ARCHIVED: announcements.filter(item => Number(item.status) === 1).length
    };


    const totalAnnPages = Math.ceil(filteredAnnouncements.length / itemsPerPage) || 1;
    const indexOfLastAnn = annPage * itemsPerPage;
    const indexOfFirstAnn = indexOfLastAnn - itemsPerPage;
    const currentAnnRows = filteredAnnouncements.slice(indexOfFirstAnn, indexOfLastAnn);

    useEffect(() => {
        setAnnPage(1);
    }, [statusFilter, viewFilter]);


    return (
        <div className="min-h-screen bg-background">
            <ToastContainer/>

            {/* Header Component - Isolated Logic */}
            {/*announcement form*/}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Dynamic Header: Changes based on editingId */}
                        <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50">
                            <h3 className="font-serif font-bold text-xl text-primary">
                                {editingId ? 'Edit Announcement' : 'Create New Announcement'}
                            </h3>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setEditingId(null);
                                    resetModal();
                                    // Important: Clear edit state on close
                                }}
                                className="text-muted-foreground hover:text-primary"
                            >
                                <X size={20}/>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Title Field */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Title</label>
                                <input
                                    required
                                    value={formData.title} // This fills the box when editing
                                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="e.g. Monthly Personnel Meeting"
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Category Field */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">
                                        Category
                                    </label>
                                    <select
                                        className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                                        value={formData.category} // Already correct in your version
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    >
                                        <option value="General">General</option>
                                        <option value="DRRM">DRRM (Disaster Risk Reduction)</option>
                                        <option value="Economy">Economy</option>
                                        <option value="Education">Education</option>
                                        <option value="Environment">Environment</option>
                                        <option value="Health">Health</option>
                                        <option value="Infrastructure">Infrastructure</option>
                                        <option value="Public Works">Public Works</option>
                                        <option value="Social Welfare">Social Welfare</option>
                                        <option value="Tourism">Tourism</option>
                                        <option value="Transparency">Transparency</option>
                                    </select>
                                </div>
                                {/* Hidden Author ID */}
                                <div hidden>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Author ID</label>
                                    <input disabled value={formData.author_id} className="w-full p-2.5 border rounded-lg bg-slate-50"/>
                                </div>
                            </div>

                            {/* Excerpt Field */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Short Excerpt</label>
                                <input
                                    required
                                    value={formData.excerpt} // Added value
                                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    placeholder="Brief summary for the preview card..."
                                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                />
                            </div>

                            {/* Content Field */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Full Content</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.content} // Added value
                                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    placeholder="Write the full details here..."
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                />
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingId(null);
                                        resetModal();
                                    }}
                                    className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:bg-slate-100 rounded transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-white rounded hover:bg-accent transition-all shadow-md shadow-primary/20"
                                >
                                    {editingId ? 'Save Changes' : 'Publish Announcement'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 mt-10 pb-20">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

                    {/* Top Stats/Action Bar */}
                    <div className="flex flex-col gap-6">
                        {/* Action Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-border shadow-sm">
                            <div>
                                <h2 className="text-xl font-serif font-bold text-primary italic">Announcement Management</h2>
                                <p className="text-sm text-muted-foreground font-medium">Control public-facing news and updates.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(true)}
                                    className="flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold uppercase px-4 py-2.5 rounded hover:bg-accent transition-all shadow-md shadow-primary/20">
                                <Plus size={16}/> New Announcement
                            </button>
                        </div>

                        {/* Filter Buttons with Counts */}
                        <div className="flex items-center gap-2 p-1 bg-slate-100 w-fit rounded-lg border border-slate-200">
                            <button
                                onClick={() => setViewFilter('ALL')}
                                className={`flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${
                                    viewFilter === 'ALL' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-primary'
                                }`}
                            >
                                All <span className="bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px]">{counts.ALL}</span>
                            </button>

                            <button
                                onClick={() => setViewFilter('ACTIVE')}
                                className={`flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${
                                    viewFilter === 'ACTIVE' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-emerald-600'
                                }`}
                            >
                                Active <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[9px]">{counts.ACTIVE}</span>
                            </button>

                            <button
                                onClick={() => setViewFilter('ARCHIVED')}
                                className={`flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${
                                    viewFilter === 'ARCHIVED' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-amber-600'
                                }`}
                            >
                                Archived <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-[9px]">{counts.ARCHIVED}</span>
                            </button>
                        </div>
                    </div>



                    {/* Table Section */}
                    <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-slate-50 border-b border-border">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Title</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Author</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground animate-pulse font-serif italic">Synchronizing database...</td>
                                    </tr>
                                ) : currentAnnRows.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-30">
                                                <Megaphone size={40} />
                                                <p className="text-sm italic">No {statusFilter === 0 ? 'active' : 'archived'} announcements found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    currentAnnRows.map((item: any) => {
                                        const isArchived = item.status === 1;
                                        return (
                                            <tr key={item.id} className={`transition-all group border-b last:border-0 ${isArchived ? 'bg-slate-50/80 opacity-70 italic' : 'hover:bg-slate-50/50 bg-white'}`}>
                                                <td className="px-6 py-4 text-xs text-muted-foreground font-medium">{new Date(item.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-0.5">
                                                        <div className={`text-sm font-bold line-clamp-1 ${isArchived ? 'text-slate-400 line-through' : 'text-primary'}`}>{item.title}</div>
                                                        {isArchived && <span className="text-[9px] font-bold text-amber-600 uppercase tracking-tight">Archived Item</span>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${isArchived ? 'bg-slate-200 text-slate-500' : 'bg-accent/10 text-accent'}`}>{item.category}</span>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-600">{item.author_role || 'Staff'}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {!isArchived && (
                                                            <button onClick={() => handleEditClick(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded transition-colors" title="Edit"><Edit size={16}/></button>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                const isRestoring = isArchived;
                                                                Swal.fire({
                                                                    title: isRestoring ? 'Restore Announcement?' : 'Archive Announcement?',
                                                                    text: isRestoring ? 'Make visible to public?' : 'Hide from public view?',
                                                                    icon: 'warning',
                                                                    showCancelButton: true,
                                                                    confirmButtonColor: isRestoring ? '#10b981' : '#f59e0b',
                                                                    confirmButtonText: 'Confirm'
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) handleArchive(item.id, isRestoring ? 0 : 1);
                                                                });
                                                            }}
                                                            className={`p-2 rounded transition-colors ${isArchived ? 'hover:bg-green-50 text-green-600' : 'hover:bg-amber-50 text-amber-600'}`}>
                                                            {isArchived ? <RefreshCw size={16}/> : <Archive size={16}/>}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Section */}
                        {!isLoading && filteredAnnouncements.length > 0 && (
                            <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border bg-slate-50/30">
                                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                                    Showing <span className="text-primary">{indexOfFirstAnn + 1}</span> to <span className="text-primary">{Math.min(indexOfLastAnn, filteredAnnouncements.length)}</span> of <span className="text-primary">{filteredAnnouncements.length}</span> results
                                </p>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setAnnPage(p => Math.max(p - 1, 1))} disabled={annPage === 1} className="px-3 py-1.5 text-[10px] font-black uppercase border border-border rounded bg-white disabled:opacity-40 hover:bg-slate-50">Prev</button>
                                    <div className="flex gap-1">
                                        {[...Array(totalAnnPages)].map((_, i) => (
                                            <button key={i + 1} onClick={() => setAnnPage(i + 1)} className={`w-8 h-8 text-[10px] font-bold rounded border ${annPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-muted-foreground'}`}>{i + 1}</button>
                                        ))}
                                    </div>
                                    <button onClick={() => setAnnPage(p => Math.min(p + 1, totalAnnPages))} disabled={annPage === totalAnnPages} className="px-3 py-1.5 text-[10px] font-black uppercase border border-border rounded bg-white disabled:opacity-40 hover:bg-slate-50">Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}