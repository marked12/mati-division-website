"use client";

import React from 'react';
import { Download, ArrowLeft, Award, Printer } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AwardPreviewPage() {
    const params = useParams();
    const slug = params?.slug as string;

    if (!slug) return null;

    const displayTitle = slug.replace(/-/g, ' ').toUpperCase();
    const pdfPath = `/documents/awards/${slug}.pdf`;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* HEADER BANNER */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                        {/* LEFT SIDE: BACK BUTTON & TITLE */}
                        <div className="flex items-center gap-6">
                            <Link
                                href="/bids-opportunities"
                                className="p-2.5 border border-white/10 hover:border-accent/40 rounded-xl transition-all hover:bg-white/5"
                            >
                                <ArrowLeft size={28} className="text-accent" />
                            </Link>

                            <div>
                                <h1 className="text-4xl font-serif font-bold italic">Award Preview</h1>
                                <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mt-2">
                                    Mati City Procurement Portal
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE: ACTION BUTTONS */}
                        <div className="flex items-center gap-3">


                            <a
                                href={pdfPath}
                                download={`${slug}.pdf`}
                                className="flex items-center gap-2 bg-accent text-primary px-6 py-2.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                            >
                                <Download size={16} /> Download PDF
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* VIEWER WRAPPER */}
            <div className="max-w-5xl mx-auto px-4 mt-12">
                <div className="bg-white border border-border p-6 rounded-lg shadow-sm mb-6 flex items-start gap-4">
                    <div className="text-accent mt-1">
                        <Award size={28} />
                    </div>
                    <h2 className="text-lg md:text-xl font-serif font-bold text-primary">
                        {displayTitle}
                    </h2>
                </div>

                <div className="bg-white border border-border rounded-xl shadow-elegant overflow-hidden h-[800px] w-full">
                    {/* Remember: If IDM pops up, disable it for localhost to see the preview! */}
                    <embed
                        src={`${pdfPath}#toolbar=1&view=FitH`}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
}