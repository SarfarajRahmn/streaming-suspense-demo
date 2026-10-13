import Link from "next/link";
import {
  ZapIcon,
  ClockIcon,
  PlayIcon,
  SparklesIcon,
  ArrowRightIcon,
  FactoryIcon,
  ShipmentIcon,
  UsersIcon,
  PayrollIcon,
} from "@/app/components/icons";

export default function Home() {
  const sources = [
    { name: "Today's Production", delay: "300ms", icon: FactoryIcon, badge: "Ultra Fast", color: "text-emerald-400" },
    { name: "Recent Shipments", delay: "900ms", icon: ShipmentIcon, badge: "Fast", color: "text-blue-400" },
    { name: "Attendance Snapshot", delay: "1,500ms", icon: UsersIcon, badge: "Moderate", color: "text-violet-400" },
    { name: "Payroll Status", delay: "2,500ms", icon: PayrollIcon, badge: "Slow API", color: "text-amber-400" },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-xl sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          <SparklesIcon className="h-3.5 w-3.5" />
          <span>Next.js 16 • React 19 Benchmark</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Blocking SSR vs. Streaming Suspense
        </h1>

        <p className="mt-3 max-w-2xl text-base text-zinc-300 leading-relaxed">
          Both architectures fetch the exact same 4 garment-factory ERP data sources with staggered
          artificial delays (300ms to 2.5s). Experience how React 19 Server Components stream HTML
          chunks over the wire immediately versus traditional blocking requests.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-95"
          >
            <PlayIcon className="h-4 w-4 fill-zinc-950" />
            <span>Launch Live Head-to-Head Race</span>
          </Link>
          <Link
            href="/streaming"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            <span>Explore Streaming</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Mode Comparison Grid */}
      <div>
        <h2 className="text-lg font-bold tracking-tight text-white mb-4">Choose a Mode to Experience</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Compare Race Card */}
          <Link
            href="/compare"
            className="group relative flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-950/25 hover:shadow-xl hover:shadow-emerald-950/50"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-4">
                <PlayIcon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Live Head-to-Head Race
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-semibold">New</span>
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Run both modes side-by-side on a single screen with live stopwatches, network throttling controls, and latency deltas.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              Start race <ArrowRightIcon className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Streaming Card */}
          <Link
            href="/streaming"
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:bg-zinc-900/60 hover:shadow-xl"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4">
                <ZapIcon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Streaming (Suspense)</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                The UI shell & skeleton loaders render instantly. Each card streams to the client the instant its promise resolves.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              View streaming <ArrowRightIcon className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Blocking Card */}
          <Link
            href="/blocking"
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-rose-500/40 hover:bg-zinc-900/60 hover:shadow-xl"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 mb-4">
                <ClockIcon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Blocking (Monolithic)</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                A single await on the server. The user stares at a spinner for ~2.5s before all 4 cards suddenly appear simultaneously.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
              View blocking <ArrowRightIcon className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* Simulated Data Sources Table */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Garments Factory Simulated Data Sources</h3>
            <p className="text-xs text-zinc-400">Deliberately staggered artificial latency across 4 independent APIs</p>
          </div>
          <span className="font-mono text-xs text-zinc-500">app/lib/data.ts</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {sources.map((src) => {
            const Icon = src.icon;
            return (
              <div
                key={src.name}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Icon className={`h-4 w-4 ${src.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-200">{src.name}</div>
                    <div className="text-[11px] text-zinc-500">{src.badge}</div>
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-zinc-300">{src.delay}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
