// scripts/fix-missing-column.js
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('neon.tech') 
      ? { rejectUnauthorized: false }
      : undefined
  });

  try {
    console.log('🔧 Adding missing last_study_date column...');
    await pool.query('ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS last_study_date DATE');
    console.log('✅ Column added successfully!\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

fix();
