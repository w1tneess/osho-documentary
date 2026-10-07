/**
 * Theme initialization script.
 *
 * Runs inline in <head> to prevent flash of wrong theme (FOWT).
 * Reads from localStorage, falls back to system preference.
 *
 * Sets `data-theme` on <html> and stores choice in localStorage.
 */
(function () {
  const STORAGE_KEY = 'osho-doc-theme';
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
