"use client";

import React, {Suspense, useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation'; // Correct router for App Router
import {Lock, ArrowLeft, Mail, CheckCircle2, AlertCircle, Info, PowerOff} from 'lucide-react';
import Cookies from 'js-cookie'; // Add this import at the top
import { signIn } from "next-auth/react"; // Add this
import { toast } from 'react-toastify'; // Import toast


function LoginMessages() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const status = searchParams.get('status');
        const error = searchParams.get('error');

        // Handle Status Params
        if (status === 'pending') {
            toast.dismiss();
            toast.info("Account received. Please wait for Admin approval.", {
                icon: <Info size={20} />,
                className: "border-l-4 border-l-blue-500 shadow-lg",
                toastId: "pending-status"
            });
        }

        // Handle Error Params
        if (error === 'AccountDisabled') {
            toast.dismiss();
            toast.error("Access Denied: This account has been disabled.", {
                icon: <PowerOff size={20} />,
                className: "border-l-4 border-l-red-600 shadow-lg",
                toastId: "disabled-error"
            });
        }

        if (error === 'DatabaseError') {
            toast.dismiss();
            toast.error("System connection error. Please try again later.", {
                toastId: "db-error"
            });
        }
    }, [searchParams]);

    return null;
}
export default function LoginPage() {
    // 1. Initialize router and state
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            // User is already logged in, send them home
            router.replace('/');
        }
    }, [router]);

    // 2. Login Submission Logic


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // 1. Save user data to Cookies (expires in 7 days)
                // We stringify it so we can store the whole object
                Cookies.set('user', JSON.stringify(data.user), { expires: 3 });

                // 2. Alert and Redirect
                toast.success(`Welcome back, ${data.user.firstName}!`, {
                    icon: <CheckCircle2 className="text-green-500" size={20} />,
                });

                // 3. Use window.location.href for the initial login redirect
                // to force a clean server-side reload of the Header
                setTimeout(() => {
                    window.location.href = "/admin/dashboard";
                }, 1500);
            } else {
                // Error Toast
                toast.error(data.message || "Invalid credentials", {
                    icon: <AlertCircle className="text-red-500" size={20} />,
                });
            }
        } catch (error) {
            toast.error("Connection error. Is your MySQL server running?", {
                icon: <AlertCircle className="text-red-500" size={20} />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-secondary/30 px-4">
            {/* Back Button */}
            <Suspense fallback={null}>
                <LoginMessages />
            </Suspense>
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>

            {/* Login Card */}
            <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    {/* Header/Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg font-serif text-3xl font-bold mb-4">
                            M
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-primary">Welcome Back</h1>
                        <p className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase mt-1">
                            Mati City Division Portal
                        </p>
                    </div>

                    {/* Form - Hooked to handleLogin */}
                    {/* Form - Hooked to handleLogin */}
                    <form className="space-y-5" onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-primary ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary hover:bg-secondary/80 transition-all" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-primary ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <button type="button" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter">
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 transition-all mt-4 disabled:opacity-50"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                        {/* OR Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                                <span className="bg-background px-4 text-muted-foreground font-bold">Or</span>
                            </div>
                        </div>

                        {/* Google Button */}
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
                    </form>
                </div>

                {/* Footer with Sign Up Link */}
                <div className="p-6 bg-secondary/30 border-t border-border text-center space-y-4">
                    <p className="text-[11px] text-muted-foreground font-medium">
                        Don't have an account yet?{' '}
                        <Link
                            href="/signup"
                            className="text-primary font-black uppercase tracking-widest hover:underline ml-1"
                        >
                            Sign Up
                        </Link>
                    </p>

                    <div className="pt-2 border-t border-border/50">
                        <p className="text-[10px] text-muted-foreground/60 leading-relaxed uppercase tracking-tighter">
                            Authorized Personnel Only.
                            <br />
                            <span className="font-bold">Mati City Division © 2026</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}