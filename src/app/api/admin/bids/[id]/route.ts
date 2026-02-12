import { unlink, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Standardize DB config
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const connection = await mysql.createConnection(dbConfig);

    // In Next.js 14/15, params must be awaited
    const { id: bidId } = await params;

    try {
        const formData = await req.formData();
        const newFile = formData.get('file') as File | null;
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const date = formData.get('date') as string;

        // 1. Fetch the OLD file path to delete it later
        const [rows]: any = await connection.execute('SELECT pdf_url FROM bids WHERE id = ?', [bidId]);

        if (rows.length === 0) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        const oldPath = rows[0]?.pdf_url;
        let finalPdfUrl = oldPath;

        // 2. If a new file is uploaded, swap them
        if (newFile && typeof newFile !== 'string') {
            // Delete the old physical file
            if (oldPath) {
                const fullOldPath = path.join(process.cwd(), 'public', oldPath);
                await unlink(fullOldPath).catch(() => console.log("Old file not found, skipping delete"));
            }

            // Process New File
            const bytes = await newFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadDir = path.join(process.cwd(), 'public', 'documents', 'bids');

            // Ensure directory exists
            await mkdir(uploadDir, { recursive: true }).catch(() => {});

            const safeFileName = newFile.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
            const uniqueFilename = `${Date.now()}-${safeFileName}`;
            const filePath = path.join(uploadDir, uniqueFilename);

            await writeFile(filePath, buffer);
            finalPdfUrl = `/documents/bids/${uniqueFilename}`;
        }

        // 3. Update Database
        await connection.execute(
            'UPDATE bids SET title = ?, category = ?, publish_date = ?, pdf_url = ? WHERE id = ?',
            [title, category, date, finalPdfUrl, bidId]
        );

        return NextResponse.json({ success: true, message: "Record updated successfully" });

    } catch (error: any) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await connection.end();
    }
}