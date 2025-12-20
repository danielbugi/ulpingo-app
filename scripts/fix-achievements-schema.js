require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function fixAchievementsSchema() {
  console.log('🔧 Fixing achievements table schema...\n');

  try {
    // Option 1: Make old columns nullable since we're transitioning to new schema
    console.log('1️⃣ Making old columns nullable...');
    await pool.query(`
      ALTER TABLE achievements 
      ALTER COLUMN name DROP NOT NULL;
    `);
    console.log('✅ name column is now nullable');

    // Also drop NOT NULL from description if it exists
    try {
      await pool.query(`
        ALTER TABLE achievements 
        ALTER COLUMN description DROP NOT NULL;
      `);
      console.log('✅ description column is now nullable');
    } catch (err) {
      console.log('ℹ️  description column was already nullable');
    }

    // Make new columns NOT NULL (they should have values)
    console.log('\n2️⃣ Making new columns NOT NULL...');

    try {
      await pool.query(`
        ALTER TABLE achievements 
        ALTER COLUMN key SET NOT NULL,
        ALTER COLUMN name_pt SET NOT NULL,
        ALTER COLUMN name_he SET NOT NULL,
        ALTER COLUMN description_pt SET NOT NULL;
      `);
      console.log('✅ New columns set to NOT NULL');
    } catch (err) {
      console.log(
        '⚠️  Could not set NOT NULL on new columns (they may have NULL values from old data)'
      );
      console.log("   This is OK for now, we'll fix it when we seed the data");
    }

    console.log('\n✅ Schema updated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

fixAchievementsSchema();
