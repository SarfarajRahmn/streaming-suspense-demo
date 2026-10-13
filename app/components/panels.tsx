import {
  getAttendanceSnapshot,
  getPayrollStatus,
  getProductionSummary,
  getRecentShipments,
  type AttendanceSnapshot,
  type PayrollStatus,
  type ProductionSummary,
  type Shipment,
} from "@/app/lib/data";
import { PanelCard, Stat } from "@/app/components/PanelCard";
import { ElapsedBadge } from "@/app/components/ElapsedBadge";
import {
  FactoryIcon,
  ShipmentIcon,
  UsersIcon,
  PayrollIcon,
} from "@/app/components/icons";

// Presentational views — plain (non-async) components that just render data
// they're handed. Used directly by the streaming route's async wrappers
// below, AND by the blocking route (which awaits everything up front and
// passes the resolved data down), so both routes render pixel-identical
// output and the only real difference is *when* each panel's data resolves.

export function ProductionPanelView({ data }: { data: ProductionSummary }) {
  return (
    <PanelCard
      title="Today's Production"
      icon={<FactoryIcon className="h-4 w-4 text-emerald-400" />}
      accentColor="emerald"
      badge={<ElapsedBadge />}
    >
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Lines running" value={`${data.linesRunning}/10`} subtext="80% operational" />
        <Stat label="Units today" value={data.unitsToday.toLocaleString()} subtext="Target: 15,000" />
        <Stat label="Efficiency" value={`${data.efficiency}%`} subtext="Optimal rate" />
      </div>

      <div className="mt-3.5 space-y-1">
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>Overall Shift Target</span>
          <span className="font-medium text-emerald-400">95.4%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: "95.4%" }} />
        </div>
      </div>
    </PanelCard>
  );
}

export function ShipmentsPanelView({ data }: { data: Shipment[] }) {
  const statusStyles: Record<Shipment["status"], string> = {
    "In Transit": "bg-blue-500/10 text-blue-300 border-blue-500/20",
    "Packed": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    "Customs": "bg-amber-500/10 text-amber-300 border-amber-500/20",
  };

  return (
    <PanelCard
      title="Recent Shipments"
      icon={<ShipmentIcon className="h-4 w-4 text-blue-400" />}
      accentColor="blue"
      badge={<ElapsedBadge />}
    >
      <ul className="space-y-2.5 text-sm">
        {data.map((s) => (
          <li
            key={s.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2 transition hover:bg-white/[0.05]"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-zinc-400">{s.id}</span>
                <span className="truncate text-xs font-medium text-zinc-200">{s.buyer}</span>
              </div>
              <div className="text-[11px] text-zinc-500">{s.destination} • ETA {s.eta}</div>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusStyles[s.status]}`}
            >
              {s.status}
            </span>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

export function AttendancePanelView({ data }: { data: AttendanceSnapshot }) {
  const presentPct = Math.round((data.present / data.total) * 100);

  return (
    <PanelCard
      title="Attendance Snapshot"
      icon={<UsersIcon className="h-4 w-4 text-violet-400" />}
      accentColor="violet"
      badge={<ElapsedBadge />}
    >
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Present" value={data.present} subtext={`${presentPct}% rate`} />
        <Stat label="Absent" value={data.absent} subtext="Floor lines" />
        <Stat label="On leave" value={data.onLeave} subtext="Authorized" />
      </div>

      <div className="mt-3.5 space-y-1">
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>Workforce Present ({data.present}/{data.total})</span>
          <span className="font-medium text-violet-400">{presentPct}%</span>
        </div>
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-emerald-500" style={{ width: `${(data.present / data.total) * 100}%` }} />
          <div className="h-full bg-amber-500" style={{ width: `${(data.onLeave / data.total) * 100}%` }} />
          <div className="h-full bg-rose-500" style={{ width: `${(data.absent / data.total) * 100}%` }} />
        </div>
      </div>
    </PanelCard>
  );
}

export function PayrollPanelView({ data }: { data: PayrollStatus }) {
  const completionRate = Math.round((data.employeesProcessed / data.totalEmployees) * 100);

  return (
    <PanelCard
      title="Payroll Status"
      icon={<PayrollIcon className="h-4 w-4 text-amber-400" />}
      accentColor="amber"
      badge={<ElapsedBadge />}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-zinc-400">Cycle Period</span>
          <span className="font-mono text-xs font-semibold text-white">{data.period}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-zinc-400">Disbursed Total</span>
          <span className="font-mono text-sm font-bold text-amber-300">{data.totalDisbursed}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">Staff Processed</span>
          <span className="text-xs font-semibold text-emerald-400">
            {data.employeesProcessed} / {data.totalEmployees} ({completionRate}%)
          </span>
        </div>
      </div>
    </PanelCard>
  );
}

// Async wrappers — each one fetches its own data independently. Used only by
// the streaming route, each inside its own <Suspense> boundary, so React can
// stream each one in the moment its own promise resolves.

export async function ProductionPanel() {
  const data = await getProductionSummary();
  return <ProductionPanelView data={data} />;
}

export async function ShipmentsPanel() {
  const data = await getRecentShipments();
  return <ShipmentsPanelView data={data} />;
}

export async function AttendancePanel() {
  const data = await getAttendanceSnapshot();
  return <AttendancePanelView data={data} />;
}

export async function PayrollPanel() {
  const data = await getPayrollStatus();
  return <PayrollPanelView data={data} />;
}
