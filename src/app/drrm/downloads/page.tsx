import React from 'react';
import {
    Download,
    FileText,
    ShieldCheck,
    HardHat,
    Notebook as iconNotebook,
    PhoneCall,
    AlertTriangle,
    NotebookIcon
} from 'lucide-react';

const downloadCategories = [
    {
        category: "Emergency Protocols",
        icon: <ShieldCheck className="text-red-600" size={24} />,
        files: [
            { title: "Standard Operating Procedures (SOP) for Typhoons", size: "2.4 MB", type: "PDF" },
            { title: "Division Flood Evacuation Plan 2026", size: "1.8 MB", type: "PDF" },
            { title: "Fire Safety & Drill Protocols", size: "1.2 MB", type: "PDF" },
        ]
    },
    {
        category: "School Templates",
        icon: <HardHat className="text-red-600" size={24} />,
        files: [
            { title: "School Disaster Readiness Checklist", size: "850 KB", type: "DOCX" },
            { title: "Rapid Assessment of Damages Report (RADaR) Form", size: "1.1 MB", type: "PDF" },
            { title: "Family Preparedness Homework Template", size: "500 KB", type: "PDF" },
        ]
    },
    {
        category: "Learning Materials",
        icon: <NotebookIcon className="text-red-600" size={24} />,
        files: [
            { title: "DRRM Integration in Curriculum Guide", size: "4.5 MB", type: "PDF" },
            { title: "Climate Change Adaptation Handbook", size: "3.2 MB", type: "PDF" },
        ]
    }
];

export default function DRRMDownloadsPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* DRRM Themed Header */}
            <div className="bg-[#b91c1c] py-16 text-white border-b-4 border-[#7f1d1d]">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold italic">DRRM Downloads</h1>
                    <p className="text-red-100 text-xs font-bold tracking-[0.3em] uppercase mt-2">
                        Resilience Toolkit & Emergency Resources
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-12">
                {/* Emergency Hotlines Callout */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-12 rounded-r-lg flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="bg-orange-500 p-3 rounded-full text-white">
                            <PhoneCall size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-orange-900 uppercase tracking-tight">Emergency Hotlines</h3>
                            <p className="text-orange-700 text-sm">Keep these numbers saved for immediate response.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-orange-400 uppercase">CDRRMO Mati</p>
                            <p className="font-serif font-bold text-orange-900">0912-345-6789</p>
                        </div>
                        <div className="w-[1px] bg-orange-200 h-10 hidden md:block"></div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-orange-400 uppercase">BFP Mati</p>
                            <p className="font-serif font-bold text-orange-900">(087) 123-4567</p>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid gap-10">
                    {downloadCategories.map((cat, idx) => (
                        <div key={idx} className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-2">
                                {cat.icon}
                                <h2 className="text-xl font-serif font-bold text-primary uppercase tracking-tight">
                                    {cat.category}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cat.files.map((file, fIdx) => (
                                    <div
                                        key={fIdx}
                                        className="group bg-white border border-border p-5 rounded-lg hover:border-red-600 transition-all shadow-sm hover:shadow-md flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="bg-secondary p-3 rounded group-hover:bg-red-50 transition-colors">
                                                <FileText className="text-muted-foreground group-hover:text-red-600" size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-primary leading-tight mb-1 group-hover:text-red-700">
                                                    {file.title}
                                                </h4>
                                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                                    {file.type} • {file.size}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-muted-foreground hover:text-red-600 transition-colors">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Important Warning */}
                <div className="mt-16 bg-secondary/50 border border-dashed border-border p-8 rounded-xl text-center">
                    <AlertTriangle className="mx-auto text-muted-foreground mb-3" size={32} />
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto italic">
                        All documents provided are the official properties of DepEd Mati City DRRM Section.
                        Unauthorized alteration of emergency protocols is strictly prohibited.
                        Please ensure you are downloading the most recent version (2026 Revision).
                    </p>
                </div>
            </div>
        </div>
    );
}