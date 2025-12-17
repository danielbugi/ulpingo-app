import { NextRequest, NextResponse } from 'next/server';
import { updateProgressWithSRS, getSRSProgress } from '@/lib/db-new';
import {
  calculateNextReview,
  getInitialSRSData,
  mapRatingToQuality,
} from '@/lib/srs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  APIError,
  handleAPIError,
  successResponse,
  validateRequiredFields,
} from '@/lib/api-utils';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { wordId, isCorrect, quality, rating, guestId } = body;

    // Validate wordId is present
    if (!wordId || typeof wordId !== 'number') {
      throw new APIError('Invalid or missing wordId', 400, 'INVALID_WORD_ID');
    }

    // Determine user ID (authenticated user or guest)
    const userId = session?.user?.id
      ? parseInt(session.user.id)
      : guestId || null;

    // Support both old format (isCorrect) and new format (quality/rating)
    let finalQuality: number;

    if (rating) {
      // New SRS format with rating (again/hard/good/easy)
      if (!['again', 'hard', 'good', 'easy'].includes(rating)) {
        throw new APIError('Invalid rating value', 400, 'INVALID_RATING');
      }
      finalQuality = mapRatingToQuality(
        rating as 'again' | 'hard' | 'good' | 'easy'
      );
    } else if (typeof quality === 'number') {
      // Direct quality score (0-5)
      if (quality < 0 || quality > 5) {
        throw new APIError(
          'Quality must be between 0 and 5',
          400,
          'INVALID_QUALITY'
        );
      }
      finalQuality = quality;
    } else if (typeof isCorrect === 'boolean') {
      // Old format - convert to quality
      finalQuality = isCorrect ? 4 : 2;
    } else {
      throw new APIError(
        'Must provide rating, quality, or isCorrect',
        400,
        'MISSING_PROGRESS_DATA'
      );
    }

    // Get current SRS data or use initial values
    const currentProgress = await getSRSProgress(wordId, userId);
    const currentSRS = currentProgress
      ? {
          ease_factor: currentProgress.ease_factor,
          interval: currentProgress.interval,
          repetitions: currentProgress.repetitions,
        }
      : getInitialSRSData();

    // Calculate next review
    const nextReview = calculateNextReview(finalQuality, currentSRS);

    // Update progress with SRS data
    await updateProgressWithSRS(wordId, finalQuality, nextReview, userId);

    return successResponse({
      success: true,
      nextReview: nextReview.next_review_date,
      interval: nextReview.interval,
      repetitions: nextReview.repetitions,
      easeFactor: nextReview.ease_factor,
      isGuest: !session?.user?.id,
    });
  } catch (error) {
    return handleAPIError(error);
  }
}
