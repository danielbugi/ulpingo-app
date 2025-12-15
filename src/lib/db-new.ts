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

// ============= Utility Functions =============

/**
 * Simple hash function to convert guest string ID to negative integer
 * Uses modulo to ensure result fits within PostgreSQL INTEGER range (-2147483648 to 2147483647)
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Ensure the result is within PostgreSQL INTEGER range
  // Use modulo with max safe integer for PostgreSQL (2147483647)
  const maxInt = 2147483647;
  return (Math.abs(hash) % maxInt) + 1; // +1 to avoid 0
}

/**
 * Safely convert userId (string/number/null) to database-safe value
 * Returns: null, positive integer (authenticated user), or negative integer (guest hash)
 */
function convertUserIdForDb(userId?: number | string | null): number | null {
  if (!userId) {
    return null;
  }

  if (typeof userId === 'string') {
    const hashed = hashString(userId);
    const negative = -hashed;

    // Safety check to ensure value is within PostgreSQL integer range
    if (negative < -2147483648 || negative > 2147483647) {
      console.error(
        `Invalid user ID hash: ${negative} from guest ID: ${userId}`
      );
      return null;
    }

    return negative;
  }

  if (typeof userId === 'number') {
    // Validate numeric user IDs are within range
    if (userId < -2147483648 || userId > 2147483647) {
      console.error(`Invalid numeric user ID: ${userId}`);
      return null;
    }
    return userId;
  }

  return null;
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

// Update user progress - supports both guest and authenticated users
export const updateProgress = async (
  wordId: number,
  isCorrect: boolean,
  userId?: number | string | null
): Promise<void> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const userIdValue = convertUserIdForDb(userId);

    await client.query(
      `
      INSERT INTO user_progress (user_id, word_id, correct_count, incorrect_count, last_reviewed)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (user_id, word_id) 
      DO UPDATE SET
        correct_count = user_progress.correct_count + $3,
        incorrect_count = user_progress.incorrect_count + $4,
        last_reviewed = NOW()
      `,
      [userIdValue, wordId, isCorrect ? 1 : 0, isCorrect ? 0 : 1]
    );
  } finally {
    client.release();
  }
};

// Get all progress - supports both guest and authenticated users
export const getProgress = async (
  userId?: number | string | null
): Promise<UserProgress[]> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const userIdValue = convertUserIdForDb(userId);

    const result = await client.query(
      `SELECT word_id, correct_count, incorrect_count, 
              last_reviewed::text as last_reviewed 
       FROM user_progress 
       WHERE user_id = $1 OR (user_id IS NULL AND $1 IS NULL)
       ORDER BY last_reviewed DESC`,
      [userIdValue]
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
  },
  userId?: number | string | null
): Promise<void> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const userIdValue = convertUserIdForDb(userId);

    await client.query(
      `
      INSERT INTO user_progress (
        user_id, word_id, correct_count, incorrect_count, 
        last_reviewed, ease_factor, interval, repetitions, 
        next_review_date, last_quality
      )
      VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9)
      ON CONFLICT (user_id, word_id) 
      DO UPDATE SET
        correct_count = user_progress.correct_count + $3,
        incorrect_count = user_progress.incorrect_count + $4,
        last_reviewed = NOW(),
        ease_factor = $5,
        interval = $6,
        repetitions = $7,
        next_review_date = $8,
        last_quality = $9
      `,
      [
        userIdValue,
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
export const getDueWords = async (
  categoryId?: number,
  userId?: number | string | null
): Promise<Word[]> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const userIdValue = convertUserIdForDb(userId);

    let query = `
      SELECT w.id, w.category_id, w.word_pt, w.word_he, w.transliteration
      FROM words w
      LEFT JOIN user_progress up ON w.id = up.word_id AND (up.user_id = $1 OR (up.user_id IS NULL AND $1 IS NULL))
      WHERE up.next_review_date <= NOW() OR up.next_review_date IS NULL
    `;

    const params: any[] = [userIdValue];

    if (categoryId) {
      query += ` AND w.category_id = $2`;
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
export const getDueCount = async (
  userId?: number | string | null
): Promise<number> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const userIdValue = convertUserIdForDb(userId);

    const result = await client.query(
      `
      SELECT COUNT(DISTINCT w.id) as count
      FROM words w
      LEFT JOIN user_progress up ON w.id = up.word_id AND (up.user_id = $1 OR (up.user_id IS NULL AND $1 IS NULL))
      WHERE up.next_review_date <= NOW() OR up.next_review_date IS NULL
      `,
      [userIdValue]
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
  wordId: number,
  userId?: number | string | null
): Promise<SRSProgress | null> => {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const userIdValue = convertUserIdForDb(userId);

    const result = await client.query(
      `
      SELECT word_id, ease_factor, interval, repetitions, 
             next_review_date::text, last_quality
      FROM user_progress
      WHERE word_id = $1 AND (user_id = $2 OR (user_id IS NULL AND $2 IS NULL))
      `,
      [wordId, userIdValue]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};

// ============= Guest Migration Functions =============

/**
 * Migrate guest progress to user account
 * Called after user signs up or signs in
 */
export const migrateGuestProgress = async (
  guestId: string,
  userId: number
): Promise<{ migrated: number; skipped: number }> => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const guestHashedId = convertUserIdForDb(guestId);

    if (!guestHashedId) {
      throw new Error('Invalid guest ID for migration');
    }

    // Get all guest progress
    const guestProgress = await client.query(
      'SELECT * FROM user_progress WHERE user_id = $1',
      [guestHashedId]
    );

    let migrated = 0;
    let skipped = 0;

    for (const progress of guestProgress.rows) {
      // Check if user already has progress for this word
      const existing = await client.query(
        'SELECT word_id FROM user_progress WHERE user_id = $1 AND word_id = $2',
        [userId, progress.word_id]
      );

      if (existing.rows.length > 0) {
        // User already has this word, skip migration
        skipped++;
      } else {
        // Migrate guest progress to user account
        await client.query(
          `INSERT INTO user_progress (
            user_id, word_id, correct_count, incorrect_count,
            last_reviewed, ease_factor, interval, repetitions,
            next_review_date, last_quality, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            userId,
            progress.word_id,
            progress.correct_count,
            progress.incorrect_count,
            progress.last_reviewed,
            progress.ease_factor,
            progress.interval,
            progress.repetitions,
            progress.next_review_date,
            progress.last_quality,
            progress.created_at,
            progress.updated_at,
          ]
        );
        migrated++;
      }
    }

    // Delete guest progress after successful migration
    await client.query('DELETE FROM user_progress WHERE user_id = $1', [
      guestHashedId,
    ]);

    await client.query('COMMIT');

    return { migrated, skipped };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
