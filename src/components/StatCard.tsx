"use client";
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    colorClass: string;
}

const StatCard = ({ label, value, icon: Icon, colorClass }: StatCardProps) => {
    return (
        <div className="bg-white border border-border p-5 rounded-xl shadow-sm flex items-center justify-between overflow-hidden relative group transition-all hover:shadow-md">
            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {label}
                </p>
                <h3 className="text-3xl font-serif font-bold text-primary tracking-tighter">
                    {value}
                </h3>
            </div>

            <div className={`p-3 rounded-lg ${colorClass} transition-transform group-hover:scale-110 duration-300 relative z-10`}>
                <Icon size={24} />
            </div>

            {/* Decorative background icon - uses the same icon but larger and faint */}
            <div className="absolute -bottom-4 -right-2 opacity-[0.04] text-primary rotate-12 pointer-events-none">
                <Icon size={100} />
            </div>
        </div>
    );
};

export default StatCard;