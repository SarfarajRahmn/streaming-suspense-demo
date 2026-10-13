# Streaming vs Blocking — Next.js Suspense Demo

A side-by-side performance demonstration in **Next.js 16** (App Router) & **React 19** contrasting traditional **Blocking SSR** against **Streaming SSR** using React Suspense.

## Overview

The demo simulates a garments-factory ERP dashboard with 4 data sources of varying latency:

| Panel | Latency | Description |
|---|---|---|
| **Today's Production** | `300ms` | Lines running, units today, efficiency |
| **Recent Shipments** | `900ms` | Active shipments, destinations, statuses |
| **Attendance Snapshot** | `1,500ms` | Staff present, absent, on leave |
| **Payroll Status** | `2,500ms` | Period, processed count, total disbursed |

## The Comparison

- **/blocking** (`Blocking SSR`): The server awaits all 4 data endpoints with `Promise.all()` before delivering HTML. The user sees a global loading spinner for ~2.5 seconds before the entire dashboard renders at once.
- **/streaming** (`Streaming SSR`): The page shell and live timer render immediately with fallback skeletons. Each card streams to the client independently as its promise resolves, displaying client-mount timestamps measured via `performance.now()`.

## Key Features

- **⚡ Interactive Live Race Arena (`/compare`)**: Trigger both modes simultaneously in a side-by-side arena with real-time millisecond stopwatches and instant perceived performance speedup indicators.
- **📶 Network Latency Throttler**: Toggle between Fast (50%), Standard (100%), and Slow 3G (180%) simulated network profiles to stress test streaming behavior.
- **📊 Visual Waterfall Chart**: Graphical request timeline illustrating the 2.2s dead time of monolithic SSR versus progressive chunked hydration.
- **✨ Ultra-Modern Aesthetics**: Dark glassmorphism cards (`backdrop-blur-xl`), animated shimmer skeleton placeholders, and micro-metrics (efficiency progress bars, shipment badges, workforce distribution bars).
- **⏱ Precise Mount Timestamps**: Client-side `performance.now()` measuring the exact millisecond each component arrives on the client.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3001](http://localhost:3001) if port 3000 is occupied) in your browser.

## Built With

- **Framework**: [Next.js](https://nextjs.org/) 16 (Turbopack)
- **Library**: [React](https://react.dev/) 19 (Server Components & Suspense)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4

