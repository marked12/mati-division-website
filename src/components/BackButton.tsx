'use client'; // This allows us to use the router

import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="text-primary text-sm font-bold flex items-center gap-2 mb-6 hover:text-accent transition-colors"
        >
            ← BACK
        </button>
    );
}