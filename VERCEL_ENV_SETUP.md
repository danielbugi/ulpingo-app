# Vercel Environment Variables Configuration

After setting up your Neon database, configure these environment variables in Vercel:

## Required Variables

### 1. Database
```
DATABASE_URL
```
**Value**: Your Neon PostgreSQL connection string
```
postgresql://[username]:[password]@[endpoint]/neondb?sslmode=require
```
**Where to get it**: Neon Console → Your Project → Connection Details

---

### 2. NextAuth Secret
```
NEXTAUTH_SECRET
```
**Value**: A random secret key (32+ characters)
**How to generate**:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

---

### 3. NextAuth URL
```
NEXTAUTH_URL
```
**Value**: Your production domain
```
https://ulpingo-app.vercel.app
```
Or your custom domain if you have one.

---

## Optional Variables (Google OAuth)

### 4. Google Client ID
```
GOOGLE_CLIENT_ID
```
**Value**: Your Google OAuth 2.0 Client ID
**Where to get it**: 
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set Authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local dev)

---

### 5. Google Client Secret
```
GOOGLE_CLIENT_SECRET
```
**Value**: Your Google OAuth 2.0 Client Secret
**Where to get it**: Same as Client ID above

---

## Additional Variables

### 6. Node Environment
```
NODE_ENV
```
**Value**: `production`
**Note**: Usually set automatically by Vercel

---

### 7. Disable Telemetry (Optional)
```
NEXT_TELEMETRY_DISABLED
```
**Value**: `1`
**Note**: Disables Next.js telemetry

---

## How to Set Variables in Vercel

### Method 1: Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your project: `ulpingo-app`
3. Click **Settings** → **Environment Variables**
4. Add each variable:
   - **Key**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: Variable value
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**

### Method 2: Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Add environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production

# For preview/development, add separately
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL development
```

### Method 3: Import from .env file
1. Create a `.env.production` file with all your variables
2. In Vercel Dashboard → Settings → Environment Variables
3. Click **Add New** → **Import .env**
4. Upload your `.env.production` file

---

## After Setting Variables

### Redeploy Your Application
Variables are only applied to new deployments. To apply them:

**Option A: Trigger new deployment**
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push origin main
```

**Option B: Redeploy from Vercel Dashboard**
1. Go to Deployments tab
2. Click ⋯ (three dots) on latest deployment
3. Click **Redeploy**

---

## Verify Configuration

After deployment, check:

1. **Health Check Endpoint**
   ```
   https://your-domain.vercel.app/api/health
   ```
   Should return: `{"status":"ok"}`

2. **Database Connection**
   - Try signing up for an account
   - Check if data persists
   - Test flashcard functionality

3. **Check Vercel Logs**
   - Go to Deployments → Click deployment → View Function Logs
   - Look for any database connection errors

---

## Troubleshooting

### Database Connection Fails
- ✅ Ensure `?sslmode=require` is in DATABASE_URL
- ✅ Check Neon database is not paused (free tier auto-pauses)
- ✅ Verify connection string is correct (no typos)
- ✅ Check Neon allows connections from all IPs (default)

### NextAuth Errors
- ✅ Ensure NEXTAUTH_SECRET is set and matches across all environments
- ✅ Verify NEXTAUTH_URL matches your actual domain (with https://)
- ✅ For Google OAuth, check redirect URIs are correctly configured

### Build Failures
- ✅ Check build logs in Vercel dashboard
- ✅ Ensure all dependencies are in package.json
- ✅ Verify TypeScript types are correct

### Runtime Errors
- ✅ Check Function Logs in Vercel deployment
- ✅ Verify all required environment variables are set
- ✅ Test API endpoints directly

---

## Security Best Practices

1. **Never commit** `.env.local` or `.env.production` files
2. **Rotate secrets** regularly (especially NEXTAUTH_SECRET)
3. **Use strong passwords** in your DATABASE_URL
4. **Enable 2FA** on your Neon and Vercel accounts
5. **Monitor** Neon Console for unusual database activity
6. **Set up alerts** in Vercel for deployment failures

---

## Next Steps

1. ✅ Set all required environment variables in Vercel
2. ✅ Run Neon setup SQL script (see NEON_SETUP.md)
3. ✅ Push code to trigger Vercel deployment
4. ✅ Test the deployed application
5. ✅ Set up Google OAuth (optional)
6. ✅ Configure custom domain (optional)
