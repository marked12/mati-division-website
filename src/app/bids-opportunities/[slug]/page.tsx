"use client";

import React from 'react';
import { Download, ArrowLeft, FileCheck, Printer } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BidPreviewPage() {
    const params = useParams();
    const slug = params?.slug as string;

    if (!slug) {
        return <div className="min-h-screen flex items-center justify-center font-serif uppercase tracking-widest text-muted-foreground">Loading Document...</div>;
    }

    // Clean formatting for the header
    const displayTitle = slug.replace(/-/g, ' ').toUpperCase();
    const pdfPath = `/documents/bids/${slug}.pdf`;

    return (
        <div className="min-h-screen bg-background pb-10">
            {/* MATCHED HEADER DESIGN */}
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
                                <h1 className="text-4xl font-serif font-bold italic">Document Preview</h1>
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

            {/* MATCHED WRAPPER CONTENT */}
            <div className="max-w-5xl mx-auto px-4 mt-8">
                {/* BREADCRUMB STYLE TITLE */}
                <div className="mb-6 flex items-start gap-3 p-4 bg-secondary/30 border border-border rounded-lg">
                    <FileCheck className="text-primary shrink-0" size={20} />
                    <h2 className="text-sm font-bold text-primary leading-snug">
                        {displayTitle}
                    </h2>
                </div>

                {/* THE VIEWER BOX */}
                <div className="relative w-full aspect-[1/1.4] md:h-[800px] bg-white border border-border rounded-xl shadow-elegant overflow-hidden">
                    {/* Note: We use an iframe with a specific #toolbar setting.
                        If it still auto-downloads, it is a browser-level setting
                        or a 404 on the file path.
                    */}
                    <embed
                        src={`${pdfPath}#toolbar=1&view=FitH`}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        className="w-full h-full"
                    />
                </div>

                {/* FOOTER NOTE */}
                <p className="mt-6 text-[10px] text-muted-foreground uppercase tracking-widest text-center">
                    Document Ref: {slug} • Official DepEd Mati Issuance
                </p>
            </div>
        </div>
    );
}