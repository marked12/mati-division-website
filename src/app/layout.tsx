"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // We create a list of "Auth Routes" where we want a clean screen
    const authRoutes = ["/login", "/signup"];
    const isAuthPage = authRoutes.includes(pathname);

    return (
        <html lang="en">
        <body className={inter.className}>
        {/* If the current path is NOT /login or /signup,
                   show the Header and Breadcrumbs
                */}
        {!isAuthPage && <Header />}
        {!isAuthPage && <Breadcrumbs />}

        <main>{children}</main>

        {/* Hide Footer on auth pages too */}
        {!isAuthPage && <Footer />}
        </body>
        </html>
    );
}