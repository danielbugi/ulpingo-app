import { NextRequest, NextResponse } from 'next/server';
import { getDueWords, getDueCount } from '@/lib/db-new';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/review - Get words due for review
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const guestId = searchParams.get('guestId');

    // Determine user ID (authenticated user or guest)
    const userId = session?.user?.id
      ? parseInt(session.user.id)
      : guestId || null;

    const words = await getDueWords(
      categoryId ? parseInt(categoryId) : undefined,
      userId
    );
    const dueCount = await getDueCount(userId);

    return NextResponse.json({
      words,
      dueCount,
      isGuest: !session?.user?.id,
    });
  } catch (error) {
    console.error('Error fetching due words:', error);
    return NextResponse.json(
      { error: 'Failed to fetch due words' },
      { status: 500 }
    );
  }
}
