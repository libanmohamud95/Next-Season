"use client";

import { ShowTile } from "@/components/ShowTile";
import type { Show } from "@/lib/mock-data";

export function ShowRow({
  title,
  shows,
  onAdd,
}: {
  title: string;
  shows: Show[];
  onAdd: (id: string) => void;
}) {
  if (shows.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-medium text-foreground">{title}</h2>
      <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2">
        {shows.map((show) => (
          <ShowTile key={show.id} show={show} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
