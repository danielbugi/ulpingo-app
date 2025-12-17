#!/usr/bin/env node
// deploy-admin-to-production.js
const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get production DATABASE_URL from command line or environment
const PROD_DB_URL = process.env.PROD_DATABASE_URL || process.argv[2];
const ADMIN_EMAIL = process.argv[3] || 'admin@ulpingo.app';
const ADMIN_PASSWORD = process.argv[4] || 'admin123';
const ADMIN_NAME = process.argv[5] || 'Admin';

function exec(command) {
  console.log(`\n> ${command}`);
  execSync(command, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
}

function execWithEnv(command, env) {
  console.log(`\n> ${command}`);
  const result = spawnSync(command, [], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    shell: true,
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) {
    throw new Error(`Command failed with exit code ${result.status}`);
  }
}

async function main() {
  console.log('\n🚀 Deploying Admin System to Production\n');

  if (!PROD_DB_URL) {
    console.error('❌ Error: Production DATABASE_URL required\n');
    console.log('Usage:');
    console.log(
      '  node scripts/deploy-admin-to-production.js <DATABASE_URL> [email] [password] [name]\n'
    );
    console.log('Or set PROD_DATABASE_URL environment variable\n');
    process.exit(1);
  }

  // Step 1: Run migration
  console.log('📊 Running database migration...');
  execWithEnv('node scripts/run-migration.js', { DATABASE_URL: PROD_DB_URL });

  // Step 2: Create admin user
  console.log('\n👤 Creating admin user...');
  execWithEnv(
    `node scripts/create-admin.js "${ADMIN_EMAIL}" "${ADMIN_PASSWORD}" "${ADMIN_NAME}"`,
    { DATABASE_URL: PROD_DB_URL }
  );

  // Step 3: Git commit and push
  console.log('\n📦 Committing and pushing to GitHub...');
  exec('git add .');
  exec('git commit -m "Add admin system with role-based access control"');
  exec('git push origin main');

  console.log('\n✅ Deployment complete!');
  console.log(`\n🎉 Admin user: ${ADMIN_EMAIL}`);
  console.log('🚀 Vercel will auto-deploy from GitHub\n');
}

main().catch((error) => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
