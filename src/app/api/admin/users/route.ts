// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

export async function GET() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // CRITICAL: Ensure 'status' is in the SELECT list
        const [rows] = await connection.execute(
            'SELECT id, first_name, last_name, email, role, status FROM users ORDER BY id DESC'
        );

        await connection.end();
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}