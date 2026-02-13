// app/layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import LayoutContent from "../components/LayoutContent";
import {ToastContainer} from "react-toastify"; // We will create this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mati City Division Portal",
    description: "Official portal for the Mati City Division",
    icons: {
        icon: "/favicon.ico?v=1",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
        <Providers>
            <ToastContainer />

            <LayoutContent>{children}</LayoutContent>
        </Providers>
        </body>
        </html>
    );
}