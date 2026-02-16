import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mysql from 'mysql2/promise';
import { cookies } from "next/headers";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            try {
                const connection = await mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                });

                const [rows]: any = await connection.execute(
                    'SELECT * FROM users WHERE email = ?',
                    [user.email]
                );

                let dbUser;

                if (rows.length === 0) {
                    // NEW USER: Create account as PENDING with status 0 (active by default but role blocks)
                    const firstName = user.name?.split(" ")[0] || "User";
                    const lastName = user.name?.split(" ").slice(1).join(" ") || "Google";

                    await connection.execute(
                        'INSERT INTO users (first_name, last_name, email, role, status, googleId) VALUES (?, ?, ?, ?, ?, ?)',
                        [firstName, lastName, user.email, 'PENDING', 0, user.id]
                    );

                    await connection.end();
                    return `/login?status=pending`;
                }

                dbUser = rows[0];
                await connection.end();

                // 1. STATUS CHECK: Block if account is disabled (status 1)
                if (Number(dbUser.status) === 1) {
                    return `/login?error=AccountDisabled`;
                }

                // 2. ROLE CHECK: Check if still PENDING
                if (dbUser.role === 'PENDING') {
                    return `/login?status=pending`;
                }

                // SUCCESS: Set the session cookie for approved/active users
                const sessionData = {
                    id: dbUser.id,
                    firstName: dbUser.first_name,
                    lastName: dbUser.last_name,
                    email: dbUser.email,
                    role: dbUser.role,
                    status: dbUser.status // Added status here
                };

                const cookieStore = await cookies();
                cookieStore.set('user', JSON.stringify(sessionData), {
                    expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
                    path: '/',
                });

                return true;
            } catch (error) {
                console.error("Auth Error:", error);
                return `/login?error=DatabaseError`;
            }
        },

        async redirect({ url, baseUrl }) {
            // This ensures that after login, the user is sent to /admin/dashboard
            // unless they were specifically trying to go somewhere else.
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;

            return `${baseUrl}/admin/dashboard`;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };