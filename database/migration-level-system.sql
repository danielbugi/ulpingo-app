-- Migration: Add Level System and Enhanced Content Types
-- Date: 2025-12-19

-- Add level and difficulty fields to categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS difficulty_level INTEGER DEFAULT 1;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS required_level INTEGER DEFAULT 1;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS xp_reward INTEGER DEFAULT 10;

-- Add content type and difficulty to words
ALTER TABLE words ADD COLUMN IF NOT EXISTS content_type VARCHAR(20) DEFAULT 'word' CHECK (content_type IN ('word', 'verb', 'expression', 'sentence', 'phrase'));
ALTER TABLE words ADD COLUMN IF NOT EXISTS difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5);
ALTER TABLE words ADD COLUMN IF NOT EXISTS xp_value INTEGER DEFAULT 10;
ALTER TABLE words ADD COLUMN IF NOT EXISTS example_sentence TEXT;

-- Create user_stats table for level/XP tracking
CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER DEFAULT 1,
  current_xp INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  words_learned INTEGER DEFAULT 0,
  verbs_learned INTEGER DEFAULT 0,
  expressions_learned INTEGER DEFAULT 0,
  sentences_learned INTEGER DEFAULT 0,
  perfect_quizzes INTEGER DEFAULT 0,
  study_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_study_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  name_pt VARCHAR(100) NOT NULL,
  name_he VARCHAR(100),
  description_pt TEXT NOT NULL,
  icon VARCHAR(10) NOT NULL,
  rarity VARCHAR(20) DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  xp_reward INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_achievements junction table
CREATE TABLE IF NOT EXISTS user_achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

-- Create daily_challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  challenge_type VARCHAR(30) NOT NULL,
  target_value INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 50,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_challenges tracking
CREATE TABLE IF NOT EXISTS user_challenges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  challenge_id INTEGER REFERENCES daily_challenges(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  UNIQUE(user_id, challenge_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_user_stats_user ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_level ON user_stats(level);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_words_content_type ON words(content_type);
CREATE INDEX IF NOT EXISTS idx_words_difficulty ON words(difficulty);
CREATE INDEX IF NOT EXISTS idx_categories_required_level ON categories(required_level);
CREATE INDEX IF NOT EXISTS idx_daily_challenges_date ON daily_challenges(date);

-- Trigger for user_stats
CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate XP needed for next level
CREATE OR REPLACE FUNCTION xp_for_level(level_num INTEGER) 
RETURNS INTEGER AS $$
BEGIN
  -- Progressive XP curve: level * 100 + (level - 1) * 50
  RETURN level_num * 100 + (level_num - 1) * 50;
END;
$$ LANGUAGE plpgsql;

-- Function to get user level from total XP
CREATE OR REPLACE FUNCTION calculate_level_from_xp(total_xp INTEGER)
RETURNS INTEGER AS $$
DECLARE
  current_level INTEGER := 1;
  xp_needed INTEGER := 0;
  accumulated_xp INTEGER := 0;
BEGIN
  WHILE accumulated_xp <= total_xp LOOP
    xp_needed := xp_for_level(current_level);
    accumulated_xp := accumulated_xp + xp_needed;
    IF accumulated_xp <= total_xp THEN
      current_level := current_level + 1;
    END IF;
  END LOOP;
  RETURN current_level;
END;
$$ LANGUAGE plpgsql;

-- Update existing categories with difficulty levels
UPDATE categories SET difficulty_level = 1, required_level = 1 WHERE name_pt = 'Primeiras Palavras';
UPDATE categories SET difficulty_level = 1, required_level = 1 WHERE name_pt = 'Família';
UPDATE categories SET difficulty_level = 1, required_level = 2 WHERE name_pt = 'Comida';
UPDATE categories SET difficulty_level = 1, required_level = 2 WHERE name_pt = 'Casa';
UPDATE categories SET difficulty_level = 2, required_level = 3 WHERE name_pt = 'Números';
UPDATE categories SET difficulty_level = 2, required_level = 3 WHERE name_pt = 'Cores';
UPDATE categories SET difficulty_level = 2, required_level = 4 WHERE name_pt = 'Transporte';
UPDATE categories SET difficulty_level = 2, required_level = 5 WHERE name_pt = 'Trabalho';
UPDATE categories SET difficulty_level = 3, required_level = 6 WHERE name_pt = 'Saúde';
UPDATE categories SET difficulty_level = 3, required_level = 7 WHERE name_pt = 'Compras';
UPDATE categories SET difficulty_level = 3, required_level = 8 WHERE name_pt = 'Clima';
UPDATE categories SET difficulty_level = 3, required_level = 9 WHERE name_pt = 'Tempo';
UPDATE categories SET difficulty_level = 4, required_level = 10 WHERE name_pt = 'Frases Úteis';
UPDATE categories SET difficulty_level = 4, required_level = 10 WHERE name_pt = 'Roupas';

COMMENT ON TABLE user_stats IS 'Tracks user level, XP, and learning statistics';
COMMENT ON TABLE achievements IS 'Defines all available achievements in the game';
COMMENT ON TABLE user_achievements IS 'Tracks which achievements users have unlocked';
COMMENT ON TABLE daily_challenges IS 'Daily challenges for users to complete';
COMMENT ON FUNCTION xp_for_level IS 'Calculates XP needed to reach a specific level';
