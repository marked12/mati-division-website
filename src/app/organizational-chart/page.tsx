import React from 'react';
import OrgChartNode from '../../components/OrgChartNode';

export default function OrgChartPage() {
    return (
        <div className="min-h-screen bg-background">
            <main className="py-16">
                <div className="max-w-6xl mx-auto px-4 text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">Organizational Structure</h1>
                    <p className="text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase">
                        Mati City Division
                    </p>
                </div>

                {/* SCROLL WRAPPER:
                    'overflow-x-auto' allows the user to swipe.
                    'pb-20' provides space for the scrollbar.
                */}
                <div className="w-full overflow-x-auto pb-20 scrollbar-thin scrollbar-thumb-primary/20">

                    {/* THE CANVAS:
                        We force 'min-w-[900px]' so the three pillars never stack.
                        'flex flex-col items-center' keeps the central vertical trunk aligned.
                    */}
                    <div className="min-w-[900px] flex flex-col items-center">

                        {/* Level 1: SDS */}
                        <OrgChartNode
                            name="WINNIE E. BATOON, CESO V"
                            position="Schools Division Superintendent"
                            isLeader
                            hasBottomLine
                        />

                        {/* Level 2: ASDS */}
                        <OrgChartNode
                            name="Atty. Ricardo Dela Cruz"
                            position="Asst. Schools Division Superintendent"
                            hasTopLine
                            hasBottomLine
                        />

                        {/* HORIZONTAL CONNECTOR SECTION:
                            Removed 'hidden lg:flex' so it shows on all screens.
                        */}
                        <div className="flex w-full max-w-4xl justify-between relative">
                            {/* The Horizontal Bridge Line */}
                            <div className="absolute top-0 left-[16.6%] right-[16.6%] h-px bg-border"></div>

                            {/* Pillar 1: CID */}
                            <div className="w-1/3 flex justify-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-px h-6 bg-border"></div>
                                    <OrgChartNode name="CID Chief" position="Curriculum Implementation" hasBottomLine={false} />
                                    <div className="mt-4 space-y-2 text-center">
                                        <p className="text-[11px] font-bold text-muted-foreground border-t border-border pt-2 w-32">
                                            Instructional Management
                                        </p>
                                        <p className="text-[11px] font-bold text-muted-foreground">Learning Resources</p>
                                    </div>
                                </div>
                            </div>

                            {/* Pillar 2: SGOD */}
                            <div className="w-1/3 flex justify-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-px h-6 bg-border"></div>
                                    <OrgChartNode name="SGOD Chief" position="School Governance" hasBottomLine={false} />
                                    <div className="mt-4 space-y-2 text-center">
                                        <p className="text-[11px] font-bold text-muted-foreground border-t border-border pt-2 w-32">
                                            Planning & Research
                                        </p>
                                        <p className="text-[11px] font-bold text-muted-foreground">Social Mobilization</p>
                                    </div>
                                </div>
                            </div>

                            {/* Pillar 3: Admin */}
                            <div className="w-1/3 flex justify-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-px h-6 bg-border"></div>
                                    <OrgChartNode name="Admin Officer V" position="Administrative Services" hasBottomLine={false} />
                                    <div className="mt-4 space-y-2 text-center">
                                        <p className="text-[11px] font-bold text-muted-foreground border-t border-border pt-2 w-32">
                                            Personnel Unit
                                        </p>
                                        <p className="text-[11px] font-bold text-muted-foreground">Records & Finance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Hint - Helpful so users know they can swipe */}
                <div className="lg:hidden text-center mt-4">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest animate-pulse font-bold">
                        ← Swipe to view full chart →
                    </p>
                </div>
            </main>
        </div>
    );
}