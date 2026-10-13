import {
  getAttendanceSnapshot,
  getPayrollStatus,
  getProductionSummary,
  getRecentShipments,
} from "@/app/lib/data";
import {
  ProductionPanelView,
  ShipmentsPanelView,
  AttendancePanelView,
  PayrollPanelView,
} from "@/app/components/panels";
import { ClockIcon } from "@/app/components/icons";
import { LiveClock } from "@/app/components/LiveClock";
import { WaterfallChart } from "@/app/components/WaterfallChart";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blocking SSR Demo (No Suspense)",
  description: "Monolithic blocking SSR demonstration in Next.js 16.",
};

export default async function BlockingPage() {
  // The critical difference from /streaming: this function is one big
  // `await`. React can't render a single byte of this component's output
  // until every one of these has resolved — so the whole page is stuck
  // behind the slowest one (2.5s), with nothing to show but loading.tsx's
  // shell in the meantime.
  const [production, shipments, attendance, payroll] = await Promise.all([
    getProductionSummary(),
    getRecentShipments(),
    getAttendanceSnapshot(),
    getPayrollStatus(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
          <ClockIcon className="h-4 w-4" />
          <span>Traditional Blocking SSR</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Blocking Rendering (Awaiting All)
        </h1>
        <p className="text-sm text-zinc-400">
          All 4 queries were grouped in a server-side <code className="text-zinc-300">Promise.all()</code>.
          Notice how every panel below mounted at the exact same delayed moment (~2.5s).
        </p>
      </div>

      <LiveClock label="Loaded at" />

      <div className="grid gap-4 sm:grid-cols-2">
        <ProductionPanelView data={production} />
        <ShipmentsPanelView data={shipments} />
        <AttendancePanelView data={attendance} />
        <PayrollPanelView data={payroll} />
      </div>

      <div className="mt-2">
        <WaterfallChart />
      </div>
    </div>
  );
}
