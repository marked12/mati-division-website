import Link from 'next/link';

interface AnnouncementProps {
    id: number;      // Changed from href to id
    title: string;
    created_at: string; // Changed from date to match DB column
    excerpt: string;
}

export default function AnnouncementCard({ id, title, created_at, excerpt }: AnnouncementProps) {
    // Format the date (e.g., "Jan 15, 2026")
    const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-all flex flex-col h-full">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
                {formattedDate}
            </span>

            <h3 className="text-xl font-serif font-bold mt-2 mb-3 text-primary line-clamp-2">
                {title}
            </h3>

            <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                {excerpt}
            </p>

            {/* The Link now points to your dynamic [id] folder */}
            <Link
                href={`/announcement/${id}`}
                className="text-primary text-xs font-bold uppercase tracking-widest hover:text-accent inline-flex items-center gap-2 transition-colors"
            >
                Read More
                <span className="text-lg leading-none">→</span>
            </Link>
        </div>
    );
}