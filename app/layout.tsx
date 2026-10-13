import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Streaming vs Blocking — Next.js Suspense Demo",
  description: "A side-by-side demo of React Suspense streaming vs a traditional blocking load.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <header className="border-b border-white/10">
          <nav className="mx-auto flex max-w-3xl items-center gap-6 px-6 py-4 text-sm">
            <Link href="/" className="font-semibold text-white">Streaming Demo</Link>
            <Link href="/blocking" className="text-zinc-400 hover:text-white">Blocking</Link>
            <Link href="/streaming" className="text-zinc-400 hover:text-white">Streaming</Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
