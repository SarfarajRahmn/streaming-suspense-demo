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

// Presentational views — plain (non-async) components that just render data
// they're handed. Used directly by the streaming route's async wrappers
// below, AND by the blocking route (which awaits everything up front and
// passes the resolved data down), so both routes render pixel-identical
// output and the only real difference is *when* each panel's data resolves.

export function ProductionPanelView({ data }: { data: ProductionSummary }) {
  return (
    <PanelCard title="Today's Production" badge={<ElapsedBadge />}>
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Lines running" value={data.linesRunning} />
        <Stat label="Units today" value={data.unitsToday.toLocaleString()} />
        <Stat label="Efficiency" value={`${data.efficiency}%`} />
      </div>
    </PanelCard>
  );
}

export function ShipmentsPanelView({ data }: { data: Shipment[] }) {
  return (
    <PanelCard title="Recent Shipments" badge={<ElapsedBadge />}>
      <ul className="space-y-2 text-sm">
        {data.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-2 text-zinc-300">
            <span className="truncate">{s.buyer} → {s.destination}</span>
            <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-400">{s.status}</span>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

export function AttendancePanelView({ data }: { data: AttendanceSnapshot }) {
  return (
    <PanelCard title="Attendance Snapshot" badge={<ElapsedBadge />}>
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Present" value={data.present} />
        <Stat label="Absent" value={data.absent} />
        <Stat label="On leave" value={data.onLeave} />
      </div>
    </PanelCard>
  );
}

export function PayrollPanelView({ data }: { data: PayrollStatus }) {
  return (
    <PanelCard title="Payroll Status" badge={<ElapsedBadge />}>
      <div className="space-y-1 text-sm text-zinc-300">
        <div>Period: <span className="text-white">{data.period}</span></div>
        <div>Processed: <span className="text-white">{data.employeesProcessed}/{data.totalEmployees}</span></div>
        <div>Disbursed: <span className="text-white">{data.totalDisbursed}</span></div>
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
