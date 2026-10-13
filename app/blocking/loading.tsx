import { LiveClock } from "@/app/components/LiveClock";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <LiveClock label="Time Blocked" showReload={false} />

      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-rose-500/20 border-t-rose-500" />
        <span className="absolute text-xs font-mono font-semibold text-rose-300">WAIT</span>
      </div>

      <div className="max-w-md space-y-2">
        <h2 className="text-base font-semibold text-white">Entire Response Blocked</h2>
        <p className="text-sm text-zinc-400">
          The server is withholding all HTML while waiting for the slowest endpoint (Payroll Status @ 2.5s).
          No part of the UI can render until everything is ready.
        </p>
      </div>
    </div>
  );
}
