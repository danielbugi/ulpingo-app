#!/usr/bin/env node

// scripts/migrate-to-production.js
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const PRODUCTION_DB_URL = process.env.PRODUCTION_DATABASE_URL || process.argv[2];

if (!PRODUCTION_DB_URL) {
  console.error('\n❌ Error: Production DATABASE_URL required\n');
  console.log('Usage:');
  console.log('  node scripts/migrate-to-production.js <DATABASE_URL>');
  console.log('Or set PRODUCTION_DATABASE_URL in .env.local\n');
  process.exit(1);
}

async function runMigration() {
  console.log('\n🚀 ULPINGO PRODUCTION MIGRATION');
  console.log('='.repeat(60));
  console.log('Database:', PRODUCTION_DB_URL.replace(/:[^:@]+@/, ':****@'));
  console.log('='.repeat(60), '\n');

  const pool = new Pool({
    connectionString: PRODUCTION_DB_URL,
    ssl: PRODUCTION_DB_URL.includes('neon.tech') 
      ? { rejectUnauthorized: false }
      : undefined
  });

  try {
    // Test connection
    console.log('1️⃣  Testing database connection...');
    await pool.query('SELECT NOW()');
    console.log('✅ Connected successfully!\n');

    // Read migration file
    console.log('2️⃣  Reading migration file...');
    const migrationPath = path.join(__dirname, '..', 'database', 'production-migration.sql');
    
    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration file not found: ${migrationPath}`);
    }
    
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    console.log('✅ Migration file loaded\n');

    // Execute migration
    console.log('3️⃣  Running migration...');
    console.log('   This may take a few minutes...\n');
    
    await pool.query(migrationSQL);
    console.log('✅ Migration executed successfully!\n');

    // Verify
    console.log('4️⃣  Verifying migration...\n');
    
    const achievementsResult = await pool.query('SELECT COUNT(*) as count FROM achievements');
    console.log(`🏆 Achievements loaded: ${achievementsResult.rows[0].count}`);
    
    const userStatsResult = await pool.query('SELECT COUNT(*) as count FROM user_stats');
    console.log(`📈 User stats records: ${userStatsResult.rows[0].count}`);

    console.log('\n' + '='.repeat(60));
    console.log('🎉 MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\nYour production database is now up to date!\n');

  } catch (error) {
    console.error('\n❌ MIGRATION FAILED');
    console.error('Error:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
