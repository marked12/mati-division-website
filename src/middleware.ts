import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userCookie = request.cookies.get('user')?.value;
    const { pathname } = request.nextUrl;

    // 1. GUEST-ONLY ROUTES (Login/Signup)
    // If they have a cookie, don't let them see these pages
    if (pathname === '/login' || pathname === '/signup') {
        if (userCookie) {
            try {
                const parsedUser = JSON.parse(decodeURIComponent(userCookie));

                // Redirect based on role
                if (parsedUser.role?.toUpperCase() === 'ADMIN') {
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
                }
                return NextResponse.redirect(new URL('/', request.url));
            } catch (e) {
                // If cookie is invalid, let them see the login page
                return NextResponse.next();
            }
        }
    }

    // 2. ADMIN-ONLY ROUTES
    if (pathname.startsWith('/admin')) {
        if (!userCookie) {
            return NextResponse.redirect(new URL('/login?error=no_session', request.url));
        }

        try {
            const parsedUser = JSON.parse(decodeURIComponent(userCookie));
            if (parsedUser.role?.toUpperCase() !== 'ADMIN') {
                return NextResponse.redirect(new URL('/?error=unauthorized', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/login?error=invalid_session', request.url));
        }
    }

    return NextResponse.next();
}

// Update matcher to include login and signup
export const config = {
    matcher: ['/admin/:path*', '/login', '/signup'],
};