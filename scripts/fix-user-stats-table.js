// scripts/fix-user-stats-table.js
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('neon.tech') ? { rejectUnauthorized: false } : false,
});

const createTableSQL = `
CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER DEFAULT 1,
  current_xp INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  words_learned INTEGER DEFAULT 0,
  verbs_learned INTEGER DEFAULT 0,
  expressions_learned INTEGER DEFAULT 0,
  sentences_learned INTEGER DEFAULT 0,
  perfect_quizzes INTEGER DEFAULT 0,
  study_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_study_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const addLevelColumnSQL = `
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;
`;

async function fixUserStatsTable() {
  try {
    console.log('Ensuring user_stats table exists...');
    await pool.query(createTableSQL);
    console.log('Ensuring level column exists in user_stats...');
    await pool.query(addLevelColumnSQL);
    console.log('✅ user_stats table and level column are now ensured.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

fixUserStatsTable();
