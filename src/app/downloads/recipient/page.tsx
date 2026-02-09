import React from 'react';
import { Users, Search, Map, Download, FileSpreadsheet, Package, Info, Filter } from 'lucide-react';

const recipientLists = [
    {
        id: "REC-2026-001",
        title: "OFFICIAL LIST OF RECIPIENTS FOR THE DCP 2024 E-PACKAGE (TABLETS & LAPTOPS)",
        date: "February 9, 2026",
        category: "ICT Equipment",
        totalRecipients: "42 Schools",
        slug: "recipients-dcp-2024-epackage"
    },
    {
        id: "REC-2026-002",
        title: "QUALIFIED TEACHER-RECIPIENTS FOR THE SPECIAL HARDSHIP ALLOWANCE (SHA) - Q1",
        date: "February 3, 2026",
        category: "Personnel Benefits",
        totalRecipients: "158 Teachers",
        slug: "recipients-sha-q1-2026"
    },
    {
        id: "REC-2026-003",
        title: "RECIPIENT SCHOOLS FOR THE SCHOOL-BASED FEEDING PROGRAM (SBFP) MILK COMPONENT",
        date: "January 20, 2026",
        category: "Health & Nutrition",
        totalRecipients: "28 Schools",
        slug: "recipients-sbfp-milk-2026"
    }
];

export default function RecipientsPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* OFFICIAL HEADER */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex bg-white/10 p-4 rounded-2xl border border-white/20">
                            <Users size={40} className="text-accent" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-serif font-bold italic">Recipient Lists</h1>
                            <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mt-2">
                                Official Distribution & Allocation Records
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                {/* SEARCH & CATEGORY FILTER */}
                <div className="bg-white border border-border p-4 rounded-xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Program or Allocation Name..."
                            className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border-none rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <select className="bg-secondary/50 border-none rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none">
                            <option>All Categories</option>
                            <option>ICT Equipment</option>
                            <option>Personnel Benefits</option>
                            <option>Learning Resources</option>
                        </select>
                    </div>
                </div>

                {/* RECIPIENT LISTS */}
                <div className="grid gap-6">
                    {recipientLists.map((list) => (
                        <div
                            key={list.id}
                            className="group bg-white border border-border rounded-xl p-6 hover:shadow-elegant hover:border-accent transition-all flex flex-col md:flex-row gap-6 items-start md:items-center"
                        >
                            {/* Icon Wrapper */}
                            <div className="bg-secondary/50 p-4 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Package size={28} />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="bg-primary/5 text-primary text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-primary/10">
                                        {list.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                        <Map size={12} className="text-accent" /> {list.totalRecipients}
                                    </span>
                                </div>
                                <h3 className="text-base md:text-lg font-serif font-bold text-primary leading-tight group-hover:text-foreground transition-colors">
                                    {list.title}
                                </h3>
                                <p className="text-[10px] text-muted-foreground mt-2 font-medium uppercase tracking-widest">
                                    Date Published: {list.date}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex md:flex-col gap-2 w-full md:w-auto">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-sm">
                                    <FileSpreadsheet size={14} /> View List
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-border px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all">
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* TRANSPARENCY NOTE */}
                <div className="mt-16 bg-blue-50/50 border border-blue-100 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                        <Info size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary text-sm uppercase tracking-tight">Transparency & Data Privacy</h4>
                        <p className="text-xs text-primary/70 leading-relaxed italic mt-1">
                            Allocation lists are published in the interest of transparency and public accountability.
                            Personal data of recipients is protected under the <strong>Data Privacy Act of 2012</strong>.
                            If you believe there is an error in the allocation, please contact the respective Program Coordinator.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}