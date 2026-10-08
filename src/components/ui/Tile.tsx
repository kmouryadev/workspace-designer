"use client";

import { Art } from "@/assets/art";
import { rpK } from "@/data/items";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { CheckCircleIcon, PlusCircleIcon } from "@/assets/icons";
import { Typography } from "@/components/ui/Typography";

type TileItem = {
  id: string;
  name: string;
  spec: string;
  priceK: number;
  art: string;
};

export function SelectTile({ item, selected, onSelect }: { item: TileItem; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`relative flex flex-col rounded-[14px] border p-3 text-left transition-colors ${
        selected ? "border-gold bg-gold-softer" : "border-line bg-panel hover:border-gold/60"
      }`}
    >
      {selected && (
        <span className="absolute right-2 top-2">
          <CheckCircleIcon />
        </span>
      )}
      <div className="flex h-20 items-end justify-center">
        <Art id={item.art} className="max-h-full max-w-full" />
      </div>
      <p className="mt-2 text-[13px] font-bold text-ink">{item.name}</p>
      <Typography size="xs" muted>
        {item.spec}
      </Typography>
      <p className="mt-1 text-[13px] font-bold text-ink">{rpK(item.priceK)} / month</p>
    </button>
  );
}

export function ToggleTile({
  item,
  quantity,
  maxQuantity,
  onAdd,
  onIncrease,
  onDecrease,
}: {
  item: TileItem;
  quantity: number;
  maxQuantity: number;
  onAdd: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}) {
  const isSelected = quantity > 0;
  const showStepper = isSelected && maxQuantity > 1 && onIncrease && onDecrease;

  return (
    <div
      className={`relative flex flex-col rounded-[14px] border p-3 text-left transition-colors ${
        isSelected ? "border-gold bg-gold-softer" : "border-line bg-panel hover:border-gold/60"
      }`}
    >
      <button
        type="button"
        aria-pressed={isSelected}
        aria-label={isSelected ? `Remove ${item.name}` : `Add ${item.name}`}
        onClick={onAdd}
        className="absolute inset-0 z-0 rounded-[14px]"
      />
      <span className="pointer-events-none absolute right-2 top-2" aria-hidden="true">
        {isSelected ? <CheckCircleIcon /> : <PlusCircleIcon />}
      </span>
      <div className="pointer-events-none flex h-20 items-end justify-center">
        <Art id={item.art} className="max-h-full max-w-full" />
      </div>
      <p className="pointer-events-none mt-2 text-[13px] font-bold text-ink">{item.name}</p>
      <Typography size="xs" muted className="pointer-events-none">
        {item.spec}
      </Typography>
      <div className="mt-1 flex items-center justify-between">
        <p className="pointer-events-none text-[13px] font-bold text-ink">{rpK(item.priceK)} / month</p>
        {showStepper && (
          <div className="relative z-10">
            <QuantityStepper itemName={item.name} quantity={quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
          </div>
        )}
      </div>
    </div>
  );
}
