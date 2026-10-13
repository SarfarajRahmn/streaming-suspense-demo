import { Suspense } from "react";
import { LiveClock } from "@/app/components/LiveClock";
import { PanelSkeleton } from "@/app/components/Skeleton";
import { ProductionPanel, ShipmentsPanel, AttendancePanel, PayrollPanel } from "@/app/components/panels";

// See the comment in app/blocking/page.tsx — same reason.
export const dynamic = "force-dynamic";

export default function StreamingPage() {
  // The shell (this LiveClock + grid + skeletons) is sent to the browser
  // immediately. Each panel below is its own Suspense boundary, so React
  // streams each one in independently, in whatever order its own promise
  // resolves — fastest first, slowest last — instead of waiting for all four.
  return (
    <div className="flex flex-col gap-6">
      <div>
        <LiveClock label="Elapsed" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Suspense fallback={<PanelSkeleton title="Today's Production" rows={2} />}>
          <ProductionPanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton title="Recent Shipments" rows={3} />}>
          <ShipmentsPanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton title="Attendance Snapshot" rows={2} />}>
          <AttendancePanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton title="Payroll Status" rows={3} />}>
          <PayrollPanel />
        </Suspense>
      </div>
    </div>
  );
}
