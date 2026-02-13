import { NextResponse } from 'next/server';
import { db } from '@/src/lib/db'; // Adjust path based on your setup

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Extract data from the request body
        const {
            employee_id,
            last_name,
            first_name,
            middle_name,
            suffix,
            email,
            contact_number,
            position_title,
            personnel_category,
            sdo_division,
            specific_unit
        } = body;

        // 2. Simple Validation
        if (!employee_id || !last_name || !first_name || !position_title) {
            return NextResponse.json(
                { message: "Missing required fields (ID, Name, or Position)" },
                { status: 400 }
            );
        }

        // 3. Execute MySQL Insert
        // Note: employment_status and work_status will use DB defaults ('Permanent', 'Active')
        const [result] = await db.execute(
            `INSERT INTO personnel (
                employee_id, 
                last_name, 
                first_name, 
                middle_name, 
                suffix, 
                email, 
                contact_number, 
                position_title, 
                personnel_category, 
                sdo_division, 
                specific_unit
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                employee_id,
                last_name,
                first_name,
                middle_name || null,
                suffix || null,
                email || null,
                contact_number || null,
                position_title,
                personnel_category,
                sdo_division,
                specific_unit
            ]
        );

        // 4. Return the newly created object to update the frontend state
        const insertId = (result as any).insertId;

        const newRecord = {
            id: insertId,
            ...body,
            employment_status: 'Permanent', // Match DB defaults
            work_status: 'Active',
            created_at: new Date().toISOString()
        };

        return NextResponse.json(newRecord, { status: 201 });

    } catch (error: any) {
        console.error("Database Error:", error);

        // Handle Duplicate Entry Error (MySQL Error 1062)
        if (error.code === 'ER_DUP_ENTRY') {
            return NextResponse.json(
                { message: "Employee ID or Email already exists in the records." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
// Add GET to your existing route.ts
export async function GET() {
    try {
        // Fetch all personnel, newest first
        const [rows] = await db.execute(
            'SELECT * FROM personnel ORDER BY created_at DESC'
        );

        return NextResponse.json(rows);
    } catch (error: any) {
        console.error("Database Fetch Error:", error);
        return NextResponse.json(
            { message: "Failed to fetch personnel list" },
            { status: 500 }
        );
    }
}