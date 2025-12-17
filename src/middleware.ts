// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect authenticated users away from auth pages
  if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Check if accessing admin routes (pages or API)
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // For API routes, return 401/403 instead of redirect
    if (pathname.startsWith('/api/admin')) {
      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized - Please sign in' },
          { status: 401 }
        );
      }

      if (token.role !== 'admin') {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        );
      }
    } else {
      // For admin pages, redirect
      if (!token) {
        const url = new URL('/auth/signin', request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
      }

      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  // For now, allow all other routes - we'll protect them in the pages themselves
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/auth/:path*',
    '/flashcards/:path*',
    '/quiz/:path*',
    '/review/:path*',
    '/achievements/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};
