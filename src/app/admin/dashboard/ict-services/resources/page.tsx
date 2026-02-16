"use client";

import React, { useState } from 'react';
import {
    Search,
    Plus,
    MoreVertical,
    FileText,
    Youtube,
    BookOpen,
    Globe,
    Trash2,
    Edit3,
    Eye,
    EyeOff, Download
} from 'lucide-react';

const AdminResourcesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadType, setUploadType] = useState<'File' | 'Link'>('File');

    const [resources] = useState([
        { id: 1, title: "DepEd Email Setup", category: "Manual", type: "PDF", downloads: 142, status: 'Published' },
        { id: 2, title: "Google Workspace 101", category: "Video", type: "YouTube", downloads: 89, status: 'Published' },
        { id: 3, title: "DCP Maintenance", category: "Training", type: "PDF", downloads: 56, status: 'Draft' },
    ]);

    const getIcon = (type: string) => {
        switch(type) {
            case 'YouTube': return <Youtube size={16} className="text-red-500" />;
            case 'PDF': return <FileText size={16} className="text-blue-500" />;
            default: return <Globe size={16} className="text-emerald-500" />;
        }
    };

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-primary uppercase tracking-tight">Resource Library Manager</h1>
                    <p className="text-sm text-slate-500 font-medium">Upload manuals, link videos, and manage training materials.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-accent transition-all"
                >
                    <Plus size={16} /> Add New Resource
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Resources', count: '24', color: 'bg-primary' },
                    { label: 'Total Downloads', count: '1.2k', color: 'bg-accent' },
                    { label: 'Drafts', count: '03', color: 'bg-slate-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <div className="flex items-end gap-2 mt-1">
                            <p className="text-3xl font-black text-primary">{stat.count}</p>
                            <div className={`w-2 h-2 rounded-full mb-2 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Table */}
            <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
                    <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full max-w-md focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className="bg-transparent border-none outline-none pl-3 text-sm font-bold w-full"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Name</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Stats</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                        {resources.map((res) => (
                            <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-primary text-sm uppercase tracking-tight">{res.title}</span>
                                        <span className="text-[10px] text-slate-400 font-medium italic">Updated: 2 days ago</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg w-fit">
                                        {getIcon(res.type)}
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{res.type}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 font-bold text-slate-500 uppercase text-[10px] tracking-widest">
                                    {res.category}
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <span className="font-black text-primary">{res.downloads}</span>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Clicks</p>
                                </td>
                                <td className="px-8 py-5">
                                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${
                                            res.status === 'Published' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {res.status === 'Published' ? <Eye size={10}/> : <EyeOff size={10}/>}
                                            {res.status}
                                        </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button title="Edit" className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all"><Edit3 size={16}/></button>
                                        <button title="Delete" className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all"><Trash2 size={16}/></button>
                                        <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg"><MoreVertical size={16}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-primary/20 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal Card */}
                    <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex items-center gap-5">
                            {/* Icon - Now on the left */}
                            <div className="w-14 h-14 bg-primary rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <Plus size={28} />
                            </div>

                            {/* Text Container - Stacked vertically next to the icon */}
                            <div className="flex flex-col">
                                <h2 className="text-xl font-black text-primary uppercase tracking-tight leading-none">
                                    Post New Resource
                                </h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                                    Publish training materials to the public portal
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form className="p-8 space-y-5">
                            {/* Toggle Type */}
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setUploadType('File')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadType === 'File' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
                                >
                                    <FileText size={14} /> Document
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUploadType('Link')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadType === 'Link' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
                                >
                                    <Youtube size={14} /> Video Link
                                </button>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Resource Title</label>
                                <input type="text" placeholder="e.g. MS Teams Advanced Training" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Category</label>
                                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none">
                                    <option>Manuals & Guides</option>
                                    <option>Video Tutorials</option>
                                    <option>Policy Documents</option>
                                    <option>Software Tools</option>
                                </select>
                            </div>

                            {uploadType === 'File' ? (
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Upload PDF/Document</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                        <Download className="text-slate-300 group-hover:text-primary transition-colors" size={24} />
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to browse or drag & drop</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">YouTube / External URL</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input type="url" placeholder="https://youtube.com/watch?v=..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Short Description</label>
                                <textarea rows={3} placeholder="Provide a brief overview of this resource..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none" />
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 border border-slate-200 text-slate-400 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-4 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-accent transition-all"
                                >
                                    Publish Resource
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminResourcesPage;