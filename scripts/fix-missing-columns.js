// Fix missing columns
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function fixColumns() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔧 Fixing missing columns...\n');

    // Add difficulty_level to categories
    console.log('Adding difficulty_level to categories...');
    await pool.query(`
      ALTER TABLE categories 
      ADD COLUMN IF NOT EXISTS difficulty_level INTEGER DEFAULT 1
    `);
    console.log('✅ Added difficulty_level\n');

    // Add content_type to words
    console.log('Adding content_type to words...');
    await pool.query(`
      ALTER TABLE words 
      ADD COLUMN IF NOT EXISTS content_type VARCHAR(20) DEFAULT 'word' 
      CHECK (content_type IN ('word', 'verb', 'expression', 'sentence', 'phrase'))
    `);
    console.log('✅ Added content_type\n');

    // Create daily_challenges table
    console.log('Creating daily_challenges table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS daily_challenges (
        id SERIAL PRIMARY KEY,
        date DATE UNIQUE NOT NULL,
        challenge_type VARCHAR(30) NOT NULL,
        target_value INTEGER NOT NULL,
        xp_reward INTEGER DEFAULT 50,
        category_id INTEGER REFERENCES categories(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created daily_challenges\n');

    // Create user_challenges table
    console.log('Creating user_challenges table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_challenges (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        challenge_id INTEGER REFERENCES daily_challenges(id) ON DELETE CASCADE,
        progress INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP,
        UNIQUE(user_id, challenge_id)
      )
    `);
    console.log('✅ Created user_challenges\n');

    // Add indexes
    console.log('Adding indexes...');
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_user_stats_user ON user_stats(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_user_stats_level ON user_stats(level)',
      'CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_words_content_type ON words(content_type)',
      'CREATE INDEX IF NOT EXISTS idx_words_difficulty ON words(difficulty)',
      'CREATE INDEX IF NOT EXISTS idx_categories_required_level ON categories(required_level)',
      'CREATE INDEX IF NOT EXISTS idx_daily_challenges_date ON daily_challenges(date)',
    ];

    for (const indexSQL of indexes) {
      await pool.query(indexSQL);
    }
    console.log('✅ Indexes added\n');

    console.log('🎉 All columns and tables fixed!');
    console.log('\nReady for seeding!\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

fixColumns();
