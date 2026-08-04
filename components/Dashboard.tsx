"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Clapperboard } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { StatsStrip } from "@/components/StatsStrip";
import { ShowCard } from "@/components/ShowCard";
import { AddShowDialog } from "@/components/AddShowDialog";
import { UpdatesFeed } from "@/components/UpdatesFeed";
import { ShowRow } from "@/components/ShowRow";
import type { Show } from "@/lib/mock-data";
import { buildRecommendations } from "@/lib/recommendations";
import { loadWatchlistIds, saveWatchlistIds } from "@/lib/watchlist-storage";
import { detectUpdates, type DetectedUpdate } from "@/lib/detect-updates";
import {
  loadSnapshots,
  saveSnapshots,
  loadLastVisit,
  saveLastVisit,
} from "@/lib/show-snapshot-storage";

export function Dashboard({ catalog: CATALOG }: { catalog: Show[] }) {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() =>
    CATALOG.slice(0, 3).map((show) => show.id)
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recentUpdates, setRecentUpdates] = useState<DetectedUpdate[]>([]);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const skipNextSave = useRef(true);

  useEffect(() => {
    const storedIds = loadWatchlistIds();
    const resolvedIds = storedIds ?? watchlistIds;

    // Syncing from external stores (localStorage) on mount, not adjusting
    // internal state reactively — doing this during render instead would
    // risk a hydration mismatch, since the server never has access to any
    // of this. Intentionally runs once per page load: "what changed since
    // last time" should reflect the moment you opened the app, not update
    // retroactively as you add/remove shows this session.
    if (storedIds) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWatchlistIds(storedIds);
    }

    const resolvedWatchlist = resolvedIds
      .map((id) => CATALOG.find((show) => show.id === id))
      .filter((show): show is Show => Boolean(show));

    const previousSnapshots = loadSnapshots();
    const previousVisit = loadLastVisit();
    const { updates, nextSnapshots } = detectUpdates(
      resolvedWatchlist,
      previousSnapshots
    );

    setRecentUpdates(updates);
    setLastVisit(previousVisit);

    saveSnapshots(nextSnapshots);
    saveLastVisit(new Date().toISOString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    saveWatchlistIds(watchlistIds);
  }, [watchlistIds]);

  const watchlist = useMemo(
    () =>
      watchlistIds
        .map((id) => CATALOG.find((show) => show.id === id))
        .filter((show): show is NonNullable<typeof show> => Boolean(show)),
    [watchlistIds, CATALOG]
  );

  const availableToAdd = useMemo(
    () => CATALOG.filter((show) => !watchlistIds.includes(show.id)),
    [watchlistIds, CATALOG]
  );

  const { groups: recommendationGroups, leftover: otherShows } = useMemo(
    () => buildRecommendations(watchlist, CATALOG),
    [watchlist, CATALOG]
  );

  function handleAdd(id: string) {
    setWatchlistIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setDialogOpen(false);
  }

  function handleRemove(id: string) {
    setWatchlistIds((prev) => prev.filter((existing) => existing !== id));
  }

  return (
    <>
      <div inert={dialogOpen}>
        <NavBar onAddClick={() => setDialogOpen(true)} />
        <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
          <header className="mb-8 flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Never miss a new season.
            </h1>
            <p className="max-w-xl text-muted">
              Track your favorite shows and we&apos;ll tell you the moment a
              new season is confirmed, dated, or ready to stream — and
              exactly where to watch it.
            </p>
          </header>

          <StatsStrip shows={watchlist} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-foreground">
                  Your watchlist
                  <span className="ml-2 text-sm font-normal text-muted-2">
                    {watchlist.length}
                  </span>
                </h2>
              </div>

              {watchlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-subtle py-16 text-center">
                  <Clapperboard size={28} className="mb-3 text-muted-2" />
                  <p className="mb-4 text-muted">
                    Your watchlist is empty. Add a show to start tracking it.
                  </p>
                  <button
                    onClick={() => setDialogOpen(true)}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
                  >
                    Add your first show
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {watchlist.map((show) => (
                    <ShowCard
                      key={show.id}
                      show={show}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              )}
            </section>

            <aside className="lg:sticky lg:top-10 lg:h-fit">
              <UpdatesFeed updates={recentUpdates} lastVisit={lastVisit} />
            </aside>
          </div>

          {recommendationGroups.map((group) => (
            <ShowRow
              key={group.anchor.id}
              title={`Because you're watching ${group.anchor.title}`}
              shows={group.shows}
              onAdd={handleAdd}
            />
          ))}
          <ShowRow
            title="Discover more shows"
            shows={otherShows}
            onAdd={handleAdd}
          />
        </main>
      </div>

      <AddShowDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        options={availableToAdd}
        onAdd={handleAdd}
      />
    </>
  );
}
