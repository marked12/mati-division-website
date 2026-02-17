"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Clock, RefreshCcw, Box, ChevronRight } from 'lucide-react';

interface NotificationBellProps {
    className?: string;
}

const NotificationBell = ({ className }: NotificationBellProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        /* FIX 1: Added 'inline-block'.
           This makes the relative container the same width as the bell,
           allowing 'right-0' to actually point to the right side of the bell.
        */
        <div className={`relative inline-block ${className}`} ref={menuRef}>
            {/* The Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 text-slate-400 hover:text-primary transition-all hover:bg-slate-50 rounded-xl group border border-transparent hover:border-slate-100"
            >
                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-1 ring-red-200" />
            </button>

            {/* The Dropdown Container */}
            {isOpen && (
                <div className="
    absolute
    top-full
    right-0
    mt-2
    w-[90vw] sm:w-[400px] lg:w-[550px]
    z-50
    animate-in fade-in slide-in-from-top-2 duration-200
">

                {/* Arrow Pointer (Desktop Only) */}
                    <div className="hidden lg:block absolute -top-1 right-4 w-3 h-3 bg-white border-t-2 border-l-2 border-slate-200 rotate-45 z-0" />

                    <div
                        style={{ borderRadius: '24px' }}
                        className="relative bg-white border-2 border-slate-200 shadow-2xl overflow-hidden flex flex-col z-10 w-full"
                    >
                        {/* Header */}
                        <div className="p-4 border-b-2 border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Notifications</h3>
                                <span className="hidden sm:inline-block bg-primary/10 text-primary text-[8px] px-2 py-0.5 rounded-full font-black">NEW</span>
                            </div>
                            <button className="text-[9px] font-black uppercase tracking-tighter text-slate-400 hover:text-primary transition-colors">
                                Mark all as read
                            </button>
                        </div>

                        {/* Table Content */}
                        <div
                            style={{
                                maxHeight: '380px',
                                overflowY: 'auto',
                                backgroundColor: 'white',
                                width: '400px',
                                textAlign: "left",// Enforces the 600px width
                                  // Essential for mobile so it doesn't break the screen
                                      // Keeps it centered
                            }}
                            className="custom-scrollbar"
                        >
                            <table className="w-full border-collapse table-fixed">
                                <tbody>
                                {[1, 2, 3, 4].map((i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-slate-50 hover:bg-slate-50/80 transition-all cursor-pointer group"
                                    >
                                        <td className="w-[60px] sm:w-[75px] p-3 sm:p-4 align-middle">
                                            <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                                                <Box size={18} />
                                            </div>
                                        </td>

                                        <td className="p-3 pl-0 sm:p-4 sm:pl-0 align-middle">
                                            <div className="flex flex-col min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <p className="text-[12px] sm:text-[13px] font-bold text-slate-700 leading-tight truncate overflow-hidden">
                                                        Update: <span className="text-primary italic font-black">Asset Registry</span>
                                                    </p>
                                                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                                </div>

                                                <div className="flex items-center gap-2 mt-1">
                                                    <Clock size={10} className="text-slate-400" />
                                                    <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400">2h ago</span>
                                                    <span className="text-[9px] font-black uppercase tracking-tighter text-slate-300">• Log Entry</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="hidden sm:table-cell w-[40px] p-4 text-right align-middle">
                                            <ChevronRight size={14} className="text-slate-200 group-hover:text-primary inline-block" />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="p-4 bg-slate-50/30">
                                <button
                                    className="py-2.5 px-4 border-2 border-dashed border-slate-200 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2 w-full"
                                    onClick={() => setLoading(true)}
                                >
                                    <RefreshCcw size={12} className={loading ? "animate-spin" : ""} />
                                    {loading ? "Syncing..." : "Load Older"}
                                </button>
                            </div>
                        </div>

                        <div className="p-3 bg-white border-t-2 border-slate-50">
                            <button className="w-full py-3 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-primary/90 transition-all shadow-lg">
                                View Full History
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;