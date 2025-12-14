import { NextRequest, NextResponse } from 'next/server';
import { getDueWords, getDueCount } from '@/lib/db-new';

// GET /api/review - Get words due for review
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    const words = await getDueWords(
      categoryId ? parseInt(categoryId) : undefined
    );
    const dueCount = await getDueCount();

    return NextResponse.json({ words, dueCount });
  } catch (error) {
    console.error('Error fetching due words:', error);
    return NextResponse.json(
      { error: 'Failed to fetch due words' },
      { status: 500 }
    );
  }
}
