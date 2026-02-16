"use client";
import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {
    Users,
    Megaphone,
    ShieldCheck,
    FileText,
    Contact,
    ChevronLeft,
    Bell,
    LayoutDashboard,
    LogOut, ChevronRight, Settings, Monitor, ChevronDown, Package
} from 'lucide-react';
import Breadcrumbs from "@/src/components/Breadcrumbs";
import Cookies from "js-cookie";

const navItems = [
    {title: "Dashboard", icon: <LayoutDashboard size={20}/>, href: "/admin/dashboard"},
    {title: "Accounts", icon: <Users size={20}/>, href: "/admin/dashboard/users"},
    {title: "Personnel", icon: <Contact size={20}/>, href: "/admin/dashboard/personnel"},
    {title: "Announcements", icon: <Megaphone size={20}/>, href: "/admin/dashboard/announcements"},
    {
        title: "Bids & Awards",
        icon: <FileText size={20}/>,
        children: [
            { title: "Bidding Opportunities", href: "/admin/dashboard/bids-and-awards" },
            { title: "Award Notices", href: "/admin/dashboard/award-notices" },
        ]
    },
    {
        title: "ICT Services",
        icon: <Monitor size={20}/>,
        children: [
            { title: "DepEd Email Request", href: "/admin/dashboard/ict-services/email-request" },
            { title: "Technical Assistance", href: "/admin/dashboard/ict-services/technical-assistance" },
            { title: "ICT Training & Resources", href: "/admin/dashboard/ict-services/resources" },
        ]
    },
    {
        title: "Supply Unit",
        icon: <Package size={20}/>,
        children: [
            { title: "Procurement Requests", href: "/admin/dashboard/supply-unit/procurement" },
            { title: "Inventory Management", href: "/admin/dashboard/supply/inventory" },
            { title: "Purchase Orders (PO)", href: "/admin/dashboard/supply/purchase-orders" },
            { title: "Property & Equipment (PPE)", href: "/admin/dashboard/supply/ppe" },
        ]
    },
];

export default function AdminSidebar({children}: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    // Inside your AdminSidebar or Header component:

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

// Mock data - replace these with your actual Auth Context or State
    const [userName, setUserName] = useState("Admin User");
    const [userRole, setUserRole] = useState("Division Administrator");
    const [userEmail, setUserEmail] = useState("admin.mati@deped.gov.ph");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openMenus, setOpenMenus] = useState<string[]>([]);

// 2. Define the toggle function
    const toggleMenu = (e: React.MouseEvent, title: string) => {
        // Prevent the click from triggering parent div events
        e.preventDefault();
        e.stopPropagation();

        setOpenMenus((prev) => {
            const isOpen = prev.includes(title);
            if (isOpen) {
                // Remove the title from the array to close it
                return prev.filter((t) => t !== title);
            } else {
                // Add the title to the array to open it
                return [...prev, title];
            }
        });
    };

