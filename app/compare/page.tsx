import { CompareRace } from "@/app/components/CompareRace";
import { WaterfallChart } from "@/app/components/WaterfallChart";

export const metadata = {
  title: "Live Head-to-Head Race — Streaming vs Blocking",
  description: "Real-time side-by-side benchmark comparing React Suspense streaming against monolithic blocking SSR.",
};

export default function ComparePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Interactive Head-to-Head Arena
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white">
          Side-by-Side Benchmark Race
        </h1>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Trigger both rendering models simultaneously. Watch how React Suspense streams components
          incrementally the millisecond each promise settles, while traditional blocking SSR forces the
          browser to wait until the slowest database query finishes.
        </p>
      </div>

      <CompareRace />

      <WaterfallChart />
    </div>
  );
}
