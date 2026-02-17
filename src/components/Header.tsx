"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {ChevronDown, Menu, X, UserCircle, LogOut, Settings, ChevronRight, Bell, RefreshCcw, Clock} from 'lucide-react';
import Cookies from "js-cookie";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import NotificationBell from "@/src/components/NotificationBell";
import NotifBellMobile from "@/src/components/NotifBellMobile";

interface SubChildItem {
    name: string;
    href: string;
}

interface ChildItem {
    name: string;
    href: string;
    subChildren?: SubChildItem[]; // The '?' means it is optional
}

interface NavItem {
    name: string;
    href: string;
    role?: string;
    children?: ChildItem[]; // Also optional
}
const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', role: 'ADMIN' },
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
        name: 'Procurement', // Grouping Bids & Awards
        href: '#',
        children: [
            { name: 'Bid Opportunities', href: '/bids-opportunities' },
            { name: 'Award Notices', href: '/award-notices' }
        ]
    },
    {
        name: 'Resources', // THE MASTER TAB
        href: '#',
        children: [
            {
                name: 'ICT Services',
                href: '/ict',
                subChildren: [
                    { name: 'DepEd Email Request', href: '/ict/email-request' },
                    { name: 'Technical Assistance', href: '/ict/technical-assistance' },
                    { name: 'ICT Training & Resources', href: '/ict/resources' },
                ]
            },
            {
                name: 'Supply Unit',
                href: '/supply',
                subChildren: [
                    { name: 'Inventory Updates', href: '/supply/inventory' },
                    { name: 'Procurement Requests', href: '/supply/procurement' },
                    { name: 'Asset Tracking', href: '/supply/tracking' },
                ]
            },
            {
                name: 'DRRM',
                href: '/drrm',
                subChildren: [
                    { name: 'Updates & Activities', href: '/drrm/updates-activities' },
                    { name: 'Downloads', href: '/drrm/downloads' },
                    { name: 'Resiliency Link', href: '/drrm/resilience-link' },
                    { name: 'Reporting', href: '/drrm/reporting' },
                ]
            },
            {
                name: 'Downloads',
                href: '/downloads',
                subChildren: [
                    { name: 'Division Memos', href: '/downloads/division-memos' },
                    { name: 'Division Order', href: '/downloads/division-order' },
                    { name: 'Recipient', href: '/downloads/recipient' }
                ]
            },
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
    const [isNotifOpen, setIsNotifOpen] = useState(false);

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
                    <div className="flex items-center gap-0 shrink-0">
                        <div className="relative w-10 h-10 mr-1 flex items-center justify-center">
                            <Image
                                src="/brand/site-logo.png"
                                alt="Mati City Logo"
                                width={50}
                                height={50}
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="sm:flex flex-col">
                            <span className="text-sm font-bold leading-tight tracking-tight text-primary font-serif pr-1">Mati City</span>
                            <span className="text-[9px] font-medium tracking-[0.1em] text-muted-foreground uppercase">Division Portal</span>
                        </div>
                    </div>

                    {/* DESKTOP NAVIGATION */}
                    <nav className="hidden lg:flex items-center justify-center flex-1 h-full">
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

                                {/* LEVEL 1 DROPDOWN */}
                                {item.children && (
                                    <div className="absolute left-0 top-[70%] hidden group-hover:block w-52 animate-fade-in pt-4 z-50">
                                        {/* REMOVED overflow-hidden here so Level 2 can show */}
                                        <div className="bg-card border border-border rounded-lg shadow-xl py-1">
                                            {item.children.map((child) => (
                                                <div key={child.name} className="relative group/submenu">
                                                    {/* Logic: If it has subChildren, href is # */}
                                                    <Link
                                                        href={child.subChildren ? "#" : child.href}
                                                        className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                                                    >
                                                        <span>{child.name}</span>
                                                        {child.subChildren && <ChevronRight size={12} className="opacity-50" />}
                                                    </Link>

                                                    {/* LEVEL 2: CASCADE (Drop-right) */}
                                                    {child.subChildren && (
                                                        <div className="absolute left-full top-[-4px] hidden group-hover/submenu:block w-64 pl-1  z-[100]">
                                                            <div className="bg-card border border-border rounded-lg shadow-2xl py-1">
                                                                {/* Sub-menu Header */}
                                                                <div className="px-4 py-1.5 border-b border-border bg-secondary/20 mb-1">
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                                                {child.name} Options
                                                            </span>
                                                                </div>

                                                                {/* Sub-menu Links */}
                                                                <div className="flex flex-col">
                                                                    {child.subChildren.map((sub) => (
                                                                        <Link
                                                                            key={sub.name}
                                                                            href={sub.href}
                                                                            className="block px-4 py-2 text-[12px] text-muted-foreground hover:bg-secondary hover:text-primary transition-colors whitespace-nowrap"
                                                                        >
                                                                            {sub.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
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
                            <div className="w-[100px] h-10 bg-secondary/30 animate-pulse rounded-xl" />
                        ) : (
                            <>
                                {isLoggedIn ? (
                                    <div className="relative flex items-center gap-2 sm:gap-3">
                                        {/* --- NOTIFICATION GROUP --- */}
                                        <div className="relative ">
                                            {/* This will show ONLY on screens 1024px and up */}
                                            <div className="hidden lg:flex">
                                                <NotificationBell />
                                            </div>

                                            {/* This will show ONLY on screens smaller than 1024px */}
                                            <div className=" lg:hidden">
                                                <NotifBellMobile />
                                            </div>
                                        </div>
                                       {/* --- USER MENU GROUP --- */}
                                        <div className="relative" ref={userMenuRef}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsUserMenuOpen(!isUserMenuOpen);
                                                    setIsNotifOpen(false); // Close notifs if open
                                                    setIsSidebarOpen(false);
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

                                            {isUserMenuOpen && (
                                                <div className="absolute right-0 top-full w-48 animate-fade-in z-[60] pt-2">
                                                    <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                                                        <div className="p-3 border-b border-border bg-secondary/30">
                                                            <p className="text-xs font-bold text-primary italic uppercase tracking-widest">Account Manager</p>
                                                        </div>
                                                        <div className="p-1">
                                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-muted-foreground hover:bg-secondary hover:text-primary rounded-lg transition-colors font-bold">
                                                                <Settings size={14}/> Settings
                                                            </button>
                                                            <button
                                                                onClick={handleLogout}
                                                                className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors font-bold"
                                                            >
                                                                <LogOut size={14}/> Logout
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link href="/login" className="relative flex items-center gap-2.5 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] bg-primary text-primary-foreground rounded-xl border border-primary/20 shadow-lg transition-all hover:bg-primary/90 active:scale-95">
                                        <UserCircle size={16} />
                                        <span>Login</span>
                                    </Link>
                                )}
                            </>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2 text-primary hover:bg-secondary rounded-lg transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsSidebarOpen(!isSidebarOpen);
                                setIsUserMenuOpen(false);
                                setIsNotifOpen(false);
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
                                            <div key={child.name}>
                                                <Link
                                                    href={child.subChildren ? "#" : child.href}
                                                    className="text-sm text-muted-foreground py-2 px-2 hover:bg-secondary rounded-md block"
                                                    onClick={() => !child.subChildren && setIsSidebarOpen(false)}
                                                >
                                                    {child.name}
                                                </Link>
                                                {child.subChildren && (
                                                    <div className="ml-4 border-l border-border pl-4 flex flex-col gap-1 my-1">
                                                        {child.subChildren.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                href={sub.href}
                                                                className="text-xs text-muted-foreground/70 py-1.5 hover:text-primary"
                                                                onClick={() => setIsSidebarOpen(false)}
                                                            >
                                                                • {sub.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
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