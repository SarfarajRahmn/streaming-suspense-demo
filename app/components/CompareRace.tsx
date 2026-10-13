"use client";

import { useState, useEffect, useRef } from "react";
import {
  PlayIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  FactoryIcon,
  ShipmentIcon,
  UsersIcon,
  PayrollIcon,
} from "./icons";

interface PanelState {
  id: string;
  name: string;
  delayMs: number;
  icon: typeof FactoryIcon;
  color: string;
}

const BASE_PANELS: PanelState[] = [
  { id: "production", name: "Today's Production", delayMs: 300, icon: FactoryIcon, color: "text-emerald-400" },
  { id: "shipments", name: "Recent Shipments", delayMs: 900, icon: ShipmentIcon, color: "text-blue-400" },
  { id: "attendance", name: "Attendance Snapshot", delayMs: 1500, icon: UsersIcon, color: "text-violet-400" },
  { id: "payroll", name: "Payroll Status", delayMs: 2500, icon: PayrollIcon, color: "text-amber-400" },
];

export function CompareRace() {
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState<number>(0);

  // Streaming panel unlocked timestamps
  const [streamingUnlocked, setStreamingUnlocked] = useState<Record<string, number>>({});
  // Blocking unlocked timestamp
  const [blockingUnlocked, setBlockingUnlocked] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const panels = BASE_PANELS.map((p) => ({
    ...p,
    delayMs: Math.round(p.delayMs * speedMultiplier),
  }));

  const maxDelay = Math.max(...panels.map((p) => p.delayMs));

  const startRace = () => {
    setIsRunning(true);
    setHasRun(true);
    setStreamingUnlocked({});
    setBlockingUnlocked(null);
    setElapsed(0);
    const start = performance.now();
    startTimeRef.current = start;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const now = performance.now();
      const currentElapsed = now - start;
      setElapsed(currentElapsed);

      // Check streaming panels
      panels.forEach((p) => {
        if (currentElapsed >= p.delayMs) {
          setStreamingUnlocked((prev) => {
            if (!prev[p.id]) {
              return { ...prev, [p.id]: currentElapsed };
            }
            return prev;
          });
        }
      });

      // Check blocking
      if (currentElapsed >= maxDelay) {
        setBlockingUnlocked(currentElapsed);
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 25);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={startRace}
            disabled={isRunning}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCwIcon className="h-4 w-4 animate-spin" />
                Racing... ({(elapsed / 1000).toFixed(2)}s)
              </>
            ) : hasRun ? (
              <>
                <PlayIcon className="h-4 w-4" />
                Run Race Again
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4" />
                Start Live Head-to-Head Race
              </>
            )}
          </button>

          {isRunning && (
            <span className="font-mono text-xs text-zinc-400">
              Clock: <strong className="text-white">{(elapsed / 1000).toFixed(2)}s</strong>
            </span>
          )}
        </div>

        {/* Network Preset Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-400">Network Speed:</span>
          <div className="inline-flex rounded-lg border border-white/10 bg-black/40 p-1">
            <button
              onClick={() => {
                setSpeedMultiplier(0.5);
                setHasRun(false);
              }}
              className={`rounded-md px-2.5 py-1 transition ${
                speedMultiplier === 0.5 ? "bg-white/15 text-white font-medium" : "text-zinc-400 hover:text-white"
              }`}
            >
              ⚡ Fast (50%)
            </button>
            <button
              onClick={() => {
                setSpeedMultiplier(1);
                setHasRun(false);
              }}
              className={`rounded-md px-2.5 py-1 transition ${
                speedMultiplier === 1 ? "bg-white/15 text-white font-medium" : "text-zinc-400 hover:text-white"
              }`}
            >
              Default
            </button>
            <button
              onClick={() => {
                setSpeedMultiplier(1.8);
                setHasRun(false);
              }}
              className={`rounded-md px-2.5 py-1 transition ${
                speedMultiplier === 1.8 ? "bg-white/15 text-white font-medium" : "text-zinc-400 hover:text-white"
              }`}
            >
              🐢 Slow 3G (180%)
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      {hasRun && (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 backdrop-blur-md">
            <div className="text-xs text-emerald-300/80 font-medium">Streaming First Content</div>
            <div className="mt-1 font-mono text-xl font-bold text-emerald-300">
              {streamingUnlocked["production"]
                ? `${(streamingUnlocked["production"] / 1000).toFixed(2)}s`
                : `${(panels[0].delayMs / 1000).toFixed(2)}s`}
            </div>
            <div className="mt-0.5 text-[11px] text-zinc-400">Instant user feedback</div>
          </div>

          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 backdrop-blur-md">
            <div className="text-xs text-rose-300/80 font-medium">Blocking First Content</div>
            <div className="mt-1 font-mono text-xl font-bold text-rose-300">
              {blockingUnlocked ? `${(blockingUnlocked / 1000).toFixed(2)}s` : `${(maxDelay / 1000).toFixed(2)}s`}
            </div>
            <div className="mt-0.5 text-[11px] text-zinc-400">Stuck behind slowest query</div>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3.5 backdrop-blur-md">
            <div className="text-xs text-blue-300/80 font-medium">User Perceived Speedup</div>
            <div className="mt-1 font-mono text-xl font-bold text-blue-300">
              {(maxDelay / panels[0].delayMs).toFixed(1)}x Faster
            </div>
            <div className="mt-0.5 text-[11px] text-zinc-400">
              Saved {((maxDelay - panels[0].delayMs) / 1000).toFixed(2)}s of empty screen
            </div>
          </div>
        </div>
      )}

      {/* Dual Column Arena */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Traditional Blocking */}
        <div className="flex flex-col gap-4 rounded-2xl border border-rose-500/20 bg-rose-950/10 p-5">
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <h3 className="font-semibold text-rose-200">Blocking (No Suspense)</h3>
              </div>
              <p className="mt-0.5 text-xs text-zinc-400">await Promise.all(...) on server</p>
            </div>
            <span className="font-mono text-xs text-rose-300">
              {blockingUnlocked ? "Finished" : isRunning ? "Waiting..." : "Idle"}
            </span>
          </div>

          {/* Body */}
          {isRunning && !blockingUnlocked ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-rose-500/20 border-t-rose-500" />
              <div className="space-y-1">
                <div className="font-mono text-sm font-semibold text-white">{(elapsed / 1000).toFixed(2)}s</div>
                <div className="text-xs text-zinc-400 max-w-xs">
                  Server is withholding all HTML while waiting for Payroll ({maxDelay}ms)
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {panels.map((p) => {
                const Icon = p.icon;
                const isReady = !!blockingUnlocked;
                return (
                  <div
                    key={p.id}
                    className={`rounded-xl border p-3.5 transition-all duration-300 ${
                      isReady
                        ? "border-white/10 bg-zinc-900/40 text-white"
                        : "border-dashed border-white/10 bg-white/[0.02] text-zinc-500 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 ${isReady ? p.color : "text-zinc-600"}`} />
                        <span className="text-xs font-medium">{p.name}</span>
                      </div>
                      <span className="font-mono text-[11px]">
                        {isReady ? `All at ${(blockingUnlocked / 1000).toFixed(2)}s` : "Waiting for all"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Streaming SSR */}
        <div className="flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <h3 className="font-semibold text-emerald-200">Streaming (Suspense)</h3>
              </div>
              <p className="mt-0.5 text-xs text-zinc-400">Each panel streams as its promise resolves</p>
            </div>
            <span className="font-mono text-xs text-emerald-300">
              {Object.keys(streamingUnlocked).length === panels.length && hasRun
                ? "All Streamed ✓"
                : isRunning
                ? `${Object.keys(streamingUnlocked).length}/${panels.length} Streamed`
                : "Idle"}
            </span>
          </div>

          {/* Body */}
          <div className="grid gap-3">
            {panels.map((p) => {
              const Icon = p.icon;
              const unlockTime = streamingUnlocked[p.id];
              const isReady = unlockTime !== undefined;

              return (
                <div
                  key={p.id}
                  className={`relative overflow-hidden rounded-xl border p-3.5 transition-all duration-300 ${
                    isReady
                      ? "border-emerald-500/30 bg-zinc-900/70 text-white shadow-md shadow-emerald-950/30"
                      : "border-white/10 bg-zinc-900/30 text-zinc-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isReady ? p.color : "text-zinc-500"}`} />
                      <span className="text-xs font-medium text-zinc-200">{p.name}</span>
                    </div>

                    {isReady ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                        <CheckCircleIcon className="h-3 w-3" />
                        streamed @ {(unlockTime / 1000).toFixed(2)}s
                      </span>
                    ) : isRunning ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-amber-400" />
                        resolving ({p.delayMs}ms)
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-zinc-500">starts @ {p.delayMs}ms</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
