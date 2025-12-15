'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  getGuestId,
  getAllGuestData,
  clearGuestSession,
} from '@/lib/guest-session';

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [hasMigrated, setHasMigrated] = useState(false);

  useEffect(() => {
    const migrateGuestData = async () => {
      // Check if user just signed in and has guest data
      if (session?.user?.id && !hasMigrated) {
        const guestData = getAllGuestData();
        const hasGuestProgress = Object.keys(guestData.progress).length > 0;

        if (hasGuestProgress && guestData.guestId) {
          try {
            const response = await fetch('/api/migrate-guest', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ guestId: guestData.guestId }),
            });

            if (response.ok) {
              const result = await response.json();
              console.log('Guest progress migrated:', result);

              // Clear guest session after successful migration
              clearGuestSession();
              setHasMigrated(true);

              // Reload to show updated progress
              window.location.reload();
            }
          } catch (error) {
            console.error('Failed to migrate guest progress:', error);
          }
        }
      }
    };

    migrateGuestData();
  }, [session, hasMigrated]);

  return <>{children}</>;
}
