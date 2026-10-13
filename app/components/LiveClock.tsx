"use client";

import { useEffect, useState } from "react";

/**
 * Ticks up from page-navigation start. Placed outside any Suspense boundary
 * so it's visible immediately — the point is to make "how long you're
 * staring at nothing" (or "staring at a shell that's already filling in")
 * viscerally measurable instead of a vibe.
 */
export function LiveClock({ label }: { label: string }) {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => setMs(performance.now() - start), 50);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-sm text-zinc-300">
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
      {label}: <span className="text-white">{(ms / 1000).toFixed(2)}s</span>
    </div>
  );
}
