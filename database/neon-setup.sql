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

-- Insert categories (14 total)
INSERT INTO categories (name_pt, name_he, icon, color) VALUES
  ('Primeiras Palavras', 'מילים ראשונות', '🌟', 'bg-gradient-to-br from-purple-500 to-pink-500'),
  ('Família', 'משפחה', '👨‍👩‍👧‍👦', 'bg-gradient-to-br from-blue-500 to-cyan-500'),
  ('Comida', 'אוכל', '🍎', 'bg-gradient-to-br from-orange-500 to-red-500'),
  ('Casa', 'בית', '🏠', 'bg-gradient-to-br from-green-500 to-teal-500'),
  ('Números', 'מספרים', '🔢', 'bg-gradient-to-br from-indigo-500 to-purple-500'),
  ('Cores', 'צבעים', '🎨', 'bg-gradient-to-br from-pink-500 to-rose-500'),
  ('Transporte', 'תחבורה', '🚗', 'bg-gradient-to-br from-yellow-500 to-orange-500'),
  ('Trabalho', 'עבודה', '💼', 'bg-gradient-to-br from-gray-600 to-gray-800'),
  ('Saúde', 'בריאות', '🏥', 'bg-gradient-to-br from-red-500 to-pink-600'),
  ('Compras', 'קניות', '🛒', 'bg-gradient-to-br from-green-600 to-emerald-600'),
  ('Clima', 'מזג אוויר', '🌦️', 'bg-gradient-to-br from-sky-400 to-blue-600'),
  ('Tempo', 'זמן', '📆', 'bg-gradient-to-br from-violet-500 to-purple-600'),
  ('Frases Úteis', 'ביטויים שימושיים', '💬', 'bg-gradient-to-br from-cyan-500 to-teal-600'),
  ('Roupas', 'בגדים', '👕', 'bg-gradient-to-br from-fuchsia-500 to-pink-600')
ON CONFLICT DO NOTHING;

-- Category 1: Primeiras Palavras (First Words)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (1, 'Olá', 'שלום', 'Shalom'),
  (1, 'Obrigado', 'תודה', 'Toda'),
  (1, 'Sim', 'כן', 'Ken'),
  (1, 'Não', 'לא', 'Lo'),
  (1, 'Por favor', 'בבקשה', 'Bevakasha'),
  (1, 'Desculpa', 'סליחה', 'Slicha'),
  (1, 'Bom dia', 'בוקר טוב', 'Boker Tov'),
  (1, 'Boa noite', 'לילה טוב', 'Layla Tov'),
  (1, 'Tchau', 'להתראות', 'Lehitraot'),
  (1, 'Como vai?', 'מה נשמע', 'Ma Nishma')
ON CONFLICT DO NOTHING;

-- Category 2: Família (Family)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (2, 'Família', 'משפחה', 'Mishpacha'),
  (2, 'Pai', 'אבא', 'Abba'),
  (2, 'Mãe', 'אמא', 'Ima'),
  (2, 'Filho', 'בן', 'Ben'),
  (2, 'Filha', 'בת', 'Bat'),
  (2, 'Irmão', 'אח', 'Ach'),
  (2, 'Irmã', 'אחות', 'Achot'),
  (2, 'Avô', 'סבא', 'Saba'),
  (2, 'Avó', 'סבתא', 'Savta'),
  (2, 'Bebê', 'תינוק', 'Tinok')
ON CONFLICT DO NOTHING;

-- Category 3: Comida (Food)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (3, 'Comida', 'אוכל', 'Ochel'),
  (3, 'Água', 'מים', 'Mayim'),
  (3, 'Pão', 'לחם', 'Lechem'),
  (3, 'Leite', 'חלב', 'Chalav'),
  (3, 'Café', 'קפה', 'Kafe'),
  (3, 'Maçã', 'תפוח', 'Tapuach'),
  (3, 'Banana', 'בננה', 'Banana'),
  (3, 'Ovo', 'ביצה', 'Beitza'),
  (3, 'Queijo', 'גבינה', 'Gvina'),
  (3, 'Salada', 'סלט', 'Salat')
ON CONFLICT DO NOTHING;

