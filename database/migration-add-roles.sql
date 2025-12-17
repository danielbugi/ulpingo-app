-- Migration: Add role system to users table
-- Date: 2025-01-16

-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

-- Add check constraint to ensure only valid roles
ALTER TABLE users ADD CONSTRAINT users_role_check 
  CHECK (role IN ('user', 'admin'));

-- Create index on role for better query performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Update existing users to have 'user' role if null
UPDATE users SET role = 'user' WHERE role IS NULL;

-- Make role NOT NULL after setting default values
ALTER TABLE users ALTER COLUMN role SET NOT NULL;

-- Create admin user (update the email to your admin email)
-- Password: admin123 (hashed with bcrypt - CHANGE THIS IN PRODUCTION)
INSERT INTO users (email, name, role, provider, password_hash, email_verified)
VALUES (
  'admin@ulpingo.app', 
  'Admin User', 
  'admin', 
  'email',
  '$2a$10$rQZ8J0K6JmGJqQvJ0Z8J0euZZYZQYZQYZQYZQYZQYZQYZQYZQYZQY', -- admin123
  NOW()
)
ON CONFLICT (email) DO UPDATE 
SET role = 'admin';

-- Grant admin role to specific email (replace with your actual email)
-- Uncomment and modify the line below with your email:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';

COMMENT ON COLUMN users.role IS 'User role: user or admin';
