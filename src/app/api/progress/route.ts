import { NextRequest, NextResponse } from 'next/server';
import { updateProgressWithSRS, getSRSProgress } from '@/lib/db-new';
import {
  calculateNextReview,
  getInitialSRSData,
  mapRatingToQuality,
} from '@/lib/srs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wordId, isCorrect, quality, rating } = body;

    // Support both old format (isCorrect) and new format (quality/rating)
    let finalQuality: number;

    if (rating) {
      // New SRS format with rating (again/hard/good/easy)
      finalQuality = mapRatingToQuality(
        rating as 'again' | 'hard' | 'good' | 'easy'
      );
    } else if (typeof quality === 'number') {
      // Direct quality score (0-5)
      finalQuality = quality;
    } else if (typeof isCorrect === 'boolean') {
      // Old format - convert to quality
      finalQuality = isCorrect ? 4 : 2;
    } else {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Get current SRS data or use initial values
    const currentProgress = await getSRSProgress(wordId);
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
    await updateProgressWithSRS(wordId, finalQuality, nextReview);

    return NextResponse.json({
      success: true,
      nextReview: nextReview.next_review_date,
      interval: nextReview.interval,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
