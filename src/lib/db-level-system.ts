/**
 * Database functions for Level System
 * Handles user stats, XP, achievements, and challenges
 */

import { getPool } from './db-pool';
import {
  UserStats,
  Achievement,
  LevelProgress,
  getLevelProgress,
  checkLevelUp,
  XP_REWARDS,
} from './level-system';

// ============= User Stats =============

/**
 * Get or create user stats
 */
export async function getUserStats(userId: number): Promise<UserStats | null> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    // Try to get existing stats
    let result = await client.query(
      'SELECT * FROM user_stats WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      // Create new stats
      result = await client.query(
        `INSERT INTO user_stats 
        (user_id, level, current_xp, total_xp, last_study_date) 
        VALUES ($1, 1, 0, 0, CURRENT_DATE) 
        RETURNING *`,
        [userId]
      );
    }

    const row = result.rows[0];
    return {
      userId: row.user_id,
      level: row.level,
      currentXp: row.current_xp,
      totalXp: row.total_xp,
      wordsLearned: row.words_learned,
      verbsLearned: row.verbs_learned,
      expressionsLearned: row.expressions_learned,
      sentencesLearned: row.sentences_learned,
      perfectQuizzes: row.perfect_quizzes,
      studyStreak: row.study_streak,
      longestStreak: row.longest_streak,
      lastStudyDate: row.last_study_date,
    };
  } finally {
    client.release();
  }
}

/**
 * Add XP to user and handle level ups
 */
export async function addXp(
  userId: number,
  xpAmount: number,
  reason: string
): Promise<{
  newTotalXp: number;
  leveledUp: boolean;
  newLevel?: number;
  oldLevel: number;
}> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Get current stats
    const stats = await getUserStats(userId);
    if (!stats) {
      throw new Error('User stats not found');
    }

    const oldTotalXp = stats.totalXp;
    const newTotalXp = oldTotalXp + xpAmount;

    // Check for level up
    const levelUpInfo = checkLevelUp(oldTotalXp, newTotalXp);

    // Update stats
    const progress = getLevelProgress(newTotalXp);
    await client.query(
      `UPDATE user_stats 
       SET total_xp = $1, 
           current_xp = $2, 
           level = $3,
           last_study_date = CURRENT_DATE
       WHERE user_id = $4`,
      [newTotalXp, progress.currentXp, progress.currentLevel, userId]
    );

    await client.query('COMMIT');

    return {
      newTotalXp,
      leveledUp: levelUpInfo.leveledUp,
      newLevel: levelUpInfo.newLevel,
      oldLevel: stats.level,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Update study streak
 */
export async function updateStudyStreak(
  userId: number
): Promise<{ currentStreak: number; isNewRecord: boolean }> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const stats = await getUserStats(userId);
    if (!stats) {
      throw new Error('User stats not found');
    }

    const today = new Date().toISOString().split('T')[0];
    const lastStudy = stats.lastStudyDate;

    let newStreak = 1;
    let isNewRecord = false;

    if (lastStudy) {
      const lastDate = new Date(lastStudy);
      const todayDate = new Date(today);
      const daysDiff = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 0) {
        // Already studied today
        return {
          currentStreak: stats.studyStreak,
          isNewRecord: false,
        };
      } else if (daysDiff === 1) {
        // Consecutive day
        newStreak = stats.studyStreak + 1;
      }
      // else: streak broken, newStreak stays 1
    }

    // Check if new record
    if (newStreak > stats.longestStreak) {
      isNewRecord = true;
    }

    await client.query(
      `UPDATE user_stats 
       SET study_streak = $1,
           longest_streak = GREATEST(longest_streak, $1),
           last_study_date = $2
       WHERE user_id = $3`,
      [newStreak, today, userId]
    );

    // Award streak XP
    if (newStreak >= 7) {
      await addXp(userId, XP_REWARDS.STREAK_WEEK, 'Weekly streak');
    } else if (newStreak >= 30) {
      await addXp(userId, XP_REWARDS.STREAK_MONTH, 'Monthly streak');
    } else {
      await addXp(userId, XP_REWARDS.STREAK_DAY, `Day ${newStreak} streak`);
    }

    return { currentStreak: newStreak, isNewRecord };
  } finally {
    client.release();
  }
}

