const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

const db = new Database(path.join(dbPath, 'hebrew-learning.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_pt TEXT NOT NULL,
    name_he TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    word_pt TEXT NOT NULL,
    word_he TEXT NOT NULL,
    transliteration TEXT,
    image_url TEXT,
    audio_url TEXT,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  );

  CREATE TABLE IF NOT EXISTS user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word_id INTEGER NOT NULL,
    correct_count INTEGER DEFAULT 0,
    incorrect_count INTEGER DEFAULT 0,
    last_reviewed TEXT,
    FOREIGN KEY (word_id) REFERENCES words (id)
  );
`);

// Insert categories
const categories = [
  {
    name_pt: 'Primeiras Palavras',
    name_he: 'מילים ראשונות',
    icon: '🌟',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  {
    name_pt: 'Família',
    name_he: 'משפחה',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    name_pt: 'Comida',
    name_he: 'אוכל',
    icon: '🍎',
    color: 'bg-gradient-to-br from-orange-500 to-red-500',
  },
  {
    name_pt: 'Casa',
    name_he: 'בית',
    icon: '🏠',
    color: 'bg-gradient-to-br from-green-500 to-teal-500',
  },
  {
    name_pt: 'Números',
    name_he: 'מספרים',
    icon: '🔢',
    color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  },
  {
    name_pt: 'Cores',
    name_he: 'צבעים',
    icon: '🎨',
    color: 'bg-gradient-to-br from-pink-500 to-rose-500',
  },
];

const insertCategory = db.prepare(
  'INSERT INTO categories (name_pt, name_he, icon, color) VALUES (?, ?, ?, ?)'
);
categories.forEach((cat) => {
  insertCategory.run(cat.name_pt, cat.name_he, cat.icon, cat.color);
});

// Insert words
const words = [
  // Primeiras Palavras (category 1)
  {
    category_id: 1,
    word_pt: 'Olá',
    word_he: 'שלום',
    transliteration: 'Shalom',
  },
  {
    category_id: 1,
    word_pt: 'Obrigado',
    word_he: 'תודה',
    transliteration: 'Toda',
  },
  {
    category_id: 1,
    word_pt: 'Obrigada',
    word_he: 'תודה',
    transliteration: 'Toda',
  },
  { category_id: 1, word_pt: 'Sim', word_he: 'כן', transliteration: 'Ken' },
  { category_id: 1, word_pt: 'Não', word_he: 'לא', transliteration: 'Lo' },
  {
    category_id: 1,
    word_pt: 'Por favor',
    word_he: 'בבקשה',
    transliteration: 'Bevakasha',
  },
  {
    category_id: 1,
    word_pt: 'Desculpa',
    word_he: 'סליחה',
    transliteration: 'Slicha',
  },
  {
    category_id: 1,
    word_pt: 'Bom dia',
    word_he: 'בוקר טוב',
    transliteration: 'Boker Tov',
  },
  {
    category_id: 1,
    word_pt: 'Boa noite',
    word_he: 'לילה טוב',
    transliteration: 'Layla Tov',
  },
  {
    category_id: 1,
    word_pt: 'Tchau',
    word_he: 'להתראות',
    transliteration: 'Lehitraot',
  },

  // Família (category 2)
  {
    category_id: 2,
    word_pt: 'Família',
    word_he: 'משפחה',
    transliteration: 'Mishpacha',
  },
  { category_id: 2, word_pt: 'Pai', word_he: 'אבא', transliteration: 'Abba' },
  { category_id: 2, word_pt: 'Mãe', word_he: 'אמא', transliteration: 'Ima' },
  { category_id: 2, word_pt: 'Filho', word_he: 'בן', transliteration: 'Ben' },
  { category_id: 2, word_pt: 'Filha', word_he: 'בת', transliteration: 'Bat' },
  { category_id: 2, word_pt: 'Irmão', word_he: 'אח', transliteration: 'Ach' },
  {
    category_id: 2,
    word_pt: 'Irmã',
    word_he: 'אחות',
    transliteration: 'Achot',
  },
  { category_id: 2, word_pt: 'Avô', word_he: 'סבא', transliteration: 'Saba' },
  { category_id: 2, word_pt: 'Avó', word_he: 'סבתא', transliteration: 'Savta' },
  {
    category_id: 2,
    word_pt: 'Bebê',
    word_he: 'תינוק',
    transliteration: 'Tinok',
  },

  // Comida (category 3)
  {
    category_id: 3,
    word_pt: 'Comida',
    word_he: 'אוכל',
    transliteration: 'Ochel',
  },
  { category_id: 3, word_pt: 'Água', word_he: 'מים', transliteration: 'Mayim' },
  { category_id: 3, word_pt: 'Pão', word_he: 'לחם', transliteration: 'Lechem' },
  {
    category_id: 3,
    word_pt: 'Leite',
    word_he: 'חלב',
    transliteration: 'Chalav',
  },
  { category_id: 3, word_pt: 'Café', word_he: 'קפה', transliteration: 'Kafe' },
  {
    category_id: 3,
    word_pt: 'Maçã',
    word_he: 'תפוח',
    transliteration: 'Tapuach',
  },
  {
    category_id: 3,
    word_pt: 'Banana',
    word_he: 'בננה',
    transliteration: 'Banana',
  },
  {
    category_id: 3,
    word_pt: 'Ovo',
    word_he: 'ביצה',
    transliteration: 'Beitza',
  },
  {
    category_id: 3,
    word_pt: 'Queijo',
    word_he: 'גבינה',
    transliteration: 'Gvina',
  },
  {
    category_id: 3,
    word_pt: 'Salada',
    word_he: 'סלט',
    transliteration: 'Salat',
  },

  // Casa (category 4)
  { category_id: 4, word_pt: 'Casa', word_he: 'בית', transliteration: 'Bayit' },
  {
    category_id: 4,
    word_pt: 'Quarto',
    word_he: 'חדר',
    transliteration: 'Cheder',
  },
  {
    category_id: 4,
    word_pt: 'Cozinha',
    word_he: 'מטבח',
    transliteration: 'Mitbach',
  },
  {
    category_id: 4,
    word_pt: 'Banheiro',
    word_he: 'שירותים',
    transliteration: 'Sherutim',
  },
  {
    category_id: 4,
    word_pt: 'Sala',
    word_he: 'סלון',
    transliteration: 'Salon',
  },
  { category_id: 4, word_pt: 'Cama', word_he: 'מיטה', transliteration: 'Mita' },
  {
    category_id: 4,
    word_pt: 'Mesa',
    word_he: 'שולחן',
    transliteration: 'Shulchan',
  },
  {
    category_id: 4,
    word_pt: 'Cadeira',
    word_he: 'כיסא',
    transliteration: 'Kise',
  },
  {
    category_id: 4,
    word_pt: 'Porta',
    word_he: 'דלת',
    transliteration: 'Delet',
  },
  {
    category_id: 4,
    word_pt: 'Janela',
    word_he: 'חלון',
    transliteration: 'Chalon',
  },

  // Números (category 5)
  { category_id: 5, word_pt: 'Um', word_he: 'אחד', transliteration: 'Echad' },
  {
    category_id: 5,
    word_pt: 'Dois',
    word_he: 'שניים',
    transliteration: 'Shnayim',
  },
  {
    category_id: 5,
    word_pt: 'Três',
    word_he: 'שלושה',
    transliteration: 'Shlosha',
  },
  {
    category_id: 5,
    word_pt: 'Quatro',
    word_he: 'אַרבָּעָה',
    transliteration: "Arba'a",
  },
  {
    category_id: 5,
    word_pt: 'Cinco',
    word_he: 'חמישה',
    transliteration: 'Chamisha',
  },
  {
    category_id: 5,
    word_pt: 'Seis',
    word_he: 'שישה',
    transliteration: 'Shisha',
  },
  {
    category_id: 5,
    word_pt: 'Sete',
    word_he: 'שבעה',
    transliteration: "Shiv'a",
  },
  {
    category_id: 5,
    word_pt: 'Oito',
    word_he: 'שמונה',
    transliteration: 'Shmona',
  },
  {
    category_id: 5,
    word_pt: 'Nove',
    word_he: 'תשעה',
    transliteration: "Tish'a",
  },
  { category_id: 5, word_pt: 'Dez', word_he: 'עשרה', transliteration: 'Asara' },

  // Cores (category 6)
  {
    category_id: 6,
    word_pt: 'Vermelho',
    word_he: 'אדום',
    transliteration: 'Adom',
  },
  {
    category_id: 6,
    word_pt: 'Azul',
    word_he: 'כחול',
    transliteration: 'Kachol',
  },
  {
    category_id: 6,
    word_pt: 'Verde',
    word_he: 'ירוק',
    transliteration: 'Yarok',
  },
  {
    category_id: 6,
    word_pt: 'Amarelo',
    word_he: 'צהוב',
    transliteration: 'Tzahov',
  },
  {
    category_id: 6,
    word_pt: 'Preto',
    word_he: 'שחור',
    transliteration: 'Shachor',
  },
  {
    category_id: 6,
    word_pt: 'Branco',
    word_he: 'לבן',
    transliteration: 'Lavan',
  },
  {
    category_id: 6,
    word_pt: 'Rosa',
    word_he: 'ורוד',
    transliteration: 'Varod',
  },
  {
    category_id: 6,
    word_pt: 'Laranja',
    word_he: 'כתום',
    transliteration: 'Katom',
  },
  {
    category_id: 6,
    word_pt: 'Roxo',
    word_he: 'סגול',
    transliteration: 'Sagol',
  },
  {
    category_id: 6,
    word_pt: 'Marrom',
    word_he: 'חום',
    transliteration: 'Chum',
  },
];

const insertWord = db.prepare(
  'INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES (?, ?, ?, ?)'
);
words.forEach((word) => {
  insertWord.run(
    word.category_id,
    word.word_pt,
    word.word_he,
    word.transliteration
  );
});

console.log('✅ Database setup complete!');
console.log('📊 Inserted:');
console.log(`   - ${categories.length} categories`);
console.log(`   - ${words.length} words`);

db.close();
