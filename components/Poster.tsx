import Image from "next/image";
import { Star } from "lucide-react";
import { gradientFor, initialsFor } from "@/lib/poster";

export function Poster({
  title,
  seed,
  rating,
  imageSrc,
  className = "",
}: {
  title: string;
  seed: string;
  rating?: number;
  imageSrc?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[2/3] w-full overflow-hidden rounded-lg ${className}`}
      style={imageSrc ? undefined : { backgroundImage: gradientFor(seed) }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={`${title} poster`}
          fill
          sizes="(max-width: 640px) 45vw, 200px"
          className="object-cover"
        />
      ) : (
        <>
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
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
      {rating !== undefined && (
        <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
