import { Bell, Sparkles } from "lucide-react";
import { STATUS_STYLE } from "@/lib/status-style";
import { timeAgoFor } from "@/lib/date";
import type { DetectedUpdate } from "@/lib/detect-updates";

export function UpdatesFeed({
  updates,
  lastVisit,
}: {
  updates: DetectedUpdate[];
  lastVisit: string | null;
}) {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-medium text-foreground">
        <Bell size={17} className="text-accent" />
        Recent updates
      </h2>
      <div className="rounded-2xl border border-border-subtle bg-surface p-4">
        {updates.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <Sparkles size={20} className="text-muted-2" />
            <p className="text-sm text-muted">
              {lastVisit
                ? `Nothing new since ${timeAgoFor(lastVisit)}.`
                : "You're all caught up. Updates will show up here after your next visit."}
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {updates.map((update) => {
              const { color, bg, Icon } = STATUS_STYLE[update.status];
              return (
                <li key={update.id} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${color} ${bg}`}
                  >
                    <Icon size={13} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-snug text-muted">
                    {update.message}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
