// Simple in-memory data store (no SQLite needed)

export interface Category {
  id: number;
  name_pt: string;
  name_he: string;
  icon: string;
  color: string;
}

export interface Word {
  id: number;
  category_id: number;
  word_pt: string;
  word_he: string;
  transliteration: string;
}

export interface UserProgress {
  word_id: number;
  correct_count: number;
  incorrect_count: number;
  last_reviewed: string;
}

// Categories data - 14 categories!
export const categories: Category[] = [
  {
    id: 1,
    name_pt: 'Primeiras Palavras',
    name_he: 'מילים ראשונות',
    icon: '🌟',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  {
    id: 2,
    name_pt: 'Família',
    name_he: 'משפחה',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name_pt: 'Comida',
    name_he: 'אוכל',
    icon: '🍎',
    color: 'bg-gradient-to-br from-orange-500 to-red-500',
  },
  {
    id: 4,
    name_pt: 'Casa',
    name_he: 'בית',
    icon: '🏠',
    color: 'bg-gradient-to-br from-green-500 to-teal-500',
  },
  {
    id: 5,
    name_pt: 'Números',
    name_he: 'מספרים',
    icon: '🔢',
    color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  },
  {
    id: 6,
    name_pt: 'Cores',
    name_he: 'צבעים',
    icon: '🎨',
    color: 'bg-gradient-to-br from-pink-500 to-rose-500',
  },
  {
    id: 7,
    name_pt: 'Transporte',
    name_he: 'תחבורה',
    icon: '🚗',
    color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
  },
  {
    id: 8,
    name_pt: 'Trabalho',
    name_he: 'עבודה',
    icon: '💼',
    color: 'bg-gradient-to-br from-gray-600 to-gray-800',
  },
  {
    id: 9,
    name_pt: 'Saúde',
    name_he: 'בריאות',
    icon: '🏥',
    color: 'bg-gradient-to-br from-red-500 to-pink-600',
  },
  {
    id: 10,
    name_pt: 'Compras',
    name_he: 'קניות',
    icon: '🛒',
    color: 'bg-gradient-to-br from-green-600 to-emerald-600',
  },
  {
    id: 11,
    name_pt: 'Clima',
    name_he: 'מזג אוויר',
    icon: '🌦️',
    color: 'bg-gradient-to-br from-sky-400 to-blue-600',
  },
  {
    id: 12,
    name_pt: 'Tempo',
    name_he: 'זמן',
    icon: '📆',
    color: 'bg-gradient-to-br from-violet-500 to-purple-600',
  },
  {
    id: 13,
    name_pt: 'Frases Úteis',
    name_he: 'ביטויים שימושיים',
    icon: '💬',
    color: 'bg-gradient-to-br from-cyan-500 to-teal-600',
  },
  {
    id: 14,
    name_pt: 'Roupas',
    name_he: 'בגדים',
    icon: '👕',
    color: 'bg-gradient-to-br from-fuchsia-500 to-pink-600',
  },
];

// Words data - 140 words total!
export const words: Word[] = [
  // Primeiras Palavras (category 1)
  {
    id: 1,
    category_id: 1,
    word_pt: 'Olá',
    word_he: 'שלום',
    transliteration: 'Shalom',
  },
  {
    id: 2,
    category_id: 1,
    word_pt: 'Obrigado',
    word_he: 'תודה',
    transliteration: 'Toda',
  },
  {
    id: 3,
    category_id: 1,
    word_pt: 'Obrigada',
    word_he: 'תודה',
    transliteration: 'Toda',
  },
  {
    id: 4,
    category_id: 1,
    word_pt: 'Sim',
    word_he: 'כן',
    transliteration: 'Ken',
  },
  {
    id: 5,
    category_id: 1,
    word_pt: 'Não',
    word_he: 'לא',
    transliteration: 'Lo',
  },
  {
    id: 6,
    category_id: 1,
    word_pt: 'Por favor',
    word_he: 'בבקשה',
    transliteration: 'Bevakasha',
  },
  {
    id: 7,
    category_id: 1,
    word_pt: 'Desculpa',
    word_he: 'סליחה',
    transliteration: 'Slicha',
  },
  {
    id: 8,
    category_id: 1,
    word_pt: 'Bom dia',
    word_he: 'בוקר טוב',
    transliteration: 'Boker Tov',
  },
  {
    id: 9,
    category_id: 1,
    word_pt: 'Boa noite',
    word_he: 'לילה טוב',
    transliteration: 'Layla Tov',
  },
  {
    id: 10,
    category_id: 1,
    word_pt: 'Tchau',
    word_he: 'להתראות',
    transliteration: 'Lehitraot',
  },

  // Família (category 2)
  {
    id: 11,
    category_id: 2,
    word_pt: 'Família',
    word_he: 'משפחה',
    transliteration: 'Mishpacha',
  },
  {
    id: 12,
    category_id: 2,
    word_pt: 'Pai',
    word_he: 'אבא',
    transliteration: 'Abba',
  },
  {
    id: 13,
    category_id: 2,
    word_pt: 'Mãe',
    word_he: 'אמא',
    transliteration: 'Ima',
  },
  {
    id: 14,
    category_id: 2,
    word_pt: 'Filho',
    word_he: 'בן',
    transliteration: 'Ben',
  },
  {
    id: 15,
    category_id: 2,
    word_pt: 'Filha',
    word_he: 'בת',
    transliteration: 'Bat',
  },
  {
    id: 16,
    category_id: 2,
    word_pt: 'Irmão',
    word_he: 'אח',
    transliteration: 'Ach',
  },
  {
    id: 17,
    category_id: 2,
    word_pt: 'Irmã',
    word_he: 'אחות',
    transliteration: 'Achot',
  },
  {
    id: 18,
    category_id: 2,
    word_pt: 'Avô',
    word_he: 'סבא',
    transliteration: 'Saba',
  },
  {
    id: 19,
    category_id: 2,
    word_pt: 'Avó',
    word_he: 'סבתא',
    transliteration: 'Savta',
  },
  {
    id: 20,
    category_id: 2,
    word_pt: 'Bebê',
    word_he: 'תינוק',
    transliteration: 'Tinok',
  },

  // Comida (category 3)
  {
    id: 21,
    category_id: 3,
    word_pt: 'Comida',
    word_he: 'אוכל',
    transliteration: 'Ochel',
  },
  {
    id: 22,
    category_id: 3,
    word_pt: 'Água',
    word_he: 'מים',
    transliteration: 'Mayim',
  },
  {
    id: 23,
    category_id: 3,
    word_pt: 'Pão',
    word_he: 'לחם',
    transliteration: 'Lechem',
  },
  {
    id: 24,
    category_id: 3,
    word_pt: 'Leite',
    word_he: 'חלב',
    transliteration: 'Chalav',
  },
  {
    id: 25,
    category_id: 3,
    word_pt: 'Café',
    word_he: 'קפה',
    transliteration: 'Kafe',
  },
  {
    id: 26,
    category_id: 3,
    word_pt: 'Maçã',
    word_he: 'תפוח',
    transliteration: 'Tapuach',
  },
  {
    id: 27,
    category_id: 3,
    word_pt: 'Banana',
    word_he: 'בננה',
    transliteration: 'Banana',
  },
  {
    id: 28,
    category_id: 3,
    word_pt: 'Ovo',
    word_he: 'ביצה',
    transliteration: 'Beitza',
  },
  {
    id: 29,
    category_id: 3,
    word_pt: 'Queijo',
    word_he: 'גבינה',
    transliteration: 'Gvina',
  },
  {
    id: 30,
    category_id: 3,
    word_pt: 'Salada',
    word_he: 'סלט',
    transliteration: 'Salat',
  },

  // Casa (category 4)
  {
    id: 31,
    category_id: 4,
    word_pt: 'Casa',
    word_he: 'בית',
    transliteration: 'Bayit',
  },
  {
    id: 32,
    category_id: 4,
    word_pt: 'Quarto',
    word_he: 'חדר',
    transliteration: 'Cheder',
  },
  {
    id: 33,
    category_id: 4,
    word_pt: 'Cozinha',
    word_he: 'מטבח',
    transliteration: 'Mitbach',
  },
  {
    id: 34,
    category_id: 4,
    word_pt: 'Banheiro',
    word_he: 'שירותים',
    transliteration: 'Sherutim',
  },
  {
    id: 35,
    category_id: 4,
    word_pt: 'Sala',
    word_he: 'סלון',
    transliteration: 'Salon',
  },
  {
    id: 36,
    category_id: 4,
    word_pt: 'Cama',
    word_he: 'מיטה',
    transliteration: 'Mita',
  },
  {
    id: 37,
    category_id: 4,
    word_pt: 'Mesa',
    word_he: 'שולחן',
    transliteration: 'Shulchan',
  },
  {
    id: 38,
    category_id: 4,
    word_pt: 'Cadeira',
    word_he: 'כיסא',
    transliteration: 'Kise',
  },
  {
    id: 39,
    category_id: 4,
    word_pt: 'Porta',
    word_he: 'דלת',
    transliteration: 'Delet',
  },
  {
    id: 40,
    category_id: 4,
    word_pt: 'Janela',
    word_he: 'חלון',
    transliteration: 'Chalon',
  },

  // Números (category 5)
  {
    id: 41,
    category_id: 5,
    word_pt: 'Um',
    word_he: 'אחד',
    transliteration: 'Echad',
  },
  {
    id: 42,
    category_id: 5,
    word_pt: 'Dois',
    word_he: 'שניים',
    transliteration: 'Shnayim',
  },
  {
    id: 43,
    category_id: 5,
    word_pt: 'Três',
    word_he: 'שלושה',
    transliteration: 'Shlosha',
  },
  {
    id: 44,
    category_id: 5,
    word_pt: 'Quatro',
    word_he: 'אַרבָּעָה',
    transliteration: "Arba'a",
  },
  {
    id: 45,
    category_id: 5,
    word_pt: 'Cinco',
    word_he: 'חמישה',
    transliteration: 'Chamisha',
  },
  {
    id: 46,
    category_id: 5,
    word_pt: 'Seis',
    word_he: 'שישה',
    transliteration: 'Shisha',
  },
  {
    id: 47,
    category_id: 5,
    word_pt: 'Sete',
    word_he: 'שבעה',
    transliteration: "Shiv'a",
  },
  {
    id: 48,
    category_id: 5,
    word_pt: 'Oito',
    word_he: 'שמונה',
    transliteration: 'Shmona',
  },
  {
    id: 49,
    category_id: 5,
    word_pt: 'Nove',
    word_he: 'תשעה',
    transliteration: "Tish'a",
  },
  {
    id: 50,
    category_id: 5,
    word_pt: 'Dez',
    word_he: 'עשרה',
    transliteration: 'Asara',
  },

  // Cores (category 6)
  {
    id: 51,
    category_id: 6,
    word_pt: 'Vermelho',
    word_he: 'אדום',
    transliteration: 'Adom',
  },
  {
    id: 52,
    category_id: 6,
    word_pt: 'Azul',
    word_he: 'כחול',
    transliteration: 'Kachol',
  },
  {
    id: 53,
    category_id: 6,
    word_pt: 'Verde',
    word_he: 'ירוק',
    transliteration: 'Yarok',
  },
  {
    id: 54,
    category_id: 6,
    word_pt: 'Amarelo',
    word_he: 'צהוב',
    transliteration: 'Tzahov',
  },
  {
    id: 55,
    category_id: 6,
    word_pt: 'Preto',
    word_he: 'שחור',
    transliteration: 'Shachor',
  },
  {
    id: 56,
    category_id: 6,
    word_pt: 'Branco',
    word_he: 'לבן',
    transliteration: 'Lavan',
  },
  {
    id: 57,
    category_id: 6,
    word_pt: 'Rosa',
    word_he: 'ורוד',
    transliteration: 'Varod',
  },
  {
    id: 58,
    category_id: 6,
    word_pt: 'Laranja',
    word_he: 'כתום',
    transliteration: 'Katom',
  },
  {
    id: 59,
    category_id: 6,
    word_pt: 'Roxo',
    word_he: 'סגול',
    transliteration: 'Sagol',
  },
  {
    id: 60,
    category_id: 6,
    word_pt: 'Marrom',
    word_he: 'חום',
    transliteration: 'Chum',
  },

  // Transporte (category 7) - NEW!
  {
    id: 61,
    category_id: 7,
    word_pt: 'Carro',
    word_he: 'מכונית',
    transliteration: 'Mechonit',
  },
  {
    id: 62,
    category_id: 7,
    word_pt: 'Ônibus',
    word_he: 'אוטובוס',
    transliteration: 'Autobus',
  },
  {
    id: 63,
    category_id: 7,
    word_pt: 'Trem',
    word_he: 'רכבת',
    transliteration: 'Rakevet',
  },
  {
    id: 64,
    category_id: 7,
    word_pt: 'Táxi',
    word_he: 'מונית',
    transliteration: 'Monit',
  },
  {
    id: 65,
    category_id: 7,
    word_pt: 'Estação',
    word_he: 'תחנה',
    transliteration: 'Tachana',
  },
  {
    id: 66,
    category_id: 7,
    word_pt: 'Rua',
    word_he: 'רחוב',
    transliteration: 'Rechov',
  },
  {
    id: 67,
    category_id: 7,
    word_pt: 'Direita',
    word_he: 'ימין',
    transliteration: 'Yamin',
  },
  {
    id: 68,
    category_id: 7,
    word_pt: 'Esquerda',
    word_he: 'שמאל',
    transliteration: 'Smol',
  },
  {
    id: 69,
    category_id: 7,
    word_pt: 'Direto',
    word_he: 'ישר',
    transliteration: 'Yashar',
  },
  {
    id: 70,
    category_id: 7,
    word_pt: 'Parada',
    word_he: 'עצור',
    transliteration: 'Atzor',
  },

  // Trabalho (category 8) - NEW!
  {
    id: 71,
    category_id: 8,
    word_pt: 'Trabalho',
    word_he: 'עבודה',
    transliteration: 'Avoda',
  },
  {
    id: 72,
    category_id: 8,
    word_pt: 'Escritório',
    word_he: 'משרד',
    transliteration: 'Misrad',
  },
  {
    id: 73,
    category_id: 8,
    word_pt: 'Chefe',
    word_he: 'בוס',
    transliteration: 'Boss',
  },
  {
    id: 74,
    category_id: 8,
    word_pt: 'Trabalhador',
    word_he: 'עובד',
    transliteration: 'Oved',
  },
  {
    id: 75,
    category_id: 8,
    word_pt: 'Reunião',
    word_he: 'פגישה',
    transliteration: 'Pgisha',
  },
  {
    id: 76,
    category_id: 8,
    word_pt: 'Computador',
    word_he: 'מחשב',
    transliteration: 'Machshev',
  },
  {
    id: 77,
    category_id: 8,
    word_pt: 'Email',
    word_he: 'אימייל',
    transliteration: 'Email',
  },
  {
    id: 78,
    category_id: 8,
    word_pt: 'Salário',
    word_he: 'משכורת',
    transliteration: 'Maskoret',
  },
  {
    id: 79,
    category_id: 8,
    word_pt: 'Emprego',
    word_he: 'תעסוקה',
    transliteration: "Ta'asuka",
  },
  {
    id: 80,
    category_id: 8,
    word_pt: 'Projeto',
    word_he: 'פרויקט',
    transliteration: 'Proyekt',
  },

  // Saúde (category 9) - NEW!
  {
    id: 81,
    category_id: 9,
    word_pt: 'Médico',
    word_he: 'רופא',
    transliteration: 'Rofe',
  },
  {
    id: 82,
    category_id: 9,
    word_pt: 'Hospital',
    word_he: 'בית חולים',
    transliteration: 'Beit Cholim',
  },
  {
    id: 83,
    category_id: 9,
    word_pt: 'Remédio',
    word_he: 'תרופה',
    transliteration: 'Trufa',
  },
  {
    id: 84,
    category_id: 9,
    word_pt: 'Doente',
    word_he: 'חולה',
    transliteration: 'Chole',
  },
  {
    id: 85,
    category_id: 9,
    word_pt: 'Dor',
    word_he: 'כאב',
    transliteration: "Ke'ev",
  },
  {
    id: 86,
    category_id: 9,
    word_pt: 'Saúde',
    word_he: 'בריאות',
    transliteration: 'Briut',
  },
  {
    id: 87,
    category_id: 9,
    word_pt: 'Enfermeira',
    word_he: 'אחות',
    transliteration: 'Achot',
  },
  {
    id: 88,
    category_id: 9,
    word_pt: 'Farmácia',
    word_he: 'בית מרקחת',
    transliteration: 'Beit Mirkachat',
  },
  {
    id: 89,
    category_id: 9,
    word_pt: 'Febre',
    word_he: 'חום',
    transliteration: 'Chom',
  },
  {
    id: 90,
    category_id: 9,
    word_pt: 'Consulta',
    word_he: 'תור',
    transliteration: 'Tor',
  },

  // Compras (category 10) - NEW!
  {
    id: 91,
    category_id: 10,
    word_pt: 'Loja',
    word_he: 'חנות',
    transliteration: 'Chanut',
  },
  {
    id: 92,
    category_id: 10,
    word_pt: 'Dinheiro',
    word_he: 'כסף',
    transliteration: 'Kesef',
  },
  {
    id: 93,
    category_id: 10,
    word_pt: 'Preço',
    word_he: 'מחיר',
    transliteration: 'Mechir',
  },
  {
    id: 94,
    category_id: 10,
    word_pt: 'Barato',
    word_he: 'זול',
    transliteration: 'Zol',
  },
  {
    id: 95,
    category_id: 10,
    word_pt: 'Caro',
    word_he: 'יקר',
    transliteration: 'Yakar',
  },
  {
    id: 96,
    category_id: 10,
    word_pt: 'Comprar',
    word_he: 'לקנות',
    transliteration: 'Liknot',
  },
  {
    id: 97,
    category_id: 10,
    word_pt: 'Vender',
    word_he: 'למכור',
    transliteration: 'Limkor',
  },
  {
    id: 98,
    category_id: 10,
    word_pt: 'Cartão',
    word_he: 'כרטיס',
    transliteration: 'Kartis',
  },
  {
    id: 99,
    category_id: 10,
    word_pt: 'Desconto',
    word_he: 'הנחה',
    transliteration: 'Hanacha',
  },
  {
    id: 100,
    category_id: 10,
    word_pt: 'Supermercado',
    word_he: 'סופרמרקט',
    transliteration: 'Supermarket',
  },

  // Clima (category 11) - NEW!
  {
    id: 101,
    category_id: 11,
    word_pt: 'Sol',
    word_he: 'שמש',
    transliteration: 'Shemesh',
  },
  {
    id: 102,
    category_id: 11,
    word_pt: 'Chuva',
    word_he: 'גשם',
    transliteration: 'Geshem',
  },
  {
    id: 103,
    category_id: 11,
    word_pt: 'Frio',
    word_he: 'קר',
    transliteration: 'Kar',
  },
  {
    id: 104,
    category_id: 11,
    word_pt: 'Quente',
    word_he: 'חם',
    transliteration: 'Cham',
  },
  {
    id: 105,
    category_id: 11,
    word_pt: 'Nuvem',
    word_he: 'ענן',
    transliteration: 'Anan',
  },
  {
    id: 106,
    category_id: 11,
    word_pt: 'Vento',
    word_he: 'רוח',
    transliteration: 'Ruach',
  },
  {
    id: 107,
    category_id: 11,
    word_pt: 'Neve',
    word_he: 'שלג',
    transliteration: 'Sheleg',
  },
  {
    id: 108,
    category_id: 11,
    word_pt: 'Tempestade',
    word_he: 'סערה',
    transliteration: "Sa'ara",
  },
  {
    id: 109,
    category_id: 11,
    word_pt: 'Clima',
    word_he: 'מזג אוויר',
    transliteration: 'Mezeg Avir',
  },
  {
    id: 110,
    category_id: 11,
    word_pt: 'Temperatura',
    word_he: 'טמפרטורה',
    transliteration: 'Temperatura',
  },

  // Tempo (category 12) - NEW!
  {
    id: 111,
    category_id: 12,
    word_pt: 'Hoje',
    word_he: 'היום',
    transliteration: 'Hayom',
  },
  {
    id: 112,
    category_id: 12,
    word_pt: 'Amanhã',
    word_he: 'מחר',
    transliteration: 'Machar',
  },
  {
    id: 113,
    category_id: 12,
    word_pt: 'Ontem',
    word_he: 'אתמול',
    transliteration: 'Etmol',
  },
  {
    id: 114,
    category_id: 12,
    word_pt: 'Semana',
    word_he: 'שבוע',
    transliteration: 'Shavua',
  },
  {
    id: 115,
    category_id: 12,
    word_pt: 'Mês',
    word_he: 'חודש',
    transliteration: 'Chodesh',
  },
  {
    id: 116,
    category_id: 12,
    word_pt: 'Ano',
    word_he: 'שנה',
    transliteration: 'Shana',
  },
  {
    id: 117,
    category_id: 12,
    word_pt: 'Hora',
    word_he: 'שעה',
    transliteration: "Sha'a",
  },
  {
    id: 118,
    category_id: 12,
    word_pt: 'Minuto',
    word_he: 'דקה',
    transliteration: 'Daka',
  },
  {
    id: 119,
    category_id: 12,
    word_pt: 'Agora',
    word_he: 'עכשיו',
    transliteration: 'Achshav',
  },
  {
    id: 120,
    category_id: 12,
    word_pt: 'Depois',
    word_he: 'אחר כך',
    transliteration: 'Achar Kach',
  },

  // Frases Úteis (category 13) - NEW!
  {
    id: 121,
    category_id: 13,
    word_pt: 'Quanto custa?',
    word_he: 'כמה זה עולה?',
    transliteration: 'Kama ze ole?',
  },
  {
    id: 122,
    category_id: 13,
    word_pt: 'Onde fica?',
    word_he: 'איפה זה?',
    transliteration: 'Eifo ze?',
  },
  {
    id: 123,
    category_id: 13,
    word_pt: 'Eu entendo',
    word_he: 'אני מבין',
    transliteration: 'Ani mevin',
  },
  {
    id: 124,
    category_id: 13,
    word_pt: 'Não entendo',
    word_he: 'אני לא מבין',
    transliteration: 'Ani lo mevin',
  },
  {
    id: 125,
    category_id: 13,
    word_pt: 'Pode ajudar?',
    word_he: 'אתה יכול לעזור?',
    transliteration: "Ata yachol la'azor?",
  },
  {
    id: 126,
    category_id: 13,
    word_pt: 'Meu nome é',
    word_he: 'שמי',
    transliteration: 'Shmi',
  },
  {
    id: 127,
    category_id: 13,
    word_pt: 'Com licença',
    word_he: 'סליחה',
    transliteration: 'Slicha',
  },
  {
    id: 128,
    category_id: 13,
    word_pt: 'Está bem',
    word_he: 'בסדר',
    transliteration: 'Beseder',
  },
  {
    id: 129,
    category_id: 13,
    word_pt: 'Eu quero',
    word_he: 'אני רוצה',
    transliteration: 'Ani rotze',
  },
  {
    id: 130,
    category_id: 13,
    word_pt: 'Tudo bem',
    word_he: 'הכל בסדר',
    transliteration: 'Hakol beseder',
  },

  // Roupas (category 14) - NEW!
  {
    id: 131,
    category_id: 14,
    word_pt: 'Camisa',
    word_he: 'חולצה',
    transliteration: 'Chultza',
  },
  {
    id: 132,
    category_id: 14,
    word_pt: 'Calça',
    word_he: 'מכנסיים',
    transliteration: 'Michnasayim',
  },
  {
    id: 133,
    category_id: 14,
    word_pt: 'Sapato',
    word_he: 'נעל',
    transliteration: "Na'al",
  },
  {
    id: 134,
    category_id: 14,
    word_pt: 'Vestido',
    word_he: 'שמלה',
    transliteration: 'Simla',
  },
  {
    id: 135,
    category_id: 14,
    word_pt: 'Casaco',
    word_he: 'מעיל',
    transliteration: "Me'il",
  },
  {
    id: 136,
    category_id: 14,
    word_pt: 'Chapéu',
    word_he: 'כובע',
    transliteration: 'Kova',
  },
  {
    id: 137,
    category_id: 14,
    word_pt: 'Meia',
    word_he: 'גרב',
    transliteration: 'Gerev',
  },
  {
    id: 138,
    category_id: 14,
    word_pt: 'Bolsa',
    word_he: 'תיק',
    transliteration: 'Tik',
  },
  {
    id: 139,
    category_id: 14,
    word_pt: 'Óculos',
    word_he: 'משקפיים',
    transliteration: 'Mishkafayim',
  },
  {
    id: 140,
    category_id: 14,
    word_pt: 'Roupa',
    word_he: 'בגדים',
    transliteration: 'Bgadim',
  },
];

// In-memory progress storage (resets on refresh)
let progressStore: Map<number, UserProgress> = new Map();

// Helper functions
export const getCategories = (): Category[] => {
  return categories;
};

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

export const getWordsByCategory = (categoryId: number): Word[] => {
  return words
    .filter((word) => word.category_id === categoryId)
    .sort(() => Math.random() - 0.5);
};

export const getAllWords = (): Word[] => {
  return [...words].sort(() => Math.random() - 0.5);
};

export const updateProgress = (wordId: number, isCorrect: boolean): void => {
  const existing = progressStore.get(wordId);

  if (existing) {
    progressStore.set(wordId, {
      word_id: wordId,
      correct_count: existing.correct_count + (isCorrect ? 1 : 0),
      incorrect_count: existing.incorrect_count + (isCorrect ? 0 : 1),
      last_reviewed: new Date().toISOString(),
    });
  } else {
    progressStore.set(wordId, {
      word_id: wordId,
      correct_count: isCorrect ? 1 : 0,
      incorrect_count: isCorrect ? 0 : 1,
      last_reviewed: new Date().toISOString(),
    });
  }
};

export const getProgress = (): UserProgress[] => {
  return Array.from(progressStore.values());
};
