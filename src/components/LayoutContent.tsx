// components/LayoutContent.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { ToastContainer } from 'react-toastify';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const authRoutes = ["/login", "/signup"];
    const isAuthPage = authRoutes.includes(pathname);

    return (
        <>
            {!isAuthPage && <Header />}
            {!isAuthPage && <Breadcrumbs />}

            <main>{children}</main>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                theme="light"
            />

            {!isAuthPage && <Footer />}
        </>
    );
}