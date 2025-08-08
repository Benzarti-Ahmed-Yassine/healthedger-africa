export const cleanupAuthState = () => {
  try {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // sessionStorage cleanup
    Object.keys(sessionStorage || {}).forEach((key) => {
      // @ts-ignore
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        // @ts-ignore
        sessionStorage.removeItem(key);
      }
    });
  } catch {}
};
