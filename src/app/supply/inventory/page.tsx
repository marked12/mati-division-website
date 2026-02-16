"use client";

import React, { useState } from 'react';
import {
    Package,
    Search,
    Filter,
    CheckCircle2,
    AlertCircle,
    Clock,
    Box,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';

const InventoryPublicPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const inventory = [
        { id: 1, item: "A4 Bond Paper (70gsm)", category: "Office Supplies", stock: "In Stock", quantity: "450 Reams", updated: "2 hours ago" },
        { id: 2, item: "Epson 003 Ink (Black)", category: "Consumables", stock: "Low Stock", quantity: "12 Units", updated: "1 day ago" },
        { id: 3, item: "Monobloc Chairs (White)", category: "Furniture", stock: "Out of Stock", quantity: "0 Units", updated: "5 days ago" },
        { id: 4, item: "Standard First Aid Kits", category: "Medical", stock: "In Stock", quantity: "25 Kits", updated: "3 hours ago" },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'In Stock': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            case 'Low Stock': return 'bg-amber-100 text-amber-600 border-amber-200';
            case 'Out of Stock': return 'bg-red-100 text-red-600 border-red-200';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] bg-accent/10 px-4 py-2 rounded-full">Supply & Property Office</span>
                    <h1 className="text-4xl font-black text-primary uppercase mt-6 tracking-tight">Inventory Updates</h1>
                    <p className="text-slate-500 mt-2 font-medium">Real-time availability of common office supplies and equipment.</p>
                </div>
                <div className="hidden md:block">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                        <Clock size={14} /> Last Updated: Feb 16, 2026
                    </div>
                </div>
            </div>

            {/* Search Bar - Flexbox Bulletproof Style */}
            <div className="max-w-2xl mb-10">
                <div className="flex items-center bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/40 focus-within:ring-8 focus-within:ring-primary/5 focus-within:border-primary transition-all overflow-hidden">
                    <div className="pl-7 pr-3 flex items-center justify-center text-slate-400">
                        <Search size={20} strokeWidth={2.5} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search items (e.g. 'Ink', 'Paper', 'Chair')..."
                        className="w-full py-5 pr-8 bg-transparent border-none outline-none font-bold text-sm text-primary placeholder:text-slate-400 placeholder:font-medium tracking-tight"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {inventory.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => console.log("Navigate to details")}
                        className="group relative w-full cursor-pointer bg-white border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 active:scale-[0.98] overflow-hidden"
                        style={{ borderRadius: '24px' }}
                    >
                        {/* Top Row: Category and Action Arrow */}
                        <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="text-[9px] font-black text-accent uppercase tracking-widest bg-accent/5 px-3 py-1 rounded-lg">
                    {item.category}
                </span>

                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:rotate-45 transition-all duration-300 border border-slate-100">
                                <ArrowUpRight size={16} strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Middle Row: Item Name */}
                        <div className="relative z-10 mb-6">
                            <h3 className="text-base font-black text-primary uppercase tracking-tight leading-snug group-hover:text-accent transition-colors">
                                {item.item}
                            </h3>
                        </div>

                        {/* Bottom Row: Stats and Status */}
                        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-2">
                                <Box size={14} className="text-primary" />
                                <span className="text-xs font-black text-primary uppercase">
                        {item.quantity}
                    </span>
                            </div>

                            <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(item.stock)}`}>
                        {item.stock}
                    </span>
                                <div className="hidden sm:flex items-center gap-1 text-slate-400">
                                    <Clock size={10} />
                                    <span className="text-[8px] font-bold uppercase">{item.updated}</span>
                                </div>
                            </div>
                        </div>

                        {/* Extremely faint background watermark */}
                        <Package
                            size={100}
                            className="absolute -right-6 -bottom-6 text-slate-100 opacity-30 pointer-events-none transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-50 group-hover:-rotate-12"
                        />
                    </div>
                ))}
            </div>

            {/* Procurement Notice */}
            <div className="mt-12 p-10 bg-slate-900 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 text-left overflow-hidden relative shadow-2xl shadow-slate-900/20">

                <div className="relative z-10">
                    {/* Added text-white here */}
                    <h3 className="text-2xl font-black uppercase tracking-tight text-gray leading-none">
                        Need items not listed here?
                    </h3>
                    {/* Changed to text-slate-300 for better readability on dark bg */}
                    <p className="text-slate-300 text-sm font-medium mt-3 uppercase tracking-wider">
                        Submit a procurement request through the supply portal.
                    </p>
                </div>

                <a href="/supply/procurement" className="relative z-10 px-8 py-5 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-accent transition-all shadow-xl shadow-primary/20 flex items-center gap-3 group shrink-0">
                    Request Procurement
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            </div>
        </div>
    );
};

export default InventoryPublicPage;