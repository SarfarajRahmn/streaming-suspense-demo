import { Suspense } from "react";
import { LiveClock } from "@/app/components/LiveClock";
import { PanelSkeleton } from "@/app/components/Skeleton";
import {
  ProductionPanel,
  ShipmentsPanel,
  AttendancePanel,
  PayrollPanel,
} from "@/app/components/panels";
import {
  FactoryIcon,
  ShipmentIcon,
  UsersIcon,
  PayrollIcon,
  ZapIcon,
} from "@/app/components/icons";
import { WaterfallChart } from "@/app/components/WaterfallChart";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Streaming SSR Demo (React Suspense)",
  description: "Live progressive rendering with Next.js 16 and React 19 Suspense.",
};

export default function StreamingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <ZapIcon className="h-4 w-4" />
          <span>React 19 Streaming SSR</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Streaming with Suspense Boundaries
        </h1>
        <p className="text-sm text-zinc-400">
          The shell renders immediately. Each panel below is isolated inside its own Suspense boundary
          and streams down the wire over HTTP chunked transfer as soon as its promise resolves.
        </p>
      </div>

      <LiveClock label="Live Clock" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Suspense
          fallback={
            <PanelSkeleton
              title="Today's Production"
              icon={<FactoryIcon className="h-4 w-4 text-emerald-400" />}
              type="metrics"
            />
          }
        >
          <ProductionPanel />
        </Suspense>

        <Suspense
          fallback={
            <PanelSkeleton
              title="Recent Shipments"
              icon={<ShipmentIcon className="h-4 w-4 text-blue-400" />}
              type="list"
            />
          }
        >
          <ShipmentsPanel />
        </Suspense>

        <Suspense
          fallback={
            <PanelSkeleton
              title="Attendance Snapshot"
              icon={<UsersIcon className="h-4 w-4 text-violet-400" />}
              type="metrics"
            />
          }
        >
          <AttendancePanel />
        </Suspense>

        <Suspense
          fallback={
            <PanelSkeleton
              title="Payroll Status"
              icon={<PayrollIcon className="h-4 w-4 text-amber-400" />}
              type="default"
            />
          }
        >
          <PayrollPanel />
        </Suspense>
      </div>

      <div className="mt-2">
        <WaterfallChart />
      </div>
    </div>
  );
}
