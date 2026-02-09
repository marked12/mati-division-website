import React from 'react';
import { ShieldCheck, FileText, Zap, Info } from 'lucide-react';

export default function CitizensCharterPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Official Header Section */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                            <ShieldCheck size={40} className="text-accent" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold">Citizen&apos;s Charter</h1>
                            <p className="text-accent text-sm font-bold tracking-widest uppercase mt-2">
                                In compliance with RA 11032: Ease of Doing Business
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Legal Mandate Section */}
                <section className="bg-secondary/30 border-l-4 border-primary p-8 mb-12">
                    <div className="flex gap-4">
                        <Info className="text-primary shrink-0" size={24} />
                        <div className="text-sm leading-relaxed text-muted-foreground italic">
                            <p className="mb-4">
                                Section 2 of the <strong className="text-foreground">Republic Act (RA) 11032</strong>, otherwise known as the Ease of Doing Business and Efficient Government Service Delivery (EODB-EGSD) Act of 2018, declares the policy of the State to promote integrity, accountability, and proper management of public affairs.
                            </p>
                            <p>
                                In strict adherence with Section 6 of RA 11032, the Department of Education establishes these service standards to promote transparency and reduce red tape in all government transactions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Current Edition Highlight */}
                <div className="flex items-center justify-between border-b border-border pb-6 mb-10">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-primary">Service Standards</h2>
                        <p className="text-muted-foreground text-sm font-medium">Citizen&apos;s Charter 2025, First Edition</p>
                    </div>
                    <a
                        href="/documents/DepEd-Citizens-Charter-2025.pdf"
                        download="DepEd-Citizens-Charter-2025.pdf"
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md"
                    >
                        <FileText size={16} />
                        Download Full Handbook
                    </a>
                </div>

                {/* Service Categories Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    <CharterSection
                        title="Simplified Requirements"
                        content="Adoption of reduced documentary requirements to expedite both business and non-business related transactions."
                        icon={<Zap size={24} />}
                    />
                    <CharterSection
                        title="Efficient Turnaround"
                        content="Fixed processing times for every service to ensure predictable and speedy delivery of government services."
                        icon={<FileText size={24} />}
                    />
                </div>

                {/* Feedback Section */}
                <div className="mt-16 p-8 bg-card border border-border rounded-xl text-center">
                    <h3 className="text-xl font-serif font-bold text-primary mb-2">Feedback & Redress</h3>
                    <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-6">
                        Help us serve you better. If you have concerns regarding our service delivery, please contact our Public Assistance and Complaints Desk.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="px-4 py-2 bg-secondary rounded text-[11px] font-bold uppercase text-primary">PACD Hotline: (087) 123-4567</div>
                        <div className="px-4 py-2 bg-secondary rounded text-[11px] font-bold uppercase text-primary">Email: mati.city@deped.gov.ph</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CharterSection({ title, content, icon }: { title: string, content: string, icon: React.ReactNode }) {
    return (
        <div className="flex gap-5 p-6 bg-white border border-border rounded-lg hover:shadow-elegant transition-all">
            <div className="w-12 h-12 bg-accent/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="font-serif font-bold text-lg text-primary mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
            </div>
        </div>
    );
}