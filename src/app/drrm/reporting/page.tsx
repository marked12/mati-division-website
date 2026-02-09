import React from 'react';
import { FileUp, FileSpreadsheet, ClipboardCheck, AlertCircle, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const reportTemplates = [
    { title: "Situational Report (SitRep)", code: "DRRM-FORM-01", type: "XLSX", color: "bg-blue-50 text-blue-700" },
    { title: "Rapid Assessment of Damages (RADaR 1)", code: "DRRM-FORM-02", type: "PDF", color: "bg-red-50 text-red-700" },
    { title: "Post-Disaster Needs Assessment", code: "DRRM-FORM-03", type: "DOCX", color: "bg-green-50 text-green-700" },
];

export default function DRRMReportingPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* MATCHED HEADER DESIGN */}
            <div className="bg-[#b91c1c] py-16 text-white border-b-4 border-[#7f1d1d]">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold italic">DRRM Reporting</h1>
                    <p className="text-red-100 text-xs font-bold tracking-[0.3em] uppercase mt-2">
                        Official Submission & Monitoring Portal
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-12">
                {/* INSTRUCTIONAL GRID */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <StepCard
                        icon={<FileSpreadsheet size={24}/>}
                        step="01"
                        title="Download Template"
                        desc="Use the official Excel or PDF templates provided below."
                    />
                    <StepCard
                        icon={<ClipboardCheck size={24}/>}
                        step="02"
                        title="Complete Data"
                        desc="Ensure all fields are filled accurately by the school coordinator."
                    />
                    <StepCard
                        icon={<FileUp size={24}/>}
                        step="03"
                        title="Submit to Division"
                        desc="Upload through the official link or send to the DRRM email."
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* LEFT: TEMPLATES */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-serif font-bold text-primary italic">Official Report Templates</h2>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">v.2026.1</span>
                        </div>

                        <div className="space-y-3">
                            {reportTemplates.map((report, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-white border border-border rounded-xl hover:border-red-600 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg ${report.color}`}>
                                            <FileSpreadsheet size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-primary group-hover:text-red-700">{report.title}</h4>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{report.code}</p>
                                        </div>
                                    </div>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-primary border border-border px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all">
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: STATUS / ACTION */}
                    <div className="space-y-6">
                        <div className="bg-primary text-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-lg font-serif font-bold italic mb-4">Submit Report</h3>
                            <p className="text-sm text-blue-100/70 mb-6 leading-relaxed">
                                Ready to submit your school's situational report? Click the link below to access the secure upload portal.
                            </p>
                            <button className="w-full bg-accent text-primary py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                                Go to Upload Portal <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="bg-white border border-border p-6 rounded-2xl">
                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Current Reporting Status</h4>
                            <div className="space-y-4">
                                <StatusItem label="1st Quarter Drills" status="Ongoing" icon={<Clock className="text-orange-500" size={14}/>} />
                                <StatusItem label="Damage Assessment" status="Clear" icon={<CheckCircle className="text-green-500" size={14}/>} />
                                <StatusItem label="Inventory Audit" status="Required" icon={<AlertCircle className="text-red-500" size={14}/>} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* COMPLIANCE NOTE */}
                <div className="mt-20 pt-10 border-t border-border text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
                        Data collected through this portal is protected under the Data Privacy Act of 2012 and is used solely for emergency response and planning.
                    </p>
                </div>
            </div>
        </div>
    );
}

function StepCard({ icon, step, title, desc }: { icon: any, step: string, title: string, desc: string }) {
    return (
        <div className="relative p-8 bg-white border border-border rounded-2xl hover:shadow-elegant transition-all">
            <div className="text-red-600 mb-4">{icon}</div>
            <span className="absolute top-6 right-8 text-4xl font-serif font-black text-secondary/50">{step}</span>
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
        </div>
    );
}

function StatusItem({ label, status, icon }: { label: string, status: string, icon: any }) {
    return (
        <div className="flex items-center justify-between border-b border-secondary pb-3 last:border-0 last:pb-0">
            <span className="text-xs font-medium text-primary">{label}</span>
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-[10px] font-bold uppercase text-muted-foreground">{status}</span>
            </div>
        </div>
    );
}