import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { GitHubIcon, ZapIcon } from "@/app/components/icons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 16 Streaming Suspense Benchmark",
  description: "Real-world side-by-side performance demonstration of React 19 Suspense streaming vs monolithic blocking SSR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* Background ambient lighting */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />
        </div>

        {/* Global Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3.5">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 font-bold text-white transition hover:opacity-90">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950">
                  <ZapIcon className="h-4 w-4 fill-zinc-950" />
                </div>
                <span className="text-sm tracking-tight">Suspense Stream</span>
              </Link>

              <nav className="hidden sm:flex items-center gap-5 text-sm">
                <Link
                  href="/compare"
                  className="flex items-center gap-1.5 font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  <span>Live Race</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Live
                  </span>
                </Link>
                <Link
                  href="/streaming"
                  className="text-zinc-400 transition hover:text-white"
                >
                  Streaming
                </Link>
                <Link
                  href="/blocking"
                  className="text-zinc-400 transition hover:text-white"
                >
                  Blocking
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/compare"
                className="sm:hidden rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300"
              >
                Race
              </Link>
              <a
                href="https://github.com/SarfarajRahmn/streaming-suspense-demo"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                <GitHubIcon className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-6 py-10">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="relative z-10 border-t border-white/10 bg-zinc-950/40 py-6 text-center text-xs text-zinc-500">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <div>
              Built with <span className="text-zinc-300 font-medium">Next.js 16</span> +{" "}
              <span className="text-zinc-300 font-medium">React 19</span> +{" "}
              <span className="text-zinc-300 font-medium">Tailwind CSS v4</span>
            </div>
            <div>
              Garments Factory ERP Simulation Benchmark
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
