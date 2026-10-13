import type { ReactNode } from "react";

export function PanelCard({
  title,
  icon,
  badge,
  children,
  accentColor = "emerald",
}: {
  title: string;
  icon?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  accentColor?: "emerald" | "blue" | "violet" | "amber";
}) {
  const accentBorder = {
    emerald: "hover:border-emerald-500/30",
    blue: "hover:border-blue-500/30",
    violet: "hover:border-violet-500/30",
    amber: "hover:border-amber-500/30",
  }[accentColor];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/60 hover:shadow-xl ${accentBorder}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition-colors group-hover:border-white/20 group-hover:text-white">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-semibold tracking-wide text-zinc-200">{title}</h3>
        </div>
        {badge}
      </div>
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string | number;
  subtext?: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold tracking-tight text-white">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
      {subtext && <div className="mt-0.5 text-[11px] text-zinc-500">{subtext}</div>}
    </div>
  );
}
