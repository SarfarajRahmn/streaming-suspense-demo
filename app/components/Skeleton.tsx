export function PanelSkeleton({ title, rows = 3 }: { title: string; rows?: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
        <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-zinc-500">loading…</span>
      </div>
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-white/10" style={{ width: `${85 - i * 15}%` }} />
        ))}
      </div>
    </div>
  );
}
