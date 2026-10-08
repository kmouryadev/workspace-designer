"use client";

import type { ReactNode } from "react";
import { Heading, Typography } from "@/components/ui/Typography";

export function TileSection({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="flex max-h-[520px] flex-col">
      <Heading size="sm" className={subtitle ? "" : "mb-2"}>
        {title}
      </Heading>
      {subtitle && (
        <Typography size="sm" muted className="mb-2">
          {subtitle}
        </Typography>
      )}
      <div className="hide-scrollbar grid grid-cols-2 gap-3 overflow-y-auto pb-1">{children}</div>
    </section>
  );
}
