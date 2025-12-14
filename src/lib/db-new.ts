import { getPool } from './db-pool';

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

export interface SRSProgress {
  word_id: number;
  ease_factor: number;
  interval: number;
  repetitions: number;
  next_review_date: string;
  last_quality: number;
}

// ============= Basic Functions =============

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name_pt, name_he, icon, color FROM categories ORDER BY id'
    );
    return result.rows;
  } finally {
    client.release();
  }
};

// Get category by ID
export const getCategoryById = async (
  id: number
): Promise<Category | undefined> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name_pt, name_he, icon, color FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Get words by category (randomized)
export const getWordsByCategory = async (
  categoryId: number
): Promise<Word[]> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, category_id, word_pt, word_he, transliteration FROM words WHERE category_id = $1 ORDER BY RANDOM()',
      [categoryId]
    );
    return result.rows;
  } finally {
    client.release();
  }
};

// Get all words (randomized)
export const getAllWords = async (): Promise<Word[]> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, category_id, word_pt, word_he, transliteration FROM words ORDER BY RANDOM()'
    );
    return result.rows;
  } finally {
    client.release();
  }
};

// Update user progress (for now, without user_id - we'll add auth later)
export const updateProgress = async (
  wordId: number,
  isCorrect: boolean
): Promise<void> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query(
      `
      INSERT INTO user_progress (user_id, word_id, correct_count, incorrect_count, last_reviewed)
      VALUES (NULL, $1, $2, $3, NOW())
      ON CONFLICT (user_id, word_id) 
      DO UPDATE SET
        correct_count = user_progress.correct_count + $2,
        incorrect_count = user_progress.incorrect_count + $3,
        last_reviewed = NOW()
      `,
      [wordId, isCorrect ? 1 : 0, isCorrect ? 0 : 1]
    );
  } finally {
    client.release();
  }
};

// Get all progress (for now, without user filtering)
export const getProgress = async (): Promise<UserProgress[]> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT word_id, correct_count, incorrect_count, 
              last_reviewed::text as last_reviewed 
       FROM user_progress 
       WHERE user_id IS NULL
       ORDER BY last_reviewed DESC`
    );
    return result.rows;
  } finally {
    client.release();
  }
};

// ============= SRS Functions =============

/**
 * Update progress with SRS data
 */
export const updateProgressWithSRS = async (
  wordId: number,
  quality: number,
  srsData: {
    ease_factor: number;
    interval: number;
    repetitions: number;
    next_review_date: Date;
  }
): Promise<void> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query(
      `
      INSERT INTO user_progress (
        user_id, word_id, correct_count, incorrect_count, 
        last_reviewed, ease_factor, interval, repetitions, 
        next_review_date, last_quality
      )
      VALUES (NULL, $1, $2, $3, NOW(), $4, $5, $6, $7, $8)
      ON CONFLICT (user_id, word_id) 
      DO UPDATE SET
        correct_count = user_progress.correct_count + $2,
        incorrect_count = user_progress.incorrect_count + $3,
        last_reviewed = NOW(),
        ease_factor = $4,
        interval = $5,
        repetitions = $6,
        next_review_date = $7,
        last_quality = $8
      `,
      [
        wordId,
        quality >= 3 ? 1 : 0, // correct_count
        quality < 3 ? 1 : 0, // incorrect_count
        srsData.ease_factor,
        srsData.interval,
        srsData.repetitions,
        srsData.next_review_date,
        quality,
      ]
    );
  } finally {
    client.release();
  }
};

/**
 * Get words due for review
 */
export const getDueWords = async (categoryId?: number): Promise<Word[]> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    let query = `
      SELECT w.id, w.category_id, w.word_pt, w.word_he, w.transliteration
      FROM words w
      LEFT JOIN user_progress up ON w.id = up.word_id AND up.user_id IS NULL
      WHERE up.next_review_date <= NOW() OR up.next_review_date IS NULL
    `;

    const params: any[] = [];

    if (categoryId) {
      query += ` AND w.category_id = $1`;
      params.push(categoryId);
    }

    query += ` ORDER BY COALESCE(up.next_review_date, NOW()) ASC LIMIT 20`;

    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
};

/**
 * Get count of words due for review
 */
export const getDueCount = async (): Promise<number> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT COUNT(DISTINCT w.id) as count
      FROM words w
      LEFT JOIN user_progress up ON w.id = up.word_id AND up.user_id IS NULL
      WHERE up.next_review_date <= NOW() OR up.next_review_date IS NULL
      `
    );
    return parseInt(result.rows[0].count);
  } finally {
    client.release();
  }
};

/**
 * Get SRS progress for a word
 */
export const getSRSProgress = async (
  wordId: number
): Promise<SRSProgress | null> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT word_id, ease_factor, interval, repetitions, 
             next_review_date::text, last_quality
      FROM user_progress
      WHERE word_id = $1 AND user_id IS NULL
      `,
      [wordId]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};
