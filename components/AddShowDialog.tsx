"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Plus, Search, SearchX, X } from "lucide-react";
import { Poster } from "@/components/Poster";
import type { Show } from "@/lib/mock-data";

export function AddShowDialog({
  open,
  onClose,
  options,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  options: Show[];
  onAdd: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const searchId = useId();

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setQuery("");
  }

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = options.filter((s) =>
    s.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 py-[8vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-fade-in flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-foreground">
            Add a show
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-2 transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <label htmlFor={searchId} className="sr-only">
            Search shows to track
          </label>
          <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-background/40 px-3.5 py-2.5 transition-colors focus-within:border-accent/60">
            <Search size={16} className="shrink-0 text-muted-2" />
            <input
              id={searchId}
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shows to track…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-14 text-center">
              <SearchX size={22} className="text-muted-2" />
              <p className="text-sm text-muted-2">
                No shows match &ldquo;{query}&rdquo;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {filtered.map((show) => (
                <button
                  key={show.id}
                  onClick={() => onAdd(show.id)}
                  className="group rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <div className="relative overflow-hidden rounded-xl border border-border-subtle transition-colors group-hover:border-accent/50">
                    <Poster
                      title={show.title}
                      seed={show.posterSeed}
                      rating={show.rating}
                      imageSrc={show.posterImage}
                    />
                    <div className="absolute inset-0 flex items-end justify-end bg-black/0 p-2 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
                        <Plus size={14} />
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 truncate text-sm font-medium text-foreground">
                    {show.title}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {show.platform}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
