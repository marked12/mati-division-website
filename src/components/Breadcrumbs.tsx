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

    // Determine if we are currently in an Admin route
    const isAdminPath = pathname.startsWith('/admin');

    useEffect(() => {
        setDynamicTitle(null);
        const handleUpdate = (e: any) => setDynamicTitle(e.detail);
        window.addEventListener('update-breadcrumb-title', handleUpdate);
        return () => window.removeEventListener('update-breadcrumb-title', handleUpdate);
    }, [pathname]);

    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

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

                    {segments.map((segment, index) => {
                        const isLast = index === segments.length - 1;
                        const currentHref = `/${segments.slice(0, index + 1).join('/')}`;

                        // NEW: Define which segments should not be clickable
                        const isUnclickable = segment.toLowerCase() === 'admin';

                        const parentLabel = !isAdminPath ? routeMapping[segment.toLowerCase()] : null;

                        let displayTitle = segment.replace(/-/g, ' ');
                        if (isLast && dynamicTitle) {
                            displayTitle = dynamicTitle;
                        }

                        return (
                            <li key={currentHref} className="flex items-center space-x-2">
                                <ChevronRight size={12} className="text-border shrink-0" />

                                {parentLabel && (
                                    <>
                                        <span className="opacity-60 whitespace-nowrap">{parentLabel}</span>
                                        <ChevronRight size={12} className="text-border shrink-0" />
                                    </>
                                )}

                                {/* UPDATED: Check for isLast OR isUnclickable */}
                                {isLast || isUnclickable ? (
                                    <span className={`truncate max-w-[150px] sm:max-w-[400px] ${
                                        isLast ? "text-primary font-black" : "text-muted-foreground font-medium"
                                    }`}>
                    {displayTitle}
                </span>
                                ) : (
                                    <Link
                                        href={currentHref}
                                        className="hover:text-primary transition-colors whitespace-nowrap"
                                    >
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