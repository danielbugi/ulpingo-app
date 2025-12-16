/**
 * Constants used throughout the application
 */

// ============= SRS Constants =============
export const SRS_CONFIG = {
  MIN_EASE_FACTOR: 1.3,
  DEFAULT_EASE_FACTOR: 2.5,
  FIRST_INTERVAL: 1,
  SECOND_INTERVAL: 6,
  QUALITY_THRESHOLD: 3, // Below this, word is considered failed
} as const;

// ============= Review Constants =============
export const REVIEW_CONFIG = {
  MAX_DAILY_REVIEWS: 100,
  WORDS_PER_SESSION: 20,
  MIN_SESSION_SIZE: 5,
} as const;

// ============= UI Constants =============
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ============= Storage Keys =============
export const STORAGE_KEYS = {
  GUEST_ID: 'ulpingo_guest_id',
  GUEST_STATS: 'ulpingo_guest_stats',
  GUEST_PROGRESS: 'ulpingo_guest_progress',
  WELCOME_SHOWN: 'ulpingo_welcome_shown',
  USER_PREFERENCES: 'ulpingo_preferences',
  THEME: 'ulpingo_theme',
} as const;

// ============= API Routes =============
export const API_ROUTES = {
  AUTH: {
    REGISTER: '/api/auth/register',
    SIGNIN: '/api/auth/signin',
  },
  WORDS: {
    BY_CATEGORY: (categoryId: string | number) => `/api/words/${categoryId}`,
  },
  PROGRESS: '/api/progress',
  REVIEW: '/api/review',
  MIGRATE_GUEST: '/api/migrate-guest',
  HEALTH: '/api/health',
} as const;

// ============= Error Messages =============
export const ERROR_MESSAGES = {
  GENERIC: 'Algo deu errado. Por favor, tente novamente.',
  NETWORK: 'Erro de conexão. Verifique sua internet.',
  AUTH_REQUIRED: 'Você precisa estar logado para acessar este recurso.',
  NOT_FOUND: 'Recurso não encontrado.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
  VALIDATION: 'Dados inválidos. Verifique as informações.',
} as const;

// ============= Success Messages =============
export const SUCCESS_MESSAGES = {
  PROGRESS_SAVED: 'Progresso salvo com sucesso!',
  ACCOUNT_CREATED: 'Conta criada com sucesso!',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  REVIEW_COMPLETE: 'Revisão completa!',
  QUIZ_COMPLETE: 'Quiz concluído!',
} as const;

// ============= Gamification =============
export const ACHIEVEMENTS = {
  FIRST_WORD: { id: 'first_word', name: 'Primeira Palavra', threshold: 1 },
  TEN_WORDS: { id: 'ten_words', name: 'Dez Palavras', threshold: 10 },
  FIFTY_WORDS: { id: 'fifty_words', name: 'Meio Caminho', threshold: 50 },
  ALL_WORDS: { id: 'all_words', name: 'Mestre', threshold: 60 },
  FIRST_STREAK: { id: 'first_streak', name: 'Dedicado', threshold: 7 },
  MONTH_STREAK: { id: 'month_streak', name: 'Comprometido', threshold: 30 },
  PERFECT_QUIZ: { id: 'perfect_quiz', name: 'Perfeito', threshold: 100 },
} as const;

// ============= Language Settings =============
export const LANGUAGES = {
  PORTUGUESE: 'pt',
  HEBREW: 'he',
  ENGLISH: 'en',
} as const;

export const RTL_LANGUAGES = [LANGUAGES.HEBREW] as const;

// ============= Rate Limiting =============
export const RATE_LIMITS = {
  PROGRESS_UPDATE: { requests: 100, windowMs: 60000 }, // 100 per minute
  API_GENERAL: { requests: 200, windowMs: 60000 }, // 200 per minute
  AUTH: { requests: 5, windowMs: 300000 }, // 5 per 5 minutes
} as const;

// ============= Database =============
export const DB_CONFIG = {
  MAX_POOL_SIZE: 20,
  IDLE_TIMEOUT_MS: 30000,
  CONNECTION_TIMEOUT_MS: 2000,
} as const;

// ============= Feature Flags =============
export const FEATURES = {
  GOOGLE_AUTH: process.env.GOOGLE_CLIENT_ID ? true : false,
  ANALYTICS: process.env.NEXT_PUBLIC_ANALYTICS_ID ? true : false,
  PWA: false, // Set to true when PWA is implemented
  SOCIAL_SHARING: true,
  ADVANCED_STATS: true,
} as const;

// ============= Meta Information =============
export const META = {
  APP_NAME: 'Ulpingo',
  APP_DESCRIPTION:
    'A forma mais divertida e eficaz de aprender hebraico. Flashcards interativos, quizzes desafiadores e repetição espaçada.',
  AUTHOR: 'Daniel Bugi',
  KEYWORDS: [
    'hebraico',
    'hebrew',
    'aprender hebraico',
    'flashcards',
    'quiz',
    'português',
    'israel',
    'olim',
    'עברית',
  ],
  SOCIAL: {
    GITHUB: 'https://github.com/danielbugi/ulpingo-app',
  },
} as const;

// ============= Validation Rules =============
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;
