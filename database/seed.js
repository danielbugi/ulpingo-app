const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const categories = [
  { name_pt: 'Primeiras Palavras', name_he: 'מילים ראשונות', icon: '🌟', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  { name_pt: 'Família', name_he: 'משפחה', icon: '👨‍👩‍👧‍👦', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
  { name_pt: 'Comida', name_he: 'אוכל', icon: '🍎', color: 'bg-gradient-to-br from-orange-500 to-red-500' },
  { name_pt: 'Casa', name_he: 'בית', icon: '🏠', color: 'bg-gradient-to-br from-green-500 to-teal-500' },
  { name_pt: 'Números', name_he: 'מספרים', icon: '🔢', color: 'bg-gradient-to-br from-indigo-500 to-purple-500' },
  { name_pt: 'Cores', name_he: 'צבעים', icon: '🎨', color: 'bg-gradient-to-br from-pink-500 to-rose-500' },
  { name_pt: 'Transporte', name_he: 'תחבורה', icon: '🚗', color: 'bg-gradient-to-br from-yellow-500 to-orange-500' },
  { name_pt: 'Trabalho', name_he: 'עבודה', icon: '💼', color: 'bg-gradient-to-br from-gray-600 to-gray-800' },
  { name_pt: 'Saúde', name_he: 'בריאות', icon: '🏥', color: 'bg-gradient-to-br from-red-500 to-pink-600' },
  { name_pt: 'Compras', name_he: 'קניות', icon: '🛒', color: 'bg-gradient-to-br from-green-600 to-emerald-600' },
  { name_pt: 'Clima', name_he: 'מזג אוויר', icon: '🌦️', color: 'bg-gradient-to-br from-sky-400 to-blue-600' },
  { name_pt: 'Tempo', name_he: 'זמן', icon: '📆', color: 'bg-gradient-to-br from-violet-500 to-purple-600' },
  { name_pt: 'Frases Úteis', name_he: 'ביטויים שימושיים', icon: '💬', color: 'bg-gradient-to-br from-cyan-500 to-teal-600' },
  { name_pt: 'Roupas', name_he: 'בגדים', icon: '👕', color: 'bg-gradient-to-br from-fuchsia-500 to-pink-600' },
];

const words = [
  // Category 1 - Primeiras Palavras
  { category_id: 1, word_pt: 'Olá', word_he: 'שלום', transliteration: 'Shalom' },
  { category_id: 1, word_pt: 'Obrigado', word_he: 'תודה', transliteration: 'Toda' },
  { category_id: 1, word_pt: 'Sim', word_he: 'כן', transliteration: 'Ken' },
  { category_id: 1, word_pt: 'Não', word_he: 'לא', transliteration: 'Lo' },
  { category_id: 1, word_pt: 'Por favor', word_he: 'בבקשה', transliteration: 'Bevakasha' },
  { category_id: 1, word_pt: 'Desculpa', word_he: 'סליחה', transliteration: 'Slicha' },
  { category_id: 1, word_pt: 'Bom dia', word_he: 'בוקר טוב', transliteration: 'Boker Tov' },
  { category_id: 1, word_pt: 'Boa noite', word_he: 'לילה טוב', transliteration: 'Layla Tov' },
  { category_id: 1, word_pt: 'Tchau', word_he: 'להתראות', transliteration: 'Lehitraot' },
  { category_id: 1, word_pt: 'Como vai?', word_he: 'מה נשמע', transliteration: 'Ma Nishma' },
  
  // Category 2 - Família
  { category_id: 2, word_pt: 'Família', word_he: 'משפחה', transliteration: 'Mishpacha' },
  { category_id: 2, word_pt: 'Pai', word_he: 'אבא', transliteration: 'Abba' },
  { category_id: 2, word_pt: 'Mãe', word_he: 'אמא', transliteration: 'Ima' },
  { category_id: 2, word_pt: 'Filho', word_he: 'בן', transliteration: 'Ben' },
  { category_id: 2, word_pt: 'Filha', word_he: 'בת', transliteration: 'Bat' },
  { category_id: 2, word_pt: 'Irmão', word_he: 'אח', transliteration: 'Ach' },
  { category_id: 2, word_pt: 'Irmã', word_he: 'אחות', transliteration: 'Achot' },
  { category_id: 2, word_pt: 'Avô', word_he: 'סבא', transliteration: 'Saba' },
  { category_id: 2, word_pt: 'Avó', word_he: 'סבתא', transliteration: 'Savta' },
  { category_id: 2, word_pt: 'Bebê', word_he: 'תינוק', transliteration: 'Tinok' },

  // Category 3 - Comida
  { category_id: 3, word_pt: 'Comida', word_he: 'אוכל', transliteration: 'Ochel' },
  { category_id: 3, word_pt: 'Água', word_he: 'מים', transliteration: 'Mayim' },
  { category_id: 3, word_pt: 'Pão', word_he: 'לחם', transliteration: 'Lechem' },
  { category_id: 3, word_pt: 'Leite', word_he: 'חלב', transliteration: 'Chalav' },
  { category_id: 3, word_pt: 'Café', word_he: 'קפה', transliteration: 'Kafe' },
  { category_id: 3, word_pt: 'Maçã', word_he: 'תפוח', transliteration: 'Tapuach' },
  { category_id: 3, word_pt: 'Banana', word_he: 'בננה', transliteration: 'Banana' },
  { category_id: 3, word_pt: 'Ovo', word_he: 'ביצה', transliteration: 'Beitza' },
  { category_id: 3, word_pt: 'Queijo', word_he: 'גבינה', transliteration: 'Gvina' },
  { category_id: 3, word_pt: 'Salada', word_he: 'סלט', transliteration: 'Salat' },

  // Category 4 - Casa
  { category_id: 4, word_pt: 'Casa', word_he: 'בית', transliteration: 'Bayit' },
  { category_id: 4, word_pt: 'Quarto', word_he: 'חדר', transliteration: 'Cheder' },
  { category_id: 4, word_pt: 'Cozinha', word_he: 'מטבח', transliteration: 'Mitbach' },
  { category_id: 4, word_pt: 'Banheiro', word_he: 'שירותים', transliteration: 'Sherutim' },
  { category_id: 4, word_pt: 'Sala', word_he: 'סלון', transliteration: 'Salon' },
  { category_id: 4, word_pt: 'Cama', word_he: 'מיטה', transliteration: 'Mita' },
  { category_id: 4, word_pt: 'Mesa', word_he: 'שולחן', transliteration: 'Shulchan' },
  { category_id: 4, word_pt: 'Cadeira', word_he: 'כיסא', transliteration: 'Kise' },
  { category_id: 4, word_pt: 'Porta', word_he: 'דלת', transliteration: 'Delet' },
  { category_id: 4, word_pt: 'Janela', word_he: 'חלון', transliteration: 'Chalon' },

  // Category 5 - Números
  { category_id: 5, word_pt: 'Um', word_he: 'אחד', transliteration: 'Echad' },
  { category_id: 5, word_pt: 'Dois', word_he: 'שניים', transliteration: 'Shnayim' },
  { category_id: 5, word_pt: 'Três', word_he: 'שלושה', transliteration: 'Shlosha' },
  { category_id: 5, word_pt: 'Quatro', word_he: 'אַרבָּעָה', transliteration: "Arba'a" },
  { category_id: 5, word_pt: 'Cinco', word_he: 'חמישה', transliteration: 'Chamisha' },
  { category_id: 5, word_pt: 'Seis', word_he: 'שישה', transliteration: 'Shisha' },
  { category_id: 5, word_pt: 'Sete', word_he: 'שבעה', transliteration: "Shiv'a" },
  { category_id: 5, word_pt: 'Oito', word_he: 'שמונה', transliteration: 'Shmona' },
  { category_id: 5, word_pt: 'Nove', word_he: 'תשעה', transliteration: "Tish'a" },
  { category_id: 5, word_pt: 'Dez', word_he: 'עשרה', transliteration: 'Asara' },

  // Category 6 - Cores
  { category_id: 6, word_pt: 'Vermelho', word_he: 'אדום', transliteration: 'Adom' },
  { category_id: 6, word_pt: 'Azul', word_he: 'כחול', transliteration: 'Kachol' },
  { category_id: 6, word_pt: 'Verde', word_he: 'ירוק', transliteration: 'Yarok' },
  { category_id: 6, word_pt: 'Amarelo', word_he: 'צהוב', transliteration: 'Tzahov' },
  { category_id: 6, word_pt: 'Preto', word_he: 'שחור', transliteration: 'Shachor' },
  { category_id: 6, word_pt: 'Branco', word_he: 'לבן', transliteration: 'Lavan' },
  { category_id: 6, word_pt: 'Rosa', word_he: 'ורוד', transliteration: 'Varod' },
  { category_id: 6, word_pt: 'Laranja', word_he: 'כתום', transliteration: 'Katom' },
  { category_id: 6, word_pt: 'Roxo', word_he: 'סגול', transliteration: 'Sagol' },
  { category_id: 6, word_pt: 'Marrom', word_he: 'חום', transliteration: 'Chum' },

  // Continue with remaining categories (7-14) with 10 words each
  // Category 7 - Transporte
  { category_id: 7, word_pt: 'Carro', word_he: 'מכונית', transliteration: 'Mechonit' },
  { category_id: 7, word_pt: 'Ônibus', word_he: 'אוטובוס', transliteration: 'Otobus' },
  { category_id: 7, word_pt: 'Trem', word_he: 'רכבת', transliteration: 'Rakevet' },
  { category_id: 7, word_pt: 'Avião', word_he: 'מטוס', transliteration: 'Matos' },
  { category_id: 7, word_pt: 'Bicicleta', word_he: 'אופניים', transliteration: 'Ofanayim' },
  { category_id: 7, word_pt: 'Táxi', word_he: 'מונית', transliteration: 'Monit' },
  { category_id: 7, word_pt: 'Rua', word_he: 'רחוב', transliteration: 'Rechov' },
  { category_id: 7, word_pt: 'Parada', word_he: 'תחנה', transliteration: 'Tachana' },
  { category_id: 7, word_pt: 'Aeroporto', word_he: 'שדה תעופה', transliteration: 'Sde Teufa' },
  { category_id: 7, word_pt: 'Viagem', word_he: 'נסיעה', transliteration: 'Nesia' },

  // Category 8 - Trabalho
  { category_id: 8, word_pt: 'Trabalho', word_he: 'עבודה', transliteration: 'Avoda' },
  { category_id: 8, word_pt: 'Escritório', word_he: 'משרד', transliteration: 'Misrad' },
  { category_id: 8, word_pt: 'Computador', word_he: 'מחשב', transliteration: 'Machshev' },
  { category_id: 8, word_pt: 'Reunião', word_he: 'פגישה', transliteration: 'Pgisha' },
  { category_id: 8, word_pt: 'Chefe', word_he: 'בוס', transliteration: 'Boss' },
  { category_id: 8, word_pt: 'Colega', word_he: 'עמית', transliteration: 'Amit' },
  { category_id: 8, word_pt: 'Salário', word_he: 'משכורת', transliteration: 'Maskoret' },
  { category_id: 8, word_pt: 'Projeto', word_he: 'פרויקט', transliteration: 'Proyekt' },
  { category_id: 8, word_pt: 'Emprego', word_he: 'מקום עבודה', transliteration: 'Makom Avoda' },
  { category_id: 8, word_pt: 'Contrato', word_he: 'חוזה', transliteration: 'Choze' },

  // Category 9 - Saúde
  { category_id: 9, word_pt: 'Hospital', word_he: 'בית חולים', transliteration: 'Beit Cholim' },
  { category_id: 9, word_pt: 'Médico', word_he: 'רופא', transliteration: 'Rofe' },
  { category_id: 9, word_pt: 'Remédio', word_he: 'תרופה', transliteration: 'Trufa' },
  { category_id: 9, word_pt: 'Dor', word_he: 'כאב', transliteration: 'Keev' },
  { category_id: 9, word_pt: 'Febre', word_he: 'חום', transliteration: 'Chom' },
  { category_id: 9, word_pt: 'Doente', word_he: 'חולה', transliteration: 'Chole' },
  { category_id: 9, word_pt: 'Saúde', word_he: 'בריאות', transliteration: 'Briut' },
  { category_id: 9, word_pt: 'Enfermeiro', word_he: 'אח', transliteration: 'Ach' },
  { category_id: 9, word_pt: 'Consulta', word_he: 'תור', transliteration: 'Tor' },
  { category_id: 9, word_pt: 'Farmácia', word_he: 'בית מרקחת', transliteration: 'Beit Mirkachat' },

  // Category 10 - Compras
  { category_id: 10, word_pt: 'Loja', word_he: 'חנות', transliteration: 'Chanut' },
  { category_id: 10, word_pt: 'Mercado', word_he: 'סופרמרקט', transliteration: 'Supermarket' },
  { category_id: 10, word_pt: 'Dinheiro', word_he: 'כסף', transliteration: 'Kesef' },
  { category_id: 10, word_pt: 'Preço', word_he: 'מחיר', transliteration: 'Mechir' },
  { category_id: 10, word_pt: 'Caro', word_he: 'יקר', transliteration: 'Yakar' },
  { category_id: 10, word_pt: 'Barato', word_he: 'זול', transliteration: 'Zol' },
  { category_id: 10, word_pt: 'Comprar', word_he: 'לקנות', transliteration: 'Liknot' },
  { category_id: 10, word_pt: 'Vender', word_he: 'למכור', transliteration: 'Limkor' },
  { category_id: 10, word_pt: 'Cartão', word_he: 'כרטיס', transliteration: 'Kartis' },
  { category_id: 10, word_pt: 'Desconto', word_he: 'הנחה', transliteration: 'Hanacha' },

  // Category 11 - Clima
  { category_id: 11, word_pt: 'Sol', word_he: 'שמש', transliteration: 'Shemesh' },
  { category_id: 11, word_pt: 'Chuva', word_he: 'גשם', transliteration: 'Geshem' },
  { category_id: 11, word_pt: 'Vento', word_he: 'רוח', transliteration: 'Ruach' },
  { category_id: 11, word_pt: 'Nuvem', word_he: 'ענן', transliteration: 'Anan' },
  { category_id: 11, word_pt: 'Frio', word_he: 'קר', transliteration: 'Kar' },
  { category_id: 11, word_pt: 'Calor', word_he: 'חם', transliteration: 'Cham' },
  { category_id: 11, word_pt: 'Neve', word_he: 'שלג', transliteration: 'Sheleg' },
  { category_id: 11, word_pt: 'Trovão', word_he: 'רעם', transliteration: 'Raam' },
  { category_id: 11, word_pt: 'Tempestade', word_he: 'סופה', transliteration: 'Sufa' },
  { category_id: 11, word_pt: 'Temperatura', word_he: 'טמפרטורה', transliteration: 'Temperatura' },

  // Category 12 - Tempo
  { category_id: 12, word_pt: 'Hoje', word_he: 'היום', transliteration: 'Hayom' },
  { category_id: 12, word_pt: 'Amanhã', word_he: 'מחר', transliteration: 'Machar' },
  { category_id: 12, word_pt: 'Ontem', word_he: 'אתמול', transliteration: 'Etmol' },
  { category_id: 12, word_pt: 'Semana', word_he: 'שבוע', transliteration: 'Shavua' },
  { category_id: 12, word_pt: 'Mês', word_he: 'חודש', transliteration: 'Chodesh' },
  { category_id: 12, word_pt: 'Ano', word_he: 'שנה', transliteration: 'Shana' },
  { category_id: 12, word_pt: 'Hora', word_he: 'שעה', transliteration: 'Shaa' },
  { category_id: 12, word_pt: 'Minuto', word_he: 'דקה', transliteration: 'Daka' },
  { category_id: 12, word_pt: 'Dia', word_he: 'יום', transliteration: 'Yom' },
  { category_id: 12, word_pt: 'Noite', word_he: 'לילה', transliteration: 'Layla' },

  // Category 13 - Frases Úteis
  { category_id: 13, word_pt: 'Quanto custa?', word_he: 'כמה זה עולה', transliteration: 'Kama ze ole' },
  { category_id: 13, word_pt: 'Onde fica?', word_he: 'איפה זה', transliteration: 'Eifo ze' },
  { category_id: 13, word_pt: 'Eu entendo', word_he: 'אני מבין', transliteration: 'Ani mevin' },
  { category_id: 13, word_pt: 'Não entendo', word_he: 'אני לא מבין', transliteration: 'Ani lo mevin' },
  { category_id: 13, word_pt: 'Ajuda', word_he: 'עזרה', transliteration: 'Ezra' },
  { category_id: 13, word_pt: 'Emergência', word_he: 'חירום', transliteration: 'Chirum' },
  { category_id: 13, word_pt: 'Pode repetir?', word_he: 'אפשר לחזור', transliteration: 'Efshar lachzor' },
  { category_id: 13, word_pt: 'Fala inglês?', word_he: 'אתה מדבר אנגלית', transliteration: 'Ata medaber anglit' },
  { category_id: 13, word_pt: 'Meu nome é', word_he: 'קוראים לי', transliteration: 'Korim li' },
  { category_id: 13, word_pt: 'Com licença', word_he: 'סליחה', transliteration: 'Slicha' },

  // Category 14 - Roupas
  { category_id: 14, word_pt: 'Camisa', word_he: 'חולצה', transliteration: 'Chultza' },
  { category_id: 14, word_pt: 'Calça', word_he: 'מכנסיים', transliteration: 'Michnasayim' },
  { category_id: 14, word_pt: 'Sapato', word_he: 'נעל', transliteration: "Na'al" },
  { category_id: 14, word_pt: 'Vestido', word_he: 'שמלה', transliteration: 'Simla' },
  { category_id: 14, word_pt: 'Casaco', word_he: 'מעיל', transliteration: "Me'il" },
  { category_id: 14, word_pt: 'Chapéu', word_he: 'כובע', transliteration: 'Kova' },
  { category_id: 14, word_pt: 'Meia', word_he: 'גרב', transliteration: 'Gerev' },
  { category_id: 14, word_pt: 'Bolsa', word_he: 'תיק', transliteration: 'Tik' },
  { category_id: 14, word_pt: 'Óculos', word_he: 'משקפיים', transliteration: 'Mishkafayim' },
  { category_id: 14, word_pt: 'Roupa', word_he: 'בגדים', transliteration: 'Bgadim' },
];

async function seed() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    console.log('🗑️  Clearing existing data...');
    await client.query('TRUNCATE categories, words, user_progress CASCADE');

    console.log('📦 Inserting categories...');
    for (const category of categories) {
      await client.query(
        'INSERT INTO categories (name_pt, name_he, icon, color) VALUES ($1, $2, $3, $4)',
        [category.name_pt, category.name_he, category.icon, category.color]
      );
    }

    console.log('📚 Inserting words...');
    for (const word of words) {
      await client.query(
        'INSERT INTO words (category_id, word_pt, word_he, transliteration) VALUES ($1, $2, $3, $4)',
        [word.category_id, word.word_pt, word.word_he, word.transliteration]
      );
    }

    await client.query('COMMIT');

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Inserted:`);
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${words.length} words`);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
