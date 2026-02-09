import Link from 'next/link';

interface AnnouncementProps {
    title: string;
    date: string;
    excerpt: string;
    href: string;
}

export default function AnnouncementCard({ title, date, excerpt, href }: AnnouncementProps) {
    return (
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
            <span className="text-sm text-muted-foreground">{date}</span>
            <h3 className="text-xl font-bold mt-2 mb-3 text-foreground">{title}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
            <Link href={href} className="text-primary font-medium hover:underline inline-flex items-center">
                Read More →
            </Link>
        </div>
    );
}