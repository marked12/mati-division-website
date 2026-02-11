"use client";
import React from 'react';
import Link from 'next/link';
import {
    Users,
    Megaphone,
    Activity,
    ArrowRight,
    ShieldCheck, FileText
} from 'lucide-react';

export default function AdminDashboard() {
    const navigationCards = [
        {
            title: "Personnel Directory",
            description: "Manage user access levels, approve pending registrations, and update employee roles.",
            icon: <Users size={28} />,
            href: "/admin/dashboard/users",
            countLabel: "Total Personnel"
        },
        {
            title: "Manage Announcements",
            description: "Create, edit, and archive official news or department updates for the portal.",
            icon: <Megaphone size={28} />,
            href: "/admin/dashboard/announcements",
            countLabel: "Active Posts"
        },
        {
            title: "Bids and Awards",
            description: "Post procurement opportunities, manage bidding documents, and publish award notices.",
            icon: <FileText size={28} />, // You can change this to a 'FileText' or 'Gavel' icon if preferred
            href: "/admin/dashboard/bids-and-awards",
            countLabel: "Open Bids"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Page Header Area */}
            <div className="bg-primary pt-16 pb-12 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck size={20} className="text-accent" />
                        <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
                            Administrative Control Center
                        </p>
                    </div>
                    <h1 className="text-4xl font-serif font-bold italic">
                        Main Dashboard
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {navigationCards.map((card) => (
                        <Link
                            key={card.title}
                            href={card.href}
                            className="group bg-white border border-border rounded-lg p-8 shadow-sm hover:shadow-md hover:border-accent transition-all flex flex-col h-full"
                        >
                            {/* Icon & Title */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-secondary/10 text-primary rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                                    {card.icon}
                                </div>
                                <ArrowRight size={20} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                            </div>

                            <h2 className="text-xl font-serif font-bold text-primary mb-3">
                                {card.title}
                            </h2>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                                {card.description}
                            </p>

                            {/* Action Footer */}
                            <div className="pt-6 border-t border-border flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  Open Module
                </span>
                                <span className="text-[10px] font-medium text-muted-foreground italic uppercase">
                  {card.countLabel}
                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick System Note */}
                <div className="mt-12 p-6 bg-secondary/5 border border-dashed border-border rounded-lg text-center">
                    <p className="text-xs text-muted-foreground italic font-serif">
                        Welcome to the Mati City Division Portal administrative panel. Select a module above to begin managing your directory.
                    </p>
                </div>
            </div>
        </div>
    );
}