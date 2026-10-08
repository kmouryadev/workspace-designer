"use client";

import { ALL_ITEMS, CHAIRS, DESKS, rp } from "@/data/items";
import { DURATIONS, durationFactor, durationUnit } from "@/lib/duration";
import type { DurationKey } from "@/lib/validate";
import { ItemRow } from "@/components/ui/ItemRow";
import { Heading, Typography } from "@/components/ui/Typography";

export function OrderSummary({
  desk,
  chair,
  qty,
  duration,
}: {
  desk: string | null;
  chair: string | null;
  qty: Record<string, number>;
  duration: DurationKey;
}) {
  const deskItem = DESKS.find((candidate) => candidate.id === desk);
  const chairItem = CHAIRS.find((candidate) => candidate.id === chair);
  const accessoryRows = Object.entries(qty)
    .filter(([, quantity]) => quantity > 0)
    .map(([itemId, quantity]) => ({ item: ALL_ITEMS.find((candidate) => candidate.id === itemId), quantity }))
    .filter((row): row is { item: (typeof ALL_ITEMS)[number]; quantity: number } => Boolean(row.item));

  const monthlyTotalK =
    (deskItem?.priceK ?? 0) +
    (chairItem?.priceK ?? 0) +
    accessoryRows.reduce((sum, row) => sum + row.item.priceK * row.quantity, 0);

  const periodFactor = durationFactor(duration);
  const periodUnit = durationUnit(duration);
  const periodLabel = DURATIONS.find((option) => option.id === duration)?.label;
  const periodTotalK = Math.round(monthlyTotalK * periodFactor);

  const summaryRows = [
    ...(deskItem ? [{ id: deskItem.id, art: deskItem.art, name: deskItem.name, priceK: deskItem.priceK, quantity: 1 }] : []),
    ...(chairItem ? [{ id: chairItem.id, art: chairItem.art, name: chairItem.name, priceK: chairItem.priceK, quantity: 1 }] : []),
    ...accessoryRows.map((row) => ({
      id: row.item.id,
      art: row.item.art,
      name: row.item.name,
      priceK: row.item.priceK,
      quantity: row.quantity,
    })),
  ];

  return (
    <aside className="flex h-full flex-col rounded-[20px] border border-line bg-panel p-4">
      <Heading size="sm" className="mb-3">
        Your Workspace Setup
      </Heading>
      <div className="hide-scrollbar mb-3 max-h-[400px] overflow-y-auto">
        {summaryRows.map((row) => (
          <ItemRow
            key={row.id}
            art={row.art}
            name={row.name}
            thumbSize="sm"
            meta={`${rp(Math.round(row.priceK * periodFactor))} / ${periodUnit}${row.quantity > 1 ? ` × ${row.quantity}` : ""}`}
          />
        ))}
      </div>
      <div className="mt-auto space-y-1.5 border-t border-line pt-3">
        <div className="flex items-center justify-between text-[13px]">
          <Typography muted>Monthly rate</Typography>
          <span className="font-bold text-ink">{rp(monthlyTotalK)}</span>
        </div>
        <div className="flex items-center justify-between text-[15px]">
          <span className="font-semibold text-ink">{periodLabel} total</span>
          <span className="font-bold text-ink">{rp(periodTotalK)}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-full bg-gold-soft px-3 py-1 text-[11px] font-semibold text-gold-text">
            Flexible rental
          </span>
          <span className="rounded-full bg-info-bg px-3 py-1 text-[11px] font-semibold text-info-text">
            Delivery in Bali
          </span>
        </div>
      </div>
    </aside>
  );
}
