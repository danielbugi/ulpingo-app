import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPool } from '@/lib/db-pool';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/quiz/save
 * Save a quiz attempt
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await request.json();
    const { categoryId, totalQuestions, correctAnswers, timeTaken } = body;

    // Validate required fields
    if (!categoryId || !totalQuestions || correctAnswers === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    const pool = getPool();
    const result = await pool.query(
      `INSERT INTO quiz_attempts 
       (user_id, category_id, total_questions, correct_answers, score_percentage, time_taken)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        userId,
        categoryId,
        totalQuestions,
        correctAnswers,
        scorePercentage,
        timeTaken || null,
      ]
    );

    // Get previous best score for this category
    const previousBest = await pool.query(
      `SELECT MAX(score_percentage) as best_score, COUNT(*) as attempt_count
       FROM quiz_attempts
       WHERE user_id = $1 AND category_id = $2 AND id != $3`,
      [userId, categoryId, result.rows[0].id]
    );

    const isNewBest =
      previousBest.rows[0].best_score === null ||
      scorePercentage > previousBest.rows[0].best_score;
    const isPerfect = scorePercentage === 100;
    const attemptNumber = parseInt(previousBest.rows[0].attempt_count) + 1;

    return NextResponse.json({
      success: true,
      attempt: result.rows[0],
      stats: {
        isNewBest,
        isPerfect,
        attemptNumber,
        previousBest: previousBest.rows[0].best_score || 0,
      },
    });
  } catch (error) {
    console.error('Error saving quiz attempt:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/quiz/history?categoryId=X
 * Get quiz attempt history
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const pool = getPool();

    let query;
    let params;

    if (categoryId) {
      // Get attempts for specific category
      query = `
        SELECT qa.*, c.name_pt as category_name
        FROM quiz_attempts qa
        JOIN categories c ON qa.category_id = c.id
        WHERE qa.user_id = $1 AND qa.category_id = $2
        ORDER BY qa.completed_at DESC
        LIMIT 20
      `;
      params = [userId, parseInt(categoryId)];
    } else {
      // Get all attempts
      query = `
        SELECT qa.*, c.name_pt as category_name
        FROM quiz_attempts qa
        JOIN categories c ON qa.category_id = c.id
        WHERE qa.user_id = $1
        ORDER BY qa.completed_at DESC
        LIMIT 50
      `;
      params = [userId];
    }

    const result = await pool.query(query, params);

    // Get statistics
    const statsQuery = `
      SELECT 
        COUNT(*) as total_attempts,
        AVG(score_percentage) as avg_score,
        MAX(score_percentage) as best_score,
        COUNT(CASE WHEN score_percentage = 100 THEN 1 END) as perfect_count
      FROM quiz_attempts
      WHERE user_id = $1 ${categoryId ? 'AND category_id = $2' : ''}
    `;
    const statsParams = categoryId ? [userId, parseInt(categoryId)] : [userId];
    const stats = await pool.query(statsQuery, statsParams);

    return NextResponse.json({
      attempts: result.rows,
      stats: stats.rows[0],
    });
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
