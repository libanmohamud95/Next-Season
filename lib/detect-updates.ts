import type { Show } from "@/lib/mock-data";
import type { ShowSnapshot } from "@/lib/show-snapshot-storage";
import { formatDate } from "@/lib/date";

export type DetectedUpdate = {
  id: string;
  showId: string;
  showTitle: string;
  status: Show["status"];
  message: string;
};

function snapshotOf(show: Show): ShowSnapshot {
  return {
    status: show.status,
    statusNote: show.statusNote,
    nextSeasonDate: show.nextSeasonDate,
  };
}

function hasChanged(prev: ShowSnapshot | undefined, next: ShowSnapshot): boolean {
  // No previous snapshot means we've never seen this show before (e.g. it
  // was just added) — nothing to compare against, so it's not a "change".
  if (!prev) return false;
  return (
    prev.status !== next.status ||
    prev.statusNote !== next.statusNote ||
    prev.nextSeasonDate !== next.nextSeasonDate
  );
}

export function detectUpdates(
  watchlist: Show[],
  previousSnapshots: Record<string, ShowSnapshot>
): { updates: DetectedUpdate[]; nextSnapshots: Record<string, ShowSnapshot> } {
  const updates: DetectedUpdate[] = [];
  const nextSnapshots: Record<string, ShowSnapshot> = { ...previousSnapshots };

  for (const show of watchlist) {
    const next = snapshotOf(show);
    const prev = previousSnapshots[show.id];

    if (hasChanged(prev, next)) {
      updates.push({
        id: `${show.id}-${next.status}-${next.nextSeasonDate ?? "none"}`,
        showId: show.id,
        showTitle: show.title,
        status: show.status,
        message: `${show.title}: ${show.statusNote}${
          show.nextSeasonDate ? ` — ${formatDate(show.nextSeasonDate)}` : ""
        }`,
      });
    }

    nextSnapshots[show.id] = next;
  }

  return { updates, nextSnapshots };
}
