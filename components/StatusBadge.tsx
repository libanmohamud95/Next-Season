import { CalendarCheck, CircleDot, PauseCircle, HelpCircle, Archive } from "lucide-react";
import type { ShowStatus } from "@/lib/mock-data";

const CONFIG: Record<
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

export function StatusBadge({ status }: { status: ShowStatus }) {
  const { label, color, bg, Icon } = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${color} ${bg}`}
    >
      <Icon size={13} strokeWidth={2.5} />
      {label}
    </span>
  );
}
