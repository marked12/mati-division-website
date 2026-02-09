import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AnnouncementCard from '../components/AnnouncementCard';
import QuickLinkCard from '../components/QuickLinkCard';
import { FileText, Award, Shield, Download, Users, Building } from 'lucide-react';

// This acts as our "Mock Database" until we connect MySQL
const announcements = [
    {
        title: "New Public Infrastructure Projects Announced",
        date: "January 15, 2026",
        excerpt: "The Mati City Division announces the commencement of several infrastructure development projects aimed at improving public facilities.",
        href: "#"
    },
    {
        title: "Disaster Preparedness Training Schedule",
        date: "January 10, 2026",
        excerpt: "Community disaster preparedness training sessions will be conducted across all barangays. Registration is now open.",
        href: "#"
    },
    {
        title: "Annual Budget Transparency Report Released",
        date: "January 5, 2026",
        excerpt: "The complete annual budget allocation and expenditure report is now available for public review.",
        href: "#"
    }
];

const quickLinks = [
    { title: "Bid Opportunities", description: "View current procurement", href: "/bids-opportunities", icon: Award },
    { title: "DRRM Updates", description: "Latest disaster risk info", href: "/drrm/updates-activities", icon: Shield },
    { title: "Downloads", description: "Access official documents", href: "/downloads/division-memos", icon: Download },
    { title: "Organization", description: "Our structure and mandate", href: "/organizational-chart", icon: Building },
    { title: "Personnel", description: "Meet our dedicated team", href: "/personnel", icon: Users },
    { title: "Contact Us", description: "Get in touch with our office", href: "/contact", icon: FileText }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-background">

            <main>
                {/* HERO SECTION */}
                <HeroSection />

                {/*sds message*/}
                <section className="py-24 bg-secondary/30 relative overflow-hidden">
                    {/* Decorative Elements for a Government Feel */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

                    <div className="max-w-6xl mx-auto px-4">
                        <div className="bg-white rounded-3xl shadow-elegant border border-border overflow-hidden">
                            <div className="flex flex-col md:flex-row">

                                {/* Image Section with a colored backdrop */}
                                <div className="md:w-2/5 bg-primary relative min-h-[400px] flex items-center justify-center overflow-hidden">
                                    {/* Subtle Seal Background for the Portrait */}
                                    <div className="absolute inset-0 opacity-10 scale-150 grayscale brightness-200 bg-[url('/seal-placeholder.png')] bg-center bg-no-repeat"></div>

                                    <div className="relative z-10 w-72 h-80 border-2 border-accent/50 rounded-xl overflow-hidden shadow-2xl rotate-2 group hover:rotate-0 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center text-white/40 text-[10px] font-black uppercase tracking-widest text-center px-6">
                                            [ Official Portrait <br/> Placement ]
                                        </div>
                                        {/* Once you have the photo: <img src="/sds-photo.jpg" className="object-cover w-full h-full" /> */}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="md:w-3/5 p-8 md:p-16 flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-3 mb-6">
                                        <div className="h-[1px] w-8 bg-accent"></div>
                                        <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Superintendent's Corner</span>
                                    </div>

                                    <h3 className="text-2xl md:text-4xl font-serif font-bold italic text-primary leading-tight mb-8 relative">
                                        <span className="text-6xl font-serif text-accent/20 absolute -top-8 -left-4">"</span>
                                        We are not just managing schools; we are nurturing the future leaders of Mati City.
                                        <span className="text-6xl font-serif text-accent/20 absolute -bottom-12">"</span>
                                    </h3>

                                    <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed mb-10 border-l-2 border-secondary pl-6 italic">
                                        <p>
                                            Welcome to the digital home of the Division of Mati City. This portal serves as our window for transparency, a tool for efficiency, and a bridge to the community we serve.
                                        </p>
                                        <p>
                                            Through our collective efforts, we ensure that every learner in Mati is provided with the quality education they deserve in a safe and motivating environment.
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-border flex justify-between items-end">
                                        <div>
                                            <p className="font-serif font-bold text-2xl uppercase tracking-[0.1em] text-primary">Dr. Winnie E. Batoon</p>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mt-1">Schools Division Superintendent</p>
                                        </div>
                                        {/* Digital Signature Placeholder */}
                                        <div className="hidden sm:block opacity-40 grayscale italic text-xs font-serif text-primary">
                                            /Signed/
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ANNOUNCEMENTS SECTION */}
                <section className="py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-end mb-12">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold text-foreground mb-2">Latest Announcements</h2>
                                <p className="text-muted-foreground">Stay updated with the latest news from the Division.</p>
                            </div>
                            <button className="hidden md:block text-primary font-semibold hover:underline">
                                View All News →
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {announcements.map((announcement, index) => (
                                <AnnouncementCard key={index} {...announcement} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* QUICK ACCESS GRID */}
                <section className="py-20 bg-secondary/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Access Portal</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Access important services and information quickly through our organized digital gateway.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quickLinks.map((link, index) => (
                                <QuickLinkCard key={index} {...link} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>


        </div>
    );
}