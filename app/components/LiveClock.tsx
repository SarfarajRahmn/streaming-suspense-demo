"use client";

import { useEffect, useState } from "react";
import { RefreshCwIcon } from "./icons";

/**
 * Ticks up from page-navigation start. Placed outside any Suspense boundary
 * so it's visible immediately — the point is to make "how long you're
 * staring at nothing" (or "staring at a shell that's already filling in")
 * viscerally measurable instead of a vibe.
 */
export function LiveClock({
  label = "Elapsed",
  showReload = true,
}: {
  label?: string;
  showReload?: boolean;
}) {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => setMs(performance.now() - start), 40);
    return () => clearInterval(id);
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 font-mono text-sm shadow-sm backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-zinc-400">{label}:</span>
        <span className="font-bold tracking-tight text-white">{(ms / 1000).toFixed(2)}s</span>
      </div>

      {showReload && (
        <button
          onClick={handleReload}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
        >
          <RefreshCwIcon className="h-3.5 w-3.5" />
          Re-run Test
        </button>
      )}
    </div>
  );
}
