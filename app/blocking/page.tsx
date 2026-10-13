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

// Without this, Next.js would statically prerender this page at build time
// (nothing here reads cookies/headers/params), baking in one static result
// forever instead of actually re-running the fetches — and the delay —
// on every visit, which is the entire point of this demo.
export const dynamic = "force-dynamic";

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
    <div className="grid gap-4 sm:grid-cols-2">
      <ProductionPanelView data={production} />
      <ShipmentsPanelView data={shipments} />
      <AttendancePanelView data={attendance} />
      <PayrollPanelView data={payroll} />
    </div>
  );
}
