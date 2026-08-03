"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Search, X } from "lucide-react";
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

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setQuery("");
  }

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
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
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-fade-in w-full max-w-lg overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
          <Search size={18} className="text-muted-2 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shows to track…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-2 focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-muted-2 hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-2">
              No shows match &ldquo;{query}&rdquo;.
            </p>
          )}
          {filtered.map((show) => (
            <button
              key={show.id}
              onClick={() => onAdd(show.id)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-surface-hover"
            >
              <Poster
                title={show.title}
                seed={show.posterSeed}
                imageSrc={show.posterImage}
                className="w-10 shrink-0"
              />
              <span className="flex-1">
                <span className="block text-sm font-medium text-foreground">
                  {show.title}
                </span>
                <span className="block text-xs text-muted">
                  {show.platform}
                </span>
              </span>
              <Plus size={16} className="shrink-0 text-accent" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
