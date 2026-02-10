import { NextResponse } from 'next/server';
import { pool } from '@/src/lib/db';

export async function GET() {
    try {
        // Use a JOIN to pull the 'role' column from the 'users' table
        // We link 'announcements.author' to 'users.id'
        const query = `
            SELECT 
                a.id, 
                a.title, 
                a.category, 
                a.created_at, 
                a.status,
                u.role AS author_role
            FROM announcements a
            LEFT JOIN users u ON a.author_id = u.id
            ORDER BY a.created_at DESC
        `;

        const [rows] = await pool.execute(query);

        return NextResponse.json(rows);
    } catch (error: any) {
        console.error('ADMIN FETCH ERROR:', error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}