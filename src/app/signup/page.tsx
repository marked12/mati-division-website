"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { Lock, ArrowLeft, Mail, User } from 'lucide-react';

export default function SignupPage() {
    // 1. Initialize the Router hook
    const router = useRouter();

    // 2. Setup Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    // 3. Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Success! Account created. Please wait for Admin approval.");
                // Successful redirect
                router.push('/login');
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Failed to connect to the server. Check if your MySQL is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-secondary/30 px-4 relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Back Button */}
            <Link
                href="/login"
                className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-all hover:-translate-x-1 z-20"
            >
                <ArrowLeft size={18} />
                Back to Login
            </Link>

            {/* Signup Card */}
            <div className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 my-12 z-10">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg font-serif text-3xl font-bold mb-4 transform hover:rotate-3 transition-transform">
                            M
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-primary">Create Account</h1>
                        <p className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase mt-1">
                            Mati City Division Portal
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                            <span className="bg-background px-4 text-muted-foreground font-bold">Registration Details</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5" onSubmit={handleSubmit}>

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">First Name</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                    <input
                                        required
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm transition-all"
                                    />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Last Name</label>
                                <div className="relative group">
                                    <input
                                        required
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@gmail.com"
                                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                <input
                                    required
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Confirm</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                <input
                                    required
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : "Create Account"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 bg-secondary/30 border-t border-border text-center space-y-4">
                    <p className="text-[11px] text-muted-foreground font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-black uppercase tracking-widest hover:underline ml-1">
                            Sign In
                        </Link>
                    </p>
                    <div className="pt-2 border-t border-border/50">
                        <p className="text-[10px] text-muted-foreground/60 leading-relaxed uppercase tracking-tighter">
                            Authorized Personnel Only. <br />
                            <span className="font-bold">Mati City Division © 2026</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}