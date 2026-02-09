import React from 'react';

interface Props {
    name: string;
    position: string;
    isLeader?: boolean;
    hasTopLine?: boolean;
    hasBottomLine?: boolean;
}

export default function OrgChartNode({ name, position, isLeader, hasTopLine, hasBottomLine }: Props) {
    return (
        <div className="relative flex flex-col items-center shrink-0">
            {hasTopLine && <div className="w-px h-6 bg-border mb-0"></div>}

            <div className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-lg border ${
                isLeader
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "bg-card text-card-foreground border-border shadow-md"
            } 
            /* Fixed widths: 160px on mobile, 220px on desktop */
            w-[160px] md:w-[220px] 
            min-h-[70px] md:min-h-[90px]
            text-center transition-transform hover:scale-105 duration-300 z-10`}>

                {/* Responsive Font: Smaller on mobile (text-[11px]), larger on desktop (text-lg/md) */}
                <h4 className={`font-serif font-bold leading-tight ${
                    isLeader ? "text-[12px] md:text-lg" : "text-[11px] md:text-md text-primary"
                }`}>
                    {name}
                </h4>

                {/* Responsive Font: Micro-text for position on mobile */}
                <p className={`font-bold mt-1 ${
                    isLeader
                        ? "text-[8px] md:text-[10px] text-accent opacity-90"
                        : "text-[7px] md:text-[10px] text-muted-foreground uppercase tracking-wider md:tracking-widest"
                }`}>
                    {position}
                </p>
            </div>

            {hasBottomLine && <div className="w-px h-6 bg-border mt-0"></div>}
        </div>
    );
}