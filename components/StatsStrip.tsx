import { CalendarCheck, Clapperboard, HelpCircle } from "lucide-react";
import type { Show } from "@/lib/mock-data";

export function StatsStrip({ shows }: { shows: Show[] }) {
  const tracked = shows.length;
  const confirmed = shows.filter((s) => s.status === "renewed").length;
  const rumored = shows.filter((s) => s.status === "rumored").length;

  const stats = [
    { label: "Tracked", value: tracked, Icon: Clapperboard, color: "text-accent" },
    {
      label: "Confirmed",
      value: confirmed,
      Icon: CalendarCheck,
      color: "text-[var(--status-renewed)]",
    },
    {
      label: "Rumored",
      value: rumored,
      Icon: HelpCircle,
      color: "text-[var(--status-rumored)]",
    },
  ];

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {stats.map(({ label, value, Icon, color }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 rounded-full border border-border-subtle bg-white/[0.04] px-4 py-2 backdrop-blur-xl"
        >
          <Icon size={15} className={color} strokeWidth={2.25} />
          <span className="text-sm font-medium text-foreground">{value}</span>
          <span className="text-sm text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}
