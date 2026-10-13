import { LiveClock } from "@/app/components/LiveClock";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <LiveClock label="Elapsed" />
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      <p className="max-w-sm text-sm text-zinc-500">
        The whole page is blocked on the slowest data source. Nothing renders
        until every panel is ready — you can only watch the clock.
      </p>
    </div>
  );
}
