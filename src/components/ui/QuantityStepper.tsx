"use client";

export function QuantityStepper({
  itemName,
  quantity,
  onDecrease,
  onIncrease,
}: {
  itemName: string;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label={`Decrease ${itemName} quantity`}
        onClick={onDecrease}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ink"
      >
        −
      </button>
      <span className="min-w-[1ch] text-center text-[12px] font-semibold" aria-live="polite" aria-atomic="true">
        {quantity}
      </span>
      <button
        type="button"
        aria-label={`Increase ${itemName} quantity`}
        onClick={onIncrease}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ink"
      >
        +
      </button>
    </div>
  );
}
