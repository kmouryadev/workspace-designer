"use client";

import { ToggleTile } from "@/components/ui/Tile";
import type { Item } from "@/data/items";

export function ToggleGrid({
  items,
  qty,
  onAdd,
  onIncrease,
  onDecrease,
}: {
  items: Item[];
  qty: Record<string, number>;
  onAdd: (itemId: string) => void;
  onIncrease?: (itemId: string) => void;
  onDecrease?: (itemId: string) => void;
}) {
  return (
    <>
      {items.map((item) => (
        <ToggleTile
          key={item.id}
          item={item}
          quantity={qty[item.id] ?? 0}
          maxQuantity={item.max}
          onAdd={() => onAdd(item.id)}
          onIncrease={onIncrease ? () => onIncrease(item.id) : undefined}
          onDecrease={onDecrease ? () => onDecrease(item.id) : undefined}
        />
      ))}
    </>
  );
}
