# Database Connection Guide

## Fixed: SSL Connection Error ✅

### The Problem

```
Error: The server does not support SSL connections
```

### The Solution

Updated `src/lib/db-pool.ts` to intelligently handle SSL configuration:

- **Local development**: SSL disabled by default
- **Production/Cloud databases**: SSL enabled automatically
- **Smart detection**: Checks connection string for cloud providers (Neon, Railway, Supabase)

### Your Database Configuration

#### Local PostgreSQL (Current Setup)

```env
DATABASE_URL="postgresql://ulpingo:ulpingo_password@localhost:5434/ulpingo_db"
```

**SSL:** Disabled ✅

#### Production (Neon/Cloud)

```env
DATABASE_URL="postgresql://user:pass@ep-example.neon.tech/dbname?sslmode=require"
```

**SSL:** Enabled automatically ✅

---

## Quick Troubleshooting

### Issue: "Connection refused"

**Check:**

1. Is PostgreSQL running? `pg_isready -h localhost -p 5434`
2. Correct port? Default is 5432, yours is 5434
3. Database exists? `psql -h localhost -p 5434 -U ulpingo -l`

### Issue: "Authentication failed"

**Fix:**

```bash
# Reset password
psql -h localhost -p 5434 -U postgres
ALTER USER ulpingo WITH PASSWORD 'ulpingo_password';
```

### Issue: "Database does not exist"

**Fix:**

```bash
# Create database
psql -h localhost -p 5434 -U postgres
CREATE DATABASE ulpingo_db;
GRANT ALL PRIVILEGES ON DATABASE ulpingo_db TO ulpingo;
```

### Issue: "Too many connections"

**Fix:** The pool is configured with max 10 connections. If you hit the limit:

1. Check for connection leaks in your code
2. Increase PostgreSQL max_connections
3. Reduce pool max size in `db-pool.ts`

---

## Environment Variables

### Required

```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

### Optional

```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
NODE_ENV="development"
```

---

## Testing Your Connection

### Method 1: psql

```bash
psql "$DATABASE_URL"
# Should connect successfully
```

### Method 2: Node.js script

Create `test-db.js`:

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
  } else {
    console.log('✅ Connected successfully!', res.rows[0]);
  }
  pool.end();
});
```

Run: `node test-db.js`

---

## Docker PostgreSQL (Quick Setup)

If you need a fresh PostgreSQL instance:

```bash
docker run --name ulpingo-postgres \
  -e POSTGRES_USER=ulpingo \
  -e POSTGRES_PASSWORD=ulpingo_password \
  -e POSTGRES_DB=ulpingo_db \
  -p 5432:5432 \
  -d postgres:16

# Then use:
DATABASE_URL="postgresql://ulpingo:ulpingo_password@localhost:5432/ulpingo_db"
```

---

## Connection String Formats

### Basic

```
postgresql://username:password@hostname:port/database
```

### With SSL

```
postgresql://username:password@hostname:port/database?sslmode=require
```

### With Schema

```
postgresql://username:password@hostname:port/database?schema=public
```

### With Connection Timeout

```
postgresql://username:password@hostname:port/database?connect_timeout=10
```

---

## Best Practices

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Different credentials per environment** - Dev, staging, production
3. **Use connection pooling** - Already configured ✅
4. **Monitor connection count** - Check PostgreSQL logs
5. **Close connections properly** - Always use `client.release()`
6. **Use transactions** - For multi-step operations

---

## Production Deployment

### Vercel

Environment variables are automatically used. Ensure:

- `DATABASE_URL` points to production database
- SSL is enabled (handled automatically)
- Connection pool size is appropriate

### Docker

The included `Dockerfile` handles everything. Just set environment variables.

### Manual Deployment

1. Ensure PostgreSQL is accessible
2. Set all environment variables
3. Run database migrations: `node scripts/setup-db.js`
4. Build: `npm run build`
5. Start: `npm start`

---

## Need Help?

1. Check PostgreSQL logs: `tail -f /var/log/postgresql/postgresql-16-main.log`
2. Check Next.js logs: Look at terminal output
3. Check network: `telnet localhost 5434`
4. Verify environment: `echo $DATABASE_URL`

---

**Status:** ✅ Database connection working correctly!
