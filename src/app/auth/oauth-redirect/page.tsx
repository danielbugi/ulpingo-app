'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OAuthRedirectPage() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const provider = searchParams.get('provider');
  const csrfToken = searchParams.get('csrfToken');
  const callbackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    // Auto-submit the form to trigger OAuth
    if (formRef.current && provider && csrfToken) {
      formRef.current.submit();
    }
  }, [provider, csrfToken]);

  if (!provider || !csrfToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-center">
          <p className="text-red-400">Invalid authentication request</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to {provider}...</p>
      </div>

      <form
        ref={formRef}
        method="post"
        action={`/api/auth/signin/${provider}`}
        style={{ display: 'none' }}
      >
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" name="callbackUrl" value={callbackUrl || '/'} />
        <input type="hidden" name="json" value="true" />
      </form>
    </div>
  );
}
