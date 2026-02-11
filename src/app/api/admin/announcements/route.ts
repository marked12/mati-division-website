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
                a.excerpt,
                a.content,
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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, excerpt, content, author_id, category } = body;

        // Status 0 = Active by default
        const [result] = await pool.execute(
            `INSERT INTO announcements (title, excerpt, content, author_id, category, status, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW())`,
            [title, excerpt, content, author_id, category]
        );

        return NextResponse.json({ message: 'Created successfully', id: (result as any).insertId });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, status, title, excerpt, content, category } = body;

        // If 'status' is provided alone, it's an Archive toggle
        if (status !== undefined) {
            await pool.execute(
                'UPDATE announcements SET status = ?, updated_at = NOW() WHERE id = ?',
                [status, id]
            );
            return NextResponse.json({ message: 'Status updated' });
        }

        // Otherwise, it's a full content edit
        await pool.execute(
            `UPDATE announcements 
             SET title = ?, excerpt = ?, content = ?, category = ?, updated_at = NOW() 
             WHERE id = ?`,
            [title, excerpt, content, category, id]
        );

        return NextResponse.json({ message: 'Announcement updated' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}