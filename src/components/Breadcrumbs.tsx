"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

const routeMapping: Record<string, string> = {
    "organizational-chart": "About Us",
    "personnel": "About Us",
    "vision-mission-core-values": "About Us",
    "citizens-charter": "About Us",
    "bids-opportunities": "Bids & Awards",
    "awards": "Bids & Awards",
    "award-notices": "Bids & Awards",
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    const [dynamicTitle, setDynamicTitle] = useState<string | null>(null);

    useEffect(() => {
        // Reset dynamic title whenever the URL changes
        setDynamicTitle(null);

        // Listen for a custom event from the page to update the title
        const handleUpdate = (e: any) => {
            setDynamicTitle(e.detail);
        };

        window.addEventListener('update-breadcrumb-title', handleUpdate);
        return () => window.removeEventListener('update-breadcrumb-title', handleUpdate);
    }, [pathname]);

    if (pathname === '/') return null;

    const segments = pathname.split('/').filter((item) => item !== '');

    return (
        <nav className="bg-secondary/30 border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <ol className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">

                    <li className="flex items-center">
                        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                            <Home size={12} className="mb-0.5" />
                            <span>Home</span>
                        </Link>
                    </li>

                    {/* ... inside the map function ... */}
                    {segments.map((segment, index) => {
                        const isLast = index === segments.length - 1;
                        const currentHref = `/${segments.slice(0, index + 1).join('/')}`;
                        const parentLabel = routeMapping[segment];

                        // --- NEW LOGIC HERE ---
                        // Disable clicking if it's the 'admin' segment or if you want to disable
                        // all parent segments that don't have a specific landing page.
                        const isDisabled = segment.toLowerCase() === 'admin';

                        let displayTitle = segment.replace(/-/g, ' ');
                        if (isLast && dynamicTitle) {
                            displayTitle = dynamicTitle;
                        }

                        return (
                            <li key={segment} className="flex items-center space-x-2">
                                <ChevronRight size={12} className="text-border" />

                                {isLast && parentLabel && (
                                    <>
                                        <span className="opacity-60">{parentLabel}</span>
                                        <ChevronRight size={12} className="text-border" />
                                    </>
                                )}

                                {isLast || isDisabled ? (
                                    /* Render as SPAN if it's the last item OR if it's disabled (like 'admin') */
                                    <span className={`truncate max-w-[200px] sm:max-w-[450px] ${
                                        isLast ? 'text-primary font-black' : 'text-muted-foreground font-bold cursor-default'
                                    }`}>
                                        {displayTitle}
                                    </span>
                                ) : (
                                    /* Otherwise, render as a clickable LINK */
                                    <Link href={currentHref} className="hover:text-primary transition-colors">
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