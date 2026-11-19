// Safe localStorage wrappers (private mode / blocked storage must never break the UI).
export function readStore(key, fallback) {
  try {
    const v = window.localStorage.getItem(key);
    return v == null ? fallback : v;
  } catch {
    return fallback;
  }
}
export function writeStore(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}
