/**
 * Development utility to clear all guest session data
 * Run this in browser console if you need to reset guest state
 */

export function clearAllGuestData() {
  if (typeof window === 'undefined') {
    console.warn('This function only works in browser environment');
    return;
  }

  localStorage.removeItem('ulpingo_guest_id');
  localStorage.removeItem('ulpingo_guest_progress');
  localStorage.removeItem('ulpingo_guest_stats');
  localStorage.removeItem('ulpingo_signup_prompt_dismissed');

  console.log('✅ All guest data cleared. Refresh the page to start fresh.');
}

// Make it available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).clearGuestData = clearAllGuestData;
  console.log(
    '💡 Dev tip: Run clearGuestData() in console to reset guest session'
  );
}
