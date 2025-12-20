// scripts/run-migration.js
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// Try to load .env.local first, then .env
const envLocalPath = path.join(__dirname, '..', '.env.local');
const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  console.error('❌ Error: No .env or .env.local file found');
  process.exit(1);
}

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ Error: DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('neon.tech')
      ? { rejectUnauthorized: false }
      : false,
  });

  // List of migration files in order
  const migrations = [
    'migration-add-roles.sql',
    'migration-add-srs.sql',
    'migration-level-system.sql',
    'migration-quiz-attempts.sql',
  ];

  try {
    for (const migrationFile of migrations) {
      console.log(`\n📊 Running migration: ${migrationFile}...\n`);
      const migrationPath = path.join(
        __dirname,
        '..',
        'database',
        migrationFile
      );
      if (!fs.existsSync(migrationPath)) {
        console.warn(`⚠️  Migration file not found: ${migrationFile}`);
        continue;
      }
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      // Remove comments and split by semicolon
      const statements = migrationSQL
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n')
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      console.log(`Found ${statements.length} statements to execute\n`);

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        try {
          const preview = statement.substring(0, 50).replace(/\s+/g, ' ');
          console.log(`[${i + 1}/${statements.length}] ${preview}...`);
          await pool.query(statement);
        } catch (error) {
          // Ignore "already exists" errors
          if (
            error.code === '42710' ||
            error.code === '42P07' ||
            error.message.includes('already exists')
          ) {
            console.log(`    ⚠️  Skipped (already exists)`);
          } else if (error.code === '23505') {
            // Unique constraint violation (admin user already exists)
            console.log(`    ⚠️  Skipped (already exists)`);
          } else {
            throw error;
          }
        }
      }
    }

    console.log('\n✅ All migrations completed successfully!\n');
    console.log('Next steps:');
    console.log(
      '1. Run: node scripts/create-admin.js <email> <password> <name>'
    );
    console.log(
      "2. Or update existing user: UPDATE users SET role = 'admin' WHERE email = 'your@email.com'\n"
    );
  } catch (error) {
    console.error('\n❌ Error running migration:');
    console.error(`   Code: ${error.code}`);
    console.error(`   Message: ${error.message}\n`);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
