"use client";
import React, { useState } from 'react';
import {FileText, Calendar, ChevronRight, Plus, X, Eye, UploadCloud, FileCheck, Gavel, Clock} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatCard from "@/src/components/StatCard";
import Link from "next/link";

export default function AdminBidsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Goods'
    });

    // Handle File Selection & Preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        // 1. Clear any pending toasts to prevent the 'removalReason' error
        toast.dismiss();

        if (file) {
            if (file.type !== 'application/pdf') {
                toast.error("Invalid file type. Please upload a PDF.");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File is too large. Max limit is 10MB.");
                return;
            }

            // 2. Cleanup previous Preview URL to free memory
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            toast.info("PDF attached successfully!");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.warning("Please attach a bidding document (PDF).");
            return;
        }

        // 1. Show the success toast first
        toast.success("Opportunity Published Successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored"
        });

        // 2. Close the modal immediately to give UX feedback
        setIsModalOpen(false);

        // 3. DELAY the state cleanup
        // This allows Toastify to finish its internal 'mounting'
        // before the file/preview objects are destroyed.
        setTimeout(() => {
            setSelectedFile(null);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl); // Clean up memory
                setPreviewUrl(null);
            }
            // If you have an editingId state, reset it here too
            // setEditingId(null);
        }, 100);
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <ToastContainer />

            {/* Header Banner */}

            <div className="max-w-5xl mx-auto px-4 mt-10 space-y-4">
                {/* Main Management Card */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-border shadow-sm">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-primary italic">Bids Opportunities Management</h2>
                        <p className="text-sm text-muted-foreground font-medium">Post procurement opportunities and manage bidding documents.</p>
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
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                            Next Section
                        </span>
                                        <span className="text-[11px] font-bold text-primary uppercase tracking-tighter">
                            Manage Award Notices
                        </span>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </Link>
                </div>
            </div>


            {/* List Container */}
            <div className="max-w-5xl mx-auto px-4 mt-12 space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 border-b pb-2">Recent Postings</h3>

                {/* Single Row Example */}
                <div className="bg-white border border-border p-5 rounded-lg flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex gap-4 items-center">
                        <div className="bg-secondary/10 p-3 rounded text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                            <FileText size={20}/>
                        </div>
                        <div>
                            <h2 className="text-sm font-serif font-bold text-primary leading-tight">Repair of Electrical Wiring - Admin Services</h2>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[9px] font-black text-accent uppercase tracking-tighter">ID: 2026-001</span>
                                <span className="text-[10px] text-muted-foreground italic">Feb 3, 2026</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-muted-foreground hover:text-primary"><Eye size={18}/></button>
                        <ChevronRight className="text-border group-hover:text-accent group-hover:translate-x-1 transition-all" size={20}/>
                    </div>
                </div>
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-5xl h-[85vh] overflow-hidden rounded-lg shadow-2xl flex flex-col border border-border">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="font-serif font-bold text-primary uppercase text-sm tracking-widest">New Procurement Notice</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-red-500 transition-colors"><X size={24}/></button>
                        </div>

                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                            {/* Left Side: Form */}
                            <form onSubmit={handleSave} className="w-full md:w-2/5 p-6 border-r overflow-y-auto space-y-5 bg-slate-50/50">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2 text-primary">Project Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full border border-border rounded p-3 text-sm font-serif focus:border-accent outline-none bg-white"
                                        placeholder="Full title as per PR..."
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2 text-primary">Publish Date</label>
                                        <input
                                            type="date"
                                            className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent"
                                            value={formData.date}
                                            /* ADD THIS ONCHANGE */
                                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2 text-primary">Classification</label>
                                        <select
                                            className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent"
                                            value={formData.category}
                                            /* ADD THIS ONCHANGE */
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
                                    <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                                    <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all ${selectedFile ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 group-hover:border-accent bg-white'}`}>
                                        {selectedFile ? (
                                            <>
                                                <FileCheck size={28} className="text-emerald-600 mb-2"/>
                                                <span className="text-[10px] font-bold text-emerald-800 text-center">{selectedFile.name}</span>
                                            </>
                                        ) : (
                                            <>
                                                <UploadCloud size={28} className="text-slate-400 mb-2"/>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Attach PDF Opportunity</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-primary text-white font-black py-4 rounded uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all shadow-md active:scale-95">
                                    Publish to Portal
                                </button>
                            </form>

                            {/* Right Side: Preview */}
                            <div className="hidden md:flex flex-1 bg-slate-100 relative items-center justify-center border-l border-border">
                                {previewUrl ? (
                                    <div className="w-full h-full p-4">
                                        <div className="w-full h-full bg-white shadow-2xl rounded-sm overflow-hidden border border-slate-300">
                                            {/* #toolbar=1 : Enables page navigation, zoom, and printing
                    #navpanes=0 : Hides the bulky sidebar thumbnails
                */}
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
                                            <FileText size={48} className="text-slate-300 mx-auto mb-4" />
                                            <Eye size={18} className="text-primary absolute bottom-4 -right-2" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            Document Previewer
                                        </p>
                                        <p className="text-[9px] font-serif italic text-slate-400 mt-1">
                                            Upload a PDF to enable page navigation
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