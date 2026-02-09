import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Mati City Division | Official Portal",
    description: "Government services and announcements for Mati City",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Header />
        {/* The Breadcrumbs will sit right under the Header on every page */}
        <Breadcrumbs />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}