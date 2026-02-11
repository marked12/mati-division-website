"use client";
import React, { useState } from 'react';
import { Award, FileText, Plus, X, Eye, UploadCloud, FileCheck, ChevronRight } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function AdminAwardsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        awardee: '',
        refId: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        toast.dismiss();
        if (file) {
            if (file.type !== 'application/pdf') {
                toast.error("Please upload a PDF file.");
                return;
            }
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            toast.info("Award document attached.");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            toast.warning("Please attach the Notice of Award (PDF).");
            return;
        }

        // Logic for POST /api/awards goes here

        toast.success("Award Notice Published!", { theme: "colored" });
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedFile(null);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <ToastContainer limit={3} />

            {/* Header: Uniform with Announcement & Bids */}
            <div className="max-w-5xl mx-auto px-4 mt-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-border shadow-sm">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-primary italic">Award Notice Management</h2>
                        <p className="text-sm text-muted-foreground font-medium">Post and archive Notice of Awards & Abstracts.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold uppercase px-4 py-2.5 rounded hover:bg-accent transition-all shadow-md shadow-primary/20"
                    >
                        <Plus size={16}/> Post New Award
                    </button>
                </div>
                <div className="flex justify-start mt-4">
                    <Link
                        href="/admin/dashboard/bids-and-awards"
                        className="flex items-center gap-3 px-4 py-2 bg-white border border-border rounded-lg shadow-sm hover:border-accent group transition-all"
                    >
                        <div className="bg-slate-50 p-1.5 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                            {/* Flipped icon to indicate "Back" */}
                            <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <div className="flex flex-col items-start">
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                            Previous Section
                        </span>
                                        <span className="text-[11px] font-bold text-primary uppercase tracking-tighter">
                            Back to Bidding Ops
                        </span>
                        </div>
                    </Link>
                </div>

                {/* List of Awards */}
                <div className="mt-12 space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 border-b pb-2">Recent Awards</h3>

                    {/* Placeholder for fetching logic */}
                    <div className="bg-white border border-border p-5 rounded-lg flex items-center justify-between group hover:shadow-md transition-all">
                        <div className="flex gap-4 items-center">
                            <div className="bg-emerald-50 p-3 rounded text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Award size={20}/>
                            </div>
                            <div>
                                <h2 className="text-sm font-serif font-bold text-primary leading-tight">Construction of 2-Storey Building - SHS Section</h2>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter italic">Awarded to: Build-Right Const. Corp</span>
                                    <span className="text-[10px] text-muted-foreground">March 15, 2026</span>
                                </div>
                            </div>
                        </div>
                        <button className="p-2 text-muted-foreground hover:text-primary"><Eye size={18}/></button>
                    </div>
                </div>
            </div>

            {/* --- AWARD MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-5xl h-[85vh] overflow-hidden rounded-lg shadow-2xl flex flex-col border border-border">
                        <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50">
                            <h3 className="font-serif font-bold text-xl text-primary italic">New Award Record</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-primary"><X size={20}/></button>
                        </div>

                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                            <form onSubmit={handleSave} className="w-full md:w-2/5 p-6 border-r overflow-y-auto space-y-5 bg-slate-50/50">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Project Name</label>
                                    <textarea required rows={3} className="w-full border border-border rounded p-3 text-sm font-serif outline-none focus:border-accent" placeholder="Enter project name exactly as posted in ITB..." />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Winning Bidder / Awardee</label>
                                    <input type="text" required className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent" placeholder="Company Name" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Reference ID</label>
                                        <input type="text" className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent" placeholder="Ref-2026" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Notice Date</label>
                                        <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full border border-border rounded p-2 text-xs outline-none focus:border-accent" />
                                    </div>
                                </div>

                                {/* PDF Upload */}
                                <div className="relative group">
                                    <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                                    <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all ${selectedFile ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 group-hover:border-accent bg-white'}`}>
                                        {selectedFile ? (
                                            <><FileCheck size={28} className="text-emerald-600 mb-2"/><span className="text-[10px] font-bold text-emerald-800 text-center uppercase tracking-tighter truncate w-full px-2">{selectedFile.name}</span></>
                                        ) : (
                                            <><UploadCloud size={28} className="text-slate-400 mb-2"/><span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Attach Notice of Award</span></>
                                        )}
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all shadow-md shadow-primary/20">
                                    Finalize and Publish
                                </button>
                            </form>

                            {/* Previewer */}
                            <div className="hidden md:flex flex-1 bg-slate-100 relative items-center justify-center p-4">
                                {previewUrl ? (
                                    <div className="w-full h-full bg-white shadow-2xl border border-slate-300">
                                        <embed src={`${previewUrl}#toolbar=1&navpanes=0&view=FitH`} type="application/pdf" width="100%" height="100%" />
                                    </div>
                                ) : (
                                    <div className="text-center opacity-30">
                                        <FileText size={64} className="text-slate-400 mx-auto mb-4" />
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Document Previewer</p>
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