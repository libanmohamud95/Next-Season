import { STATUS_STYLE } from "@/lib/status-style";
import type { ShowStatus } from "@/lib/mock-data";

export function StatusBadge({ status }: { status: ShowStatus }) {
  const { label, color, bg, Icon } = STATUS_STYLE[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${color} ${bg}`}
    >
      <Icon size={13} strokeWidth={2.5} />
      {label}
    </span>
  );
}
