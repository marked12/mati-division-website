// app/admin/dashboard/layout.tsx
import AdminSidebar from "@/src/components/AdminSidebar";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <AdminSidebar>
            {/* The breadcrumbs or page headers can also be handled inside the Sidebar component */}
            {children}
        </AdminSidebar>
    );
}