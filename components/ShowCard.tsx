"use client";

import { X } from "lucide-react";
import { Poster } from "@/components/Poster";
import { StatusBadge } from "@/components/StatusBadge";
import type { Show } from "@/lib/mock-data";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

export function ShowCard({
  show,
  onRemove,
}: {
  show: Show;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="group animate-fade-in relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-colors hover:bg-surface-hover">
      <div className="relative p-3 pb-0">
        <Poster
          title={show.title}
          seed={show.posterSeed}
          rating={show.rating}
          imageSrc={show.posterImage}
        />
        <button
          onClick={() => onRemove(show.id)}
          aria-label={`Remove ${show.title} from watchlist`}
          className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/70 opacity-0 backdrop-blur transition-opacity hover:text-white group-hover:opacity-100"
        >
          <X size={14} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium leading-tight text-foreground">
            {show.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{show.platform}</span>
          <span className="text-muted-2">·</span>
          <span>Season {show.currentSeason}</span>
        </div>
        <StatusBadge status={show.status} />
        <p className="mt-1 text-sm text-muted">
          {show.statusNote}
          {show.nextSeasonDate && (
            <span className="text-foreground/90">
              {" — "}
              {formatDate(show.nextSeasonDate)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
