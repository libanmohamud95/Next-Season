"use client";

import { Plus } from "lucide-react";
import { Poster } from "@/components/Poster";
import type { Show } from "@/lib/mock-data";

export function DiscoverRow({
  shows,
  onAdd,
}: {
  shows: Show[];
  onAdd: (id: string) => void;
}) {
  if (shows.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-medium text-foreground">
        Discover more shows
      </h2>
      <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2">
        {shows.map((show) => (
          <div
            key={show.id}
            className="group relative w-36 shrink-0 overflow-hidden rounded-xl border border-border-subtle bg-surface transition-colors hover:bg-surface-hover"
          >
            <Poster
              title={show.title}
              seed={show.posterSeed}
              platform={show.platform}
            />
            <button
              onClick={() => onAdd(show.id)}
              aria-label={`Add ${show.title} to watchlist`}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
            >
              <Plus size={14} />
            </button>
            <div className="p-2.5">
              <p className="truncate text-sm font-medium text-foreground">
                {show.title}
              </p>
              <p className="truncate text-xs text-muted">{show.platform}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
