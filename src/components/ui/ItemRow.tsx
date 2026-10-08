"use client";

import type { ReactNode } from "react";
import { Art } from "@/assets/art";
import { Typography } from "@/components/ui/Typography";

export function ItemRow({
  art,
  name,
  meta,
  trailing,
  thumbSize = "md",
}: {
  art: string;
  name: string;
  meta: ReactNode;
  trailing?: ReactNode;
  thumbSize?: "sm" | "md";
}) {
  const thumbSizeClass = thumbSize === "sm" ? "h-11 w-11" : "h-12 w-12";
  return (
    <div className="flex items-center gap-3 border-b border-line py-2.5 last:border-b-0">
      <div className={`flex ${thumbSizeClass} shrink-0 items-center justify-center rounded-lg bg-gold-softer p-1.5`}>
        <Art id={art} className="max-h-full max-w-full" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-bold text-ink">{name}</p>
        <Typography size="sm" muted>
          {meta}
        </Typography>
      </div>
      {trailing}
    </div>
  );
}