-- Category 4: Casa (House)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (4, 'Casa', 'בית', 'Bayit'),
  (4, 'Quarto', 'חדר', 'Cheder'),
  (4, 'Cozinha', 'מטבח', 'Mitbach'),
  (4, 'Banheiro', 'שירותים', 'Sherutim'),
  (4, 'Sala', 'סלון', 'Salon'),
  (4, 'Cama', 'מיטה', 'Mita'),
  (4, 'Mesa', 'שולחן', 'Shulchan'),
  (4, 'Cadeira', 'כיסא', 'Kise'),
  (4, 'Porta', 'דלת', 'Delet'),
  (4, 'Janela', 'חלון', 'Chalon')
ON CONFLICT DO NOTHING;

-- Category 5: Números (Numbers)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (5, 'Um', 'אחד', 'Echad'),
  (5, 'Dois', 'שניים', 'Shnayim'),
  (5, 'Três', 'שלושה', 'Shlosha'),
  (5, 'Quatro', 'אַרבָּעָה', 'Arba''a'),
  (5, 'Cinco', 'חמישה', 'Chamisha'),
  (5, 'Seis', 'שישה', 'Shisha'),
  (5, 'Sete', 'שבעה', 'Shiv''a'),
  (5, 'Oito', 'שמונה', 'Shmona'),
  (5, 'Nove', 'תשעה', 'Tish''a'),
  (5, 'Dez', 'עשרה', 'Asara')
ON CONFLICT DO NOTHING;

-- Category 6: Cores (Colors)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (6, 'Vermelho', 'אדום', 'Adom'),
  (6, 'Azul', 'כחול', 'Kachol'),
  (6, 'Verde', 'ירוק', 'Yarok'),
  (6, 'Amarelo', 'צהוב', 'Tzahov'),
  (6, 'Preto', 'שחור', 'Shachor'),
  (6, 'Branco', 'לבן', 'Lavan'),
  (6, 'Rosa', 'ורוד', 'Varod'),
  (6, 'Laranja', 'כתום', 'Katom'),
  (6, 'Roxo', 'סגול', 'Sagol'),
  (6, 'Marrom', 'חום', 'Chum')
ON CONFLICT DO NOTHING;

-- Category 7: Transporte (Transportation)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (7, 'Carro', 'מכונית', 'Mechonit'),
  (7, 'Ônibus', 'אוטובוס', 'Otobus'),
  (7, 'Trem', 'רכבת', 'Rakevet'),
  (7, 'Avião', 'מטוס', 'Matos'),
  (7, 'Bicicleta', 'אופניים', 'Ofanayim'),
  (7, 'Táxi', 'מונית', 'Monit'),
  (7, 'Rua', 'רחוב', 'Rechov'),
  (7, 'Parada', 'תחנה', 'Tachana'),
  (7, 'Aeroporto', 'שדה תעופה', 'Sde Teufa'),
  (7, 'Viagem', 'נסיעה', 'Nesia')
ON CONFLICT DO NOTHING;

-- Category 8: Trabalho (Work)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (8, 'Trabalho', 'עבודה', 'Avoda'),
  (8, 'Escritório', 'משרד', 'Misrad'),
  (8, 'Computador', 'מחשב', 'Machshev'),
  (8, 'Reunião', 'פגישה', 'Pgisha'),
  (8, 'Chefe', 'בוס', 'Boss'),
  (8, 'Colega', 'עמית', 'Amit'),
  (8, 'Salário', 'משכורת', 'Maskoret'),
  (8, 'Projeto', 'פרויקט', 'Proyekt'),
  (8, 'Emprego', 'מקום עבודה', 'Makom Avoda'),
  (8, 'Contrato', 'חוזה', 'Choze')
ON CONFLICT DO NOTHING;

-- Category 9: Saúde (Health)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (9, 'Hospital', 'בית חולים', 'Beit Cholim'),
  (9, 'Médico', 'רופא', 'Rofe'),
  (9, 'Remédio', 'תרופה', 'Trufa'),
  (9, 'Dor', 'כאב', 'Keev'),
  (9, 'Febre', 'חום', 'Chom'),
  (9, 'Doente', 'חולה', 'Chole'),
  (9, 'Saúde', 'בריאות', 'Briut'),
  (9, 'Enfermeiro', 'אח', 'Ach'),
  (9, 'Consulta', 'תור', 'Tor'),
  (9, 'Farmácia', 'בית מרקחת', 'Beit Mirkachat')
