import { gradientFor, initialsFor } from "@/lib/poster";
import { PLATFORM_BADGE } from "@/lib/platform";
import type { Platform } from "@/lib/mock-data";

export function Poster({
  title,
  seed,
  platform,
  className = "",
}: {
  title: string;
  seed: string;
  platform?: Platform;
  className?: string;
}) {
  const badge = platform ? PLATFORM_BADGE[platform] : undefined;

  return (
    <div
      className={`relative aspect-[2/3] w-full overflow-hidden rounded-lg ${className}`}
      style={{ backgroundImage: gradientFor(seed) }}
    >
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-semibold tracking-wide text-white/85">
          {initialsFor(title)}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
      {badge && (
        <span
          className="absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm"
          style={{ backgroundColor: badge.bg }}
        >
          {badge.abbr}
        </span>
      )}
    </div>
  );
}
