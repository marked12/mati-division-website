"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

const navigation = [
    { name: 'Home', href: '/' },
    {
        name: 'About Us',
        href: '/about',
        children: [
            { name: 'Organizational Chart', href: '/organizational-chart' },
            { name: 'List of Personnel', href: '/personnel' },
            { name: 'Vision, Mission and Core Values', href: '/vision-mission-core-values' },
            { name: "Citizen's Charter", href: '/citizens-charter' },
        ]
    },
    {
        name: 'Bids & Awards',
        href: '/bids-awards',
        children: [
            { name: 'Bid Opportunities', href: '/bids-opportunities' },
            { name: 'Award Notices', href: '/award-notices' }
        ]
    },
    {
        name: 'DRRM',
        href: '/drrm',
        children: [
            { name: 'Updates & Activities', href: '/drrm/updates-activities' },
            { name: 'Downloads', href: '/drrm/downloads' },
            { name: 'Resiliency Link', href: '/drrm/resilience-link' },
            { name: 'Reporting', href: '/drrm/reporting' },
        ]
    },
    {
        name: 'Downloads',
        href: '/downloads',
        children: [
            { name: 'Division Memos', href: '/downloads/division-memos' },
            { name: 'Division Order', href: '/downloads/division-order' },
            { name: 'Recipient', href: '/downloads/recipient' }
        ]
    },
    { name: 'Contact', href: '/contact' }
];

// Unified style: Reduced horizontal padding (px-3 instead of px-4)
const navItemStyles = "group flex items-center gap-1 px-3 h-20 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors relative";

// The "Tight" Underline style
const underlineStyles = "relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            {/* Reduced max-width from 7xl to 6xl for a tighter, more professional feel */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-elegant font-serif text-xl font-bold">
                            M
                        </div>
                        <div className="flex flex-col">
              <span className="text-md font-bold leading-tight tracking-tight text-primary font-serif">
                Mati City
              </span>
                            <span className="text-[10px] font-medium tracking-[0.1em] text-muted-foreground uppercase">
                Division Portal
              </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navigation.map((item) => (
                            <div key={item.name} className="relative group h-full">
                                {item.children ? (
                                    <button className={navItemStyles}>
                                        <span className={underlineStyles}>{item.name}</span>
                                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200 opacity-50" />
                                    </button>
                                ) : (
                                    <Link href={item.href} className={navItemStyles}>
                                        <span className={underlineStyles}>{item.name}</span>
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {item.children && (
                                    <div className="absolute left-0 top-[75%] hidden group-hover:block w-52 animate-fade-in pt-4">
                                        <div className="bg-card border border-border rounded-lg shadow-xl overflow-hidden py-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Toggle */}
                    <button className="lg:hidden p-2 text-primary" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-background border-b border-border animate-fade-in px-4 pb-6 max-h-[calc(100vh-80px)] overflow-y-auto">
                    {navigation.map((item) => (
                        <div key={item.name} className="py-1">
                            {item.children ? (
                                /* If item has children: Render label and map children */
                                <>
                                    <div className="font-bold text-primary text-sm px-2 py-1">{item.name}</div>
                                    <div className="pl-4 border-l border-accent mt-2 flex flex-col gap-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className="text-sm text-muted-foreground py-2 px-2 hover:bg-secondary rounded-md"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                /* If item has NO children (Home, Contact): Render as a Link */
                                <Link
                                    href={item.href}
                                    className="block font-bold text-primary text-sm px-2 py-2 hover:bg-secondary rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
}