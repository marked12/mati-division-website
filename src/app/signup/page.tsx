"use client";

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { Lock, ArrowLeft, Mail, User } from 'lucide-react';
import Cookies from 'js-cookie';
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify'; // Ensure this is imported

export default function SignupPage() {
    // 1. Initialize the Router hook
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(true); // Start as true



    // 2. Setup Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    // 2. USE EFFECTS
    useEffect(() => {
        // Check if user exists in Cookies (or localStorage if you haven't switched yet)
        const user = Cookies.get('user') || localStorage.getItem('user');

        if (user) {
            router.replace('/');
        } else {
            setIsRedirecting(false);
        }
    }, [router]);

    // 3. Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Password Match Validation
        if (formData.password !== formData.confirmPassword) {
            toast.warning("Passwords do not match!"); // Warning looks better for user errors
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
                // 2. Beautiful Success Toast
                toast.success("Success! Account created. Please wait for Admin approval.", {
                    icon: () => "🚀",
                });

                // Give the user 2 seconds to read the message before redirecting
                setTimeout(() => {
                    router.push('/login');
                }, 2000);

            } else {
                // 3. Handle specific errors (like "Email already exists")
                toast.error(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error("Network error. Is your MySQL server running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-secondary/30 px-4 relative overflow-hidden py-10">

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

                    {/* MODERN GOOGLE BUTTON SECTION */}
                    <button
                        type="button"
                        onClick={() => signIn('google', {
                            // We set the callback to /login.
                            // If approved, route.ts will send them to /
                            // If pending, route.ts will send them to /login?status=pending
                            callbackUrl: '/login',
                            prompt: "select_account"
                        })}
                        className="w-full py-3 bg-background border border-border rounded-xl flex items-center justify-center gap-3 text-sm font-bold text-foreground shadow-sm hover:bg-secondary/50 hover:border-primary/30 transition-all active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continue with Google
                    </button>

                    {/* MODERN OR DIVIDER */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border/60"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                            <span className="bg-background px-4 text-muted-foreground/60 font-black">Or use email</span>
                        </div>
                    </div>

                    {/* Registration Details Divider */}
                    <div className="relative mb-6">
                        <div className="relative flex justify-start text-[10px] uppercase tracking-widest">
                            <span className="text-primary font-black ml-1">Registration Details</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5" onSubmit={handleSubmit}>
                        {/* ... (Your Name, Email, and Password fields kept exactly as they were) ... */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">First Name</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                    <input required name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm transition-all" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Last Name</label>
                                <input required name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm transition-all" />
                            </div>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                <input required name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@gmail.com" className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input required name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Confirm</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input required name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all" />
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-2">
                            <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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