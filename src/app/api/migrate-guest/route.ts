import { NextRequest, NextResponse } from 'next/server';
import { migrateGuestProgress } from '@/lib/db-new';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST /api/migrate-guest - Migrate guest progress to user account
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { guestId } = body;

    if (!guestId) {
      return NextResponse.json(
        { error: 'Guest ID is required' },
        { status: 400 }
      );
    }

    const userId = parseInt(session.user.id);
    const result = await migrateGuestProgress(guestId, userId);

    return NextResponse.json({
      success: true,
      migrated: result.migrated,
      skipped: result.skipped,
      message: `Successfully migrated ${result.migrated} words. ${result.skipped} words were already in your account.`,
    });
  } catch (error) {
    console.error('Error migrating guest progress:', error);
    return NextResponse.json(
      { error: 'Failed to migrate guest progress' },
      { status: 500 }
    );
  }
}
