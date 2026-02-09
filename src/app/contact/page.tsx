import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, Globe, Facebook, MessageSquare } from 'lucide-react';

const departments = [
    { name: "Office of the SDS", email: "sds.mati@deped.gov.ph", phone: "(087) 388-1234" },
    { name: "Personnel/HR Section", email: "hr.mati@deped.gov.ph", phone: "(087) 388-5678" },
    { name: "Finance & Payroll", email: "finance.mati@deped.gov.ph", phone: "(087) 388-9012" },
    { name: "Records Section", email: "records.mati@deped.gov.ph", phone: "(087) 388-3456" },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* MATCHED HEADER DESIGN */}
            <div className="bg-primary py-16 text-primary-foreground border-b-4 border-accent">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold italic">Contact Us</h1>
                    <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mt-2">
                        Official Directory & Public Assistance Desk
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: CONTACT INFO */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-primary mb-6 italic">Reach Out to Us</h2>
                            <div className="space-y-6">
                                <ContactDetail
                                    icon={<MapPin size={20} />}
                                    label="Office Address"
                                    value="Government Center, Dahican, City of Mati, Davao Oriental, 8200"
                                />
                                <ContactDetail
                                    icon={<Phone size={20} />}
                                    label="General Inquiries"
                                    value="(087) 388-XXXX / 0912-345-6789"
                                />
                                <ContactDetail
                                    icon={<Mail size={20} />}
                                    label="Official Email"
                                    value="mati.city@deped.gov.ph"
                                />
                                <ContactDetail
                                    icon={<Clock size={20} />}
                                    label="Office Hours"
                                    value="Monday - Friday: 8:00 AM - 5:00 PM"
                                />
                            </div>
                        </div>

                        {/* SOCIAL LINKS */}
                        <div className="pt-8 border-t border-border">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Connect with us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform">
                                    <Globe size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE & RIGHT COLUMN: FORM & DIRECTORY */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* INQUIRY FORM */}
                        <div className="bg-white border border-border p-8 rounded-3xl shadow-elegant">
                            <div className="flex items-center gap-3 mb-8">
                                <MessageSquare className="text-accent" />
                                <h3 className="text-xl font-serif font-bold text-primary">Public Assistance Form</h3>
                            </div>

                            <form className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                                    <input type="text" className="w-full bg-secondary/30 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-accent outline-none" placeholder="Juan Dela Cruz" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                                    <input type="email" className="w-full bg-secondary/30 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-accent outline-none" placeholder="juan@example.com" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subject / Purpose of Inquiry</label>
                                    <select className="w-full bg-secondary/30 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-accent outline-none">
                                        <option>General Inquiry</option>
                                        <option>Employment / HR</option>
                                        <option>Procurement / Bids</option>
                                        <option>Technical Support</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Message</label>
                                    <textarea rows={4} className="w-full bg-secondary/30 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-accent outline-none" placeholder="How can we help you?"></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button className="w-full bg-primary text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-primary transition-all flex items-center justify-center gap-2">
                                        Submit Inquiry <Send size={16} />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* DEPARTMENT DIRECTORY TABLE */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary/50 mb-6">Department Directory</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                    <tr className="border-b border-border">
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Section</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</th>
                                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Contact</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary">
                                    {departments.map((dept, i) => (
                                        <tr key={i} className="group hover:bg-secondary/20 transition-colors">
                                            <td className="py-4 font-bold text-primary text-sm">{dept.name}</td>
                                            <td className="py-4 text-xs text-muted-foreground italic">{dept.email}</td>
                                            <td className="py-4 text-xs font-bold text-right text-primary">{dept.phone}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactDetail({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex gap-4">
            <div className="bg-primary/5 p-3 rounded-xl text-accent shrink-0 border border-accent/10">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                <p className="text-sm font-medium text-primary leading-relaxed">{value}</p>
            </div>
        </div>
    );
}