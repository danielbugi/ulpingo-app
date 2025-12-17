# Admin Role System Setup Guide

This guide explains how to set up the admin role system for Ulpingo.

## What Was Added

### 1. Database Changes

- Added `role` column to the `users` table (values: 'user' or 'admin')
- Created migration file: `database/migration-add-roles.sql`
- Updated `database/schema.sql` to include role column

### 2. Authentication Updates

- Updated NextAuth types to include role in session and user objects
- Modified auth callbacks to fetch and store role information
- Added role refresh mechanism in JWT callback

### 3. Admin Dashboard

- Created `/admin` route (protected, admin-only)
- Dashboard displays:
  - Total users, words, categories
  - Active users (last 7 days)
  - Recent users table
  - Ability to promote/demote users to admin

### 4. API Routes

- `GET /api/admin/stats` - Fetch dashboard statistics
- `POST /api/admin/update-role` - Update user roles

### 5. Navigation

- Added "Admin Dashboard" link in UserMenu (visible only to admins)
- Shows purple shield icon for easy identification

### 6. Middleware Protection

- Updated middleware to protect `/admin/*` routes
- Redirects non-admin users to home page
- Redirects unauthenticated users to signin page

## Setup Instructions

### Step 1: Run the Database Migration

You have two options:

#### Option A: Using psql (recommended)

```bash
psql -h <your-host> -U <your-user> -d <your-database> -f database/migration-add-roles.sql
```

#### Option B: Using your database client

Copy the contents of `database/migration-add-roles.sql` and execute it in your PostgreSQL database.

### Step 2: Create Your Admin User

The migration includes a default admin user:

- **Email**: admin@ulpingo.app
- **Password**: admin123 (hashed)

⚠️ **IMPORTANT**: Change this password in production!

### Step 3: Make Your Own Account Admin

To promote your existing account to admin, run this SQL query:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

Or uncomment and modify the line at the end of `migration-add-roles.sql` before running it.

### Step 4: Restart Your Application

After running the migration:

```bash
npm run build
npm start
```

## Testing the Admin System

1. **Sign in** with your admin account
2. **Click your avatar** in the top-right corner
3. **Look for "Admin Dashboard"** with a purple shield icon
4. **Click it** to access the admin panel

## Admin Dashboard Features

### Statistics Overview

- Total Users
- Total Words
- Total Categories
- Active Users (last 7 days)

### User Management

- View all recent users
- See user roles (admin/user badges)
- Promote users to admin
- Demote admins to regular users
- Cannot change your own role (safety feature)

## Security Features

1. **Middleware Protection**: Admin routes are protected at the middleware level
2. **API Authorization**: All admin API routes check for admin role
3. **Session-Based**: Role is stored in the JWT token and session
4. **Self-Protection**: Admins cannot change their own role
5. **Database Constraint**: Role column has a CHECK constraint

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Admin page (server component)
│   │   └── AdminDashboard.tsx    # Dashboard UI (client component)
│   └── api/
│       └── admin/
│           ├── stats/
│           │   └── route.ts      # Statistics API
│           └── update-role/
│               └── route.ts      # Role update API
├── components/
│   └── UserMenu.tsx              # Updated with admin link
├── lib/
│   └── auth-options.ts           # Updated with role callbacks
├── middleware.ts                 # Updated to protect admin routes
└── types/
    └── next-auth.d.ts            # Updated with role types

database/
├── migration-add-roles.sql       # Migration script
└── schema.sql                    # Updated base schema
```

## Troubleshooting

### "Unauthorized" Error

- Make sure you've run the migration
- Verify your user has `role = 'admin'` in the database
- Try signing out and signing back in to refresh your session

### Migration Fails

- Check if the `role` column already exists
- Ensure you have the correct database credentials
- Verify your PostgreSQL version supports CHECK constraints

### Admin Link Not Showing

- Clear your browser cache
- Sign out and sign back in
- Check the browser console for errors
- Verify `session.user.role` is set to 'admin'

## Future Enhancements

Potential features to add:

- [ ] More granular permissions
- [ ] Activity logs
- [ ] Bulk user operations
- [ ] User search and filtering
- [ ] Content management (words, categories)
- [ ] Analytics and reports
- [ ] Export user data

## Questions?

If you encounter any issues, check:

1. Database connection is working
2. Migration was applied successfully
3. Your user has the admin role
4. You've restarted the application after migration
