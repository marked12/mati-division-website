"use client";
import Link from 'next/link';
import { UserCog } from 'lucide-react';

interface AdminHeaderProps {
    activePage: 'USERS' | 'ANNOUNCEMENTS' | 'LOGS';
}

export default function AdminHeader({ activePage }: AdminHeaderProps) {
    const titles = {
        USERS: "User Access Management",
        ANNOUNCEMENTS: "Official Announcements",
        LOGS: "System Activity Logs"
    };

    return (
        <div className="bg-primary pt-16 text-primary-foreground border-b-4 border-accent">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-2">
                    <UserCog size={20} className="text-accent"/>
                    <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
                        Mati City Division Portal
                    </p>
                </div>

                <h1 className="text-4xl font-serif font-bold italic mb-8 uppercase tracking-tight">
                    {titles[activePage]}
                </h1>

                <div className="flex gap-8">
                    <Link href="/admin/users"
                          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                              activePage === 'USERS' ? 'text-accent' : 'text-primary-foreground/60 hover:text-primary-foreground'
                          }`}>
                        Personnel Directory
                        {activePage === 'USERS' && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent"/>}
                    </Link>

                    <Link href="/admin/announcements"
                          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                              activePage === 'ANNOUNCEMENTS' ? 'text-accent' : 'text-primary-foreground/60 hover:text-primary-foreground'
                          }`}>
                        Manage Announcements
                        {activePage === 'ANNOUNCEMENTS' && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent"/>}
                    </Link>

                    <Link href="/admin/logs"
                          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                              activePage === 'LOGS' ? 'text-accent' : 'text-primary-foreground/60 hover:text-primary-foreground'
                          }`}>
                        System Activity Logs
                        {activePage === 'LOGS' && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent"/>}
                    </Link>
                </div>
            </div>
        </div>
    );
}