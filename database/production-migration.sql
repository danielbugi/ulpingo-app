-- ============================================================================
-- ULPINGO PRODUCTION MIGRATION - FIXED
-- Complete schema update including level system, achievements, and roles
-- Date: 2025-12-20
-- ============================================================================

-- ============================================================================
-- PART 1: ADD ROLES TO USERS TABLE
-- ============================================================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_role_check') THEN
    ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
UPDATE users SET role = 'user' WHERE role IS NULL;
ALTER TABLE users ALTER COLUMN role SET NOT NULL;

-- ============================================================================
-- PART 2: ADD LEVEL SYSTEM COLUMNS TO CATEGORIES
-- ============================================================================

ALTER TABLE categories ADD COLUMN IF NOT EXISTS difficulty_level INTEGER DEFAULT 1;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS required_level INTEGER DEFAULT 1;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS xp_reward INTEGER DEFAULT 10;

-- ============================================================================
-- PART 3: ADD CONTENT TYPE AND DIFFICULTY TO WORDS
-- ============================================================================

ALTER TABLE words ADD COLUMN IF NOT EXISTS content_type VARCHAR(20) DEFAULT 'word';
ALTER TABLE words ADD COLUMN IF NOT EXISTS difficulty INTEGER DEFAULT 1;
ALTER TABLE words ADD COLUMN IF NOT EXISTS xp_value INTEGER DEFAULT 10;
ALTER TABLE words ADD COLUMN IF NOT EXISTS example_sentence TEXT;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'words_content_type_check') THEN
    ALTER TABLE words DROP CONSTRAINT words_content_type_check;
  END IF;
  ALTER TABLE words ADD CONSTRAINT words_content_type_check 
    CHECK (content_type IN ('word', 'verb', 'expression', 'sentence', 'phrase'));
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'words_difficulty_check') THEN
    ALTER TABLE words DROP CONSTRAINT words_difficulty_check;
  END IF;
  ALTER TABLE words ADD CONSTRAINT words_difficulty_check CHECK (difficulty BETWEEN 1 AND 5);
END $$;

-- ============================================================================
-- PART 4: CREATE OR UPDATE USER_STATS TABLE
-- ============================================================================

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
  total_words_learned INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  total_study_time INTEGER DEFAULT 0,
  perfect_sessions INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_stats') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'level') THEN
      ALTER TABLE user_stats ADD COLUMN level INTEGER DEFAULT 1;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'current_xp') THEN
      ALTER TABLE user_stats ADD COLUMN current_xp INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'total_xp') THEN
      ALTER TABLE user_stats ADD COLUMN total_xp INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'words_learned') THEN
      ALTER TABLE user_stats ADD COLUMN words_learned INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'verbs_learned') THEN
      ALTER TABLE user_stats ADD COLUMN verbs_learned INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'expressions_learned') THEN
      ALTER TABLE user_stats ADD COLUMN expressions_learned INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'sentences_learned') THEN
      ALTER TABLE user_stats ADD COLUMN sentences_learned INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'perfect_quizzes') THEN
      ALTER TABLE user_stats ADD COLUMN perfect_quizzes INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_stats' AND column_name = 'study_streak') THEN
      ALTER TABLE user_stats ADD COLUMN study_streak INTEGER DEFAULT 0;
    END IF;
    
    UPDATE user_stats SET study_streak = current_streak WHERE study_streak = 0 OR study_streak IS NULL;
    UPDATE user_stats SET longest_streak = GREATEST(COALESCE(longest_streak, 0), COALESCE(current_streak, 0)) WHERE longest_streak IS NULL OR longest_streak < current_streak;
  END IF;
END $$;

-- ============================================================================
-- PART 5: RECREATE ACHIEVEMENTS TABLE WITH NEW SCHEMA
-- ============================================================================

-- Drop old achievements tables
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;

-- Create new achievements table
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100),
  name_pt VARCHAR(100) NOT NULL,
  name_he VARCHAR(100),
  description TEXT,
  description_pt TEXT NOT NULL,
  icon VARCHAR(10) NOT NULL,
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  rarity VARCHAR(20) DEFAULT 'common',
  xp_reward INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

-- ============================================================================
-- PART 6: CREATE USER_ACHIEVEMENTS JUNCTION TABLE
-- ============================================================================

CREATE TABLE user_achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

