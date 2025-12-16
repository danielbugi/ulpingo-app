/**
 * Gamification utilities for user engagement
 * Tracks streaks, achievements, and daily goals
 */

const STORAGE_KEYS = {
  STREAK: 'ulpingo_streak_data',
  ACHIEVEMENTS: 'ulpingo_achievements',
  DAILY_GOAL: 'ulpingo_daily_goal',
} as const;

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastVisit: string; // ISO date string
  totalDays: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface DailyGoal {
  target: number; // Number of words to learn per day
  completed: number;
  date: string; // ISO date string
}

/**
 * Get current streak data
 */
export function getStreakData(): StreakData {
  if (typeof window === 'undefined') {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastVisit: new Date().toISOString(),
      totalDays: 0,
    };
  }

  const stored = localStorage.getItem(STORAGE_KEYS.STREAK);
  if (!stored) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastVisit: new Date().toISOString(),
      totalDays: 0,
    };
  }

  return JSON.parse(stored);
}

/**
 * Update streak when user completes an activity
 */
export function updateStreak(): StreakData {
  const today = new Date().toISOString().split('T')[0];
  const streakData = getStreakData();
  const lastVisit = streakData.lastVisit.split('T')[0];

  // Same day - no update needed
  if (today === lastVisit) {
    return streakData;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Consecutive day
  if (lastVisit === yesterday) {
    streakData.currentStreak += 1;
    streakData.longestStreak = Math.max(
      streakData.longestStreak,
      streakData.currentStreak
    );
  }
  // Streak broken
  else if (lastVisit < yesterday) {
    streakData.currentStreak = 1;
  }

  streakData.lastVisit = new Date().toISOString();
  streakData.totalDays += 1;

  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streakData));
  return streakData;
}

/**
 * Get all achievements
 */
export function getAchievements(): Achievement[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  if (!stored) {
    return initializeAchievements();
  }

  return JSON.parse(stored);
}

/**
 * Initialize achievement system
 */
function initializeAchievements(): Achievement[] {
  const achievements: Achievement[] = [
    {
      id: 'first_word',
      name: 'Primeira Palavra',
      description: 'Aprenda sua primeira palavra em hebraico',
      icon: '🎯',
      unlocked: false,
    },
    {
      id: 'streak_3',
      name: 'Dedicado',
      description: 'Mantenha uma sequência de 3 dias',
      icon: '🔥',
      unlocked: false,
    },
    {
      id: 'streak_7',
      name: 'Comprometido',
      description: 'Mantenha uma sequência de 7 dias',
      icon: '⚡',
      unlocked: false,
    },
    {
      id: 'streak_30',
      name: 'Mestre da Consistência',
      description: 'Mantenha uma sequência de 30 dias',
      icon: '👑',
      unlocked: false,
    },
    {
      id: 'words_10',
      name: 'Aprendiz',
      description: 'Aprenda 10 palavras',
      icon: '📚',
      unlocked: false,
    },
    {
      id: 'words_50',
      name: 'Estudante',
      description: 'Aprenda 50 palavras',
      icon: '🎓',
      unlocked: false,
    },
    {
      id: 'words_100',
      name: 'Poliglota',
      description: 'Aprenda 100 palavras',
      icon: '🌟',
      unlocked: false,
    },
    {
      id: 'perfect_quiz',
      name: 'Perfeição',
      description: 'Complete um quiz com 100% de acertos',
      icon: '💯',
      unlocked: false,
    },
    {
      id: 'early_bird',
      name: 'Madrugador',
      description: 'Estude antes das 8h da manhã',
      icon: '🌅',
      unlocked: false,
    },
    {
      id: 'night_owl',
      name: 'Coruja Noturna',
      description: 'Estude depois das 22h',
      icon: '🦉',
      unlocked: false,
    },
  ];

  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  return achievements;
}

/**
 * Unlock an achievement
 */
