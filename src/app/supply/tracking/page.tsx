"use client";

import React, { useState } from 'react';
import {
    Search,
    MapPin,
    Tag,
    Box,
    ShieldCheck,
    Info,
    QrCode,
    ArrowRight,
    Filter,
    ClipboardCheck, ChevronLeft, ChevronRight
} from 'lucide-react';

const AssetTracking = () => {
    // 1. Define the categories as a const for mapping
    const categories = ["All Assets", "ICT", "Furniture", "Vehicles", "Industrial"];

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 space-y-10">

            {/* 1. HEADER SECTION */}
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 border-2 border-primary/10 rounded-full w-fit">
                        <ClipboardCheck size={14} className="text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Property Registry</span>
                    </div>
                    <h1 className="text-5xl font-black text-primary tracking-tighter italic uppercase">Asset Tracking</h1>
                    <p className="text-slate-500 font-bold text-sm">Unified system for property management and verification.</p>
                </div>


            </div>

            {/* 2. SEARCH & FILTER SECTION */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 relative group">

                    <input
                        type="text"
                        style={{ borderRadius: '24px',paddingLeft: '20px' }}
                        placeholder="Search by Property Tag or Item Name..."
                        className="w-full pl-20 pr-6 py-5 bg-white border-2 border-slate-200 text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm"
                    />
                </div>

                <div className="lg:col-span-4">
                    <div
                        style={{ borderRadius: '24px' }}
                        className="flex items-center gap-1 p-1 bg-slate-100 border-2 border-slate-200 h-full"
                    >
                        <div className="flex-1 flex gap-1 px-2 overflow-x-auto no-scrollbar">
                            {categories.map((cat, i) => (
                                <button
                                    key={cat}
                                    style={{ borderRadius: '16px' }}
                                    className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                                        ${i === 0 ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. ASSET GRID */}
            <div className="max-w-5xl mx-auto space-y-4">
                {/* Table Container */}
                <div
                    style={{ borderRadius: '32px' }}
                    className="bg-white border-2 border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-slate-50 border-b-2 border-slate-200">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Property Tag</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Description</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Condition</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-100">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <tr key={item} className="group hover:bg-slate-50/50 transition-colors">
                                    {/* Property Tag */}
                                    <td className="px-8 py-4">
                                        <span className="text-xs font-black text-primary">PROP-ICT-992{item}</span>
                                    </td>

                                    {/* Description */}
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                <Box size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700 uppercase italic">Workstation Unit - Series {item}</span>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="px-8 py-4">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-md border border-blue-100">
                                    ICT Equipment
                                </span>
                                    </td>

                                    {/* Location */}
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <MapPin size={14} />
                                            <span className="text-xs font-bold text-slate-600">Supply Office B</span>
                                        </div>
                                    </td>

                                    {/* Condition */}
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-[10px] font-black text-emerald-600 uppercase">Excellent</span>
                                        </div>
                                    </td>

                                    {/* Action */}
                                    <td className="px-8 py-4 text-center">
                                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-[9px] font-black text-primary uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                            Details
                                            <ArrowRight size={12} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer / Pagination */}
                    <div className="px-8 py-4 bg-slate-50 border-t-2 border-slate-200 flex justify-between items-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Showing <span className="text-primary">8</span> of <span className="text-primary">142</span> total assets
                        </p>
                        <div className="flex gap-2">
                            <button className="p-2 bg-white border-2 border-slate-200 rounded-lg text-slate-400 hover:text-primary transition-all">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="p-2 bg-white border-2 border-slate-200 rounded-lg text-slate-400 hover:text-primary transition-all">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. BOTTOM INFO SECTION */}
            <div className="max-w-5xl mx-auto">
                <div
                    style={{ borderRadius: '32px' }}
                    className="bg-primary p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-primary/20 relative overflow-hidden"
                >
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />

                    <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center text-white border-2 border-white/20">
                        <Info size={32} />
                    </div>

                    <div className="flex-1 text-center md:text-left text-white">
                        <h4 className="font-black uppercase text-sm tracking-widest opacity-80">Verification Note</h4>
                        <p className="text-lg font-bold mt-2 leading-relaxed">
                            Every asset listed in this registry is tagged with a unique Property Identifier. Please ensure all physical tags match the digital records.
                        </p>
                    </div>

                    <button className="px-10 py-5 bg-white text-primary text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-accent hover:text-slate-900 transition-all shadow-xl">
                        Contact Supply Office
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssetTracking;