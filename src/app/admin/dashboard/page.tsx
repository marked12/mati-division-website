"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Users, Clock, UserCog, CheckCircle2, Search, Loader2, Power, PowerOff } from 'lucide-react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    status: number; // 0 for Active, 1 for Inactive
}

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdating, setIsUpdating] = useState<number | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            if (!data.error) setUsers(data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // UPDATED HANDLE UPDATE: Handles both Role and Status changes
    const handleUpdate = async (userId: number, updates: { newRole?: string; newStatus?: number }) => {
        setIsUpdating(userId);
        try {
            const res = await fetch('/api/admin/users/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, ...updates })
            });

            if (res.ok) {
                setUsers(prevUsers => prevUsers.map(u =>
                    u.id === userId
                        ? {
                            ...u,
                            role: updates.newRole ?? u.role,
                            status: updates.newStatus !== undefined ? updates.newStatus : u.status
                        }
                        : u
                ));
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Update failed");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Failed to reach server");
        } finally {
            setIsUpdating(null);
        }
    };

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (!userCookie) {
            router.push('/login');
            return;
        }
        const user = JSON.parse(userCookie);
        if (user.role !== 'ADMIN' && user.role !== 'HR') {
            router.push('/');
        } else {
            fetchUsers();
        }
    }, [router]);

    const filteredUsers = users.filter(user => {
        const matchesFilter = filter === 'ALL' ? true : user.role === filter;
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const pendingCount = users.filter(u => u.role === 'PENDING').length;

    if (isLoading) return <div className="p-8 text-center font-serif italic text-primary">Synchronizing...</div>;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Banner */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-2">
                        <UserCog size={20} className="text-accent" />
                        <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Mati City Division Portal</p>
                    </div>
                    <h1 className="text-4xl font-serif font-bold italic">User Access Management</h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                {/* KPI Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border border-border p-8 rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="text-primary"><Users size={32} /></div>
                            <div>
                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Personnel</h3>
                                <p className="text-3xl font-serif font-bold text-primary">{users.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-border p-8 rounded-lg shadow-sm border-l-4 border-l-accent">
                        <div className="flex items-center gap-4">
                            <div className="text-accent"><Clock size={32} /></div>
                            <div>
                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Pending Approvals</h3>
                                <p className="text-3xl font-serif font-bold text-primary">{pendingCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border bg-secondary/10 flex flex-col lg:flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-serif font-bold italic text-primary">User Directory</h2>

                        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search name or email..."
                                    className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-md text-xs focus:ring-1 focus:ring-accent outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-1 overflow-x-auto">
                                {['ALL', 'PENDING', 'USER', 'HR', 'DRRM', 'ADMIN'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setFilter(t)}
                                        className={`px-3 py-1 text-[10px] font-bold rounded border transition-all ${filter === t ? 'bg-primary text-white border-primary' : 'bg-transparent text-muted-foreground border-border hover:border-accent'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-secondary/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border">
                                <th className="px-6 py-4">Full Name</th>
                                <th className="px-6 py-4">Email Address</th>
                                <th className="px-6 py-4">Role / Permissions</th>
                                <th className="px-6 py-4 text-right">Account Status</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                            {filteredUsers.map((user) => {
                                const isInactive = user.status === 1;
                                return (
                                    <tr key={user.id} className={`transition-all ${isInactive ? 'bg-red-50/40 grayscale-[0.3]' : 'hover:bg-secondary/5'}`}>
                                        <td className="px-6 py-4">
                                            <p className={`text-sm font-serif font-bold ${isInactive ? 'text-muted-foreground' : 'text-primary'}`}>{user.first_name} {user.last_name}</p>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-muted-foreground">{user.email}</td>
                                        <td className="px-6 py-4">
                                            {user.role === 'PENDING' ? (
                                                <div className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
                                                    <Clock size={12}/> Pending
                                                </div>
                                            ) : (
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleUpdate(user.id, { newRole: e.target.value })}
                                                    // UPDATED: Now also disables if the account is inactive
                                                    disabled={isUpdating === user.id || isInactive}
                                                    className={`bg-secondary/20 rounded px-2 py-1 text-[10px] font-bold text-primary border-none outline-none focus:ring-1 focus:ring-accent transition-opacity ${
                                                        isInactive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                                    }`}
                                                >
                                                    <option value="USER">USER</option>
                                                    <option value="HR">HR OFFICER</option>
                                                    <option value="DRRM">DRRM Staff</option>
                                                    <option value="ADMIN">ADMINISTRATOR</option>
                                                </select>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {user.role === 'PENDING' ? (
                                                    <button
                                                        onClick={() => handleUpdate(user.id, { newRole: 'USER', newStatus: 0 })}
                                                        disabled={isUpdating === user.id}
                                                        className="bg-primary text-white text-[10px] font-bold uppercase px-4 py-2 rounded hover:bg-accent transition-all flex items-center gap-2 shadow-sm"
                                                    >
                                                        {isUpdating === user.id ? <Loader2 size={12} className="animate-spin"/> : <CheckCircle2 size={12}/>}
                                                        Approve
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleUpdate(user.id, { newStatus: isInactive ? 0 : 1 })}
                                                        disabled={isUpdating === user.id}
                                                        className={`min-w-[100px] text-[10px] font-bold uppercase px-3 py-1.5 rounded border flex items-center justify-center gap-2 transition-all ${
                                                            isInactive
                                                                ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                                                                : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                                                        }`}
                                                    >
                                                        {isUpdating === user.id ? <Loader2 size={12} className="animate-spin"/> : isInactive ? <><Power size={12}/> Enable</> : <><PowerOff size={12}/> Disable</>}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ROLE ACCESS REFERENCE CARD */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-4 border-b border-border pb-2 mb-2">
                        <h3 className="text-lg font-serif font-bold italic text-primary">Role Access Permissions</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Reference guide for administrative privileges</p>
                    </div>

                    <div className="bg-white border border-border p-5 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">User (Staff)</h4>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span className="text-green-600 font-bold">✔</span> View Memos</li>
                            <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span className="text-green-600 font-bold">✔</span> Download Docs</li>
                            <li className="flex items-start gap-2 text-[11px] text-red-500/50 italic"><span className="font-bold">✘</span> No Management</li>
                        </ul>
                    </div>

                    <div className="bg-white border border-border p-5 rounded-lg shadow-sm border-t-4 border-t-blue-500">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">HR Officer</h4>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span className="text-green-600 font-bold">✔</span> Personnel Directory</li>
                            <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span className="text-green-600 font-bold">✔</span> Personnel Count</li>
                            <li className="flex items-start gap-2 text-[11px] text-red-500/50 italic"><span className="font-bold">✘</span> Cannot Modify Roles</li>
                        </ul>
                    </div>

                    <div className="bg-white border border-border p-5 rounded-lg shadow-sm border-t-4 border-t-orange-500">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">DRRM Staff</h4>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span className="text-green-600 font-bold">✔</span> Post DRRM Updates</li>
                            <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span className="text-green-600 font-bold">✔</span> Disaster Docs</li>
                            <li className="flex items-start gap-2 text-[11px] text-red-500/50 italic"><span className="font-bold">✘</span> Cannot Modify Roles</li>
                        </ul>
                    </div>

                    <div className="bg-primary text-white border border-primary p-5 rounded-lg shadow-md border-t-4 border-t-accent">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                            <h4 className="text-xs font-bold text-accent uppercase tracking-wider">Administrator</h4>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-[11px] text-primary-foreground/90"><span className="text-accent font-bold">✔</span> Approve Accounts</li>
                            <li className="flex items-start gap-2 text-[11px] text-primary-foreground/90"><span className="text-accent font-bold">✔</span> Change User Roles</li>
                            <li className="flex items-start gap-2 text-[11px] text-primary-foreground/90"><span className="text-accent font-bold">✔</span> Full System Control</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}