-- ============================================================================
-- PART 7: CREATE DAILY CHALLENGES TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS daily_challenges (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  challenge_type VARCHAR(30) NOT NULL,
  target_value INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 50,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_challenges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  challenge_id INTEGER REFERENCES daily_challenges(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  UNIQUE(user_id, challenge_id)
);

-- ============================================================================
-- PART 8: CREATE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_stats_user ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_level ON user_stats(level);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement ON user_achievements(achievement_id);
CREATE INDEX IF NOT EXISTS idx_words_content_type ON words(content_type);
CREATE INDEX IF NOT EXISTS idx_words_difficulty ON words(difficulty);
CREATE INDEX IF NOT EXISTS idx_categories_required_level ON categories(required_level);
CREATE INDEX IF NOT EXISTS idx_daily_challenges_date ON daily_challenges(date);
CREATE INDEX IF NOT EXISTS idx_user_challenges_user ON user_challenges(user_id);

-- ============================================================================
-- PART 9: CREATE HELPER FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_stats_updated_at ON user_stats;
CREATE TRIGGER update_user_stats_updated_at 
  BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION xp_for_level(level_num INTEGER) 
RETURNS INTEGER AS $$
BEGIN
  RETURN level_num * 100 + (level_num - 1) * 50;
END;
$$ LANGUAGE plpgsql;

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

-- ============================================================================
-- PART 10: SEED ACHIEVEMENTS
-- ============================================================================

INSERT INTO achievements (key, name_pt, name_he, description_pt, icon, rarity, xp_reward, requirement_type, requirement_value) VALUES
  ('first_steps', 'Primeiros Passos', 'צעדים ראשונים', 'Aprenda suas primeiras 10 palavras', '🌱', 'common', 50, 'words_learned', 10),
  ('getting_started', 'Começando', 'מתחילים', 'Aprenda 50 palavras', '🌿', 'common', 100, 'words_learned', 50),
  ('week_warrior', 'Guerreiro Semanal', 'לוחם שבועי', 'Estude por 7 dias seguidos', '🔥', 'common', 100, 'streak_days', 7),
  ('perfectionist', 'Perfeccionista', 'פרפקציוניסט', 'Complete uma sessão com 100% de acerto', '⭐', 'common', 75, 'perfect_sessions', 1),
  ('word_master', 'Mestre das Palavras', 'מאסטר מילים', 'Aprenda todas as 140 palavras', '🏆', 'rare', 200, 'words_learned', 140),
  ('scholar', 'Estudioso', 'חוקר', 'Complete 10 sessões perfeitas', '📚', 'rare', 150, 'perfect_sessions', 10),
  ('category_master', 'Mestre de Categoria', 'מאסטר קטגוריה', 'Complete todas as palavras de uma categoria', '🎯', 'rare', 150, 'category_complete', 1),
  ('verb_master', 'Mestre dos Verbos', 'מאסטר פעלים', 'Aprenda 25 verbos', '🎭', 'rare', 150, 'verbs_learned', 25),
  ('monthly_champion', 'Campeão Mensal', 'אלוף חודשי', 'Estude por 30 dias seguidos', '💪', 'epic', 300, 'streak_days', 30),
  ('full_circle', 'Círculo Completo', 'מעגל שלם', 'Complete todas as 14 categorias', '🌟', 'epic', 350, 'all_categories', 14),
  ('speed_learner', 'Aprendiz Veloz', 'לומד מהיר', 'Revise 100 palavras em um dia', '⚡', 'epic', 250, 'reviews_per_day', 100),
  ('expression_expert', 'Expert em Expressões', 'מומחה ביטויים', 'Aprenda 20 expressões', '💬', 'epic', 250, 'expressions_learned', 20),
  ('grandmaster', 'Grão-Mestre', 'גרנד מאסטר', 'Alcance o nível 50', '👑', 'legendary', 500, 'level_reached', 50),
  ('polyglot', 'Poliglota', 'פוליגלוט', 'Aprenda 500 palavras/frases', '🌍', 'legendary', 500, 'total_learned', 500),
  ('dedication', 'Dedicação Total', 'מסירות מוחלטת', 'Estude por 100 dias seguidos', '💎', 'legendary', 500, 'streak_days', 100);

-- ============================================================================
-- PART 11: UPDATE EXISTING CATEGORIES WITH DIFFICULTY LEVELS
-- ============================================================================

UPDATE categories SET difficulty_level = 1, required_level = 1, xp_reward = 10 WHERE name_pt = 'Primeiras Palavras';
UPDATE categories SET difficulty_level = 1, required_level = 1, xp_reward = 10 WHERE name_pt = 'Família';
UPDATE categories SET difficulty_level = 1, required_level = 2, xp_reward = 15 WHERE name_pt = 'Comida';
UPDATE categories SET difficulty_level = 1, required_level = 2, xp_reward = 15 WHERE name_pt = 'Casa';
UPDATE categories SET difficulty_level = 2, required_level = 3, xp_reward = 20 WHERE name_pt = 'Números';
UPDATE categories SET difficulty_level = 2, required_level = 3, xp_reward = 20 WHERE name_pt = 'Cores';
UPDATE categories SET difficulty_level = 2, required_level = 4, xp_reward = 25 WHERE name_pt = 'Transporte';
UPDATE categories SET difficulty_level = 2, required_level = 5, xp_reward = 25 WHERE name_pt = 'Trabalho';
UPDATE categories SET difficulty_level = 3, required_level = 6, xp_reward = 30 WHERE name_pt = 'Saúde';
UPDATE categories SET difficulty_level = 3, required_level = 7, xp_reward = 30 WHERE name_pt = 'Compras';
UPDATE categories SET difficulty_level = 3, required_level = 8, xp_reward = 35 WHERE name_pt = 'Clima';
UPDATE categories SET difficulty_level = 3, required_level = 9, xp_reward = 35 WHERE name_pt = 'Tempo';
UPDATE categories SET difficulty_level = 4, required_level = 10, xp_reward = 40 WHERE name_pt = 'Frases Úteis';
UPDATE categories SET difficulty_level = 4, required_level = 10, xp_reward = 40 WHERE name_pt = 'Roupas';

-- ============================================================================
-- PART 12: CREATE USER_STATS FOR EXISTING USERS
-- ============================================================================

INSERT INTO user_stats (user_id, level, current_xp, total_xp, created_at, updated_at)
SELECT id, 1, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM users
WHERE id NOT IN (SELECT user_id FROM user_stats WHERE user_id IS NOT NULL)
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

SELECT 'Migration completed successfully!' as status,
       COUNT(*) as total_achievements FROM achievements;