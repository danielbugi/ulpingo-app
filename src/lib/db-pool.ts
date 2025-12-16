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
      // Check if it's a local database (localhost or 127.0.0.1)
      const isLocalDb =
        databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');

      if (isLocalDb) {
        // Local databases typically don't support SSL
        sslConfig = false;
      } else {
        // Check if the connection string explicitly requires SSL (cloud databases)
        const requiresSsl =
          databaseUrl.includes('sslmode=require') ||
          databaseUrl.includes('neon.tech') ||
          databaseUrl.includes('railway.app') ||
          databaseUrl.includes('supabase.co');

        if (requiresSsl || process.env.NODE_ENV === 'production') {
          sslConfig = { rejectUnauthorized: false };
        }
      }
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
