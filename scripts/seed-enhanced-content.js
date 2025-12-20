// Seed Enhanced Content (Verbs, Expressions, Sentences)
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function seedContent() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  console.log('🌱 Starting Enhanced Content Seeding...\n');

  try {
    // Test connection
    console.log('1️⃣ Testing database connection...');
    await pool.query('SELECT NOW()');
    console.log('✅ Connected successfully!\n');

    // Read seed file
    console.log('2️⃣ Reading seed file...');
    const seedPath = path.join(
      __dirname,
      '..',
      'database',
      'seed-enhanced-content.sql'
    );
    const seedSQL = fs.readFileSync(seedPath, 'utf8');
    console.log('✅ Seed file loaded\n');

    // Run seed
    console.log('3️⃣ Seeding content...');
    await pool.query(seedSQL);
    console.log('✅ Content seeded successfully!\n');

    // Verify new content
    console.log('4️⃣ Verifying new content...');

    // Check categories
    const categories = await pool.query(`
      SELECT COUNT(*) as count FROM categories
    `);
    console.log(`✅ Total categories: ${categories.rows[0].count}`);

    // Check content by type
    const contentTypes = await pool.query(`
      SELECT content_type, COUNT(*) as count 
      FROM words 
      GROUP BY content_type 
      ORDER BY content_type
    `);
    console.log('\n📊 Content breakdown:');
    contentTypes.rows.forEach((row) => {
      console.log(`   - ${row.content_type}: ${row.count}`);
    });

    // Check achievements
    const achievements = await pool.query(`
      SELECT COUNT(*) as count FROM achievements
    `);
    console.log(`\n🏆 Achievements: ${achievements.rows[0].count}`);

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n✨ Your level system is ready to use!');
    console.log('\nNext steps:');
    console.log('1. Start dev server: npm run dev');
    console.log('2. Test level system on http://localhost:3000\n');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error('\nDetails:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedContent();
