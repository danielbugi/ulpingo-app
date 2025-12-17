# Admin System Quick Start Guide

## 🚀 Quick Setup (3 Steps)

### 1. Run the Database Migration

```bash
# If using Neon or remote PostgreSQL:
psql "your-connection-string" -f database/migration-add-roles.sql

# If using local PostgreSQL:
psql -U postgres -d ulpingo_db -f database/migration-add-roles.sql
```

### 2. Create Your Admin User

```bash
# Option A: Using the script (creates user with hashed password)
node scripts/create-admin.js your-email@example.com yourpassword "Your Name"

# Option B: Update existing user to admin via SQL
# Run this in your database:
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

### 3. Restart and Test

```bash
npm run build
npm start
```

Then:

1. Sign in with your admin account
2. Click your avatar (top-right)
3. You should see **"Admin Dashboard"** with a purple shield icon 🛡️

---

## 📊 What You Get

### Admin Dashboard Features

- **Statistics Overview**: Total users, words, categories, and active users
- **User Management**: View recent users and manage roles
- **Role Control**: Promote users to admin or demote them to regular users
- **Protected Routes**: Middleware ensures only admins can access `/admin`

### Navigation

- New "Admin Dashboard" menu item appears in the user menu
- Only visible to users with admin role
- Distinguished with a purple shield icon

---

## 🔐 Security Features

✅ Middleware protection on `/admin/*` routes  
✅ API authorization checks admin role  
✅ Self-protection (admins can't change their own role)  
✅ Database constraint on role values  
✅ JWT token includes role information

---

## 📁 New Files Created

```
src/app/admin/
├── page.tsx              # Admin page route
└── AdminDashboard.tsx    # Dashboard UI

src/app/api/admin/
├── stats/route.ts        # Statistics API
└── update-role/route.ts  # Role management API

database/
└── migration-add-roles.sql  # Database migration

scripts/
└── create-admin.js       # Admin user creation script
```

---

## 🛠️ Usage Examples

### Create an admin user with the script:

```bash
# With default credentials (admin@ulpingo.app / admin123)
node scripts/create-admin.js

# With custom credentials
node scripts/create-admin.js john@example.com securepass123 "John Doe"
```

### Update an existing user to admin via API:

```javascript
// In admin dashboard, click "Make Admin" button next to any user
// Or use the API directly:
fetch('/api/admin/update-role', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 123, role: 'admin' }),
});
```

---

## 🐛 Troubleshooting

**Q: "Unauthorized" error when accessing admin dashboard?**  
A: Make sure:

- You've run the migration
- Your user has `role = 'admin'` in the database
- You've signed out and back in to refresh your session

**Q: Admin link not showing in menu?**  
A:

- Check `session.user.role` in browser console
- Clear browser cache and sign in again
- Verify the database role is set correctly

**Q: Can't change user roles?**  
A:

- Ensure you're signed in as an admin
- You cannot change your own role
- Check browser console for API errors

---

## 📚 Full Documentation

For detailed information, see: **[ADMIN_SETUP.md](./ADMIN_SETUP.md)**

---

## ⚠️ Important Notes

1. **Change default password**: The migration creates a default admin with password `admin123`. Change it immediately!
2. **Production security**: Always use strong passwords and enable 2FA if possible
3. **Backup database**: Always backup before running migrations
4. **Test first**: Test in development before deploying to production

---

## 🎯 Next Steps

After setting up the admin system, you can:

- [ ] Add more admin features (user search, bulk operations)
- [ ] Implement activity logging
- [ ] Add content management (words, categories)
- [ ] Create analytics dashboards
- [ ] Add email notifications for admin actions

Enjoy your new admin powers! 🚀
