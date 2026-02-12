import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
// Use your established db instance directly
import { db } from "@/src/lib/db";

// GET: Fetch all bids with Author names
export async function GET() {
    try {
        // Direct call to the pool/connection instance
        const [rows] = await db.execute(`
            SELECT b.*, u.role as authorName
            FROM bids b
                     LEFT JOIN users u ON b.author_id = u.id
            ORDER BY b.created_at DESC
        `);
        return NextResponse.json(rows);
    } catch (error: any) {
        console.error("GET ERROR:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Create a new bid
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const title = formData.get('title') as string;
        const date = formData.get('date') as string;
        const category = formData.get('category') as string;
        const authorId = formData.get('author_id') as string;

        if (!file || !title || !authorId) {
            return NextResponse.json({ error: "Missing required information" }, { status: 400 });
        }

        // 1. TIMEZONE FIX: Append Noon to prevent date rolling back a day
        const safeDate = date ? `${date} 12:00:00` : null;

        // 2. FILE NAMING: Slugify the title for the filename
        const slugifiedTitle = title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, '_')        // Replace spaces with underscores
            .slice(0, 60);               // Limit length

        const fileExtension = path.extname(file.name) || '.pdf';
        const uniqueFilename = `${Date.now()}-${slugifiedTitle}${fileExtension}`;
        const publicUrl = `/documents/bids/${uniqueFilename}`;

        // 3. FILE PROCESSING
        const bytes = await file.arrayBuffer();
        const uploadDir = path.join(process.cwd(), 'public', 'documents', 'bids');
        await mkdir(uploadDir, { recursive: true }).catch(() => {});

        await writeFile(path.join(uploadDir, uniqueFilename), Buffer.from(bytes));

        // 4. DATABASE INSERT
        await db.execute(
            `INSERT INTO bids (title, publish_date, category, pdf_url, author_id, status) VALUES (?, ?, ?, ?, ?, 0)`,
            [title, safeDate, category, publicUrl, authorId]
        );

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error: any) {
        console.error("POST ERROR:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update content OR Archive (status toggle)
export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        const id = formData.get('id') as string;
        const status = formData.get('status') as string | null;

        // 1. ARCHIVE TOGGLE
        if (status !== null && !formData.has('title')) {
            await db.execute('UPDATE bids SET status = ? WHERE id = ?', [status, id]);
            return NextResponse.json({ message: "Status updated" });
        }

        // 2. FULL EDIT
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const date = formData.get('date') as string;
        const newFile = formData.get('file') as File | null;

        // --- TIMEZONE FIX: Append Noon to prevent date shifting backward ---
        const safeDate = date ? `${date} 12:00:00` : null;

        // Fetch old file path to delete if a new one is uploaded
        const [rows]: any = await db.execute('SELECT pdf_url FROM bids WHERE id = ?', [id]);
        let finalPdfUrl = rows[0]?.pdf_url;

        // Check if newFile exists and is valid
        if (newFile && typeof newFile !== 'string' && newFile.size > 0) {
            // Delete old physical file if it exists
            if (finalPdfUrl) {
                const oldFilePath = path.join(process.cwd(), 'public', finalPdfUrl);
                await unlink(oldFilePath).catch(() => console.log("Old file not found, skipping unlink"));
            }

            // --- FILE NAMING: Slugify the title for the new filename ---
            const slugifiedTitle = title
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '') // Remove special characters
                .replace(/\s+/g, '_')        // Replace spaces with underscores
                .slice(0, 60);               // Limit length

            const fileExtension = path.extname(newFile.name) || '.pdf';
            const uniqueFilename = `${Date.now()}-${slugifiedTitle}${fileExtension}`;
            finalPdfUrl = `/documents/bids/${uniqueFilename}`;

            // Save new file
            const bytes = await newFile.arrayBuffer();
            const uploadDir = path.join(process.cwd(), 'public', 'documents', 'bids');
            await mkdir(uploadDir, { recursive: true }).catch(() => {});

            await writeFile(path.join(process.cwd(), 'public', finalPdfUrl), Buffer.from(bytes));
        }

        // Update the database record
        await db.execute(
            'UPDATE bids SET title = ?, category = ?, publish_date = ?, pdf_url = ? WHERE id = ?',
            [title, category, safeDate, finalPdfUrl, id]
        );

        return NextResponse.json({ message: "Updated successfully" });
    } catch (error: any) {
        console.error("PUT ERROR:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}