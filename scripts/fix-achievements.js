// Check achievements table structure
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function checkAchievements() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const columns = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns 
      WHERE table_name = 'achievements'
      ORDER BY ordinal_position
    `);

    console.log('Achievements table columns:');
    columns.rows.forEach((row) => {
      console.log(`   - ${row.column_name}: ${row.data_type}`);
    });

    // Add missing columns if needed
    const missingCols = [
      'key',
      'name_pt',
      'name_he',
      'description_pt',
      'icon',
      'rarity',
      'xp_reward',
    ];
    console.log('\n🔧 Adding missing columns...');

    for (const col of missingCols) {
      let colType = 'VARCHAR(100)';
      if (col === 'key') colType = 'VARCHAR(50) UNIQUE';
      if (col === 'description_pt') colType = 'TEXT';
      if (col === 'icon') colType = 'VARCHAR(10)';
      if (col === 'xp_reward') colType = 'INTEGER DEFAULT 100';
      if (col === 'rarity') colType = "VARCHAR(20) DEFAULT 'common'";

      try {
        await pool.query(
          `ALTER TABLE achievements ADD COLUMN IF NOT EXISTS ${col} ${colType}`
        );
        console.log(`✅ Added ${col}`);
      } catch (error) {
        if (error.code === '42701') {
          console.log(`⏭️  ${col} already exists`);
        }
      }
    }

    console.log('\n✅ Achievements table ready!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkAchievements();
