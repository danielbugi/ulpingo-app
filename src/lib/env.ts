/**
 * Environment variables validation
 * Validates required env vars at startup to fail fast
 */

const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
] as const;

const optionalEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NODE_ENV',
] as const;

export interface EnvConfig {
  DATABASE_URL: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

function validateEnv(): EnvConfig {
  const missingVars: string[] = [];

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.join(
        '\n'
      )}\n\nPlease check your .env file.`
    );
  }

  // Validate DATABASE_URL format
  const dbUrl = process.env.DATABASE_URL!;
  if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
    throw new Error(
      'DATABASE_URL must be a valid PostgreSQL connection string'
    );
  }

  // Validate NEXTAUTH_SECRET length
  const secret = process.env.NEXTAUTH_SECRET!;
  if (secret.length < 32) {
    console.warn(
      '⚠️  Warning: NEXTAUTH_SECRET should be at least 32 characters long for security'
    );
  }

  // Warn about missing OAuth credentials
  const hasGoogleId = !!process.env.GOOGLE_CLIENT_ID;
  const hasGoogleSecret = !!process.env.GOOGLE_CLIENT_SECRET;

  if (hasGoogleId !== hasGoogleSecret) {
    console.warn(
      '⚠️  Warning: Google OAuth is partially configured. Both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required.'
    );
  }

  return {
    DATABASE_URL: dbUrl,
    NEXTAUTH_SECRET: secret,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NODE_ENV: (process.env.NODE_ENV || 'development') as any,
  };
}

// Validate on module load (server-side only)
let config: EnvConfig | null = null;

if (typeof window === 'undefined') {
  try {
    config = validateEnv();
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

export function getEnvConfig(): EnvConfig {
  if (!config) {
    config = validateEnv();
  }
  return config;
}

export default config;
