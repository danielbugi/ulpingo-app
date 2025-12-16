import { Pool } from 'pg';

let pool: Pool | null = null;

/**
 * Get database connection pool with proper SSL configuration
 */
export function getPool(): Pool {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;

    // Determine SSL configuration based on environment and connection string
    let sslConfig: boolean | { rejectUnauthorized: boolean } = false;

    if (databaseUrl) {
      // Check if the connection string explicitly requires SSL
      const requiresSsl =
        databaseUrl.includes('sslmode=require') ||
        databaseUrl.includes('neon.tech') ||
        databaseUrl.includes('railway.app') ||
        databaseUrl.includes('supabase.co');

      if (requiresSsl) {
        sslConfig = { rejectUnauthorized: false };
      } else if (process.env.NODE_ENV === 'production') {
        // In production, try SSL but allow non-SSL connections
        sslConfig = { rejectUnauthorized: false };
      }
      // For local development, SSL is disabled by default
    }

    pool = new Pool({
      connectionString: databaseUrl,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: sslConfig,
    });

    // Handle pool errors gracefully
    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
      // Don't exit process, just log the error
    });

    // Log connection info in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '📦 Database pool created with SSL:',
        sslConfig !== false ? 'enabled' : 'disabled'
      );
    }
  }
  return pool;
}