ON CONFLICT DO NOTHING;

-- Category 10: Compras (Shopping)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (10, 'Loja', 'חנות', 'Chanut'),
  (10, 'Mercado', 'סופרמרקט', 'Supermarket'),
  (10, 'Dinheiro', 'כסף', 'Kesef'),
  (10, 'Preço', 'מחיר', 'Mechir'),
  (10, 'Caro', 'יקר', 'Yakar'),
  (10, 'Barato', 'זול', 'Zol'),
  (10, 'Comprar', 'לקנות', 'Liknot'),
  (10, 'Vender', 'למכור', 'Limkor'),
  (10, 'Cartão', 'כרטיס', 'Kartis'),
  (10, 'Desconto', 'הנחה', 'Hanacha')
ON CONFLICT DO NOTHING;

-- Category 11: Clima (Weather)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (11, 'Sol', 'שמש', 'Shemesh'),
  (11, 'Chuva', 'גשם', 'Geshem'),
  (11, 'Vento', 'רוח', 'Ruach'),
  (11, 'Nuvem', 'ענן', 'Anan'),
  (11, 'Frio', 'קר', 'Kar'),
  (11, 'Calor', 'חם', 'Cham'),
  (11, 'Neve', 'שלג', 'Sheleg'),
  (11, 'Trovão', 'רעם', 'Raam'),
  (11, 'Tempestade', 'סופה', 'Sufa'),
  (11, 'Temperatura', 'טמפרטורה', 'Temperatura')
ON CONFLICT DO NOTHING;

-- Category 12: Tempo (Time)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (12, 'Hoje', 'היום', 'Hayom'),
  (12, 'Amanhã', 'מחר', 'Machar'),
  (12, 'Ontem', 'אתמול', 'Etmol'),
  (12, 'Semana', 'שבוע', 'Shavua'),
  (12, 'Mês', 'חודש', 'Chodesh'),
  (12, 'Ano', 'שנה', 'Shana'),
  (12, 'Hora', 'שעה', 'Shaa'),
  (12, 'Minuto', 'דקה', 'Daka'),
  (12, 'Dia', 'יום', 'Yom'),
  (12, 'Noite', 'לילה', 'Layla')
ON CONFLICT DO NOTHING;

-- Category 13: Frases Úteis (Useful Phrases)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (13, 'Quanto custa?', 'כמה זה עולה', 'Kama ze ole'),
  (13, 'Onde fica?', 'איפה זה', 'Eifo ze'),
  (13, 'Eu entendo', 'אני מבין', 'Ani mevin'),
  (13, 'Não entendo', 'אני לא מבין', 'Ani lo mevin'),
  (13, 'Ajuda', 'עזרה', 'Ezra'),
  (13, 'Emergência', 'חירום', 'Chirum'),
  (13, 'Pode repetir?', 'אפשר לחזור', 'Efshar lachzor'),
  (13, 'Fala inglês?', 'אתה מדבר אנגלית', 'Ata medaber anglit'),
  (13, 'Meu nome é', 'קוראים לי', 'Korim li'),
  (13, 'Com licença', 'סליחה', 'Slicha')
ON CONFLICT DO NOTHING;

-- Category 14: Roupas (Clothes)
INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES
  (14, 'Camisa', 'חולצה', 'Chultza'),
  (14, 'Calça', 'מכנסיים', 'Michnasayim'),
  (14, 'Sapato', 'נעל', 'Na''al'),
  (14, 'Vestido', 'שמלה', 'Simla'),
  (14, 'Casaco', 'מעיל', 'Me''il'),
  (14, 'Chapéu', 'כובע', 'Kova'),
  (14, 'Meia', 'גרב', 'Gerev'),
  (14, 'Bolsa', 'תיק', 'Tik'),
  (14, 'Óculos', 'משקפיים', 'Mishkafayim'),
  (14, 'Roupa', 'בגדים', 'Bgadim')
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
