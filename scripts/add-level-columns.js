// Add level/XP columns to existing user_stats table
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function addLevelColumns() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔧 Adding level/XP columns to user_stats...\n');

    const columnsToAdd = [
      { name: 'level', type: 'INTEGER DEFAULT 1' },
      { name: 'current_xp', type: 'INTEGER DEFAULT 0' },
      { name: 'total_xp', type: 'INTEGER DEFAULT 0' },
      { name: 'words_learned', type: 'INTEGER DEFAULT 0' },
      { name: 'verbs_learned', type: 'INTEGER DEFAULT 0' },
      { name: 'expressions_learned', type: 'INTEGER DEFAULT 0' },
      { name: 'sentences_learned', type: 'INTEGER DEFAULT 0' },
      { name: 'perfect_quizzes', type: 'INTEGER DEFAULT 0' },
      { name: 'study_streak', type: 'INTEGER DEFAULT 0' },
    ];

    for (const col of columnsToAdd) {
      try {
        await pool.query(`
          ALTER TABLE user_stats 
          ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}
        `);
        console.log(`✅ Added ${col.name}`);
      } catch (error) {
        if (error.code === '42701') {
          console.log(`⏭️  ${col.name} already exists`);
        } else {
          console.log(`⚠️  ${col.name}: ${error.message}`);
        }
      }
    }

    // Migrate existing streak data
    console.log('\n🔄 Migrating existing streak data...');
    await pool.query(`
      UPDATE user_stats 
      SET study_streak = current_streak,
          longest_streak = GREATEST(longest_streak, current_streak)
      WHERE study_streak = 0 OR study_streak IS NULL
    `);
    console.log('✅ Streak data migrated\n');

    // Now add the indexes
    console.log('📊 Adding indexes...');
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
      try {
        await pool.query(indexSQL);
      } catch (error) {
        // Ignore if already exists
      }
    }
    console.log('✅ Indexes added\n');

    // Verify final structure
    console.log('✅ Verifying user_stats structure...');
    const columns = await pool.query(`
      SELECT column_name
      FROM information_schema.columns 
      WHERE table_name = 'user_stats'
      AND column_name IN ('level', 'current_xp', 'total_xp', 'words_learned', 'study_streak')
      ORDER BY column_name
    `);

    console.log(`Found ${columns.rows.length}/5 required columns:`);
    columns.rows.forEach((row) => console.log(`   ✓ ${row.column_name}`));

    console.log('\n🎉 Level system database setup complete!');
    console.log('\nNext step: Run seeding script');
    console.log('   node scripts/seed-enhanced-content.js\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await pool.end();
  }
}

addLevelColumns();
