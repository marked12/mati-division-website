import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface QuickLinkProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
}

export default function QuickLinkCard({ title, description, href, icon: Icon }: QuickLinkProps) {
    return (
        <Link href={href} className="group block p-6 bg-white border border-border rounded-lg hover:bg-secondary transition-colors">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </Link>
    );
}