/**
 * Increment learning counter by content type
 */
export async function incrementLearningCounter(
  userId: number,
  contentType: 'word' | 'verb' | 'expression' | 'sentence'
): Promise<void> {
  const pool = getPool();
  const columnMap = {
    word: 'words_learned',
    verb: 'verbs_learned',
    expression: 'expressions_learned',
    sentence: 'sentences_learned',
  };

  const column = columnMap[contentType];

  await pool.query(
    `UPDATE user_stats 
     SET ${column} = ${column} + 1 
     WHERE user_id = $1`,
    [userId]
  );
}

// ============= Achievements =============

/**
 * Get all achievements with user unlock status
 */
export async function getAchievements(userId?: number): Promise<Achievement[]> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    let query = `
      SELECT 
        a.id,
        a.key,
        a.name_pt as "namePt",
        a.name_he as "nameHe",
        a.description_pt as "descriptionPt",
        a.icon,
        a.rarity,
        a.xp_reward as "xpReward"
    `;

    if (userId) {
      query += `,
        CASE WHEN ua.user_id IS NOT NULL THEN true ELSE false END as unlocked,
        ua.unlocked_at as "unlockedAt"
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = $1
      ORDER BY a.id`;

      const result = await client.query(query, [userId]);
      return result.rows;
    } else {
      query += `
      FROM achievements a
      ORDER BY a.id`;

      const result = await client.query(query);
      return result.rows.map((row) => ({ ...row, unlocked: false }));
    }
  } finally {
    client.release();
  }
}

/**
 * Unlock achievement for user
 */
