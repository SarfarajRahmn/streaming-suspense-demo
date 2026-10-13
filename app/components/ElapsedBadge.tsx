"use client";

import { useEffect, useState } from "react";

/**
 * Renders once this component actually mounts on the client — for a panel
 * inside a Suspense boundary, that's the instant its streamed chunk arrives.
 * performance.now() here is relative to this page's navigation start, so no
 * shared global/context is needed to measure it.
 */
export function ElapsedBadge() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMs(performance.now());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (ms === null) return null;

  return (
    <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 font-mono text-xs font-medium text-emerald-300">
      appeared at {(ms / 1000).toFixed(2)}s
    </span>
  );
}
