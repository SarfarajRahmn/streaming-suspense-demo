// Mock "backend" calls with deliberately staggered artificial latency,
// so the streaming effect is obvious rather than subtle. Themed loosely
// after a garments-factory ERP dashboard, but this is demo data only.

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ProductionSummary {
  linesRunning: number;
  unitsToday: number;
  efficiency: number;
}

export interface Shipment {
  id: string;
  buyer: string;
  destination: string;
  status: "Packed" | "In Transit" | "Customs";
  eta: string;
}

export interface AttendanceSnapshot {
  present: number;
  absent: number;
  onLeave: number;
  total: number;
}

export interface PayrollStatus {
  period: string;
  employeesProcessed: number;
  totalEmployees: number;
  totalDisbursed: string;
}

export async function getProductionSummary(): Promise<ProductionSummary> {
  await delay(300);
  return { linesRunning: 8, unitsToday: 14_320, efficiency: 87 };
}

export async function getRecentShipments(): Promise<Shipment[]> {
  await delay(900);
  return [
    { id: "SHP-2291", buyer: "Nordic Wear AB", destination: "Gothenburg, SE", status: "In Transit", eta: "3 days" },
    { id: "SHP-2290", buyer: "Meridian Apparel", destination: "Rotterdam, NL", status: "Packed", eta: "5 days" },
    { id: "SHP-2288", buyer: "Coastline Retail", destination: "Southampton, UK", status: "Customs", eta: "1 day" },
  ];
}

export async function getAttendanceSnapshot(): Promise<AttendanceSnapshot> {
  await delay(1500);
  return { present: 94, absent: 4, onLeave: 2, total: 100 };
}

export async function getPayrollStatus(): Promise<PayrollStatus> {
  await delay(2500);
  return {
    period: "August 2026",
    employeesProcessed: 97,
    totalEmployees: 100,
    totalDisbursed: "৳ 24,18,600",
  };
}
