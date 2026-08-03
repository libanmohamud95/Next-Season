import type { Show } from "@/lib/mock-data";

export type RecommendationGroup = {
  anchor: Show;
  shows: Show[];
};

export function buildRecommendations(
  watchlist: Show[],
  catalog: Show[]
): { groups: RecommendationGroup[]; leftover: Show[] } {
  const watchlistIds = new Set(watchlist.map((show) => show.id));
  const candidates = catalog.filter((show) => !watchlistIds.has(show.id));

  const byAnchor = new Map<string, Show[]>();
  const leftover: Show[] = [];

  for (const candidate of candidates) {
    let bestAnchor: Show | null = null;
    let bestScore = 0;

    for (const anchor of watchlist) {
      const shared = candidate.genres.filter((genre) =>
        anchor.genres.includes(genre)
      ).length;
      if (shared > bestScore) {
        bestScore = shared;
        bestAnchor = anchor;
      }
    }

    if (bestAnchor) {
      const list = byAnchor.get(bestAnchor.id) ?? [];
      list.push(candidate);
      byAnchor.set(bestAnchor.id, list);
    } else {
      leftover.push(candidate);
    }
  }

  const groups = watchlist
    .filter((anchor) => byAnchor.has(anchor.id))
    .map((anchor) => ({ anchor, shows: byAnchor.get(anchor.id)! }));

  return { groups, leftover };
}
