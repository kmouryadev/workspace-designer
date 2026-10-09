"use client";

import { rp } from "@/data/items";
import { useWorkspace } from "@/store/workspace";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ItemRow } from "@/components/ui/ItemRow";
import { Heading, Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { TrashIcon } from "@/assets/icons";

function ChangeButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="plain" size="inline" onClick={onClick} className="text-[12px] text-gold-text">
      Change
    </Button>
  );
}

export function SummaryList() {
  const desk = useWorkspace((state) => state.desk);
  const chair = useWorkspace((state) => state.chair);
  const qty = useWorkspace((state) => state.qty);
  const setStep = useWorkspace((state) => state.setStep);
  const incMonitor = useWorkspace((state) => state.incMonitor);
  const decMonitor = useWorkspace((state) => state.decMonitor);
  const removeItem = useWorkspace((state) => state.removeItem);

  const catalog = useWorkspace((state) => state.catalog)!; // non-null: CatalogGate guarantees this
  const { ALL_ITEMS, CHAIRS, DESKS } = catalog;

  const deskItem = DESKS.find((candidate) => candidate.id === desk);
  const chairItem = CHAIRS.find((candidate) => candidate.id === chair);
  const accessoryRows = Object.entries(qty)
    .filter(([, quantity]) => quantity > 0)
    .map(([itemId, quantity]) => ({ item: ALL_ITEMS.find((candidate) => candidate.id === itemId), quantity }))
    .filter((row): row is { item: (typeof ALL_ITEMS)[number]; quantity: number } => Boolean(row.item));

  const isEmpty = !deskItem && !chairItem && accessoryRows.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line py-12 text-center">
        <p className="text-[14px] font-bold text-ink">Nothing here yet</p>
        <Typography size="sm" muted className="mt-1">
          Start with a desk and a chair.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Heading size="sm" className="mb-2">
        Your Workspace Setup
      </Heading>
      <div className="hide-scrollbar max-h-[440px] overflow-y-auto">
        {deskItem && (
          <ItemRow
            art={deskItem.art}
            name={deskItem.name}
            meta={`${rp(deskItem.priceK)} / month`}
            trailing={<ChangeButton onClick={() => setStep("setup")} />}
          />
        )}
        {chairItem && (
          <ItemRow
            art={chairItem.art}
            name={chairItem.name}
            meta={`${rp(chairItem.priceK)} / month`}
            trailing={<ChangeButton onClick={() => setStep("setup")} />}
          />
        )}
        {accessoryRows.map(({ item, quantity }) => {
          const isMonitor = item.art === "mon" || item.art === "mon-wide";
          return (
            <ItemRow
              key={item.id}
              art={item.art}
              name={item.name}
              meta={`${rp(item.priceK)} / month${quantity > 1 ? ` × ${quantity}` : ""}`}
              trailing={
                isMonitor ? (
                  <QuantityStepper
                    itemName={item.name}
                    quantity={quantity}
                    onDecrease={() => decMonitor(item.id)}
                    onIncrease={() => incMonitor(item.id)}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-ink-soft">Qty 1</span>
                    <Button
                      variant="plain"
                      size="inline"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id)}
                      className="text-error-text"
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}
