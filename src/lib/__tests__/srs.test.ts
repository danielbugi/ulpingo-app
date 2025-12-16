/**
 * Unit tests for SRS (Spaced Repetition System) algorithm
 *
 * To run these tests, first install Jest:
 * npm install --save-dev jest @testing-library/react @testing-library/jest-dom @types/jest
 *
 * Then run: npm test
 */

import {
  calculateNextReview,
  mapRatingToQuality,
  getInitialSRSData,
} from '../srs';

describe('SRS Algorithm', () => {
  describe('calculateNextReview', () => {
    it('should initialize with correct default values', () => {
      const initialData = getInitialSRSData();
      expect(initialData.ease_factor).toBe(2.5);
      expect(initialData.interval).toBe(0);
      expect(initialData.repetitions).toBe(0);
    });

    it('should increase interval for correct answers', () => {
      const currentData = getInitialSRSData();
      const result = calculateNextReview(4, currentData);

      expect(result.repetitions).toBe(1);
      expect(result.interval).toBe(1);
      expect(result.ease_factor).toBeGreaterThanOrEqual(1.3);
    });

    it('should reset progress on quality < 3', () => {
      const currentData = {
        ease_factor: 2.5,
        interval: 10,
        repetitions: 5,
      };
      const result = calculateNextReview(2, currentData);

      expect(result.repetitions).toBe(0);
      expect(result.interval).toBe(0);
    });

    it('should increase interval exponentially after second repetition', () => {
      let data = getInitialSRSData();

      // First repetition: 1 day
      data = calculateNextReview(4, data);
      expect(data.interval).toBe(1);

      // Second repetition: 6 days
      data = calculateNextReview(4, data);
      expect(data.interval).toBe(6);

      // Third repetition: should multiply by ease factor
      data = calculateNextReview(4, data);
      expect(data.interval).toBeGreaterThan(6);
    });

    it('should clamp ease factor to minimum 1.3', () => {
      const currentData = {
        ease_factor: 1.3,
        interval: 5,
        repetitions: 2,
      };
      const result = calculateNextReview(0, currentData);

      expect(result.ease_factor).toBeGreaterThanOrEqual(1.3);
    });
  });

  describe('mapRatingToQuality', () => {
    it('should map ratings correctly', () => {
      expect(mapRatingToQuality('again')).toBe(0);
      expect(mapRatingToQuality('hard')).toBe(3);
      expect(mapRatingToQuality('good')).toBe(4);
      expect(mapRatingToQuality('easy')).toBe(5);
    });
  });
});
