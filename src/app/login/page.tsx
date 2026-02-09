"use client";

import React from 'react';
import Link from 'next/link';
import {UserCircle, Lock, ArrowLeft, Mail} from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-secondary/30 px-4">
            {/* Back Button */}
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

                    {/* Form */}
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-primary ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200"
                                    size={18}
                                />
                                <input
                                    type="email"
                                    placeholder="name@gmail.com"
                                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl text-sm
                       focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary
                       hover:bg-secondary/80 transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-primary ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <button type="button" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter">
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 transition-all mt-4"
                        >
                            Sign In
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
                        <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
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