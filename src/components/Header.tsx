"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, UserCircle, LogOut, Settings } from 'lucide-react';
import Cookies from "js-cookie";
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', role: 'ADMIN' },
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

const navItemStyles = "group flex items-center gap-1 px-3 h-20 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors relative whitespace-nowrap";
const underlineStyles = "relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300";

export default function Header() {
    // SEPARATE STATES FOR INDEPENDENT MENUS
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [userRole, setUserRole] = useState("");

    const pathname = usePathname();
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Sync Auth and handle click-outside
    useEffect(() => {
        const checkAuth = () => {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                try {
                    const parsedUser = JSON.parse(userCookie);
                    setIsLoggedIn(true);
                    setUserName(parsedUser.firstName);
                    setUserRole(parsedUser.role);
                } catch (e) {
                    console.error("Auth sync error");
                }
            } else {
                setIsLoggedIn(false);
            }
            setIsMounted(true);
        };

        checkAuth();

        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto-close menus on page change
    useEffect(() => {
        setIsSidebarOpen(false);
        setIsUserMenuOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        Cookies.remove('user');
        setIsLoggedIn(false);
        window.location.href = "/login";
    };
    const filteredNavigation = navigation.filter(item => {
        // If the item has a role requirement, check if the user matches it
        if (item.role === 'ADMIN') {
            return isLoggedIn && userRole === 'ADMIN';
        }
        // Otherwise, show the item to everyone
        return true;
    });

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between gap-4">

                    {/* LOGO */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-elegant font-serif text-xl font-bold">
                            M
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-md font-bold leading-tight tracking-tight text-primary font-serif">Mati City</span>
                            <span className="text-[10px] font-medium tracking-[0.1em] text-muted-foreground uppercase">Division Portal</span>
                        </div>
                    </div>

                    {/* DESKTOP NAVIGATION */}
                    <nav className="hidden lg:flex items-center justify-center flex-1">
                        {filteredNavigation.map((item) => (
                            <div key={item.name} className="relative group h-full">
                                {item.children ? (
                                    <button className={navItemStyles}>
                                        <span className={underlineStyles}>{item.name}</span>
                                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200 opacity-50"/>
                                    </button>
                                ) : (
                                    <Link href={item.href} className={navItemStyles}>
                                        <span className={underlineStyles}>{item.name}</span>
                                    </Link>
                                )}

                                {item.children && (
                                    <div className="absolute left-0 top-[75%] hidden group-hover:block w-52 animate-fade-in pt-4">
                                        <div className="bg-card border border-border rounded-lg shadow-xl overflow-hidden py-1">
                                            {item.children.map((child) => (
                                                <Link key={child.name} href={child.href} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-2 sm:gap-4 shrink-0 justify-end min-w-[100px]">
                        {!isMounted ? (
                            <div className="w-[100px] h-10 bg-secondary/30 animate-pulse rounded-xl"/>
                        ) : (
                            <>
                                {isLoggedIn ? (
                                    <div className="relative" ref={userMenuRef}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsUserMenuOpen(!isUserMenuOpen);
                                                setIsSidebarOpen(false); // Close sidebar if profile clicked
                                            }}
                                            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-secondary transition-all relative z-10"
                                        >
                                            <div className="hidden sm:flex flex-col items-end mr-1">
                                                <span className="text-[11px] font-bold text-primary leading-none">{userName || "User"}</span>
                                                <span className="text-[9px] text-muted-foreground capitalize">{userRole ? userRole.toLowerCase() : "Guest"}</span>
                                            </div>
                                            <div className="w-9 h-9 bg-accent/20 rounded-full flex items-center justify-center text-primary border border-accent/30 shadow-sm">
                                                <UserCircle size={22}/>
                                            </div>
                                        </button>

                                        {/* USER DROPDOWN (Click-based for Mobile/Desktop) */}
                                        {isUserMenuOpen && (
                                            <div className="absolute right-0 top-full w-48 animate-fade-in z-[60] pt-2">
                                                <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                                                    <div className="p-3 border-b border-border bg-secondary/30">
                                                        <p className="text-xs font-bold text-primary">Account Manager</p>
                                                    </div>
                                                    <div className="p-1">
                                                        <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-muted-foreground hover:bg-secondary hover:text-primary rounded-lg transition-colors">
                                                            <Settings size={14}/> Settings
                                                        </button>
                                                        <button
                                                            onClick={handleLogout}
                                                            className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <LogOut size={14}/> Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link href="/login" className="relative flex items-center gap-2.5 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] bg-primary text-primary-foreground rounded-xl border border-primary/20 shadow-lg transition-all hover:bg-primary/90 active:scale-95">
                                        <UserCircle size={16} />
                                        <span>Login</span>
                                    </Link>
                                )}
                            </>
                        )}

                        {/* HAMBURGER BUTTON */}
                        <button
                            className="lg:hidden p-2 text-primary hover:bg-secondary rounded-lg transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsSidebarOpen(!isSidebarOpen);
                                setIsUserMenuOpen(false); // Close user menu if sidebar clicked
                            }}
                        >
                            {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE SIDEBAR */}
            {isSidebarOpen && (
                <div className="lg:hidden bg-background border-b border-border animate-fade-in px-4 pb-6 max-h-[calc(100vh-80px)] overflow-y-auto">
                    {navigation.map((item) => (
                        <div key={item.name} className="py-1">
                            {item.children ? (
                                <>
                                    <div className="font-bold text-primary text-sm px-2 py-1">{item.name}</div>
                                    <div className="pl-4 border-l border-accent mt-2 flex flex-col gap-2">
                                        {item.children.map((child) => (
                                            <Link key={child.name} href={child.href} className="text-sm text-muted-foreground py-2 px-2 hover:bg-secondary rounded-md" onClick={() => setIsSidebarOpen(false)}>
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link href={item.href} className="block font-bold text-primary text-sm px-2 py-2 hover:bg-secondary rounded-md" onClick={() => setIsSidebarOpen(false)}>
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