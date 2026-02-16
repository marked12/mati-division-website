"use client";

import React, { useState, useEffect } from 'react';
import { Wrench, Monitor, Wifi, ShieldAlert, Send, Info, AlertTriangle } from 'lucide-react';
import Cookies from 'js-cookie';

const TechnicalAssistancePage = () => {
    const [user, setUser] = useState<any>(null);
    const [category, setCategory] = useState('Hardware');
    const [priority, setPriority] = useState('Medium');

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) setUser(JSON.parse(userCookie));
    }, []);

    const categories = [
        { id: 'Hardware', icon: <Monitor size={24} />, desc: 'PC, Printer, Peripherals' },
        { id: 'Network', icon: <Wifi size={24} />, desc: 'Internet & Connectivity' },
        { id: 'Software', icon: <Wrench size={24} />, desc: 'OS, Apps, Installation' },
        { id: 'Cyber', icon: <ShieldAlert size={24} />, desc: 'Virus & Security' },
    ];

    if (!user) return <div className="h-screen flex items-center justify-center font-black text-primary uppercase animate-pulse">Verifying Session...</div>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 ">
            <div className="mb-12">
                <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] bg-accent/10 px-4 py-2 rounded-full">Support Ticket System</span>
                <h1 className="text-4xl font-black text-primary uppercase mt-6 tracking-tight">Request Technical Assistance</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Step 1: Category Selection */}
                <div className="space-y-4">
                    <h3 className="text-[11px] font-black text-primary uppercase tracking-widest ml-1">1. Select Category</h3>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`w-full p-5 rounded-[2rem] border-2 text-left transition-all group ${
                                category === cat.id
                                    ? 'border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`${category === cat.id ? 'text-accent' : 'text-primary'}`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <p className="font-black uppercase text-xs tracking-wider">{cat.id}</p>
                                    <p className={`text-[9px] font-bold uppercase tracking-tight ${category === cat.id ? 'text-white/60' : 'text-slate-400'}`}>
                                        {cat.desc}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Step 2 & 3: Details Form */}
                <div className="lg:col-span-2">
                    <form className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 space-y-8">

                        {/* Office and Property Tag */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Office / Unit Name</label>
                                <input required type="text" placeholder="e.g. Cashiering Unit" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Property Tag #</label>
                                <input type="text" placeholder="Found on equipment" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                            </div>
                        </div>

                        {/* Priority Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Urgency Level</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Low', 'Medium', 'High'].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPriority(p)}
                                        className={`py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                                            priority === p
                                                ? (p === 'High' ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-200' : 'bg-primary border-primary text-white shadow-lg shadow-primary/20')
                                                : 'border-slate-100 text-slate-400 hover:border-slate-200'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Problem Description</label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Describe the error or symptoms you are experiencing..."
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Submission */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-5 bg-primary text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/30 hover:bg-accent hover:shadow-accent/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <Send size={18} /> Generate Ticket
                            </button>
                            <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                                A ticket ID will be generated upon submission.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TechnicalAssistancePage;