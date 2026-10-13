import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Blocking vs Streaming</h1>
        <p className="mt-2 text-zinc-400">
          Both pages below fetch the exact same four data sources, with the
          exact same artificial delays (300ms, 900ms, 1.5s, 2.5s). The only
          difference is whether the page awaits everything before rendering,
          or streams each panel in independently via React Suspense. Open
          either one and watch the live clock.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/blocking"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
        >
          <h2 className="font-semibold text-white">Blocking (no Suspense)</h2>
          <p className="mt-2 text-sm text-zinc-500">
            One big spinner for 2.5s, then everything appears at once.
          </p>
          <span className="mt-4 inline-block text-sm text-zinc-400 group-hover:text-white">
            Run it →
          </span>
        </Link>

        <Link
          href="/streaming"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
        >
          <h2 className="font-semibold text-white">Streaming (Suspense)</h2>
          <p className="mt-2 text-sm text-zinc-500">
            The shell renders instantly; each panel pops in the moment its
            own data is ready — fastest first.
          </p>
          <span className="mt-4 inline-block text-sm text-zinc-400 group-hover:text-white">
            Run it →
          </span>
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-zinc-400">
        <p>
          Each panel shows the moment it actually mounted on the client
          (measured with <code className="text-zinc-300">performance.now()</code>{" "}
          since navigation started), so the difference is a number, not just
          a feeling.
        </p>
      </div>
    </div>
  );
}
