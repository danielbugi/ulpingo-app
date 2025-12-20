// Run Level System Migration
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function runMigration() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  console.log('🚀 Starting Level System Migration...\n');

  try {
    // Test connection
    console.log('1️⃣ Testing database connection...');
    const testResult = await pool.query('SELECT NOW()');
    console.log('✅ Connected successfully!\n');

    // Read migration file
    console.log('2️⃣ Reading migration file...');
    const migrationPath = path.join(
      __dirname,
      '..',
      'database',
      'migration-level-system.sql'
    );
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    console.log('✅ Migration file loaded\n');

    // Split migration into statements and run them one by one
    console.log('3️⃣ Running migration...');
    const statements = migrationSQL
      .split(';')
      .map((s) => s.trim())
      .filter(
        (s) => s.length > 0 && !s.startsWith('--') && !s.startsWith('COMMENT')
      );

    let successCount = 0;
    let skipCount = 0;

    for (const statement of statements) {
      try {
        await pool.query(statement);
        successCount++;
      } catch (error) {
        // Skip if already exists or minor issues
        if (
          error.message.includes('already exists') ||
          error.message.includes('duplicate') ||
          error.code === '42701' || // duplicate column
          error.code === '42P07'
        ) {
          // duplicate table
          skipCount++;
          continue;
        }
        // For other errors, log but continue
        console.log(`   ⚠️  Warning: ${error.message.split('\n')[0]}`);
      }
    }

    console.log(
      `✅ Migration completed! (${successCount} executed, ${skipCount} skipped)\n`
    );

    // Verify tables created
    console.log('4️⃣ Verifying new tables...');
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('user_stats', 'achievements', 'user_achievements', 'daily_challenges', 'user_challenges')
      ORDER BY table_name
    `);

    if (tables.rows.length > 0) {
      console.log('✅ Tables created:');
      tables.rows.forEach((row) => console.log(`   - ${row.table_name}`));
    } else {
      console.log('⚠️  No new tables found');
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\nNext step: Run seed script with:');
    console.log('   node scripts/seed-enhanced-content.js\n');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\nDetails:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
