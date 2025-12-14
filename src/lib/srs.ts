/**
 * SM-2 Spaced Repetition Algorithm
 * Based on SuperMemo 2 algorithm
 */

export interface SRSData {
  ease_factor: number; // Ease factor (1.3 to 2.5+)
  interval: number; // Days until next review
  repetitions: number; // Number of successful reviews
}

export interface SRSResult extends SRSData {
  next_review_date: Date;
}

/**
 * Calculate next review using SM-2 algorithm
 *
 * @param quality - Rating from 0-5:
 *   5 - Perfect response
 *   4 - Correct response with hesitation
 *   3 - Correct response with difficulty
 *   2 - Incorrect but remembered
 *   1 - Incorrect, barely remembered
 *   0 - Complete blackout
 *
 * @param currentData - Current SRS data for the word
 * @returns Updated SRS data with next review date
 */
export function calculateNextReview(
  quality: number,
  currentData: SRSData
): SRSResult {
  // Ensure quality is between 0-5
  quality = Math.max(0, Math.min(5, quality));

  let { ease_factor, interval, repetitions } = currentData;

  // Update ease factor
  ease_factor = Math.max(
    1.3,
    ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // If quality < 3, restart from beginning
  if (quality < 3) {
    repetitions = 0;
    interval = 0;
  } else {
    repetitions += 1;

    // Calculate new interval
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }
  }

  // Calculate next review date
  const next_review_date = new Date();
  next_review_date.setDate(next_review_date.getDate() + interval);

  return {
    ease_factor: Math.round(ease_factor * 100) / 100, // Round to 2 decimals
    interval,
    repetitions,
    next_review_date,
  };
}

/**
 * Map user-friendly rating to SM-2 quality (0-5)
 */
export function mapRatingToQuality(
  rating: 'again' | 'hard' | 'good' | 'easy'
): number {
  const ratingMap = {
    again: 0, // Complete fail - start over
    hard: 3, // Correct but difficult
    good: 4, // Correct with little hesitation
    easy: 5, // Perfect recall
  };
  return ratingMap[rating];
}

/**
 * Get initial SRS data for a new word
 */
export function getInitialSRSData(): SRSData {
  return {
    ease_factor: 2.5,
    interval: 0,
    repetitions: 0,
  };
}
