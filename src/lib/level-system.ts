/**
 * Level System Utilities
 * Handles XP calculations, level progression, and rewards
 */

export interface UserStats {
  userId: number;
  level: number;
  currentXp: number;
  totalXp: number;
  wordsLearned: number;
  verbsLearned: number;
  expressionsLearned: number;
  sentencesLearned: number;
  perfectQuizzes: number;
  studyStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
}

export interface LevelProgress {
  currentLevel: number;
  currentXp: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progressPercent: number;
  xpNeededForNextLevel: number;
}

export interface Achievement {
  id: number;
  key: string;
  namePt: string;
  nameHe: string | null;
  descriptionPt: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  unlocked?: boolean;
  unlockedAt?: string;
}

export interface XPReward {
  amount: number;
  reason: string;
  newLevel?: number;
  leveledUp: boolean;
}

/**
 * Calculate XP needed for a specific level
 * Formula: level * 100 + (level - 1) * 50
 *
 * Examples:
 * Level 1: 100 XP
 * Level 2: 250 XP (100 + 50)
 * Level 5: 700 XP (500 + 200)
 * Level 10: 1450 XP
 */
export function xpForLevel(level: number): number {
  return level * 100 + (level - 1) * 50;
}

/**
 * Calculate total XP needed to reach a specific level
 */
export function totalXpForLevel(targetLevel: number): number {
  let total = 0;
  for (let level = 1; level < targetLevel; level++) {
    total += xpForLevel(level);
  }
  return total;
}

/**
 * Calculate current level from total XP
 */
export function calculateLevelFromXp(totalXp: number): number {
  let level = 1;
  let accumulatedXp = 0;

  while (true) {
    const xpNeeded = xpForLevel(level);
    if (accumulatedXp + xpNeeded > totalXp) {
      break;
    }
    accumulatedXp += xpNeeded;
    level++;
  }

  return level;
}

/**
 * Get level progress information
 */
export function getLevelProgress(totalXp: number): LevelProgress {
  const currentLevel = calculateLevelFromXp(totalXp);
  const xpForCurrentLevel = totalXpForLevel(currentLevel);
  const xpForNextLevel = totalXpForLevel(currentLevel + 1);
  const currentXp = totalXp - xpForCurrentLevel;
  const xpNeededForThisLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercent = Math.floor((currentXp / xpNeededForThisLevel) * 100);

  return {
    currentLevel,
    currentXp,
    xpForCurrentLevel,
    xpForNextLevel,
    progressPercent,
    xpNeededForNextLevel: xpNeededForThisLevel - currentXp,
  };
}

/**
 * XP Rewards by action type
 */
export const XP_REWARDS = {
  // Flashcards
  FLASHCARD_CORRECT: 10,
  FLASHCARD_CORRECT_FIRST_TRY: 15,
  FLASHCARD_STREAK_5: 25,
  FLASHCARD_STREAK_10: 50,

  // Quizzes
  QUIZ_COMPLETE: 50,
  QUIZ_PERFECT: 100,
  QUIZ_HARD_DIFFICULTY: 75,

  // Learning milestones
  WORD_MASTERED: 20, // 90%+ accuracy
  VERB_MASTERED: 25,
  EXPRESSION_MASTERED: 30,
  SENTENCE_MASTERED: 35,
  CATEGORY_COMPLETED: 200,

  // Daily activities
  DAILY_LOGIN: 10,
  DAILY_GOAL_MET: 50,
  DAILY_CHALLENGE_COMPLETE: 75,

  // Streaks
  STREAK_DAY: 15,
  STREAK_WEEK: 100,
  STREAK_MONTH: 500,

  // Achievements
  ACHIEVEMENT_COMMON: 50,
  ACHIEVEMENT_RARE: 100,
  ACHIEVEMENT_EPIC: 250,
  ACHIEVEMENT_LEGENDARY: 500,

  // Special
  REVIEW_DUE_WORD: 15, // Reviewing at optimal time
  COMEBACK_BONUS: 100, // Returning after 7+ days
} as const;

/**
 * Calculate XP reward with multipliers
 */
