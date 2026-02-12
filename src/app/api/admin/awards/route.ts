import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/lib/db";// Adjust this based on your DB connection path
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

// GET: Fetch all awards
export async function GET() {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM awards ORDER BY publish_date DESC"
        );
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Create new award
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const title = formData.get('title') as string;
        const awardee = formData.get('awardee') as string;
        const refId = formData.get('refId') as string;
        const date = formData.get('date') as string;
        const authorId = formData.get('author_id') as string;

        // 1. Timezone safe date (Noon)
        const safeDate = `${date} 12:00:00`;

        // 2. Slugify filename based on Project Title
        const slugified = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '_').slice(0, 50);
        const fileName = `${Date.now()}-${slugified}.pdf`;
        const publicUrl = `/documents/awards/${fileName}`;

        // 3. Save physical file
        const bytes = await file.arrayBuffer();
        const uploadDir = path.join(process.cwd(), 'public', 'documents', 'awards');
        await mkdir(uploadDir, { recursive: true }).catch(() => {});
        await writeFile(path.join(uploadDir, fileName), Buffer.from(bytes));

        // 4. Insert to Database
        await db.execute(
            "INSERT INTO awards (title, awardee, ref_id, publish_date, pdf_url, author_id, status) VALUES (?, ?, ?, ?, ?, ?, 0)",
            [title, awardee, refId, safeDate, publicUrl, authorId]
        );

        return NextResponse.json({ message: "Award published successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update or Archive
export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        const id = formData.get('id') as string;
        const status = formData.get('status') as string | null;

        // ARCHIVE TOGGLE ONLY
        if (status !== null && !formData.has('title')) {
            await db.execute("UPDATE awards SET status = ? WHERE id = ?", [status, id]);
            return NextResponse.json({ message: "Status updated" });
        }

        // FULL EDIT
        const title = formData.get('title') as string;
        const awardee = formData.get('awardee') as string;
        const refId = formData.get('refId') as string;
        const date = formData.get('date') as string;
        const newFile = formData.get('file') as File | null;

        const safeDate = `${date} 12:00:00`;

        // Get existing URL to handle file replacement
        const [rows]: any = await db.execute("SELECT pdf_url FROM awards WHERE id = ?", [id]);
        let finalUrl = rows[0].pdf_url;

        if (newFile && typeof newFile !== 'string' && newFile.size > 0) {
            // Delete old file
            const oldPath = path.join(process.cwd(), 'public', finalUrl.startsWith('/') ? finalUrl.substring(1) : finalUrl);
            await unlink(oldPath).catch(() => {});

            // Save new file with slugified title
            const slugified = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '_').slice(0, 50);
            const fileName = `${Date.now()}-${slugified}.pdf`;
            finalUrl = `/documents/awards/${fileName}`;

            const bytes = await newFile.arrayBuffer();
            await writeFile(path.join(process.cwd(), 'public', 'documents', 'awards', fileName), Buffer.from(bytes));
        }

        await db.execute(
            "UPDATE awards SET title = ?, awardee = ?, ref_id = ?, publish_date = ?, pdf_url = ? WHERE id = ?",
            [title, awardee, refId, safeDate, finalUrl, id]
        );

        return NextResponse.json({ message: "Award updated successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}