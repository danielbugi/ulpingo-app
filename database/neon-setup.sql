-- ============================================
-- Ulpingo App - Neon PostgreSQL Setup Script
-- ============================================
-- Run this script in Neon SQL Editor to set up your database
-- Or use: psql $DATABASE_URL -f database/neon-setup.sql

-- ============================================
-- 1. DROP EXISTING TABLES (if recreating)
-- ============================================
-- Uncomment these lines if you need to start fresh
-- DROP TABLE IF EXISTS user_stats CASCADE;
-- DROP TABLE IF EXISTS user_progress CASCADE;
-- DROP TABLE IF EXISTS words CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- 2. CREATE CORE TABLES
-- ============================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  image TEXT,
  provider VARCHAR(50) DEFAULT 'email',
  provider_account_id VARCHAR(255),
  password_hash TEXT,
  email_verified TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_words_learned INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_review_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name_pt VARCHAR(100) NOT NULL,
  name_he VARCHAR(100) NOT NULL,
  icon VARCHAR(10) NOT NULL,
  color VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Words table
CREATE TABLE IF NOT EXISTS words (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  word_pt VARCHAR(100) NOT NULL,
  word_he VARCHAR(100) NOT NULL,
  transliteration VARCHAR(100),
  image_url TEXT,
  audio_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress table with SRS support
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  last_reviewed TIMESTAMP,
  ease_factor DECIMAL(3,2) DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_date TIMESTAMP DEFAULT NOW(),
  last_quality INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, word_id)
);

-- ============================================
-- 3. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_account_id);
CREATE INDEX IF NOT EXISTS idx_words_category ON words(category_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_word ON user_progress(word_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_last_reviewed ON user_progress(last_reviewed);
CREATE INDEX IF NOT EXISTS idx_user_progress_next_review ON user_progress(next_review_date);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_next_review ON user_progress(user_id, next_review_date);

-- ============================================
-- 4. CREATE FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- 5. CREATE TRIGGERS
-- ============================================

-- Drop existing triggers if recreating
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
DROP TRIGGER IF EXISTS update_words_updated_at ON words;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_user_stats_updated_at ON user_stats;
DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;

-- Create triggers
CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_words_updated_at 
  BEFORE UPDATE ON words
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at 
  BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at 
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. SEED INITIAL DATA (Optional)
-- ============================================

-- Insert categories
INSERT INTO categories (name_pt, name_he, icon, color) VALUES
  ('Cumprimentos', 'ברכות', '👋', 'bg-blue-500'),
  ('Família', 'משפחה', '👨‍👩‍👧‍👦', 'bg-green-500'),
  ('Números', 'מספרים', '🔢', 'bg-purple-500'),
  ('Cores', 'צבעים', '🎨', 'bg-pink-500'),
  ('Comida', 'אוכל', '🍕', 'bg-orange-500'),
  ('Animais', 'חיות', '🐶', 'bg-yellow-500')
ON CONFLICT DO NOTHING;

-- Insert sample words (Cumprimentos - Greetings)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (1, 'Olá', 'שלום', 'Shalom'),
  (1, 'Bom dia', 'בוקר טוב', 'Boker tov'),
  (1, 'Boa tarde', 'צהריים טובים', 'Tzohorayim tovim'),
  (1, 'Boa noite', 'ערב טוב', 'Erev tov'),
  (1, 'Tchau', 'להתראות', 'Lehitra''ot'),
  (1, 'Obrigado', 'תודה', 'Toda'),
  (1, 'Por favor', 'בבקשה', 'Bevakasha'),
  (1, 'Desculpe', 'סליחה', 'Slicha')
ON CONFLICT DO NOTHING;

-- Insert sample words (Família - Family)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (2, 'Pai', 'אבא', 'Abba'),
  (2, 'Mãe', 'אמא', 'Ima'),
  (2, 'Irmão', 'אח', 'Ach'),
  (2, 'Irmã', 'אחות', 'Achot'),
  (2, 'Avô', 'סבא', 'Saba'),
  (2, 'Avó', 'סבתא', 'Savta'),
  (2, 'Filho', 'בן', 'Ben'),
  (2, 'Filha', 'בת', 'Bat')
ON CONFLICT DO NOTHING;

-- Insert sample words (Números - Numbers)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (3, 'Um', 'אחד', 'Echad'),
  (3, 'Dois', 'שניים', 'Shnayim'),
  (3, 'Três', 'שלושה', 'Shlosha'),
  (3, 'Quatro', 'ארבעה', 'Arba''a'),
  (3, 'Cinco', 'חמישה', 'Chamisha'),
  (3, 'Seis', 'שישה', 'Shisha'),
  (3, 'Sete', 'שבעה', 'Shiv''a'),
  (3, 'Oito', 'שמונה', 'Shmona'),
  (3, 'Nove', 'תשעה', 'Tish''a'),
  (3, 'Dez', 'עשרה', 'Asara')
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. VERIFY SETUP
-- ============================================

-- Check table counts
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Words', COUNT(*) FROM words
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'User Stats', COUNT(*) FROM user_stats
UNION ALL
SELECT 'User Progress', COUNT(*) FROM user_progress;

-- Display success message
DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete!';
  RAISE NOTICE '📊 Tables created: users, user_stats, categories, words, user_progress';
  RAISE NOTICE '🎯 Indexes created for optimal performance';
  RAISE NOTICE '🔄 Triggers set up for automatic timestamp updates';
  RAISE NOTICE '📝 Sample data inserted (if enabled)';
END $$;