export function calculateXpReward(
  baseXp: number,
  multipliers?: {
    streak?: number; // Current streak multiplier
    perfectRun?: boolean; // Perfect quiz/flashcard run
    hardDifficulty?: boolean; // Hard difficulty content
    combo?: number; // Consecutive correct answers
  }
): number {
  let totalXp = baseXp;

  if (multipliers) {
    // Streak bonus: +5% per day (max 50%)
    if (multipliers.streak && multipliers.streak > 1) {
      const streakBonus = Math.min(multipliers.streak * 0.05, 0.5);
      totalXp += Math.floor(baseXp * streakBonus);
    }

    // Perfect run: +50%
    if (multipliers.perfectRun) {
      totalXp += Math.floor(baseXp * 0.5);
    }

    // Hard difficulty: +25%
    if (multipliers.hardDifficulty) {
      totalXp += Math.floor(baseXp * 0.25);
    }

    // Combo bonus: +5% per combo point (max 100%)
    if (multipliers.combo && multipliers.combo > 0) {
      const comboBonus = Math.min(multipliers.combo * 0.05, 1.0);
      totalXp += Math.floor(baseXp * comboBonus);
    }
  }

  return Math.floor(totalXp);
}

/**
 * Get level title based on level number
 */
export function getLevelTitle(level: number): {
  pt: string;
  he: string;
  color: string;
} {
  if (level < 3) {
    return {
      pt: 'Iniciante',
      he: 'מתחיל',
      color: 'text-gray-400',
    };
  } else if (level < 6) {
    return {
      pt: 'Aprendiz',
      he: 'לומד',
      color: 'text-blue-500',
    };
  } else if (level < 10) {
    return {
      pt: 'Estudante',
      he: 'תלמיד',
      color: 'text-green-500',
    };
  } else if (level < 15) {
    return {
      pt: 'Praticante',
      he: 'מתרגל',
      color: 'text-cyan-500',
    };
  } else if (level < 20) {
    return {
      pt: 'Avançado',
      he: 'מתקדם',
      color: 'text-purple-500',
    };
  } else if (level < 30) {
    return {
      pt: 'Expert',
      he: 'מומחה',
      color: 'text-orange-500',
    };
  } else if (level < 50) {
    return {
      pt: 'Mestre',
      he: 'מאסטר',
      color: 'text-yellow-500',
    };
  } else {
    return {
      pt: 'Lendário',
      he: 'אגדי',
      color: 'text-pink-500',
    };
  }
}

/**
 * Check if user leveled up and return level-up data
 */
export function checkLevelUp(
  oldTotalXp: number,
  newTotalXp: number
): { leveledUp: boolean; newLevel?: number; levelsGained?: number } {
  const oldLevel = calculateLevelFromXp(oldTotalXp);
  const newLevel = calculateLevelFromXp(newTotalXp);

  if (newLevel > oldLevel) {
    return {
      leveledUp: true,
      newLevel,
      levelsGained: newLevel - oldLevel,
    };
  }

  return { leveledUp: false };
}

/**
 * Get rarity color for achievements
 */
export function getRarityColor(
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-500 border-gray-400';
    case 'rare':
      return 'text-blue-500 border-blue-400';
    case 'epic':
      return 'text-purple-500 border-purple-400';
    case 'legendary':
      return 'text-yellow-500 border-yellow-400';
  }
}

/**
 * Format XP with thousands separator
 */
export function formatXp(xp: number): string {
  return xp.toLocaleString('pt-BR');
}

/**
 * Calculate estimated time to next level
 * Based on average XP per day
 */
export function estimateTimeToNextLevel(
  currentXp: number,
  averageXpPerDay: number
): string {
  const progress = getLevelProgress(currentXp);
  const daysNeeded = Math.ceil(progress.xpNeededForNextLevel / averageXpPerDay);

  if (daysNeeded === 0) return 'Hoje!';
  if (daysNeeded === 1) return '1 dia';
  if (daysNeeded <= 7) return `${daysNeeded} dias`;
  if (daysNeeded <= 30) return `${Math.ceil(daysNeeded / 7)} semanas`;
  return `${Math.ceil(daysNeeded / 30)} meses`;
}

/**
 * Content type multipliers for XP
 */
export const CONTENT_TYPE_XP = {
  word: 1.0,
  verb: 1.25,
  expression: 1.5,
  sentence: 1.75,
  phrase: 2.0,
} as const;

/**
 * Difficulty multipliers for XP
 */
export const DIFFICULTY_MULTIPLIERS = {
  1: 1.0, // Easy
  2: 1.25, // Medium
  3: 1.5, // Hard
  4: 1.75, // Very Hard
  5: 2.0, // Expert
} as const;
