import React from 'react';
import Link from 'next/link';
import { Scale, Search, Filter, Download, Calendar, FileCheck, Info } from 'lucide-react';

const orders = [
    {
        number: "012",
        series: "2026",
        title: "ESTABLISHMENT OF THE DIVISION QUALITY MANAGEMENT SYSTEM (DQMS) AND COMPOSITION OF THE INTERNAL AUDIT TEAM",
        date: "February 7, 2026",
        category: "Policy",
        slug: "order-012-s-2026"
    },
    {
        number: "011",
        series: "2026",
        title: "GUIDELINES ON THE RECRUITMENT, SELECTION, AND APPOINTMENT OF TEACHING AND NON-TEACHING PERSONNEL FOR CY 2026",
        date: "January 25, 2026",
        category: "Governance",
        slug: "order-011-s-2026"
    },
    {
        number: "010",
        series: "2026",
        title: "ADOPTION OF THE REVISED SCHOOL-BASED MANAGEMENT (SBM) FRAMEWORK IN THE DIVISION OF MATI CITY",
        date: "January 12, 2026",
        category: "Administrative",
        slug: "order-010-s-2026"
    }
];

export default function DivisionOrdersPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* MATCHED OFFICIAL HEADER */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex bg-white/10 p-4 rounded-2xl border border-white/20">
                            <Scale size={40} className="text-accent" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-serif font-bold italic">Division Orders</h1>
                            <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mt-2">
                                Institutional Policies and Regulatory Guidelines
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                {/* SEARCH & FILTER BAR */}
                <div className="bg-white border border-border p-4 rounded-xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Order Number or Policy Name..."
                            className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border-none rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <select className="bg-secondary/50 border-none rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none">
                            <option>Series of 2026</option>
                            <option>Series of 2025</option>
                        </select>
                        <button className="bg-primary text-white p-2.5 rounded-lg hover:bg-accent hover:text-primary transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* ORDER LIST */}
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.number}
                            className="group bg-white border border-border rounded-xl p-6 hover:border-accent transition-all flex flex-col md:flex-row gap-6 items-start md:items-center"
                        >
                            {/* Order Identifier - Circular/Seal Style */}
                            <div className="flex flex-col items-center justify-center bg-primary/5 w-24 h-24 rounded-full shrink-0 border-2 border-dashed border-primary/20 group-hover:border-accent group-hover:bg-primary group-hover:text-white transition-all">
                                <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">Order No.</span>
                                <span className="text-2xl font-serif font-bold">{order.number}</span>
                                <span className="text-[9px] font-bold uppercase">s. {order.series}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="flex items-center gap-1 text-[10px] text-primary font-black uppercase tracking-widest">
                                        <FileCheck size={12} className="text-accent" /> {order.category}
                                    </span>
                                    <div className="w-1 h-1 rounded-full bg-border" />
                                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                                        <Calendar size={12} /> {order.date}
                                    </div>
                                </div>
                                <h3 className="text-base md:text-lg font-serif font-bold text-primary leading-tight group-hover:text-foreground transition-colors uppercase">
                                    {order.title}
                                </h3>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-2 w-full md:w-auto">
                                <Link
                                    href={`/downloads/division-orders/${order.slug}`}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-sm"
                                >
                                    View Policy
                                </Link>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-border px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all">
                                    <Download size={14} /> PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* LEGAL NOTE */}
                <div className="mt-16 bg-secondary/30 border border-border p-8 rounded-2xl text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold mb-2">Compliance & Authority</p>
                    <p className="text-xs text-muted-foreground leading-relaxed italic max-w-3xl mx-auto">
                        Division Orders constitute official policy of the Schools Division of Mati City.
                        Unless otherwise revoked or amended, these issuances remain in full force and effect.
                        For official certified true copies, coordinate with the Office of the Schools Division Superintendent.
                    </p>
                </div>
            </div>
        </div>
    );
}