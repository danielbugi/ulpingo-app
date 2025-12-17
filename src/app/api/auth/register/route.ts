// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from '@/lib/rate-limit';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  // Rate limiting for auth endpoints
  const identifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(identifier, RATE_LIMITS.AUTH);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many registration attempts. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.reset).toISOString(),
        },
      }
    );
  }
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, name, password_hash, provider, email_verified) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING id, email, name`,
      [email, name || email.split('@')[0], hashedPassword, 'email']
    );

    const newUser = result.rows[0];

    // Create initial user stats
    await pool.query('INSERT INTO user_stats (user_id) VALUES ($1)', [
      newUser.id,
    ]);

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
