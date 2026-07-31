"use client";

import { Clapperboard, Plus } from "lucide-react";

export function NavBar({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div className="sticky top-0 z-30 border-b border-border-subtle bg-white/[0.04] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2 text-accent">
          <Clapperboard size={20} strokeWidth={2.25} />
          <span className="text-sm font-semibold tracking-wide text-foreground">
            NEXT SEASON
          </span>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_-4px_var(--accent)] transition-colors hover:bg-accent-hover"
        >
          <Plus size={16} />
          Add show
        </button>
      </div>
    </div>
  );
}
