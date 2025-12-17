// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin API routes in middleware (most critical)
  if (pathname.startsWith('/api/admin')) {
    try {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
      });

      console.log('[Middleware] Token:', {
        exists: !!token,
        role: token?.role,
        email: token?.email,
        id: token?.id,
        cookies: request.cookies.getAll().map(c => c.name),
      });

      if (!token) {
        console.log('[Middleware] No token found - returning 401');
        return NextResponse.json(
          { error: 'Unauthorized - Please sign in' },
          { status: 401 }
        );
      }

      if (token.role !== 'admin') {
        console.log('[Middleware] User role is not admin:', token.role);
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        );
      }

      console.log('[Middleware] Admin access granted');
    } catch (error) {
      console.error('[Middleware] Error getting token:', error);
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 500 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*'],
};
