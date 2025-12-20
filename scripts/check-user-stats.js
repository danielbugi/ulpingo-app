// Check user_stats table structure
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function checkUserStats() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('📊 Checking user_stats table...\n');

    const columns = await pool.query(`
      SELECT column_name, data_type, column_default
      FROM information_schema.columns 
      WHERE table_name = 'user_stats'
      ORDER BY ordinal_position
    `);

    console.log('Columns in user_stats:');
    columns.rows.forEach((row) => {
      console.log(
        `   - ${row.column_name}: ${row.data_type} (default: ${
          row.column_default || 'none'
        })`
      );
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkUserStats();
