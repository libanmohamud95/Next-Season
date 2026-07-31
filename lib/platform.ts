import type { Platform } from "@/lib/mock-data";

export const PLATFORM_BADGE: Record<Platform, { abbr: string; bg: string }> = {
  Netflix: { abbr: "N", bg: "#E50914" },
  "HBO Max": { abbr: "HBO", bg: "#7B2CBF" },
  "Prime Video": { abbr: "PV", bg: "#00A8E1" },
  "Disney+": { abbr: "D+", bg: "#113CCF" },
  "Apple TV+": { abbr: "TV+", bg: "#3D3D3D" },
  Hulu: { abbr: "H", bg: "#1CE783" },
};
