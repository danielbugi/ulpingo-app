import { useSession } from 'next-auth/react';
import { getGuestId } from '@/lib/guest-session';

/**
 * Hook to get current user ID (authenticated or guest)
 */
export function useUserId(): string | number | null {
  const { data: session } = useSession();

  if (session?.user?.id) {
    return parseInt(session.user.id);
  }

  // Return guest ID if not authenticated
  return getGuestId();
}
