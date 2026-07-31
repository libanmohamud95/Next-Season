import { gradientFor, initialsFor } from "@/lib/poster";

export function Poster({
  title,
  seed,
  className = "",
}: {
  title: string;
  seed: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gradient-to-br ${gradientFor(
        seed
      )} ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-semibold tracking-wide text-white/85">
          {initialsFor(title)}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
    </div>
  );
}
