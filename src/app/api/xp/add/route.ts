import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  addXp,
  getUserStats,
  checkAchievements as checkDbAchievements,
} from '@/lib/db-level-system';
import { XP_REWARDS } from '@/lib/level-system';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/xp/add
 * Add XP to user's account
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await request.json();
    const { action, customAmount } = body;

    // Validate action or custom amount
    if (!action && !customAmount) {
      return NextResponse.json(
        { error: 'Must provide action or customAmount' },
        { status: 400 }
      );
    }

    // Get XP amount
    let xpAmount = customAmount;
    if (action && XP_REWARDS[action as keyof typeof XP_REWARDS]) {
      xpAmount = XP_REWARDS[action as keyof typeof XP_REWARDS];
    }

    if (!xpAmount || xpAmount <= 0) {
      return NextResponse.json({ error: 'Invalid XP amount' }, { status: 400 });
    }

    // Add XP
    const result = await addXp(userId, xpAmount, action);

    if (!result) {
      return NextResponse.json({ error: 'Failed to add XP' }, { status: 500 });
    }

    // Check for new achievements
    const newAchievements = await checkDbAchievements(userId);

    // Get updated stats for response
    const updatedStats = await getUserStats(userId);

    return NextResponse.json({
      success: true,
      xpGained: xpAmount,
      leveledUp: result.leveledUp,
      newLevel: result.newLevel,
      currentXp: updatedStats?.currentXp || 0,
      totalXp: result.newTotalXp,
      newAchievements: newAchievements || [],
    });
  } catch (error) {
    console.error('Error adding XP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
