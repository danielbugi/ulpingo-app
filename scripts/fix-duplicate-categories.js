/**
 * Script to check and remove duplicate categories from the database
 * Run this with: node scripts/fix-duplicate-categories.js
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

// Use Neon database URL
const connectionString =
  'postgresql://neondb_owner:npg_B6Yuq1Sjzyds@ep-snowy-wind-agh3ika2-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function checkDuplicates() {
  const client = await pool.connect();

  try {
    console.log('🔍 Checking for duplicate categories...\n');

    // Find duplicates based on name_pt and name_he
    const duplicatesQuery = `
      SELECT name_pt, name_he, COUNT(*) as count, ARRAY_AGG(id ORDER BY id) as ids
      FROM categories
      GROUP BY name_pt, name_he
      HAVING COUNT(*) > 1
      ORDER BY name_pt;
    `;

    const result = await client.query(duplicatesQuery);

    if (result.rows.length === 0) {
      console.log('✅ No duplicate categories found!');
      return [];
    }

    console.log(`⚠️  Found ${result.rows.length} duplicate category groups:\n`);

    result.rows.forEach((row, index) => {
      console.log(`${index + 1}. "${row.name_pt}" (${row.name_he})`);
      console.log(`   - Found ${row.count} duplicates`);
      console.log(`   - IDs: ${row.ids.join(', ')}`);
      console.log(
        `   - Will keep ID ${row.ids[0]}, remove: ${row.ids
          .slice(1)
          .join(', ')}\n`
      );
    });

    return result.rows;
  } finally {
    client.release();
  }
}

async function fixDuplicates(duplicates) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let totalRemoved = 0;

    for (const duplicate of duplicates) {
      const keepId = duplicate.ids[0];
      const removeIds = duplicate.ids.slice(1);

      console.log(
        `\n📝 Fixing "${duplicate.name_pt}" - keeping ID ${keepId}...`
      );

      // Update words that reference duplicate categories to point to the kept category
      for (const removeId of removeIds) {
        const updateWordsQuery = `
          UPDATE words 
          SET category_id = $1 
          WHERE category_id = $2
        `;
        const updateResult = await client.query(updateWordsQuery, [
          keepId,
          removeId,
        ]);
        console.log(
          `   ✓ Updated ${updateResult.rowCount} words from category ${removeId} to ${keepId}`
        );
      }

      // Delete duplicate categories
      const deleteCategoriesQuery = `
        DELETE FROM categories 
        WHERE id = ANY($1)
        RETURNING id, name_pt
      `;
      const deleteResult = await client.query(deleteCategoriesQuery, [
        removeIds,
      ]);
      console.log(`   ✓ Removed ${deleteResult.rowCount} duplicate categories`);

      totalRemoved += deleteResult.rowCount;
    }

    await client.query('COMMIT');

    console.log(
      `\n✅ Successfully removed ${totalRemoved} duplicate categories!`
    );

    // Show final category count
    const countResult = await client.query('SELECT COUNT(*) FROM categories');
    console.log(
      `\n📊 Total categories remaining: ${countResult.rows[0].count}`
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error fixing duplicates:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function listAllCategories() {
  const client = await pool.connect();

  try {
    console.log('\n📋 All categories in database:\n');

    const result = await client.query(
      'SELECT id, name_pt, name_he, icon FROM categories ORDER BY id'
    );

    result.rows.forEach((row) => {
      console.log(`${row.icon} ${row.id}. ${row.name_pt} - ${row.name_he}`);
    });

    console.log(`\nTotal: ${result.rows.length} categories`);
  } finally {
    client.release();
  }
}

async function main() {
  try {
    console.log('🚀 Starting duplicate category fix script...\n');
    console.log('📡 Connected to Neon database\n');

    // Step 1: Check for duplicates
    const duplicates = await checkDuplicates();

    if (duplicates.length === 0) {
      await listAllCategories();
      return;
    }

    // Step 2: Ask for confirmation (in production, you'd want this interactive)
    console.log('\n⚠️  IMPORTANT: This will modify your database!');
    console.log('   - Duplicate categories will be removed');
    console.log('   - Words will be reassigned to the kept category');
    console.log('   - This operation cannot be undone\n');

    // Auto-confirm for now (in interactive mode, use readline)
    const confirm = true;

    if (!confirm) {
      console.log('❌ Operation cancelled');
      return;
    }

    // Step 3: Fix duplicates
    await fixDuplicates(duplicates);

    // Step 4: Show final state
    await listAllCategories();

    console.log('\n✨ Done!\n');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { checkDuplicates, fixDuplicates };
