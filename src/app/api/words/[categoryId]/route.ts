import { NextRequest, NextResponse } from 'next/server';
import { getWordsByCategory, getAllWords, getCategoryById } from '@/lib/db-new';
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from '@/lib/rate-limit';

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  // Rate limiting
  const identifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(identifier, RATE_LIMITS.API_GENERAL);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.reset).toISOString(),
        },
      }
    );
  }
  try {
    const categoryId = params.categoryId;

    let words;
    let categoryName;

    if (categoryId === 'all') {
      words = await getAllWords();
      categoryName = 'Todas as Categorias';
    } else {
      const id = parseInt(categoryId);
      words = await getWordsByCategory(id);
      const category = await getCategoryById(id);
      categoryName = category?.name_pt || 'Categoria';
    }

    return NextResponse.json({ words, categoryName });
  } catch (error) {
    console.error('Error fetching words:', error);
    return NextResponse.json(
      { error: 'Failed to fetch words' },
      { status: 500 }
    );
  }
}
