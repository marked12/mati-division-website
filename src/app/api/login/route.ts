import { db } from "@/src/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // 1. Validation
        if (!email || !password) {
            return NextResponse.json({ message: "Please provide email and password" }, { status: 400 });
        }

        // 2. Find user in Database
        // Ensure the query selects the status column
        const [users]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const user = users[0];

        // 3. Status Check (New: Block Disabled Accounts)
        // Check if status is 1 (Inactive)
        if (Number(user.status) === 1) {
            return NextResponse.json({
                message: "This account has been disabled. Please contact the administrator."
            }, { status: 403 });
        }

        // 4. Compare Hashed Password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // 5. Role Check
        if (user.role === 'PENDING') {
            return NextResponse.json({ message: "Account pending admin approval." }, { status: 403 });
        }

        // Success!
        return NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
                status: user.status // Passing status to frontend for local checks
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}