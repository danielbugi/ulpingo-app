// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For now, allow all routes - we'll protect them in the pages themselves
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/flashcards/:path*',
    '/quiz/:path*',
    '/review/:path*',
    '/achievements/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};
