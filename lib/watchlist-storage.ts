const STORAGE_KEY = "next-season:watchlist";

export function loadWatchlistIds(): string[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === "string")) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveWatchlistIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore write failures (private browsing storage caps, quota, etc.)
  }
}
