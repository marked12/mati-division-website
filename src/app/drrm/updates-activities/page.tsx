import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Calendar, MapPin, ArrowRight, Activity } from 'lucide-react';

const drrmUpdates = [
    {
        id: "drrm-2026-001",
        title: "DIVISION-WIDE EARTHQUAKE AND FIRE DRILL CONDUCTED",
        date: "February 6, 2026",
        location: "Mati City Schools Division Office",
        description: "In coordination with BFP Mati, the division conducted its 1st Quarter Nationwide Simultaneous Earthquake Drill to ensure staff readiness.",
        category: "Preparedness",
        image: "/images/drrm/drill-2026.jpg" // Ensure you have a placeholder or real image
    },
    {
        id: "drrm-2026-002",
        title: "DISTRIBUTION OF EMERGENCY GO-BAGS TO REMOTE SCHOOLS",
        date: "January 30, 2026",
        location: "District 4 & 5",
        description: "Over 200 emergency kits were distributed to mountain-side schools as part of the Resilient Schools Initiative.",
        category: "Response",
        image: "/images/drrm/gobags.jpg"
    },
    {
        id: "drrm-2026-003",
        title: "DRRM PLANNING WORKSHOP FOR SCHOOL COORDINATORS",
        date: "January 15, 2026",
        location: "Division Training Center",
        description: "Strategic planning for the 2026 typhoon season, focusing on school-based contingency mapping.",
        category: "Planning",
        image: "/images/drrm/workshop.jpg"
    }
];

export default function DRRMUpdatesPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* High-Impact DRRM Header */}
            <div className="bg-[#b91c1c] py-16 text-white border-b-4 border-[#7f1d1d]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-white/10 p-4 rounded-full border border-white/20 animate-pulse">
                            <ShieldAlert size={48} className="text-white" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-serif font-bold italic">DRRM Updates & Activities</h1>
                            <p className="text-red-100 text-xs font-bold tracking-[0.3em] uppercase mt-2">
                                Disaster Risk Reduction & Management Section
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                {/* Statistics / Quick Info Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <StatCard label="Ongoing Activities" value="03" icon={<Activity size={18}/>} />
                    <StatCard label="Schools Covered" value="42" icon={<MapPin size={18}/>} />
                    <StatCard label="Quarter" value="1st" icon={<Calendar size={18}/>} />
                    <StatCard label="Alert Level" value="Normal" icon={<ShieldAlert size={18}/>} color="text-green-600" />
                </div>

                {/* Updates Feed */}
                <div className="grid gap-8">
                    {drrmUpdates.map((update) => (
                        <div key={update.id} className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-elegant transition-all flex flex-col md:flex-row group">
                            {/* Image Placeholder */}
                            <div className="md:w-1/3 h-48 md:h-auto bg-secondary relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-primary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                        {update.category}
                                    </span>
                                </div>
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 italic text-xs">
                                    [Activity Image]
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:w-2/3 flex flex-col justify-center">
                                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={14} className="text-red-600"/> {update.date}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} className="text-red-600"/> {update.location}</span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-serif font-bold text-primary mb-3 group-hover:text-red-700 transition-colors uppercase">
                                    {update.title}
                                </h2>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {update.description}
                                </p>
                                <button className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-red-700 transition-colors">
                                    Read Full Report <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color = "text-primary" }: { label: string, value: string, icon: React.ReactNode, color?: string }) {
    return (
        <div className="bg-white border border-border p-4 rounded-lg flex items-center gap-4">
            <div className="bg-secondary p-3 rounded-lg text-red-600">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className={`text-xl font-serif font-black ${color}`}>{value}</p>
            </div>
        </div>
    );
}