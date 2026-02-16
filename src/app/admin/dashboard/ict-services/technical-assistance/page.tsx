"use client";

import React, { useState } from 'react';
import {
    Wrench,
    Monitor,
    Wifi,
    ShieldAlert,
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    Laptop,
    AlertTriangle
} from 'lucide-react';

const TechnicalAssistanceAdmin = () => {
    // Mock data for the tickets
    const [tickets] = useState([
        {
            id: "TIC-1024",
            category: 'Hardware',
            requester: 'Juan Dela Cruz',
            office: 'Accounting',
            date: '2024-03-16',
            status: 'Pending',
            priority: 'High',
            issue: 'Printer not connecting to network'
        },
        {
            id: "TIC-1025",
            category: 'Network',
            requester: 'Maria Santos',
            office: 'HR Division',
            date: '2024-03-15',
            status: 'In Progress',
            priority: 'Medium',
            issue: 'Slow internet connection in Room 4'
        },
        {
            id: "TIC-1026",
            category: 'Software',
            requester: 'Roberto Reyes',
            office: 'SDS Office',
            date: '2024-03-14',
            status: 'Completed',
            priority: 'Low',
            issue: 'Installation of DepEd Desktop Apps'
        },
    ]);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Hardware': return <Laptop size={14} className="text-blue-500" />;
            case 'Network': return <Wifi size={14} className="text-purple-500" />;
            case 'Cyber': return <ShieldAlert size={14} className="text-red-500" />;
            default: return <Wrench size={14} className="text-slate-500" />;
        }
    };

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-primary uppercase tracking-tight">Technical Assistance Queue</h1>
                    <p className="text-sm text-slate-500 font-medium">Monitor and manage ICT support tickets across the division.</p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-accent transition-all">
                    <CheckCircle2 size={16} /> Mark All Resolved
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Tickets', count: '14', icon: <Clock className="text-amber-500" />, bg: 'bg-amber-50' },
                    { label: 'Hardware Issues', count: '08', icon: <Monitor className="text-blue-500" />, bg: 'bg-blue-50' },
                    { label: 'Network Down', count: '02', icon: <Wifi className="text-red-500" />, bg: 'bg-red-50' },
                    { label: 'Monthly Resolved', count: '142', icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50' },
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
                            placeholder="Search by ticket ID or office..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-100 rounded-lg transition-all border border-slate-200">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket ID</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Requester / Office</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="font-mono font-bold text-slate-500">{ticket.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                                            {getCategoryIcon(ticket.category)}
                                        </div>
                                        <span className="font-bold text-primary">{ticket.category}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-700">{ticket.requester}</span>
                                        <span className="text-[11px] text-accent font-black uppercase tracking-tighter">{ticket.office}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                            ticket.priority === 'High' ? 'bg-red-500 animate-pulse' :
                                                ticket.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                                        }`} />
                                        <span className="text-[11px] font-bold uppercase">{ticket.priority}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                        ticket.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                                            ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                                                'bg-amber-100 text-amber-600'
                                    }`}>
                                        {ticket.status}
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
        </div>
    );
};

export default TechnicalAssistanceAdmin;