import { NextResponse } from 'next/server';
import { pool } from '@/src/lib/db';

export async function GET() {
    try {
        const query = `
        (SELECT id, title, excerpt, category, created_at 
         FROM announcements 
         WHERE status = 0 
           AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         ORDER BY created_at DESC)
        UNION
        (SELECT id, title, excerpt, category, created_at 
         FROM announcements 
         WHERE status = 0 
         ORDER BY created_at DESC 
         LIMIT 3)
        ORDER BY created_at DESC
    `;

        const [rows] = await pool.execute(query);

        return NextResponse.json(rows);
    } catch (error: any) {
        console.error('CRITICAL DB ERROR:', error.code, error.message);
        return NextResponse.json(
            { error: error.message, code: error.code },
            { status: 500 }
        );
    }
}