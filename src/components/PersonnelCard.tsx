import React from 'react';
import { Mail, Phone } from 'lucide-react';

interface PersonnelProps {
    name: string;
    position: string;
    unit: string;
    email: string;
}

export default function PersonnelCard({ name, position, unit, email }: PersonnelProps) {
    return (
        <div className="bg-white border border-border p-6 rounded-lg shadow-sm hover:shadow-elegant transition-all group">
            <div className="flex flex-col h-full">
                <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-accent/30 px-2 py-1 rounded">
            {unit}
          </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium mb-6">
                    {position}
                </p>

                <div className="mt-auto pt-4 border-t border-border/50 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                        <Mail size={14} />
                        <span>{email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}