import React from 'react';
import Link from 'next/link';
import { FileText, Search, Filter, Download, Calendar, ArrowRight, Info } from 'lucide-react';

const memos = [
    {
        number: "042",
        series: "2026",
        title: "COMPOSITION OF THE DIVISION MONITORING AND EVALUATION TEAM FOR THE 2026 NATIONAL SCHOOLS PRESS CONFERENCE",
        date: "February 8, 2026",
        category: "Administrative",
        slug: "memo-042-s-2026"
    },
    {
        number: "041",
        series: "2026",
        title: "SUBMISSION OF INDIVIDUAL PERFORMANCE COMMITMENT AND REVIEW FORM (IPCRF) FOR CY 2025",
        date: "February 5, 2026",
        category: "Personnel",
        slug: "memo-041-s-2026"
    },
    {
        number: "040",
        series: "2026",
        title: "DIVISION COORDINATION MEETING ON THE IMPLEMENTATION OF MATATAG CURRICULUM",
        date: "February 2, 2026",
        category: "Curriculum",
        slug: "memo-040-s-2026"
    }
];

export default function DivisionMemosPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* OFFICIAL HEADER */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold italic">Division Memos</h1>
                    <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mt-2">
                        Official Issuances and Administrative Orders
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                {/* SEARCH & FILTER BAR */}
                <div className="bg-white border border-border p-4 rounded-xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Memo Number or Keyword..."
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

                {/* MEMO LIST */}
                <div className="space-y-4">
                    {memos.map((memo) => (
                        <div
                            key={memo.number}
                            className="group bg-white border border-border rounded-xl p-6 hover:border-accent transition-all flex flex-col md:flex-row gap-6 items-start md:items-center"
                        >
                            {/* Memo Identifier */}
                            <div className="flex flex-col items-center justify-center bg-secondary/50 w-24 h-24 rounded-lg shrink-0 border border-border group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">Memo No.</span>
                                <span className="text-2xl font-serif font-bold">{memo.number}</span>
                                <span className="text-[10px] font-bold uppercase">s. {memo.series}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-accent/10 text-accent text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                                        {memo.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                                        <Calendar size={12} /> {memo.date}
                                    </div>
                                </div>
                                <h3 className="text-base md:text-lg font-serif font-bold text-primary leading-tight group-hover:text-foreground transition-colors uppercase">
                                    {memo.title}
                                </h3>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-2 w-full md:w-auto">
                                <Link
                                    href={`/downloads/division-memos/${memo.slug}`}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-primary transition-all"
                                >
                                    <FileText size={14} /> View
                                </Link>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-border px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all">
                                    <Download size={14} /> PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ARCHIVE FOOTNOTE */}
                <div className="mt-16 bg-blue-50/50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
                    <Info className="text-primary mt-1" size={20} />
                    <p className="text-xs text-primary/70 leading-relaxed italic">
                        Missing an older issuance? Memos from series 2020 and earlier are currently being digitized.
                        For hard copies, please visit the Division Records Section during office hours.
                    </p>
                </div>
            </div>
        </div>
    );
}