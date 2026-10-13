import type { ReactNode } from "react";

export function PanelSkeleton({
  title,
  icon,
  type = "default",
}: {
  title: string;
  icon?: ReactNode;
  type?: "metrics" | "list" | "default";
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 p-5 backdrop-blur-md">
      {/* Shimmer sweep effect */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-shimmer" />

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-zinc-500">
              {icon}
            </div>
          ) : (
            <div className="h-8 w-8 animate-pulse rounded-lg bg-white/5" />
          )}
          <h3 className="text-sm font-semibold tracking-wide text-zinc-300">{title}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-300/80">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-amber-400" />
          streaming…
        </span>
      </div>

      {type === "metrics" ? (
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-7 w-16 animate-pulse rounded-md bg-white/10" />
              <div className="h-3 w-12 animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : type === "list" ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="h-4 w-3/5 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-16 animate-pulse rounded-full bg-white/5" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="h-4 w-4/5 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
        </div>
      )}
    </div>
  );
}
