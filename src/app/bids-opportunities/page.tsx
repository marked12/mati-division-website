import React from 'react';
import Link from 'next/link';
import { FileText, Calendar, ChevronRight } from 'lucide-react';

const bidOpportunities = [
    {
        id: "bid-2026-001",
        title: "REPAIR OF ELECTRICAL WIRING FOR TWO (2) AIR-CONDITION UNITS FOR ADMINISTRATIVE SERVICES SECTION (LOT 1)",
        date: "February 3, 2026",
        slug: "repair-electrical-wiring-admin"
    },
    {
        id: "bid-2026-002",
        title: "REPAIR AND REHABILITATION OF ELECTRICAL SYSTEM OF THE DIVISION OFFICE (LOT 1)",
        date: "February 3, 2026",
        slug: "repair-rehab-electrical-system"
    },
    {
        id: "bid-2026-003",
        title: "DIVISION FINALIZATION OF DEPED ONSE SEASON 12 EPISODE",
        date: "February 2, 2026",
        slug: "finalization-deped-onse"
    },
    {
        id: "bid-2026-004",
        title: "Procurement Design for Legal Office Water Dispenser",
        date: "January 21, 2026",
        slug: "procurement-water-dispenser"
    },
    {
        id: "bid-2026-005",
        title: "Procurement of Ink Toner for PSU Office Use – Lot 1",
        date: "January 19, 2026",
        slug: "procurement-ink-toner-psu"
    }
];

export default function BidOpportunitiesPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Banner */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold italic">Bid Opportunities</h1>
                    <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mt-2">Open for Public Bidding & Quotations</p>
                </div>
            </div>

            {/* List Container */}
            <div className="max-w-5xl mx-auto px-4 mt-12 space-y-4">
                {bidOpportunities.map((bid) => (
                    <Link
                        key={bid.id}
                        // Ensure this matches your folder name: src/app/bids-opportunities/[slug]
                        href={`/bids-opportunities/${bid.slug}`}
                        className="block group"
                    >
                        <div className="bg-white border border-border p-6 rounded-lg shadow-sm hover:shadow-elegant hover:border-accent transition-all flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className="mt-1 text-accent group-hover:text-primary transition-colors">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h2 className="text-base md:text-lg font-serif font-bold text-primary group-hover:text-foreground leading-tight mb-2">
                                        {bid.title}
                                    </h2>
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        <Calendar size={14} className="text-accent" />
                                        {bid.date}
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

            {/* Compliance Note */}
            <div className="max-w-5xl mx-auto px-4 mt-12">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center border-t border-border pt-8">
                    All procurement activities are conducted in accordance with RA 9184.
                </p>
            </div>
        </div>
    );
}