import { Bell, CalendarCheck, HelpCircle } from "lucide-react";
import { RECENT_UPDATES, type UpdateKind } from "@/lib/mock-notifications";

const ICONS: Record<UpdateKind, typeof Bell> = {
  renewed: CalendarCheck,
  dated: CalendarCheck,
  rumored: HelpCircle,
};

const COLORS: Record<UpdateKind, string> = {
  renewed: "text-[var(--status-renewed)] bg-[var(--status-renewed-soft)]",
  dated: "text-[var(--status-airing)] bg-[var(--status-airing-soft)]",
  rumored: "text-[var(--status-rumored)] bg-[var(--status-rumored-soft)]",
};

export function UpdatesFeed() {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-medium text-foreground">
        <Bell size={17} className="text-accent" />
        Recent updates
      </h2>
      <div className="rounded-2xl border border-border-subtle bg-surface p-4">
        <ul className="flex flex-col gap-3">
          {RECENT_UPDATES.map((update) => {
            const Icon = ICONS[update.kind];
            return (
              <li key={update.id} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${COLORS[update.kind]}`}
                >
                  <Icon size={13} strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-snug text-muted">
                  {update.message}
                  <span className="mt-0.5 block text-xs text-muted-2">
                    {update.timeAgo}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
