// components/LayoutContent.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const authRoutes = ["/login", "/signup"];
    const isAuthPage = authRoutes.includes(pathname);

    // NEW: Check if the user is in the admin section
    const isAdminPage = pathname?.startsWith("/admin");

    // If it's an admin page, we don't want the public Header, Footer, or public Breadcrumbs.
    // The AdminSidebar component already provides its own header and breadcrumbs.
    if (isAdminPage) {
        return <main>{children}</main>;
    }

    // If it's a login/signup page, show only the content
    if (isAuthPage) {
        return <main>{children}</main>;
    }

    // Default: Public Website Layout
    return (
        <>
            <Header />
            <Breadcrumbs />

            <main>{children}</main>

            <Footer />
        </>
    );
}