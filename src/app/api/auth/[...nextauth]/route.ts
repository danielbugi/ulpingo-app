// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-options';

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;

// Fix Next.js 14 type checking
export const runtime = 'nodejs';
