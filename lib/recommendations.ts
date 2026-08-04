import type { Show } from "@/lib/mock-data";

export type RecommendationGroup = {
  anchor: Show;
  shows: Show[];
};

// Common genres (e.g. "Drama") appear on almost everything and barely
// distinguish taste; rare ones (e.g. "War & Politics") are a much
// stronger signal of real similarity. Weight matches by rarity so a
// shared uncommon genre counts far more than a shared generic one.
function genreWeights(catalog: Show[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const show of catalog) {
    for (const genre of show.genres) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }

  const weights = new Map<string, number>();
  for (const [genre, count] of counts) {
    weights.set(genre, 1 / count);
  }
  return weights;
}

function similarity(a: Show, b: Show, weights: Map<string, number>): number {
  const bGenres = new Set(b.genres);
  let score = 0;
  for (const genre of a.genres) {
    if (bGenres.has(genre)) {
      score += weights.get(genre) ?? 0;
    }
  }
  return score;
}

// A candidate must share at least one genre held by 4 or fewer shows in
// the catalog (weight 1/4 = 0.25) to count as a real match. Below that,
// the only overlap is generic tags like "Drama" that nearly everything
// has — not a meaningful signal, so those fall back to general Discover
// instead of cluttering a specific "Because you're watching X" row.
const MIN_SIMILARITY = 0.25;

export function buildRecommendations(
  watchlist: Show[],
  catalog: Show[]
): { groups: RecommendationGroup[]; leftover: Show[] } {
  const watchlistIds = new Set(watchlist.map((show) => show.id));
  const candidates = catalog.filter((show) => !watchlistIds.has(show.id));
  const weights = genreWeights(catalog);

  const byAnchor = new Map<string, Show[]>();
  const leftover: Show[] = [];

  for (const candidate of candidates) {
    let bestAnchor: Show | null = null;
    let bestScore = 0;

    for (const anchor of watchlist) {
      const score = similarity(candidate, anchor, weights);
      if (score > bestScore) {
        bestScore = score;
        bestAnchor = anchor;
      }
    }

    if (bestAnchor && bestScore >= MIN_SIMILARITY) {
      const list = byAnchor.get(bestAnchor.id) ?? [];
      list.push(candidate);
      byAnchor.set(bestAnchor.id, list);
    } else {
      leftover.push(candidate);
    }
  }

  // Strongest matches first within each row.
  for (const [anchorId, shows] of byAnchor) {
    const anchor = watchlist.find((show) => show.id === anchorId)!;
    shows.sort(
      (a, b) => similarity(b, anchor, weights) - similarity(a, anchor, weights)
    );
  }

  const groups = watchlist
    .filter((anchor) => byAnchor.has(anchor.id))
    .map((anchor) => ({ anchor, shows: byAnchor.get(anchor.id)! }));

  return { groups, leftover };
}
