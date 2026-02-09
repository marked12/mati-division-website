"use client";

import React, { useState } from 'react';
import PersonnelCard from '../../components/PersonnelCard';
import { Search, Users } from 'lucide-react';

const staffData = [
    { name: "Dr. Winnie E. Batoon", position: "Schools Division Superintendent", unit: "OSDS", email: "me.santos@deped.gov.ph" },
    { name: "Atty. Ricardo Dela Cruz", position: "Asst. Schools Division Superintendent", unit: "OSDS", email: "r.delacruz@deped.gov.ph" },
    { name: "Juan P. Mercado", position: "Chief Education Supervisor", unit: "CID", email: "j.mercado@deped.gov.ph" },
    { name: "Sarah L. Generoso", position: "Chief Education Supervisor", unit: "SGOD", email: "s.generoso@deped.gov.ph" },
    { name: "Roberto B. Silva", position: "Administrative Officer V", unit: "Admin", email: "r.silva@deped.gov.ph" },
    { name: "Elena M. Ruiz", position: "IT Officer I", unit: "ICT", email: "e.ruiz@deped.gov.ph" },
];

export default function PersonnelPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredStaff = staffData.filter(person => {
        const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.position.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "All" || person.unit === filter;
        return matchesSearch && matchesFilter;
    });

    const categories = ["All", "OSDS", "CID", "SGOD", "Admin", "ICT"];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Section */}
            <div className="bg-primary text-primary-foreground py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-serif font-bold mb-4">Personnel Directory</h1>
                    <p className="text-accent/80 font-medium tracking-wide">Official Registry of the Mati City Division Staff</p>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="max-w-6xl mx-auto px-4 -mt-8">
                <div className="bg-card border border-border rounded-xl shadow-elegant p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or position..."
                            className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all
                  ${filter === cat
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary text-muted-foreground hover:bg-border"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="max-w-6xl mx-auto px-4 mt-12">
                {filteredStaff.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStaff.map((person, idx) => (
                            <PersonnelCard key={idx} {...person} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-secondary/20 rounded-xl border border-dashed border-border">
                        <Users className="mx-auto text-muted-foreground/30 mb-4" size={48} />
                        <p className="text-muted-foreground font-medium">No personnel found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}