/*
 * BROWSER CONSOLE SCRIPT - Clear Invalid Guest Data
 *
 * Paste this into your browser console and press Enter
 * Then refresh the page
 */

(function clearInvalidGuestData() {
  console.log('🧹 Clearing all guest session data...\n');

  // Clear all localStorage keys
  const keys = [
    'ulpingo_guest_id',
    'ulpingo_guest_progress',
    'ulpingo_guest_stats',
    'ulpingo_signup_prompt_dismissed',
  ];

  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value) {
      console.log(`  ❌ Removing: ${key}`);
      localStorage.removeItem(key);
    }
  });

  console.log('\n✅ All guest data cleared!');
  console.log('🔄 Please refresh the page (F5 or Ctrl+R)\n');
})();
