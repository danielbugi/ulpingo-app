-- Fixed Database Schema for Authentication
-- Handles existing tables properly

-- Drop and recreate users table with all auth fields
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS user_stats CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255), -- for email/password auth
  provider VARCHAR(50), -- 'google', 'instagram', 'email'
  provider_account_id VARCHAR(255), -- OAuth provider user ID
  image VARCHAR(500), -- profile picture URL
  email_verified TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider ON users(provider, provider_account_id);

-- Update user_progress table to link with users
-- Add user_id column if it doesn't exist
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

-- Create index for user progress lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  requirement_type VARCHAR(50), -- 'words_learned', 'streak_days', 'perfect_sessions', etc.
  requirement_value INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_achievements table (junction table)
CREATE TABLE IF NOT EXISTS user_achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create index for achievement lookups
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

-- Create user stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_words_learned INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_study_date DATE,
  total_study_time INTEGER DEFAULT 0, -- in minutes
  perfect_sessions INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Clear and insert achievements
TRUNCATE achievements CASCADE;

INSERT INTO achievements (name, description, icon, requirement_type, requirement_value) VALUES
  ('First Steps', 'Learn your first 10 words', '🌱', 'words_learned', 10),
  ('Getting Started', 'Learn 50 words', '🌿', 'words_learned', 50),
  ('Word Master', 'Learn all 140 words', '🏆', 'words_learned', 140),
  ('Week Warrior', 'Study for 7 days in a row', '🔥', 'streak_days', 7),
  ('Monthly Champion', 'Study for 30 days in a row', '💪', 'streak_days', 30),
  ('Perfectionist', 'Complete a session with 100% accuracy', '⭐', 'perfect_sessions', 1),
  ('Scholar', 'Complete 10 perfect sessions', '📚', 'perfect_sessions', 10),
  ('Category Master', 'Complete all words in any category', '🎯', 'category_complete', 1),
  ('Full Circle', 'Complete all 14 categories', '🌟', 'all_categories', 14),
  ('Speed Learner', 'Review 100 words in one day', '⚡', 'reviews_per_day', 100);

-- Display summary
SELECT 'Migration completed successfully!' as status;
SELECT COUNT(*) as achievement_count FROM achievements;