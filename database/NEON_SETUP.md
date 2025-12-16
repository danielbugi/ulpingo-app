# Neon PostgreSQL Setup Guide

## Step 1: Create Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up or log in with GitHub
3. Click **"Create a project"**
4. Configure:
   - **Name**: ulpingo-app
   - **Region**: Choose closest to your users (e.g., US East, EU West)
   - **PostgreSQL version**: Latest (16 recommended)
5. Click **"Create project"**

## Step 2: Get Connection String

After creating the project, Neon will display your connection string. It looks like:

```
postgresql://[username]:[password]@[endpoint]/neondb?sslmode=require
```

Copy this connection string - you'll need it for the next steps.

## Step 3: Set Up Local Environment

1. Update your `.env.local` file with your Neon connection string:

```env
DATABASE_URL=postgresql://[username]:[password]@[endpoint]/neondb?sslmode=require
NEXTAUTH_SECRET=[generate-with-openssl-rand-base64-32]
NEXTAUTH_URL=http://localhost:3000
```

## Step 4: Initialize Database Schema

In the Neon Console SQL Editor (or using a PostgreSQL client):

1. Go to your project in Neon Console
2. Click **"SQL Editor"** in the left sidebar
3. Copy and paste the contents of `database/neon-setup.sql`
4. Click **"Run"**

Alternatively, use the command line:

```bash
# Install PostgreSQL client if needed
npm install -g pg

# Run the setup script (make sure DATABASE_URL is set in .env.local)
psql $DATABASE_URL -f database/neon-setup.sql
```

## Step 5: Seed Initial Data (Optional)

If you want to populate the database with initial categories and words:

```bash
node database/seed.js
```

## Step 6: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

   - `DATABASE_URL`: Your Neon connection string
   - `NEXTAUTH_SECRET`: Generated secret (use `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your production URL (e.g., https://ulpingo-app.vercel.app)
   - `GOOGLE_CLIENT_ID`: (Optional) Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: (Optional) Your Google OAuth client secret

4. Click **"Save"**
5. Redeploy your application

## Verifying the Setup

After deployment, check:

1. Visit your app's `/api/health` endpoint
2. Try creating a user account
3. Test the flashcard functionality

## Connection Pooling (Recommended for Production)

Neon automatically handles connection pooling, but if you need more control, you can enable Neon's connection pooler:

1. In Neon Console, go to **Connection Details**
2. Toggle on **"Pooled connection"**
3. Use the pooled connection string in your `DATABASE_URL`

## Monitoring

Monitor your database usage in the Neon Console:

- Go to **Monitoring** tab
- Check query performance
- Monitor storage usage
- View connection stats

## Troubleshooting

### Connection Issues

- Ensure `?sslmode=require` is in your connection string
- Check that your IP isn't blocked (Neon allows all by default)
- Verify the connection string is correct

### Migration Issues

- Run migrations in order: `schema.sql` → `migration-add-srs.sql`
- Check Neon Console logs for errors
- Ensure all tables are created before seeding

### Vercel Deployment Issues

- Verify all environment variables are set
- Check Vercel deployment logs
- Ensure DATABASE_URL is accessible from Vercel's network