export async function unlockAchievement(
  userId: number,
  achievementKey: string
): Promise<{ success: boolean; xpAwarded: number; achievement?: Achievement }> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Get achievement
    const achResult = await client.query(
      'SELECT * FROM achievements WHERE key = $1',
      [achievementKey]
    );

    if (achResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return { success: false, xpAwarded: 0 };
    }

    const achievement = achResult.rows[0];

    // Check if already unlocked
    const checkResult = await client.query(
      'SELECT id FROM user_achievements WHERE user_id = $1 AND achievement_id = $2',
      [userId, achievement.id]
    );

    if (checkResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return { success: false, xpAwarded: 0 }; // Already unlocked
    }

    // Unlock achievement
    await client.query(
      'INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2)',
      [userId, achievement.id]
    );

    // Award XP
    await addXp(
      userId,
      achievement.xp_reward,
      `Achievement: ${achievement.name_pt}`
    );

    await client.query('COMMIT');

    return {
      success: true,
      xpAwarded: achievement.xp_reward,
      achievement: {
        id: achievement.id,
        key: achievement.key,
        namePt: achievement.name_pt,
        nameHe: achievement.name_he,
        descriptionPt: achievement.description_pt,
        icon: achievement.icon,
        rarity: achievement.rarity,
        xpReward: achievement.xp_reward,
        unlocked: true,
      },
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Check and unlock achievements based on user progress
 */
export async function checkAchievements(
  userId: number
): Promise<Achievement[]> {
  const stats = await getUserStats(userId);
  if (!stats) return [];

  const newlyUnlocked: Achievement[] = [];

  // Level achievements
  const levelChecks = [
    { level: 5, key: 'level_5' },
    { level: 10, key: 'level_10' },
    { level: 20, key: 'level_20' },
    { level: 50, key: 'level_50' },
  ];

  for (const check of levelChecks) {
    if (stats.level >= check.level) {
      const result = await unlockAchievement(userId, check.key);
      if (result.success && result.achievement) {
        newlyUnlocked.push(result.achievement);
      }
    }
  }

  // Streak achievements
  if (stats.studyStreak >= 7) {
    const result = await unlockAchievement(userId, 'streak_7');
    if (result.success && result.achievement) {
      newlyUnlocked.push(result.achievement);
    }
  }

  if (stats.studyStreak >= 30) {
    const result = await unlockAchievement(userId, 'streak_30');
    if (result.success && result.achievement) {
      newlyUnlocked.push(result.achievement);
    }
  }

  // Words learned
  const totalLearned =
    stats.wordsLearned +
    stats.verbsLearned +
    stats.expressionsLearned +
    stats.sentencesLearned;

  if (totalLearned >= 100) {
    const result = await unlockAchievement(userId, '100_words');
    if (result.success && result.achievement) {
      newlyUnlocked.push(result.achievement);
    }
  }

  return newlyUnlocked;
}

// ============= Daily Challenges =============

/**
 * Get today's daily challenge
 */
export async function getTodayChallenge(userId: number): Promise<{
  challenge: any;
  progress: number;
  completed: boolean;
} | null> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const today = new Date().toISOString().split('T')[0];

    // Get or create today's challenge
    let challengeResult = await client.query(
      'SELECT * FROM daily_challenges WHERE date = $1',
      [today]
    );

    if (challengeResult.rows.length === 0) {
      // Create a new challenge for today
      // Random challenge type
      const types = ['flashcards', 'quiz', 'accuracy'];
      const type = types[Math.floor(Math.random() * types.length)];
      const targets = { flashcards: 30, quiz: 50, accuracy: 90 };

      challengeResult = await client.query(
        `INSERT INTO daily_challenges (date, challenge_type, target_value, xp_reward)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [today, type, targets[type as keyof typeof targets], 75]
      );
    }

    const challenge = challengeResult.rows[0];

    // Get user progress
    const progressResult = await client.query(
      `SELECT progress, completed 
       FROM user_challenges 
       WHERE user_id = $1 AND challenge_id = $2`,
      [userId, challenge.id]
    );

    if (progressResult.rows.length === 0) {
      // Create progress entry
      await client.query(
        `INSERT INTO user_challenges (user_id, challenge_id, progress, completed)
         VALUES ($1, $2, 0, false)`,
        [userId, challenge.id]
      );

      return {
        challenge,
        progress: 0,
        completed: false,
      };
    }

    const userProgress = progressResult.rows[0];
    return {
      challenge,
      progress: userProgress.progress,
      completed: userProgress.completed,
    };
  } finally {
    client.release();
  }
}

/**
 * Update daily challenge progress
 */
export async function updateChallengeProgress(
  userId: number,
  progressIncrement: number
): Promise<{ completed: boolean; xpAwarded: number }> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const challengeData = await getTodayChallenge(userId);
    if (!challengeData || challengeData.completed) {
      return { completed: false, xpAwarded: 0 };
    }

    const { challenge } = challengeData;
    const newProgress = challengeData.progress + progressIncrement;

    await client.query(
      `UPDATE user_challenges 
       SET progress = $1,
           completed = CASE WHEN $1 >= $2 THEN true ELSE false END,
           completed_at = CASE WHEN $1 >= $2 THEN CURRENT_TIMESTAMP ELSE NULL END
       WHERE user_id = $3 AND challenge_id = $4`,
      [newProgress, challenge.target_value, userId, challenge.id]
    );

    if (newProgress >= challenge.target_value && !challengeData.completed) {
      // Challenge completed! Award XP
      await addXp(userId, challenge.xp_reward, 'Daily challenge completed');
      return { completed: true, xpAwarded: challenge.xp_reward };
    }

    return { completed: false, xpAwarded: 0 };
  } finally {
    client.release();
  }
}

export { getLevelProgress, checkLevelUp };
