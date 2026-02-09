"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

// Define the parent mapping for specific routes
const routeMapping: Record<string, string> = {
    "organizational-chart": "About Us",
    "personnel": "About Us",
    "vision-mission-core-values": "About Us",
    "citizens-charter": "About Us",
    "bids-opportunities": "Bids & Awards",
    "awards": "Bids & Awards",
    "award-notices": "Bids & Awards",
    "updates-activities": "",
    "division-memos": ""
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const segments = pathname.split('/').filter((item) => item !== '');

    return (
        <nav className="bg-secondary/30 border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <ol className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">

                    {/* Home Link */}
                    <li className="flex items-center">
                        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                            <Home size={12} className="mb-0.5" />
                            <span>Home</span>
                        </Link>
                    </li>

                    {segments.map((segment, index) => {
                        const isLast = index === segments.length - 1;
                        const parentLabel = routeMapping[segment];
                        const displayTitle = segment.replace(/-/g, ' ');

                        return (
                            <li key={segment} className="flex items-center space-x-2">
                                <ChevronRight size={12} className="text-border" />

                                {/* If it's a child and has a mapped parent, show the parent label first */}
                                {isLast && parentLabel && (
                                    <>
                                        <span className="opacity-60">{parentLabel}</span>
                                        <ChevronRight size={12} className="text-border" />
                                    </>
                                )}

                                {isLast ? (
                                    <span className="text-primary font-black">{displayTitle}</span>
                                ) : (
                                    <Link href={`/${segment}`} className="hover:text-primary transition-colors">
                                        {displayTitle}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}