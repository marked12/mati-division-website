"use client";

import React, { useState, useEffect } from 'react';
import {Mail, RefreshCw, Send, ShieldCheck, AlertCircle, UserCheck, UserPlus, Phone} from 'lucide-react';
import Cookies from 'js-cookie';

const PublicEmailRequestPage = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [requestType, setRequestType] = useState('Password Reset');
    // Place this at the top of your component


    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        }
        setLoading(false);
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    // 1. AUTH GUARD: If not logged in, show Access Denied
    if (!user) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck size={40} />
                </div>
                <h1 className="text-2xl font-black text-primary uppercase">Authentication Required</h1>
                <p className="text-slate-500 max-w-md mt-2 mb-8 font-medium">
                    You must be logged in first to access.
                </p>
                <a href="/login" className="px-8 py-3 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    Go to Login
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 ">
            {/* Page Header */}
            <div className="text-center mb-12">
                <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] bg-accent/10 px-4 py-2 rounded-full">
                    ICT Service Portal
                </span>
                <h1 className="text-4xl font-black text-primary uppercase mt-6 tracking-tight">Email Service Request</h1>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                {/* Information Sidebar */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <h3 className="font-black text-primary uppercase text-sm mb-4 tracking-wider">Instructions</h3>
                        <ul className="space-y-4">
                            {[
                                "Ensure your contact number is active.",
                                "Verification may take 24-48 hours.",
                                "School ICT coordinators must verify identity."
                            ].map((text, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium">
                                    <div className="w-5 h-5 bg-white rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">{i+1}</div>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className=" bg-accent/5 rounded-[2rem] border border-accent/10">
                        <div className="flex items-center gap-3 text-accent mb-2">
                            <AlertCircle size={18} />
                            <span className="font-black uppercase text-[10px] tracking-widest">Urgent Support</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            For immediate account lockout issues, please visit the Division ICT Office directly.
                        </p>
                    </div>
                </div>

                {/* The Request Form */}
                <form className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[15px] font-black text-primary uppercase tracking-widest ml-1">Request Type</label>
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Select Request Type</p>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {['Password Reset', 'Account Recovery', 'New Account'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        style={{ borderRadius: '24px' }}
                                        onClick={() => setRequestType(type)}
                                        className={`py-6 border-2 transition-all flex flex-col items-center justify-center gap-3 group relative overflow-hidden ${
                                            requestType === type
                                                ? 'border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10'
                                                : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600'
                                        }`}
                                    >


                                        <div className={`transition-transform duration-300 ${requestType === type ? 'scale-110' : 'group-hover:scale-110'}`}>
                                            {type === 'Password Reset' && <RefreshCw size={22} strokeWidth={2.5} />}
                                            {type === 'Account Recovery' && <UserCheck size={22} strokeWidth={2.5} />}
                                            {type === 'New Account' && <UserPlus size={22} strokeWidth={2.5} />}
                                        </div>

                                        <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight px-2">
                    {type}
                </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Full Name (Auto-filled)</label>
                        <input
                            type="text"
                            disabled
                            value={`${user.firstName} ${user.lastName}`}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-400 cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">DepEd Mail</label>
                        <input
                            type="email"
                            placeholder="Your DepEd Mail - i.e: mail@deped.gov.ph"
                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                        />
                    </div>



                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Reason for Request</label>
                        <textarea
                            rows={4}
                            placeholder="Briefly explain the issue..."
                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-primary text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/30 hover:bg-accent hover:shadow-accent/30 transition-all flex items-center justify-center gap-3"
                    >
                        <Send size={18} /> Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PublicEmailRequestPage;