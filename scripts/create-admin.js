// scripts/create-admin.js
const bcrypt = require('bcryptjs');
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
  console.error('Please create a .env.local file with DATABASE_URL\n');
  process.exit(1);
}

async function createAdmin() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ Error: DATABASE_URL environment variable is not set');
    console.error('Please make sure your .env file contains DATABASE_URL\n');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('neon.tech')
      ? { rejectUnauthorized: false }
      : false,
  });

  try {
    // Get admin details from command line or use defaults
    const email = process.argv[2] || 'admin@ulpingo.app';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';

    console.log('\n🔐 Creating admin user...\n');
    console.log(`Email: ${email}`);
    console.log(`Name: ${name}`);
    console.log(`Password: ${password}\n`);

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT id, role FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      // Update existing user to admin
      await pool.query(
        'UPDATE users SET role = $1, password_hash = $2, provider = $3 WHERE email = $4',
        ['admin', passwordHash, 'email', email]
      );
      console.log('✅ Existing user updated to admin role!\n');
    } else {
      // Create new admin user
      await pool.query(
        `INSERT INTO users (email, name, role, provider, password_hash, email_verified)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [email, name, 'admin', 'email', passwordHash]
      );
      console.log('✅ New admin user created!\n');

      // Get the user ID and create user_stats
      const newUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      await pool.query(
        'INSERT INTO user_stats (user_id) VALUES ($1) ON CONFLICT DO NOTHING',
        [newUser.rows[0].id]
      );
    }

    console.log('🎉 Admin setup complete!\n');
    console.log('You can now sign in with:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);
    console.log('⚠️  Remember to change the password after first login!\n');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Usage information
if (process.argv[2] === '--help' || process.argv[2] === '-h') {
  console.log(`
Usage: node scripts/create-admin.js [email] [password] [name]

Examples:
  node scripts/create-admin.js
  node scripts/create-admin.js admin@example.com mypassword "Admin Name"
  node scripts/create-admin.js user@domain.com securepass123

If no arguments provided, defaults are:
  Email: admin@ulpingo.app
  Password: admin123
  Name: Admin User
  `);
  process.exit(0);
}

createAdmin();
