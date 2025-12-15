#!/bin/sh
# Docker entrypoint script for the application container
# Handles database initialization before starting the app

set -e

echo "🚀 Starting Ulpingo application..."

# Check if database initialization is needed
if [ "$RUN_DB_INIT" = "true" ]; then
  echo "📊 Running database initialization..."
  
  # Wait for PostgreSQL to be ready
  echo "⏳ Waiting for database to be ready..."
  until node -e "
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    pool.query('SELECT 1')
      .then(() => { console.log('Database ready!'); process.exit(0); })
      .catch(() => process.exit(1));
  " 2>/dev/null; do
    echo "⏳ Database not ready yet, waiting..."
    sleep 2
  done
  
  # Run database setup
  echo "📊 Initializing database..."
  node /app/scripts/setup-db.js || echo "⚠️ Database setup encountered an issue (might already be initialized)"
fi

echo "✅ Starting Next.js server..."
exec node server.js
