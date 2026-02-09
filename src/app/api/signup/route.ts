import { db } from "@/src/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, password } = await request.json();

        // 1. Server-side Validation
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // 2. Security: Hash the password (10 salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Database Execution
        // We explicitly omit 'role' so it falls back to 'PENDING' in MySQL
        const [result] = await db.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
            [firstName, lastName, email, hashedPassword]
        );

        return NextResponse.json({
            message: "Registration successful. Please wait for Admin approval."
        }, { status: 201 });

    } catch (error: any) {
        // Handle Duplicate Email
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json({ message: "This email is already registered." }, { status: 409 });
        }

        console.error("Database Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}