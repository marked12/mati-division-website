import { pool } from '@/src/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BackButton from "@/src/components/BackButton";
 // Ensure this path is correct

export default async function AnnouncementDetails({
                                                      params
                                                  }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // We use "currentAnnouncement" to avoid TS conflicts
    // Update your type or use 'any' if you want to bypass the check quickly
    let currentAnnouncement: {
        title: string;
        content: string;
        category: string;
        author_role: string; // Add this line
        created_at: string;
    } | any;
    let otherAnnouncements: any[] = [];

    try {
        // 1. Get the specific announcement + the Author's Role from the users table
        const [rows]: any = await pool.execute(
            `SELECT 
            a.id, a.title, a.content, a.created_at, a.category, 
            u.role AS role 
         FROM announcements a
         LEFT JOIN users u ON a.author_id = u.id 
         WHERE a.id = ?`,
            [id]
        );
        currentAnnouncement = rows[0];

        // 2. Sidebar Logic (Remains similar, but optimized)
        const sidebarQuery = `
        (SELECT id, title, created_at FROM announcements 
         WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) AND id != ? AND status = 0
         ORDER BY created_at DESC)
        UNION
        (SELECT id, title, created_at FROM announcements 
         WHERE id != ? AND status = 0
         ORDER BY created_at DESC 
         LIMIT 3)
        ORDER BY created_at DESC
        LIMIT 5
    `;

        const [others]: any = await pool.execute(sidebarQuery, [id, id]);
        otherAnnouncements = others;
        console.log("DEBUG DATA:", currentAnnouncement);

    } catch (error) {
        console.error('Database Error:', error);
        notFound();
    }

    if (!currentAnnouncement) notFound();

    const formattedDate = new Date(currentAnnouncement.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4">
            {/* Updates the breadcrumb title in the layout without doubling the bar */}


            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Main Content */}
                <div className="lg:col-span-2">
                    <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100">
                            <BackButton />

                            <div className="flex gap-2 mb-4 mt-4">
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {currentAnnouncement.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                                {currentAnnouncement.title}
                            </h1>

                            <div className="mt-6 flex flex-col text-slate-500 text-sm border-t pt-6">
                                <span className="font-bold text-slate-900">{currentAnnouncement.role}</span>
                                <span>Published on {formattedDate}</span>
                            </div>
                        </div>

                        <div className="p-8 lg:p-12">
                            <div className="prose prose-slate max-w-none">
                                <p className="whitespace-pre-wrap leading-relaxed text-slate-700 text-lg">
                                    {currentAnnouncement.content}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>

                {/* RIGHT COLUMN: Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-8 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b">
                                Other Announcements
                            </h2>
                            <div className="space-y-6">
                                {otherAnnouncements.map((item: any) => (
                                    <Link
                                        key={item.id}
                                        href={`/announcement/${item.id}`}
                                        className="group block border-l-2 border-transparent hover:border-blue-600 pl-4 transition-all"
                                    >
                                        <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">
                                            {new Date(item.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>

                            <Link
                                href="/#announcements-section"
                                className="block text-center mt-8 pt-4 border-t text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
                            >
                                View All News
                            </Link>
                        </div>
                    </div>
                </aside>

            </div>
        </main>
    );
}