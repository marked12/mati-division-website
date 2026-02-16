"use client";

import React, { useState } from 'react';
import {
    Mail,
    RefreshCw,
    UserPlus,
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock, Info
} from 'lucide-react';

const EmailRequestsPage = () => {
    const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
    // Mock data for the requests
    const [requests] = useState([
        { id: 1, type: 'Password Reset', requester: 'Juan Dela Cruz', email: 'juan.dc@deped.gov.ph', date: '2024-03-15', status: 'Pending' },
        { id: 2, type: 'New Account', requester: 'Maria Santos', email: 'm.santos@deped.gov.ph', date: '2024-03-14', status: 'In Progress' },
        { id: 3, type: 'Recovery', requester: 'Roberto Reyes', email: 'r.reyes@deped.gov.ph', date: '2024-03-12', status: 'Completed' },
    ]);

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-primary uppercase tracking-tight">DepEd Email Management</h1>
                    <p className="text-sm text-slate-500 font-medium">Manage password resets and account provisioning.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsCreateAccountOpen(true)}
                        className="group flex items-center gap-3 px-6 py-3 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-accent hover:shadow-accent/30 transition-all duration-300 active:scale-95"
                    >
                        <div className="p-1 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                            <UserPlus size={18} strokeWidth={2.5} />
                        </div>
                        <span>Create New Account</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Requests', count: '48', icon: <Mail className="text-blue-500" />, bg: 'bg-blue-50' },
                    { label: 'Pending Resets', count: '12', icon: <RefreshCw className="text-amber-500" />, bg: 'bg-amber-50' },
                    { label: 'Completed Today', count: '24', icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-primary mt-1">{stat.count}</p>
                        </div>
                        <div className={`p-3 ${stat.bg} rounded-xl`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Table */}
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-100 rounded-lg transition-all">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Requester</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Request Date</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                        {requests.map((req) => (
                            <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {req.type === 'Password Reset' ? <RefreshCw size={14} className="text-amber-500" /> : <UserPlus size={14} className="text-blue-500" />}
                                        <span className="font-bold text-primary">{req.type}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-700">{req.requester}</span>
                                        <span className="text-[11px] text-slate-400">{req.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 font-medium">{req.date}</td>
                                <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            req.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                                                req.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-amber-100 text-amber-600'
                                        }`}>
                                            {req.status}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isCreateAccountOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-primary/20 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsCreateAccountOpen(false)}
                    />

                    {/* Modal Card */}
                    <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">

                        {/* Header */}
                        <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex items-center gap-5">
                            <div className="w-14 h-14 bg-primary rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <UserPlus size={28} />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-black text-primary uppercase tracking-tight leading-none">New Account Provisioning</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Create a new official identity in the system</p>
                            </div>
                        </div>

                        <form className="p-8 space-y-6">
                            {/* Row 1: Employee Name */}
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">First Name</label>
                                    <input type="text" placeholder="John" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Last Name</label>
                                    <input type="text" placeholder="Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                                </div>
                            </div>

                            {/* Row 2: ID and Email */}
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Employee Number</label>
                                    <input type="text" placeholder="000-0000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">DepEd Email</label>
                                    <input type="email" placeholder="john.doe@deped.gov.ph" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                                </div>
                            </div>

                            {/* Row 3: Admin Only Fields */}
                            <div className="grid grid-cols-2 gap-5 p-5 bg-primary/5 rounded-[2rem] border border-primary/10">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Temporary Password</label>
                                    <input type="text" defaultValue="DepEdMati2026!" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Account Role</label>
                                    <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                                        <option>Teaching Personnel</option>
                                        <option>Non-Teaching</option>
                                        <option>ICT Coordinator</option>
                                        <option>Administrator</option>
                                    </select>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateAccountOpen(false)}
                                    className="flex-1 px-6 py-4 border border-slate-200 text-slate-400 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-4 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-slate-900 transition-all"
                                >
                                    Save & Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailRequestsPage;