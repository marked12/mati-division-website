"use client";

import React, { useState } from 'react';
import {
    Search,
    Filter,
    ExternalLink,
    Plus,
    Clock,
    AlertCircle,
    CheckCircle2,
    MoreVertical,
    ChevronDown,
    ArrowUpDown,
    ShoppingBag,
    FileText
} from 'lucide-react';

const ProcurementStats = [
    {
        label: "Total Requests",
        value: "1,284",
        icon: <FileText size={20} />,
        colors: "bg-primary/5 text-primary",
        variant: "default"
    },
    {
        label: "Pending Signatures",
        value: "18",
        icon: <Clock size={20} />,
        colors: "bg-amber-50 text-amber-600",
        variant: "default"
    },
    {
        label: "Urgent Actions",
        value: "05",
        icon: <AlertCircle size={20} />,
        colors: "bg-red-50 text-red-600",
        variant: "urgent"
    },
    {
        label: "Completed (Monthly)",
        value: "142",
        icon: <CheckCircle2 size={20} />,
        colors: "bg-emerald-50 text-emerald-600",
        variant: "default"
    }
];

const ProcurementRequestsPage = () => {
    // Mock State for Filter
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 space-y-8">

            {/* 1. HEADER & ACTION SECTION */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-primary tracking-tight">Procurement Requests</h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Overview of all supply unit entries and document tracking.
                    </p>
                </div>

                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-accent hover:-translate-y-0.5 transition-all">
                    <Plus size={18} />
                    Create New Request
                </button>
            </div>

            {/* 2. STATS OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ProcurementStats.map((stat, index) => (
                    <div
                        key={index}
                        style={{ borderRadius: '32px' }}
                        className={`bg-white p-6 border-2 border-slate-200 shadow-sm space-y-4 transition-all hover:shadow-md ${
                            stat.variant === 'urgent' ? 'border-l-8 border-l-red-500' : ''
                        }`}
                    >
                        <div
                            style={{ borderRadius: '12px' }}
                            className={`w-10 h-10 flex items-center justify-center ${stat.colors}`}
                        >
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {stat.label}
                            </p>
                            <p className={`text-2xl font-black ${stat.variant === 'urgent' ? 'text-red-600' : 'text-primary'}`}>
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. FILTER BAR */}
            <div
                style={{ borderRadius: '30px' }}
                className="bg-white p-4 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4"
            >
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 " size={18} />
                    <input
                        type="text"
                        style={{ borderRadius: '20px' }}
                        placeholder="Search by PO Number, Supplier, or Purpose..."
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-200 text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                    />
                </div>

                <div
                    style={{ borderRadius: '22px' }}
                    className="flex items-center gap-1 p-1 bg-slate-100 border-2 border-slate-200 w-full md:w-auto"
                >
                    {['All', 'Urgent', 'Pending'].map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            style={{ borderRadius: '16px' }}
                            onClick={() => setActiveFilter(filter)}
                            className={`
                px-8 py-2.5 text-[10px] font-black uppercase tracking-widest 
                transition-all duration-200 ease-in-out outline-none
                relative transform-gpu backface-hidden
                ${activeFilter === filter
                                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/50 scale-[1.02] z-10'
                                : 'text-slate-500 hover:text-primary hover:bg-white/60 hover:scale-[1.01] active:scale-95'
                            }
            `}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. DATA TABLE */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-8 py-6 text-left">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                                    Tracking No. <ArrowUpDown size={12} />
                                </div>
                            </th>
                            <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Program Owner</th>
                            <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Supplier & Purpose</th>
                            <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Status</th>
                            <th className="px-8 py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Manage</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">

                        {/* ROW 1: STANDARD ITEM */}
                        <tr className="group hover:bg-slate-50/80 transition-all">
                            <td className="px-8 py-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-primary">2026-02-045</p>
                                    <p className="text-[10px] font-bold text-slate-400">BAC: 102-2026</p>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                    OSDS - ICT
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="space-y-1 max-w-[280px]">
                                    <p className="text-sm font-bold text-slate-700">ALFA CATERING SERVICES</p>
                                    <p className="text-[11px] text-slate-500 italic line-clamp-1">Lunch for ICT Literacy Workshop participants...</p>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                    <span className="text-[11px] font-black text-amber-600 uppercase tracking-tighter">For SDS Signature</span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex justify-center">
                                    <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>

                        {/* ROW 2: URGENT ITEM */}
                        <tr className="group bg-red-50/20 hover:bg-red-50/40 transition-all">
                            <td className="px-8 py-6 border-l-4 border-red-500">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-black text-red-600">2026-02-050</p>
                                    </div>
                                    <p className="text-[10px] font-black text-red-400/80 uppercase">High Priority</p>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                    CID - EPS
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="space-y-1 max-w-[280px]">
                                    <p className="text-sm font-bold text-slate-700">PAPER DEPOT INC.</p>
                                    <p className="text-[11px] text-slate-500 italic line-clamp-1">Bond paper for National Achievement Test (NAT)...</p>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">Received / Pending</span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex justify-center">
                                    <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>

                        {/* ROW 3: COMPLETED ITEM */}
                        <tr className="group hover:bg-slate-50/80 transition-all">
                            <td className="px-8 py-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-primary">2026-02-012</p>
                                    <p className="text-[10px] font-bold text-slate-400">BAC: 088-2026</p>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                    SGOD
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="space-y-1 max-w-[280px]">
                                    <p className="text-sm font-bold text-slate-700">FAST-TRACK LOGISTICS</p>
                                    <p className="text-[11px] text-slate-500 italic line-clamp-1">Delivery of Sports Equipment for Regional Meet...</p>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-[11px] font-black text-emerald-600 uppercase tracking-tighter">PO Served</span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex justify-center">
                                    <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* 5. PAGINATION FOOTER */}
                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Showing <span className="text-primary">3</span> of <span className="text-primary">1,284</span> entries
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all disabled:opacity-50" disabled>
                            Prev
                        </button>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-primary hover:text-white transition-all">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcurementRequestsPage;