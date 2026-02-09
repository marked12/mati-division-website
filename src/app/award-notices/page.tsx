import React from 'react';
import Link from 'next/link';
import { Award, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

const awardNotices = [
    {
        id: "award-2026-001",
        title: "NOTICE OF AWARD: PROCUREMENT OF OFFICE SUPPLIES FOR THE 1ST QUARTER OF 2026",
        date: "February 5, 2026",
        slug: "award-office-supplies-q1",
        awardee: "Mati General Merchandising"
    },
    {
        id: "award-2026-002",
        title: "NOTICE OF AWARD: REPAIR AND REHABILITATION OF THE DIVISION MINI-GYM",
        date: "January 28, 2026",
        slug: "award-rehab-mini-gym",
        awardee: "Builders & Co. Construction"
    },
    {
        id: "award-2026-003",
        title: "NOTICE OF AWARD: CATERING SERVICES FOR THE DIVISION INSET 2026",
        date: "January 20, 2026",
        slug: "award-catering-inset-2026",
        awardee: "Davao Oriental Food Services"
    }
];

export default function AwardNoticesPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Banner - Same Style as Opportunities */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold italic">Award Notices</h1>
                    <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mt-2">Transparency in Project Awards</p>
                </div>
            </div>

            {/* List Container */}
            <div className="max-w-5xl mx-auto px-4 mt-12 space-y-4">
                {awardNotices.map((award) => (
                    <Link
                        key={award.id}
                        href={`/award-notices/${award.slug}`}
                        className="block group"
                    >
                        <div className="bg-white border border-border p-6 rounded-lg shadow-sm hover:shadow-elegant hover:border-accent transition-all flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className="mt-1 text-accent group-hover:text-primary transition-colors">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter flex items-center gap-1">
                                            <CheckCircle2 size={10} /> Awarded
                                        </span>
                                    </div>
                                    <h2 className="text-base md:text-lg font-serif font-bold text-primary group-hover:text-foreground leading-tight mb-2 uppercase">
                                        {award.title}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-accent" />
                                            {award.date}
                                        </div>
                                        <div className="text-primary/60 italic">
                                            Awardee: {award.awardee}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-center">
                                <ChevronRight className="text-border group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-12">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center border-t border-border pt-8">
                    Published pursuant to RA 9184 Disclosure Requirements.
                </p>
            </div>
        </div>
    );
}