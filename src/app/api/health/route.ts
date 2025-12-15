// Health check endpoint for monitoring and container health checks
import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db-pool';

export async function GET() {
  try {
    // Check database connection
    const pool = getPool();
    await pool.query('SELECT 1');

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
