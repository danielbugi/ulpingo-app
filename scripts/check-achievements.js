require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkAchievements() {
  console.log('🔍 Checking achievements table structure...\n');

  try {
    // Get column information
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'achievements'
      ORDER BY ordinal_position;
    `);

    console.log('📊 Current columns:');
    result.rows.forEach((row) => {
      console.log(
        `  - ${row.column_name}: ${row.data_type} ${
          row.is_nullable === 'NO' ? '(NOT NULL)' : '(nullable)'
        }`
      );
    });

    // Get sample data
    const dataResult = await pool.query('SELECT * FROM achievements LIMIT 5');
    console.log(`\n📦 Sample data (${dataResult.rows.length} rows):`);
    console.log(JSON.stringify(dataResult.rows, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkAchievements();
