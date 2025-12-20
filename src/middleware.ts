// // src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Only protect admin API routes in middleware (most critical)
//   if (pathname.startsWith('/api/admin')) {
//     try {
//       const token = await getToken({
//         req: request,
//         secret: process.env.NEXTAUTH_SECRET,
//         secureCookie: process.env.NODE_ENV === 'production',
//       });

//       console.log('[Middleware] Token:', {
//         exists: !!token,
//         role: token?.role,
//         email: token?.email,
//         id: token?.id,
//         cookies: request.cookies.getAll().map((c) => c.name),
//       });

//       if (!token) {
//         console.log('[Middleware] No token found - returning 401');
//         return NextResponse.json(
//           { error: 'Unauthorized - Please sign in' },
//           { status: 401 }
//         );
//       }

//       if (token.role !== 'admin') {
//         console.log('[Middleware] User role is not admin:', token.role);
//         return NextResponse.json(
//           { error: 'Forbidden - Admin access required' },
//           { status: 403 }
//         );
//       }

//       console.log('[Middleware] Admin access granted');
//     } catch (error) {
//       console.error('[Middleware] Error getting token:', error);
//       return NextResponse.json(
//         { error: 'Authentication error' },
//         { status: 500 }
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/api/admin/:path*'],
// };

// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Routes that don't require authentication
const publicRoutes = ['/', '/auth/signin', '/auth/signup', '/auth/error'];
const publicPrefixes = [
  '/api/auth',
  '/_next',
  '/favicon',
  '/images',
  '/api/health',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public prefixes
  if (publicPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow static files
  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if it's a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    });

    // Protect admin API routes
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
    }

    // Protect all other non-public routes
    if (!isPublicRoute && !token) {
      // For API routes, return 401
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized - Please sign in' },
          { status: 401 }
        );
      }
      // For pages, redirect to home (which shows landing)
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If user is authenticated and on auth pages, redirect to app
    if (
      token &&
      (pathname.startsWith('/auth/signin') ||
        pathname.startsWith('/auth/signup'))
    ) {
      return NextResponse.redirect(new URL('/app', request.url));
    }
  } catch (error) {
    console.error('[Middleware] Error:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
