export type ShowSnapshot = {
  status: string;
  statusNote: string;
  nextSeasonDate?: string;
};

const SNAPSHOTS_KEY = "next-season:show-snapshots";
const LAST_VISIT_KEY = "next-season:last-visit";

export function loadSnapshots(): Record<string, ShowSnapshot> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SNAPSHOTS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed as Record<string, ShowSnapshot>;
  } catch {
    return {};
  }
}

export function saveSnapshots(snapshots: Record<string, ShowSnapshot>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots));
  } catch {
    // Ignore write failures (private browsing storage caps, quota, etc.)
  }
}

export function loadLastVisit(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LAST_VISIT_KEY);
  } catch {
    return null;
  }
}

export function saveLastVisit(iso: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAST_VISIT_KEY, iso);
  } catch {
    // Ignore write failures
  }
}
