'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we're in a popup window
    if (window.opener) {
      const error = searchParams.get('error');

      if (error) {
        // Send error message to parent
        window.opener.postMessage('oauth-error', window.location.origin);
      } else {
        // Send success message to parent
        window.opener.postMessage('oauth-success', window.location.origin);
      }

      // Close the popup
      setTimeout(() => {
        window.close();
      }, 100);
    } else {
      // Not in a popup, redirect to home
      window.location.href = '/';
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Completing authentication...</p>
      </div>
    </div>
  );
}