export function unlockAchievement(achievementId: string): Achievement | null {
  const achievements = getAchievements();
  const achievement = achievements.find((a) => a.id === achievementId);

  if (!achievement || achievement.unlocked) {
    return null;
  }

  achievement.unlocked = true;
  achievement.unlockedAt = new Date().toISOString();

  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  return achievement;
}

/**
 * Check and unlock achievements based on current stats
 */
export function checkAchievements(stats: {
  wordsLearned: number;
  currentStreak: number;
  quizScore?: number;
  totalQuestions?: number;
}): Achievement[] {
  const newAchievements: Achievement[] = [];

  // Word-based achievements
  if (stats.wordsLearned >= 1) {
    const achievement = unlockAchievement('first_word');
    if (achievement) newAchievements.push(achievement);
  }
  if (stats.wordsLearned >= 10) {
    const achievement = unlockAchievement('words_10');
    if (achievement) newAchievements.push(achievement);
  }
  if (stats.wordsLearned >= 50) {
    const achievement = unlockAchievement('words_50');
    if (achievement) newAchievements.push(achievement);
  }
  if (stats.wordsLearned >= 100) {
    const achievement = unlockAchievement('words_100');
    if (achievement) newAchievements.push(achievement);
  }

  // Streak-based achievements
  if (stats.currentStreak >= 3) {
    const achievement = unlockAchievement('streak_3');
    if (achievement) newAchievements.push(achievement);
  }
  if (stats.currentStreak >= 7) {
    const achievement = unlockAchievement('streak_7');
    if (achievement) newAchievements.push(achievement);
  }
  if (stats.currentStreak >= 30) {
    const achievement = unlockAchievement('streak_30');
    if (achievement) newAchievements.push(achievement);
  }

  // Perfect quiz
  if (
    stats.quizScore !== undefined &&
    stats.totalQuestions !== undefined &&
    stats.quizScore === stats.totalQuestions &&
    stats.totalQuestions > 0
  ) {
    const achievement = unlockAchievement('perfect_quiz');
    if (achievement) newAchievements.push(achievement);
  }

  // Time-based achievements
  const hour = new Date().getHours();
  if (hour < 8) {
    const achievement = unlockAchievement('early_bird');
    if (achievement) newAchievements.push(achievement);
  }
  if (hour >= 22) {
    const achievement = unlockAchievement('night_owl');
    if (achievement) newAchievements.push(achievement);
  }

  return newAchievements;
}

/**
 * Get or create daily goal
 */
export function getDailyGoal(): DailyGoal {
  if (typeof window === 'undefined') {
    return {
      target: 10,
      completed: 0,
      date: new Date().toISOString().split('T')[0],
    };
  }

  const stored = localStorage.getItem(STORAGE_KEYS.DAILY_GOAL);
  const today = new Date().toISOString().split('T')[0];

  if (!stored) {
    const goal: DailyGoal = { target: 10, completed: 0, date: today };
    localStorage.setItem(STORAGE_KEYS.DAILY_GOAL, JSON.stringify(goal));
    return goal;
  }

  const goal: DailyGoal = JSON.parse(stored);

  // Reset if it's a new day
  if (goal.date !== today) {
    goal.completed = 0;
    goal.date = today;
    localStorage.setItem(STORAGE_KEYS.DAILY_GOAL, JSON.stringify(goal));
  }

  return goal;
}

/**
 * Update daily goal progress
 */
export function updateDailyGoal(increment: number = 1): DailyGoal {
  const goal = getDailyGoal();
  goal.completed += increment;
  localStorage.setItem(STORAGE_KEYS.DAILY_GOAL, JSON.stringify(goal));
  return goal;
}

/**
 * Set daily goal target
 */
export function setDailyGoalTarget(target: number): DailyGoal {
  const goal = getDailyGoal();
  goal.target = Math.max(1, target); // At least 1
  localStorage.setItem(STORAGE_KEYS.DAILY_GOAL, JSON.stringify(goal));
  return goal;
}
