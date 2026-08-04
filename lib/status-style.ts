import { CalendarCheck, CircleDot, PauseCircle, HelpCircle, Archive } from "lucide-react";
import type { ShowStatus } from "@/lib/mock-data";

export const STATUS_STYLE: Record<
  ShowStatus,
  { label: string; color: string; bg: string; Icon: typeof CalendarCheck }
> = {
  renewed: {
    label: "Renewed",
    color: "text-[var(--status-renewed)]",
    bg: "bg-[var(--status-renewed-soft)]",
    Icon: CalendarCheck,
  },
  airing: {
    label: "Now airing",
    color: "text-[var(--status-airing)]",
    bg: "bg-[var(--status-airing-soft)]",
    Icon: CircleDot,
  },
  hiatus: {
    label: "On hiatus",
    color: "text-[var(--status-hiatus)]",
    bg: "bg-[var(--status-hiatus-soft)]",
    Icon: PauseCircle,
  },
  rumored: {
    label: "Rumored",
    color: "text-[var(--status-rumored)]",
    bg: "bg-[var(--status-rumored-soft)]",
    Icon: HelpCircle,
  },
  ended: {
    label: "Ended",
    color: "text-[var(--status-ended)]",
    bg: "bg-[var(--status-ended-soft)]",
    Icon: Archive,
  },
};
