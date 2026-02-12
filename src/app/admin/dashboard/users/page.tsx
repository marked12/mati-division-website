"use client";
import React, { useState, useEffect } from 'react';
import { Users, Clock, Search, Loader2, CheckCircle2, Power, PowerOff } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AdminHeader from "@/src/components/AdminHeader";
import BackButton from "@/src/components/BackButton";
import {toast, ToastContainer} from "react-toastify";

export default function UsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdating, setIsUpdating] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch only Users
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

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle Role/Status Updates
    const handleUpdate = async (userId: number, updates: { newRole?: string; newStatus?: number }) => {
        setIsUpdating(userId);

        // 1. Determine the context-specific message
        let pendingMsg = "Updating user...";
        let successMsg = "User updated successfully!";

        if (updates.newStatus !== undefined) {
            const isEnabling = updates.newStatus === 1;
            pendingMsg = isEnabling ? "Enabling account..." : "Disabling account...";
            successMsg = isEnabling ? "Account has been disabled" : "Account has been Enabled";
        } else if (updates.newRole) {
            pendingMsg = `Changing role to ${updates.newRole}...`;
            successMsg = `Role updated to ${updates.newRole}`;
        }

        try {
            // 2. Wrap the fetch in a toast promise
            const updatePromise = fetch('/api/admin/users/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, ...updates })
            }).then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Update failed");
                }
                return res;
            });

            toast.promise(updatePromise, {
                pending: pendingMsg,
                success: successMsg,
                error: {
                    render({ data }: any) {
                        return data.message || "Failed to update account";
                    }
                }
            });

            const res = await updatePromise;

            // 3. Update local UI state
            setUsers(prevUsers => prevUsers.map(u =>
                u.id === userId
                    ? { ...u,
                        role: updates.newRole ?? u.role,
                        status: updates.newStatus !== undefined ? updates.newStatus : u.status
                    }
                    : u
            ));

        } catch (error) {
            console.error("User Update Error:", error);
        } finally {
            setIsUpdating(null);
        }
    };

    // Pagination & Filtering Logic
    const filteredUsers = users.filter(user => {
        const matchesFilter = filter === 'ALL' ? true :
            filter === 'DISABLE' ? Number(user.status) === 1 :
                user.role === filter;

        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRows = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const pendingCount = users.filter(u => u.role === 'PENDING').length;

    // if (isLoading) return <div className="p-8 text-center font-serif italic text-primary">Synchronizing Personnel...</div>;

    return (
        <div className="min-h-screen bg-background">
            <ToastContainer/>

        <div className="max-w-6xl mx-auto px-4 mt-10 pb-20">
            {/* KPI Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-border p-8 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="text-primary"><Users size={32}/></div>
                        <div>
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total
                                Personnel</h3>
                            <p className="text-3xl font-serif font-bold text-primary">{users.length}</p>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white border border-border p-8 rounded-lg shadow-sm border-l-4 border-l-accent">
                    <div className="flex items-center gap-4">
                        <div className="text-accent"><Clock size={32}/></div>
                        <div>
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Pending
                                Approvals</h3>
                            <p className="text-3xl font-serif font-bold text-primary">{pendingCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Users Table */}
            <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
                <div
                    className="p-6 border-b border-border bg-secondary/10 flex flex-col lg:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-serif font-bold italic text-primary">User Directory</h2>

                    <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search size={14}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
                            <input
                                type="text"
                                placeholder="Search name or email..."
                                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-md text-xs focus:ring-1 focus:ring-accent outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full md:w-48">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-border rounded-md text-[10px] font-bold uppercase tracking-widest text-primary outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                            >
                                <option value="ALL">All Personnel</option>
                                <option value="PENDING">Pending Approval</option>
                                <option value="USER">Standard Users</option>
                                <option value="HR">HR Officers</option>
                                <option value="DRRM">DRRM Staff</option>
                                <option value="ADMIN">Administrators</option>
                                <option value="BAC">BAC Staff</option>
                                <option value="GAD">GAD Staff</option>
                                <option value="ICT">ICT Unit</option>
                                <option value="WRITER">Writer</option>
                                <option value="SUPPLY">Supply Staff</option>

                            </select>
                            {/* Custom Arrow Icon */}
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                                <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                </svg>
                            </div>
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
                        {/* Use currentRows instead of filteredUsers to respect pagination */}
                        {currentRows.map((user) => {
                            const isInactive = Number(user.status) === 1;

                            return (
                                <tr
                                    key={user.id}
                                    className={`transition-all ${isInactive ? 'bg-red-50/40 grayscale-[0.3]' : 'hover:bg-secondary/5'}`}
                                >
                                    {/* 1. Name Column */}
                                    <td className="px-6 py-4">
                                        <p className={`text-sm font-serif font-bold ${isInactive ? 'text-muted-foreground' : 'text-primary'}`}>
                                            {user.first_name} {user.last_name}
                                        </p>
                                    </td>

                                    {/* 2. Email Column */}
                                    <td className="px-6 py-4 text-xs text-muted-foreground">
                                        {user.email}
                                    </td>

                                    {/* 3. Role Column */}
                                    <td className="px-6 py-4">
                                        {user.role === 'PENDING' ? (
                                            <div
                                                className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
                                                <Clock size={12}/> Pending
                                            </div>
                                        ) : (
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleUpdate(user.id, {newRole: e.target.value})}
                                                disabled={isUpdating === user.id || isInactive}
                                                className={`bg-secondary/20 rounded px-2 py-1 text-[10px] font-bold text-primary border-none outline-none focus:ring-1 focus:ring-accent transition-opacity ${
                                                    isInactive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                                }`}
                                            >
                                                <option value="USER">USER</option>
                                                <option value="HR">HR OFFICER</option>
                                                <option value="DRRM">DRRM Staff</option>
                                                <option value="ADMIN">ADMINISTRATOR</option>
                                                <option value="BAC">BAC Staff</option>
                                                <option value="GAD">GAD Staff</option>
                                                <option value="ICT">ICT Unit</option>
                                                <option value="WRITER">Writer</option>
                                                <option value="SUPPLY">Supply</option>
                                            </select>
                                        )}
                                    </td>

                                    {/* 4. Action Column */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {user.role === 'PENDING' ? (
                                                <button
                                                    onClick={() => handleUpdate(user.id, {
                                                        newRole: 'USER',
                                                        newStatus: 0
                                                    })}
                                                    disabled={isUpdating === user.id}
                                                    className="bg-primary text-white text-[10px] font-bold uppercase px-4 py-2 rounded hover:bg-accent transition-all flex items-center gap-2 shadow-sm"
                                                >
                                                    {isUpdating === user.id ?
                                                        <Loader2 size={12} className="animate-spin"/> :
                                                        <CheckCircle2 size={12}/>}
                                                    Approve
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleUpdate(user.id, {newStatus: isInactive ? 0 : 1})}
                                                    disabled={isUpdating === user.id}
                                                    className={`min-w-[100px] text-[10px] font-bold uppercase px-3 py-1.5 rounded border flex items-center justify-center gap-2 transition-all ${
                                                        isInactive
                                                            ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                                                            : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                                                    }`}
                                                >
                                                    {isUpdating === user.id ? (
                                                        <Loader2 size={12} className="animate-spin"/>
                                                    ) : isInactive ? (
                                                        <><Power size={12}/> Enable</>
                                                    ) : (
                                                        <><PowerOff size={12}/> Disable</>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {/* Empty State: If search/filter returns nothing */}
                        {currentRows.length === 0 && (
                            <tr>
                                <td colSpan={4}
                                    className="px-6 py-12 text-center text-muted-foreground italic text-xs">
                                    No personnel found matching the current criteria.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls - Only shows if more than 10 rows exist */}
                {filteredUsers.length > itemsPerPage && (
                    <div
                        className="px-6 py-4 bg-secondary/5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Item Counter */}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length}
                        </p>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 text-[10px] font-bold uppercase border border-border rounded bg-white hover:bg-secondary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-primary shadow-sm"
                            >
                                Prev
                            </button>

                            <div
                                className="flex items-center px-4 text-[10px] font-bold text-primary bg-white border border-border rounded py-1.5 h-full">
                                Page {currentPage} of {totalPages}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 text-[10px] font-bold uppercase border border-border rounded bg-white hover:bg-secondary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-primary shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* ROLE ACCESS REFERENCE CARD */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4 border-b border-border pb-2 mb-2">
                    <h3 className="text-lg font-serif font-bold italic text-primary">Role Access
                        Permissions</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Reference
                        guide for administrative privileges</p>
                </div>

                <div className="bg-white border border-border p-5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider">User
                            (Staff)</h4>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span
                            className="text-green-600 font-bold">✔</span> View Memos
                        </li>
                        <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span
                            className="text-green-600 font-bold">✔</span> Download Docs
                        </li>
                        <li className="flex items-start gap-2 text-[11px] text-red-500/50 italic"><span
                            className="font-bold">✘</span> No Management
                        </li>
                    </ul>
                </div>

                <div
                    className="bg-white border border-border p-5 rounded-lg shadow-sm border-t-4 border-t-blue-500">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider">HR
                            Officer</h4>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span
                            className="text-green-600 font-bold">✔</span> Personnel Directory
                        </li>
                        <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span
                            className="text-green-600 font-bold">✔</span> Personnel Count
                        </li>
                        <li className="flex items-start gap-2 text-[11px] text-red-500/50 italic"><span
                            className="font-bold">✘</span> Cannot Modify Roles
                        </li>
                    </ul>
                </div>

                <div
                    className="bg-white border border-border p-5 rounded-lg shadow-sm border-t-4 border-t-orange-500">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider">DRRM
                            Staff</h4>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span
                            className="text-green-600 font-bold">✔</span> Post DRRM Updates
                        </li>
                        <li className="flex items-start gap-2 text-[11px] text-muted-foreground"><span
                            className="text-green-600 font-bold">✔</span> Disaster Docs
                        </li>
                        <li className="flex items-start gap-2 text-[11px] text-red-500/50 italic"><span
                            className="font-bold">✘</span> Cannot Modify Roles
                        </li>
                    </ul>
                </div>

                <div
                    className="bg-primary text-white border border-primary p-5 rounded-lg shadow-md border-t-4 border-t-accent">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                        <h4 className="text-xs font-bold text-accent uppercase tracking-wider">Administrator</h4>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-[11px] text-primary-foreground/90"><span
                            className="text-accent font-bold">✔</span> Approve Accounts
                        </li>
                        <li className="flex items-start gap-2 text-[11px] text-primary-foreground/90"><span
                            className="text-accent font-bold">✔</span> Change User Roles
                        </li>
                        <li className="flex items-start gap-2 text-[11px] text-primary-foreground/90"><span
                            className="text-accent font-bold">✔</span> Full System Control
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
}