#!/bin/bash
# Database initialization script for production
# This script checks if the database is initialized and runs schema/seed if needed

set -e

echo "🔍 Checking database connection..."

# Wait for PostgreSQL to be ready
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  echo "⏳ Waiting for PostgreSQL to be ready..."
  sleep 2
done

echo "✅ PostgreSQL is ready!"

# Check if tables exist
TABLE_COUNT=$(PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('users', 'categories', 'words', 'user_progress');")

if [ "$TABLE_COUNT" -eq "4" ]; then
  echo "✅ Database already initialized. Skipping schema creation."
else
  echo "📊 Initializing database schema..."
  PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f /app/database/schema.sql
  echo "✅ Schema created successfully!"
  
  # Check if we should seed data
  WORD_COUNT=$(PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM words;")
  
  if [ "$WORD_COUNT" -eq "0" ]; then
    echo "🌱 Seeding initial data..."
    cd /app && node scripts/setup-db.js
    echo "✅ Data seeded successfully!"
  fi
fi

echo "🎉 Database initialization complete!"
