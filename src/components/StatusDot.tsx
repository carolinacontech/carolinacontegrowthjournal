import { statusColor, statusLabel } from "@/lib/site";

export function StatusDot({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: statusColor[status] ?? "var(--color-ink-muted)" }}
      />
      {statusLabel[status] ?? status}
    </span>
  );
}
