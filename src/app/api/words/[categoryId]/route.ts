import { NextRequest, NextResponse } from 'next/server';
import { getWordsByCategory, getAllWords, getCategoryById } from '@/lib/db-new';

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
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
