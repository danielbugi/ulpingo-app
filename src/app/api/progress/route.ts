import { NextRequest, NextResponse } from 'next/server';
import { updateProgress } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wordId, isCorrect } = body;
    
    if (!wordId || typeof isCorrect !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    updateProgress(wordId, isCorrect);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
