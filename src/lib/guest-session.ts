/**
 * Guest Session Management
 * Handles anonymous user sessions with localStorage
 */

const GUEST_ID_KEY = 'ulpingo_guest_id';
const GUEST_PROGRESS_KEY = 'ulpingo_guest_progress';
const GUEST_STATS_KEY = 'ulpingo_guest_stats';

/**
 * Generate a unique guest ID (shorter format to avoid hash collisions)
 */
export function generateGuestId(): string {
  // Use shorter format: guest_randomstring
  // This avoids issues with timestamp being too large
  const random = Math.random().toString(36).substring(2, 15);
  return `guest_${random}`;
}

/**
 * Validate guest ID format
 */
function isValidGuestId(id: string): boolean {
  return id.startsWith('guest_') && id.length >= 10 && id.length <= 50;
}

/**
 * Get or create guest ID
 */
export function getGuestId(): string {
  if (typeof window === 'undefined') return '';

  let guestId = localStorage.getItem(GUEST_ID_KEY);

  // Validate existing ID - if invalid, generate new one
  if (guestId && !isValidGuestId(guestId)) {
    console.warn('Invalid guest ID detected, generating new one');
    guestId = null;
  }

  if (!guestId) {
    guestId = generateGuestId();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }

  return guestId;
}

/**
 * Clear guest session (called after migration to user account)
 */
export function clearGuestSession(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(GUEST_ID_KEY);
  localStorage.removeItem(GUEST_PROGRESS_KEY);
  localStorage.removeItem(GUEST_STATS_KEY);
}

/**
 * Get guest progress from localStorage
 */
export function getGuestProgress(): Record<string, any> {
  if (typeof window === 'undefined') return {};

  const data = localStorage.getItem(GUEST_PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
}

/**
 * Save guest progress to localStorage
 */
export function saveGuestProgress(wordId: number, progressData: any): void {
  if (typeof window === 'undefined') return;

  const allProgress = getGuestProgress();
  allProgress[wordId] = progressData;
  localStorage.setItem(GUEST_PROGRESS_KEY, JSON.stringify(allProgress));
}

/**
 * Get guest stats
 */
export function getGuestStats(): {
  totalWords: number;
  correctCount: number;
  incorrectCount: number;
} {
  if (typeof window === 'undefined') {
    return { totalWords: 0, correctCount: 0, incorrectCount: 0 };
  }

  const data = localStorage.getItem(GUEST_STATS_KEY);
  return data
    ? JSON.parse(data)
    : { totalWords: 0, correctCount: 0, incorrectCount: 0 };
}

/**
 * Update guest stats
 */
export function updateGuestStats(isCorrect: boolean): void {
  if (typeof window === 'undefined') return;

  const stats = getGuestStats();
  if (isCorrect) {
    stats.correctCount++;
  } else {
    stats.incorrectCount++;
  }

  // Count unique words
  const progress = getGuestProgress();
  stats.totalWords = Object.keys(progress).length;

  localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(stats));
}

/**
 * Check if user should see signup prompt
 */
export function shouldPromptSignup(threshold: number = 20): boolean {
  const stats = getGuestStats();
  const totalAttempts = stats.correctCount + stats.incorrectCount;
  return totalAttempts >= threshold;
}

/**
 * Get all guest data for migration
 */
export function getAllGuestData() {
  return {
    guestId: getGuestId(),
    progress: getGuestProgress(),
    stats: getGuestStats(),
  };
}