// 1. Handle Hydration
    useEffect(() => {
        const checkAuth = () => {
            const userCookie = Cookies.get('user');
            if (userCookie) {
                try {
                    const parsedUser = JSON.parse(userCookie);
                    setIsLoggedIn(true);
                    setUserName(`${parsedUser.firstName || ""} ${parsedUser.lastName || ""}`.trim());
                    setUserRole(parsedUser.role || "User");
                    setUserEmail(parsedUser.email || "");
                } catch (e) {
                    console.error("Auth sync error:", e);
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
            setIsMounted(true);
        };

        checkAuth();
    }, []);
    // Combined Route-Change Logic
    useEffect(() => {
        // 1. Close the user profile dropdown
        setIsUserMenuOpen(false);

        // 2. Auto-expand the correct Sidebar group if we are on a sub-page
        navItems.forEach(item => {
            if (item.children?.some(child => pathname === child.href)) {
                setOpenMenus(prev =>
                    prev.includes(item.title) ? prev : [...prev, item.title]
                );
            }
        });

        // 3. Close mobile sidebar if it's open (optional, if you have isMobileSidebarOpen)
        // setIsSidebarOpen(false);

    }, [pathname]); // This runs every time the URL changes

// 2. Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

// 3. Close menu when route changes


// 4. Logout Logic
    const handleLogout = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* SIDEBAR CONTAINER */}
            <aside
                className={`bg-primary text-primary-foreground transition-all duration-300 ease-in-out flex flex-col fixed h-full z-50 shadow-xl ${
                    isCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                {/* Logo Area */}
                <div className="p-6 flex items-center justify-between border-b border-white/10 h-20">
                    {!isCollapsed && (
                        <Link href="/" className="group block cursor-pointer">
                            <div className="flex flex-col animate-in fade-in duration-500 transition-all group-hover:opacity-80">
                        <span className="font-serif font-bold italic text-xl tracking-tight leading-none group-hover:text-accent transition-colors">
                            DepEd
                        </span>
                                <span className="text-[9px] font-black uppercase text-accent tracking-widest mt-1">
                            Mati City Portal
                        </span>
                            </div>
                        </Link>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`p-2 hover:bg-white/10 rounded-lg transition-all ${isCollapsed ? 'mx-auto' : ''}`}
                    >
                        <ChevronLeft className={`transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`}
                                     size={20}/>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow p-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const hasChildren = !!item.children;
                        const isChildActive = item.children?.some(child => pathname === child.href);
                        const isOpen = openMenus.includes(item.title) || isChildActive;

                        // The shared styling for both Links and Buttons
                        const itemClasses = `w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all group relative ${
                            (pathname === item.href || isChildActive)
                                ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20'
                                : 'hover:bg-white/5 text-primary-foreground/70 hover:text-white'
                        }`;

                        const content = (
                            <>
                                <div className="flex items-center gap-4">
                                    <div className={`${(pathname === item.href || isChildActive) ? 'text-primary' : 'group-hover:text-accent transition-colors'}`}>
                                        {item.icon}
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-[11px] font-black uppercase tracking-wider">
                        {item.title}
                    </span>
                                    )}
                                </div>
                                {!isCollapsed && hasChildren && (
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                )}
                            </>
                        );

                        return (
                            <div key={item.title} className="flex flex-col gap-1">
                                {hasChildren ? (
                                    /* 1. PARENT (No Link, just toggle) */
                                    <button onClick={(e) => toggleMenu(e, item.title)} className={itemClasses}>
                                        {content}
                                    </button>
                                ) : (
                                    /* 2. REGULAR ITEM (Direct Link) */
                                    <Link href={item.href || '#'} className={itemClasses}>
                                        {content}
                                    </Link>
                                )}

                                {/* 3. SUB-MENU RENDER */}
                                {!isCollapsed && hasChildren && isOpen && (
                                    <div className="flex flex-col ml-9 mt-1 gap-1 border-l border-white/10 pl-4 animate-in slide-in-from-top-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={`text-[10px] py-2 uppercase font-bold tracking-widest transition-colors ${
                                                    pathname === child.href ? 'text-accent' : 'text-primary-foreground/50 hover:text-white'
                                                }`}
                                            >
                                                {child.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-white/10 bg-primary-dark/30">
                    <button
                        className="flex items-center gap-4 px-3 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all uppercase text-[11px] font-black group">
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform"/>
                        {!isCollapsed && <span className="tracking-widest">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className={`flex-grow transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                {/* Top Navbar */}
                <header
                    className="h-20 bg-white border-b border-border sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
                    {/* Left Side: System Status & Breadcrumbs */}
                    <div className="flex items-center gap-4">
                        <div
                            className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/10">
                            <ShieldCheck size={20} className="text-primary"/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none">
                                    Administrative Control
                                </h2>
                                <span
                                    className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-50 border border-green-100">

                            </span>
                            </div>
                            {/* Using the Breadcrumbs component we made earlier */}

                        </div>
                    </div>

                    {/* Right Side: Actions & User Account */}
                    <div className="flex items-center gap-3 sm:gap-6">
                        {/* Notification Bell */}
                        <button
                            className="relative p-2.5 text-slate-400 hover:text-primary transition-all hover:bg-slate-50 rounded-xl group border border-transparent hover:border-slate-100">
                            <Bell size={20} className="group-hover:rotate-12 transition-transform"/>
                            <span
                                className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-1 ring-red-200"/>
                        </button>

                        {/* User Account Manager */}
                        <div className="flex items-center gap-4 shrink-0 justify-end">
                            {!isMounted ? (
                                <div className="w-32 h-10 bg-slate-50 animate-pulse rounded-xl"/>
                            ) : (
                                <>
                                    {isLoggedIn ? (
                                        /* VERSION 1 STYLING START */
                                        <div className="relative border-l border-slate-100 pl-6" ref={userMenuRef}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsUserMenuOpen(!isUserMenuOpen);
                                                }}
                                                className={`flex items-center gap-3 p-1.5 pr-3 rounded-xl transition-all border ${
                                                    isUserMenuOpen
                                                        ? "bg-slate-50 border-slate-200 shadow-inner"
                                                        : "bg-white border-transparent hover:border-slate-100 hover:bg-slate-50/50"
                                                }`}
                                            >
                                                <div className="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20 border border-white/20">
                                                    {userName ? userName.substring(0, 2).toUpperCase() : "AD"}
                                                </div>

                                                <div className="hidden sm:flex flex-col items-start text-left">
                            <span className="text-[11px] font-black text-primary uppercase leading-none tracking-tight">
                                {userName || "Admin User"}
                            </span>
                                                    <span className="text-[9px] font-bold text-accent uppercase mt-1 tracking-wider px-1 bg-accent/5 rounded">
                                {userRole || "Administrator"}
                            </span>
                                                </div>
                                                <ChevronRight size={14} className={`text-slate-300 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-90' : ''}`}/>
                                            </button>

                                            {isUserMenuOpen && (
                                                <div className="absolute right-0 top-[calc(100%+8px)] w-56 animate-in fade-in zoom-in-95 duration-200 z-[60]">
                                                    <div className="bg-white border border-border rounded-2xl shadow-2xl overflow-hidden ring-4 ring-black/5">
                                                        <div className="p-4 border-b border-border bg-slate-50/50">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Manager</p>
                                                            <p className="text-[11px] font-bold text-primary mt-1 truncate">{userEmail || "admin@mati.gov.ph"}</p>
                                                        </div>
                                                        <div className="p-2">
                                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors uppercase tracking-tight">
                                                                <Settings size={16} className="text-slate-400"/> Settings
                                                            </button>
                                                            <button
                                                                onClick={handleLogout}
                                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors uppercase tracking-tight"
                                                            >
                                                                <LogOut size={16}/> Logout
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        /* NEW: Login button if not logged in */
                                        <Link href="/login" className="px-6 py-2.5 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-accent transition-all active:scale-95">
                                            Login
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content Rendering */}
                <div className="p-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}