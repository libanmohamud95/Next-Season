"use client";

import { Plus } from "lucide-react";
import { Poster } from "@/components/Poster";
import type { Show } from "@/lib/mock-data";

export function ShowTile({
  show,
  onAdd,
}: {
  show: Show;
  onAdd: (id: string) => void;
}) {
  return (
    <div className="group relative w-36 shrink-0 overflow-hidden rounded-xl border border-border-subtle bg-surface transition-colors hover:bg-surface-hover">
      <Poster
        title={show.title}
        seed={show.posterSeed}
        rating={show.rating}
        imageSrc={show.posterImage}
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
  );
}
