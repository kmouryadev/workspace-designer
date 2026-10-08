import type { DurationKey } from "@/lib/validate";

export const DURATIONS: { id: DurationKey; label: string; unit: string; factor: number }[] = [
  { id: "weekly", label: "Weekly", unit: "week", factor: 0.25 },
  { id: "biweekly", label: "Biweekly", unit: "2 weeks", factor: 0.5 },
  { id: "monthly", label: "Monthly", unit: "month", factor: 1 },
  { id: "yearly", label: "Yearly", unit: "year", factor: 12 },
];

export function durationFactor(key: DurationKey): number {
  return DURATIONS.find((option) => option.id === key)?.factor ?? 1;
}

export function durationUnit(key: DurationKey): string {
  return DURATIONS.find((option) => option.id === key)?.unit ?? "month";
}
