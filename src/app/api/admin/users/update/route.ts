import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

export async function POST(req: Request) {
    try {
        // Destructure both newRole and newStatus from the request body
        const { id, newRole, newStatus } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        /**
         * We use IFNULL(?, role) so that if the first parameter is null,
         * it just sets the column to its current value (no change).
         */
        await connection.execute(
            `UPDATE users SET 
                role = IFNULL(?, role), 
                status = IFNULL(?, status) 
             WHERE id = ?`,
            [
                newRole !== undefined ? newRole : null,
                newStatus !== undefined ? newStatus : null,
                id
            ]
        );

        await connection.end();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Database Update Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}