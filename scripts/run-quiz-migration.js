require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runQuizAttemptsMigration() {
  console.log('🚀 Starting Quiz Attempts Migration...\n');

  const client = await pool.connect();

  try {
    // Read migration file
    const migrationPath = path.join(
      __dirname,
      '..',
      'database',
      'migration-quiz-attempts.sql'
    );
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('1️⃣ Creating quiz_attempts table...');
    await client.query(migrationSQL);
    console.log('✅ Quiz attempts table created successfully!\n');

    // Verify table
    const verifyResult = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'quiz_attempts'
      ORDER BY ordinal_position;
    `);

    console.log('📊 Table structure:');
    verifyResult.rows.forEach((col) => {
      console.log(
        `   - ${col.column_name}: ${col.data_type} ${
          col.is_nullable === 'NO' ? '(NOT NULL)' : ''
        }`
      );
    });

    console.log('\n✨ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runQuizAttemptsMigration();
