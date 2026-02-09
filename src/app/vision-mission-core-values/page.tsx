import React from 'react';
import { Eye, Target, Heart, Award } from 'lucide-react';

export default function VisionMissionPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Header */}
            <div className="bg-primary py-20 text-primary-foreground relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 italic">
                        Our Foundation
                    </h1>
                    <p className="text-accent text-sm md:text-base font-bold tracking-[0.3em] uppercase">
                        Vision • Mission • Core Values
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20 space-y-12">

                {/* Vision Section */}
                <section className="bg-card border border-border rounded-xl shadow-elegant p-10 md:p-16 text-center">
                    <div className="flex justify-center mb-6 text-accent">
                        <Eye size={48} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Vision</h2>
                    <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-foreground/80 max-w-3xl mx-auto">
                        "We dream of Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation."
                    </p>
                </section>

                {/* Mission Section */}
                <section className="bg-card border border-border rounded-xl shadow-elegant p-10 md:p-16 text-center">
                    <div className="flex justify-center mb-6 text-accent">
                        <Target size={48} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Mission</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                        To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:
                    </p>
                    <div className="grid md:grid-cols-4 gap-8 mt-10 text-sm font-bold  tracking-wider text-primary">
                        <div className="p-4 bg-secondary/50 rounded-lg">Students learn in a child-friendly, gender-sensitive, safe, and motivating environment.</div>
                        <div className="p-4 bg-secondary/50 rounded-lg">Teachers facilitate learning and constantly nurture every learner.</div>
                        <div className="p-4 bg-secondary/50 rounded-lg">Administrators and staff, as stewards of the institution, ensure an enabling and supportive environment for effective learning to happen.</div>
                        <div className="p-4 bg-secondary/50 rounded-lg">Family, community, and other stakeholders are actively engaged and share responsibility for developing life- long learners.</div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="pt-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-primary">Core Values</h2>
                        <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValueCard title="Maka-Diyos" icon={<Award />} />
                        <ValueCard title="Maka-tao" icon={<Heart />} />
                        <ValueCard title="Makakalikasan" icon={<Award />} />
                        <ValueCard title="Makabansa" icon={<Award />} />
                    </div>
                </section>

            </div>
        </div>
    );
}

function ValueCard({ title, icon }: { title: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white border border-border p-8 rounded-lg text-center shadow-sm hover:shadow-elegant hover:-translate-y-1 transition-all group">
            <div className="text-accent mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {/* Check if icon is a valid React Element before cloning */}
                {React.isValidElement(icon)
                    ? React.cloneElement(icon as React.ReactElement<any>, { size: 32 })
                    : icon
                }
            </div>
            <h3 className="text-lg font-serif font-bold text-primary uppercase tracking-tighter">
                {title}
            </h3>
        </div>
    );
}