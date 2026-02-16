"use client";

import React, {useState} from 'react';
import {
    FileText,
    Send,
    Info,
    ShoppingBag,
    Building2,
    User,
    ClipboardList,
    ChevronRight, ChevronDown
} from 'lucide-react';
const STATUS_OPTIONS = [
    "FOR BAC SEC FOR REQUEST OF QUOTATION",
    "FOR BAC MEMBER SIGNATURE",
    "PO FOR BUDGET OFFICER, ACCOUNTANT & SDS SIGNATURE",
    "FOR PO",
    "PO SERVE",
    "PO SERVE TO CATERER",
    "FOR COA STAMPING FOR PO",
    "OUT FOR DELIVERY",
    "ITEMS DELIVERED",
    "FOR INSPECTION",
    "FOR CA NOD & IAR STAMPING",
    "ISSUANCE TO END USER",
    "AS PER SCHEDULE"
];

const PERSONNEL_OPTIONS = [
    "JESSIE JAMES SALIGUMBA",
    "LIZA LEGION",
    "KAREN LAUREJAS",
    "ACCOUNTING PERSONNEL",
    "GIRA MARIE MAGLENTE"
];
const ProcurementRequestPage = () => {
    const [priority, setPriority] = useState('Standard');
    return (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="mb-12">
                <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] bg-accent/10 px-4 py-2 rounded-full">
                    Supply Unit Services
                </span>
                <h1 className="text-4xl font-black text-primary uppercase mt-6 tracking-tight">
                    Procurement Request
                </h1>
                <p className="text-slate-500 mt-2 font-medium max-w-xl">
                    Submit a formal request for supplies, equipment, or materials not currently available in the inventory.
                </p>
            </div>

            {/* Information Alert */}
            <div className="mb-10 p-6 bg-blue-50 border border-blue-100 rounded-[24px] flex gap-5 items-start">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                    <Info size={20} />
                </div>
                <div>
                    <h4 className="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-1">Important Note</h4>
                    <p className="text-sm text-blue-700/80 leading-relaxed font-medium">
                        Requests are subject to budget availability and approval by the Division Office. Please ensure all technical specifications are accurate before submission.
                    </p>
                </div>
            </div>

            {/* Main Form */}
            <form className="space-y-8 bg-white border border-slate-100 p-8 md:p-12 rounded-[40px] shadow-sm">

                {/* Section 1: Official Tracking Identifiers */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                            <FileText size={18} />
                        </div>
                        <h2 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Tracking Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">PO / PR Number</label>
                            <input type="text" placeholder="e.g. 2026-02-045" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">BAC Abstract Reso No.</label>
                            <input type="text" placeholder="e.g. 102-2026" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Program Owner</label>
                            <input type="text" placeholder="e.g. CID / SGOD / OSDS" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>
                    </div>
                </div>

                {/* Section 2: Procurement Scope */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-l-4 border-accent pl-4">
                        <div className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center text-accent">
                            <ShoppingBag size={18} />
                        </div>
                        <h2 className="text-xs font-black text-accent uppercase tracking-[0.2em]">Procurement Scope</h2>
                    </div>

                    {/* Row 1: Type, Supplier, and Delivery Date balanced in a 3-column grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type of Procurement</label>
                            <div className="relative">
                                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-black text-primary uppercase tracking-tight outline-none appearance-none focus:ring-4 focus:ring-primary/5 transition-all">
                                    <option value="">Select Category...</option>
                                    <option value="CATERING">CATERING</option>
                                    <option value="SPORTS EQUIPMENT">SPORTS EQUIPMENT</option>
                                    <option value="SERVICES">SERVICES</option>
                                    <option value="TRAINING SUPPLIES">TRAINING SUPPLIES</option>
                                    <option value="OFFICE SUPPLIES">OFFICE SUPPLIES</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronDown size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Winning Bidder / Supplier</label>
                            <input type="text" placeholder="Enter Supplier Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expected Delivery</label>
                            <input type="date" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                        </div>
                    </div>

                    {/* Row 2: Purpose Description taking full width for maximum space */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Purpose / Item Description</label>
                        <textarea
                            rows={5}
                            placeholder="Provide detailed description of items or services..."
                            className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none shadow-sm"
                        ></textarea>
                    </div>
                </div>

                {/* Footer: Priority & Actions */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex gap-3 p-2 bg-slate-50 rounded-[22px] border border-slate-100">
                        {['Standard', 'Urgent'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setPriority(type)}
                                className={`px-10 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                            ${priority === type
                                    ? (type === 'Standard' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/20')
                                    : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <button type="submit" className="w-full md:w-auto flex items-center justify-center gap-3 p-2 px-12 py-5 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-accent transition-all active:scale-[0.98]">
                        <Send size={18} />
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProcurementRequestPage;