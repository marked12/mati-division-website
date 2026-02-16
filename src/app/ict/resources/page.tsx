"use client";

import React, { useState } from 'react';
import {
    BookOpen,
    Video,
    FileText,
    Download,
    ExternalLink,
    Search,
    GraduationCap,
    Youtube
} from 'lucide-react';

const ICTResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const resources = [
        {
            title: "DepEd Email Setup Guide",
            category: "Manual",
            type: "PDF",
            description: "Step-by-step instructions on how to set up your official email on Outlook and Mobile.",
            icon: <FileText className="text-blue-500" />,
            tags: ["Email", "Mobile", "Outlook"]
        },
        {
            title: "Google Workspace Training",
            category: "Video",
            type: "YouTube",
            description: "Master Google Drive, Docs, and Sheets for classroom management.",
            icon: <Youtube className="text-red-500" />,
            tags: ["Google", "Classroom", "Productivity"]
        },
        {
            title: "DCP Package Maintenance",
            category: "Training",
            type: "PDF",
            description: "Maintenance guide for DepEd Computerization Program (DCP) packages in schools.",
            icon: <BookOpen className="text-emerald-500" />,
            tags: ["DCP", "Hardware", "Maintenance"]
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6">
                    <GraduationCap size={16} className="text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Learning Management</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">ICT Training & Resources</h1>
                <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">
                    Access official manuals, video tutorials, and technical documentation to enhance your digital literacy.
                </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="max-w-2xl mx-auto mb-16">
                <div className="flex items-center bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/40 focus-within:ring-8 focus-within:ring-primary/5 focus-within:border-primary transition-all overflow-hidden">

                    {/* Icon Area - Guaranteed separate space */}
                    <div className="pl-7 pr-3 flex items-center justify-center text-slate-400">
                        <Search size={20} strokeWidth={2.5} />
                    </div>

                    {/* Input Area */}
                    <input
                        type="text"
                        placeholder="Search resources (e.g. 'Email', 'Zoom', 'Manual')..."
                        className="w-full py-5 pr-8 bg-transparent border-none outline-none font-bold text-sm text-primary placeholder:text-slate-400 placeholder:font-medium tracking-tight"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((res, i) => (
                    <div key={i} className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 flex flex-col h-full">
                        {/* Type Badge */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                {res.icon}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
                                {res.type}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">{res.category}</p>
                            <h3 className="text-xl font-black text-primary uppercase tracking-tight leading-tight mb-3">
                                {res.title}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                                {res.description}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {res.tags.map(tag => (
                                <span key={tag} className="text-[9px] font-bold text-slate-400 border border-slate-100 px-2 py-1 rounded-md">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Action Button */}
                        <button className="w-full py-4 bg-slate-900 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 group-hover:bg-primary transition-colors">
                            {res.type === 'YouTube' ? <ExternalLink size={14} /> : <Download size={14} />}
                            {res.type === 'YouTube' ? 'Watch Tutorial' : 'Download File'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-20 p-10 bg-primary rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                <div className="relative z-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Can't find what you're looking for?</h2>
                    <p className="text-white/70 text-sm font-medium mb-8">Suggest a new training topic or request a specific manual.</p>
                    <button className="px-8 py-4 bg-accent text-white font-black uppercase text-xs tracking-widest rounded-xl hover:scale-105 transition-transform shadow-xl shadow-accent/20">
                        Contact ICT Unit
                    </button>
                </div>
                {/* Decorative background element */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default ICTResourcesPage;