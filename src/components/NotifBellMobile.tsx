"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Clock, RefreshCcw, Box, X } from 'lucide-react';

const NotifBellMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <div className="relative inline-block">
            {/* The Trigger */}
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 text-slate-400 bg-slate-50 border border-slate-100 rounded-xl active:scale-95 transition-all"
            >
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* The Dropdown Container */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center p-4">

                    {/* Dark Backdrop Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* The Modal: Shifted 200px from the top */}
                    <div
                        style={{
                            transform: 'translateY(50px)', // Moves it down 200px from the top
                            borderRadius: '32px',
                            zIndex: 100 // Ensures it sits above your header
                        }}
                        className="
        relative
        w-full
        max-w-[400px]
        bg-white
        shadow-2xl
        overflow-hidden
        flex flex-col
        animate-in zoom-in-95 fade-in slide-in-from-top-10 duration-300
        border-2 border-slate-200
    "
                    >

                        {/* Header */}
                        <div className="p-4 border-b-2 border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Notification Center</h3>
                                <span className="bg-primary/10 text-primary text-[8px] px-2 py-0.5 rounded-full font-black">NEW</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-slate-100 rounded-full text-slate-400 active:bg-slate-200"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Table Content */}
                        <div className="max-h-[50vh] overflow-y-auto custom-scrollbar bg-white">
                            <table className="w-full border-collapse table-fixed">
                                <tbody>
                                {[1, 2, 3, 4].map((i) => (
                                    <tr key={i} className="border-b border-slate-50 active:bg-slate-50/80 transition-all cursor-pointer group">
                                        <td className="w-[65px] p-4 align-middle text-center">
                                            <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 mx-auto">
                                                <Box size={18} />
                                            </div>
                                        </td>

                                        <td className="p-4 pl-0 align-middle">
                                            <div className="flex flex-col min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <p className="text-[13px] font-bold text-slate-700 leading-tight truncate overflow-hidden">
                                                        Update: <span className="text-primary italic font-black">Asset Registry</span> sync.
                                                    </p>
                                                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                                </div>

                                                <div className="flex items-center gap-2 mt-1">
                                                    <Clock size={10} className="text-slate-400" />
                                                    <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400">2h ago</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="p-4 bg-slate-50/30">
                                <button
                                    className="py-3 px-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest active:border-primary/30 active:text-primary transition-all flex items-center justify-center gap-2 w-full"
                                    onClick={() => setLoading(true)}
                                >
                                    <RefreshCcw size={12} className={loading ? "animate-spin" : ""} />
                                    {loading ? "Syncing..." : "Load Older Activities"}
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-white border-t-2 border-slate-50">
                            <button className="w-full py-4 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg">
                                View Full History
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotifBellMobile;