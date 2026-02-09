import React from 'react';
import { ExternalLink, Globe, Landmark, Map, CloudLightning, ShieldCheck, HeartPulse } from 'lucide-react';

const resiliencePartners = [
    {
        category: "Government Agencies",
        links: [
            { name: "NDRRMC Official Portal", desc: "National disaster updates and policy guidelines.", url: "https://ndrrmc.gov.ph", icon: <Landmark size={20} /> },
            { name: "PAGASA - DOST", desc: "Real-time weather monitoring and flood warnings.", url: "https://bagong.pagasa.dost.gov.ph", icon: <CloudLightning size={20} /> },
            { name: "PHIVOLCS", desc: "Earthquake monitoring and volcanic activity alerts.", url: "https://www.phivolcs.dost.gov.ph", icon: <Map size={20} /> },
        ]
    },
    {
        category: "Regional & Local Support",
        links: [
            { name: "Office of Civil Defense - Region XI", desc: "Regional coordination for Davao Region.", url: "#", icon: <ShieldCheck size={20} /> },
            { name: "City Government of Mati", desc: "Local emergency ordinances and city-wide alerts.", url: "#", icon: <Globe size={20} /> },
        ]
    },
    {
        category: "Health & Wellbeing",
        links: [
            { name: "Department of Health (DOH)", desc: "Health advisories and emergency medical protocols.", url: "https://doh.gov.ph", icon: <HeartPulse size={20} /> },
            { name: "Red Cross Philippines", desc: "Blood services and community first aid support.", url: "https://redcross.org.ph", icon: <ShieldCheck size={20} /> },
        ]
    }
];

export default function ResiliencyLinkPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header - Consistent with DRRM Theme */}
            <div className="bg-[#b91c1c] py-16 text-white border-b-4 border-[#7f1d1d]">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold italic">Resiliency Link</h1>
                    <p className="text-red-100 text-xs font-bold tracking-[0.3em] uppercase mt-2">
                        Connecting Mati City to Global & National Safety Networks
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-12">
                {/* Intro Section */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 italic text-balance">
                        "Resilience is built through strong partnerships and shared information."
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Access these verified external resources to stay informed about national safety standards,
                        real-time weather data, and regional emergency protocols.
                    </p>
                </div>

                {/* Partner Grid */}
                <div className="space-y-12">
                    {resiliencePartners.map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 border-l-4 border-red-600 pl-4">
                                {section.category}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.links.map((link, lIdx) => (
                                    <a
                                        key={lIdx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block bg-white border border-border p-6 rounded-xl hover:border-red-600 transition-all hover:shadow-elegant relative overflow-hidden"
                                    >
                                        <div className="text-primary/40 group-hover:text-red-600 transition-colors mb-4">
                                            {link.icon}
                                        </div>
                                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2 group-hover:text-red-700">
                                            {link.name}
                                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {link.desc}
                                        </p>

                                        {/* Subtle Background Pattern */}
                                        <div className="absolute -bottom-2 -right-2 text-secondary/10 group-hover:text-red-500/5 transition-colors">
                                            {link.icon}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Directory Note */}
                <div className="mt-20 p-8 border border-border rounded-2xl bg-secondary/30 text-center">
                    <p className="text-xs text-muted-foreground italic">
                        Missing a critical link? If you represent a partner agency in the Davao Region,
                        please contact the Division DRRM Coordinator to be included in our network.
                    </p>
                </div>
            </div>
        </div>
    );
}