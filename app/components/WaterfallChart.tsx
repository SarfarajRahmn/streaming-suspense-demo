export function WaterfallChart() {
  const steps = [
    { name: "Production Summary", time: 300, pct: 12, color: "bg-emerald-500", text: "300ms" },
    { name: "Recent Shipments", time: 900, pct: 36, color: "bg-blue-500", text: "900ms" },
    { name: "Attendance Snapshot", time: 1500, pct: 60, color: "bg-violet-500", text: "1.5s" },
    { name: "Payroll Status", time: 2500, pct: 100, color: "bg-amber-500", text: "2.5s" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Visual Request Waterfall</h3>
          <p className="text-xs text-zinc-400">Comparing data arrival timeline between rendering models</p>
        </div>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
          88% faster initial paint
        </span>
      </div>

      {/* Axis markers */}
      <div className="relative mb-2 flex justify-between text-[10px] font-mono text-zinc-500 border-b border-white/5 pb-1">
        <span>0s (Start)</span>
        <span>0.75s</span>
        <span>1.5s</span>
        <span>2.25s</span>
        <span>2.5s (Full Load)</span>
      </div>

      <div className="space-y-3 pt-1">
        {steps.map((step) => (
          <div key={step.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-zinc-300">{step.name}</span>
              <span className="font-mono text-zinc-400">{step.text}</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full ${step.color} transition-all duration-1000`}
                style={{ width: `${step.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/5 pt-4 text-xs">
        <div className="rounded-xl border border-rose-500/15 bg-rose-500/5 p-3">
          <div className="font-semibold text-rose-300">Blocking Model</div>
          <div className="mt-1 text-zinc-400">
            Client stares at empty screen/spinner for <strong className="text-white">2.5s</strong> until slowest API returns.
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-3">
          <div className="font-semibold text-emerald-300">Streaming (Suspense)</div>
          <div className="mt-1 text-zinc-400">
            First card appears at <strong className="text-emerald-300">0.3s</strong>; subsequent panels stream instantly on completion.
          </div>
        </div>
      </div>
    </div>
  );
}
