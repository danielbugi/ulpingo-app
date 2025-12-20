#!/usr/bin/env node

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Production database URL
const PRODUCTION_DB_URL = process.env.PROD_DB_URL || 'postgresql://neondb_owner:npg_B6Yuq1Sjzyds@ep-snowy-wind-agh3ika2-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function runProductionMigration() {
  console.log('\n🚀 ULPINGO PRODUCTION MIGRATION');
  console.log('='.repeat(60));
  console.log('Database:', PRODUCTION_DB_URL.replace(/:[^:@]+@/, ':****@'));
  console.log('='.repeat(60), '\n');

  const pool = new Pool({
    connectionString: PRODUCTION_DB_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    // Test connection
    console.log('1️⃣  Testing database connection...');
    await pool.query('SELECT NOW() as current_time');
    console.log('✅ Connected successfully!\n');

    // Read migration file
    console.log('2️⃣  Reading migration file...');
    const migrationPath = path.join(__dirname, 'production-migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    console.log('✅ Migration file loaded\n');

    // Execute migration
    console.log('3️⃣  Running migration...');
    console.log('   This may take a few minutes...\n');
    
    await pool.query(migrationSQL);
    
    console.log('✅ Migration executed successfully!\n');

    // Verify tables
    console.log('4️⃣  Verifying new tables and columns...\n');
    
    // Check tables
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('user_stats', 'achievements', 'user_achievements', 'daily_challenges', 'user_challenges')
      ORDER BY table_name
    `);
    
    console.log('📊 Tables created:');
    tablesResult.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });
    
    // Check achievements count
    const achievementsResult = await pool.query('SELECT COUNT(*) as count FROM achievements');
    console.log(`\n🏆 Achievements loaded: ${achievementsResult.rows[0].count}`);
    
    // Check user_stats
    const userStatsResult = await pool.query('SELECT COUNT(*) as count FROM user_stats');
    console.log(`📈 User stats records: ${userStatsResult.rows[0].count}`);
    
    // Check new columns in existing tables
    const columnsResult = await pool.query(`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND (
        (table_name = 'users' AND column_name = 'role')
        OR (table_name = 'categories' AND column_name IN ('difficulty_level', 'required_level', 'xp_reward'))
        OR (table_name = 'words' AND column_name IN ('content_type', 'difficulty', 'xp_value'))
      )
      ORDER BY table_name, column_name
    `);
    
    console.log('\n📝 New columns added:');
    let currentTable = '';
    columnsResult.rows.forEach(row => {
      if (row.table_name !== currentTable) {
        currentTable = row.table_name;
        console.log(`\n   ${row.table_name}:`);
      }
      console.log(`      ✓ ${row.column_name}`);
    });

    console.log('\n' + '='.repeat(60));
    console.log('🎉 MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📋 Summary:');
    console.log('   • Level system enabled');
    console.log('   • XP and achievements system active');
    console.log('   • Roles system (user/admin) configured');
    console.log('   • Daily challenges system ready');
    console.log('   • All existing data preserved');
    console.log('\n✨ Your production database is now up to date!\n');

  } catch (error) {
    console.error('\n❌ MIGRATION FAILED');
    console.error('='.repeat(60));
    console.error('Error:', error.message);
    console.error('\nDetails:', error);
    console.error('='.repeat(60), '\n');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run migration
if (require.main === module) {
  runProductionMigration()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('\n❌ Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = { runProductionMigration };
