const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function cleanupInvalidGuests() {
  const client = await pool.connect();

  try {
    console.log('🧹 Cleaning up invalid guest user IDs...\n');

    // Delete records with user_id out of range
    const deleteResult = await client.query(`
      DELETE FROM user_progress 
      WHERE user_id IS NOT NULL 
        AND (user_id > 2147483647 OR user_id < -2147483648)
    `);

    console.log(`✅ Deleted ${deleteResult.rowCount} invalid records\n`);

    // Verify cleanup
    const verifyResult = await client.query(`
      SELECT COUNT(*) as remaining_invalid_records
      FROM user_progress 
      WHERE user_id IS NOT NULL 
        AND (user_id > 2147483647 OR user_id < -2147483648)
    `);

    console.log(
      `Remaining invalid records: ${verifyResult.rows[0].remaining_invalid_records}\n`
    );

    // Show summary
    const summaryResult = await client.query(`
      SELECT 
        CASE 
          WHEN user_id IS NULL THEN 'Guest (NULL)'
          WHEN user_id > 0 THEN 'Authenticated Users'
          WHEN user_id < 0 THEN 'Guest (Hashed)'
        END as user_type,
        COUNT(*) as record_count
      FROM user_progress
      GROUP BY 
        CASE 
          WHEN user_id IS NULL THEN 'Guest (NULL)'
          WHEN user_id > 0 THEN 'Authenticated Users'
          WHEN user_id < 0 THEN 'Guest (Hashed)'
        END
      ORDER BY user_type
    `);

    console.log('📊 Summary of remaining data:');
    console.table(summaryResult.rows);

    console.log('\n✨ Cleanup complete!');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

cleanupInvalidGuests().catch(console.error);
