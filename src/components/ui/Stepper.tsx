"use client";

import { Typography } from "@/components/ui/Typography";

const STEPS = ["Setup", "Accessories", "Summary", "Rental request"];

export function Stepper({ current }: { current: number }) {
  return (
    <div className="mb-4">
      <ol className="hidden items-center gap-2 min-[641px]:flex" aria-label="Progress">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const isCurrent = stepNumber === current;
          const isDone = stepNumber < current;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                aria-current={isCurrent ? "step" : undefined}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                  isCurrent
                    ? "bg-navy text-white"
                    : isDone
                    ? "bg-gold-soft text-gold-text"
                    : "bg-panel text-ink-soft"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    isCurrent ? "bg-white/20" : "bg-black/5"
                  }`}
                >
                  {stepNumber}
                </span>
                {label}
              </span>
              {stepNumber < STEPS.length && <span className="h-px w-4 bg-line" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
      <div className="min-[641px]:hidden">
        <Typography size="sm" muted className="mb-1.5 font-semibold">
          Step {current} of {STEPS.length} — {STEPS[current - 1]}
        </Typography>
        <div className="h-1.5 w-full rounded-full bg-line">
          <div
            className="h-1.5 rounded-full bg-gold transition-all"
            style={{ width: `${(current / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
