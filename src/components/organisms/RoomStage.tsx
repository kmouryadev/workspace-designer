import { Art, RoomBackground } from "@/assets/art";
import { STAGE, stagePlacements, type CatalogData } from "@/data/items";

export function RoomStage({
  desk,
  chair,
  qty,
  catalog,
}: {
  desk: string | null;
  chair: string | null;
  qty: Record<string, number>;
  catalog: CatalogData;
}) {
  const { ALL_ITEMS, COFFEE, MOTORCYCLES, RELAX_ZONE, SURFBOARDS } = catalog;
  const EXTRA_ITEMS = [...COFFEE, ...SURFBOARDS, ...MOTORCYCLES, ...RELAX_ZONE];

  const placements = stagePlacements(desk, chair, qty, catalog);
  const chosenExtras = EXTRA_ITEMS.filter((item) => (qty[item.id] ?? 0) > 0);

  const chosenItemNames = [desk, chair]
    .concat(Object.keys(qty).filter((itemId) => (qty[itemId] ?? 0) > 0))
    .map((itemId) => ALL_ITEMS.find((item) => item.id === itemId)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-line bg-panel" style={{ aspectRatio: "4 / 3" }}>
      <div
        className="absolute inset-0"
        role="group"
        aria-label={chosenItemNames ? `Room with ${chosenItemNames}` : "Empty room"}
      >
        <RoomBackground />
        {placements.map((placement, index) => (
          <div
            key={`${placement.art}-${index}`}
            className="stage-item-enter absolute"
            style={{
              left: `${(placement.x / STAGE.w) * 100}%`,
              top: `${(placement.y / STAGE.h) * 100}%`,
              width: `${(placement.w / STAGE.w) * 100}%`,
              height: `${(placement.h / STAGE.h) * 100}%`,
              animationDelay: `${index * 35}ms`,
            }}
          >
            <Art id={placement.art} className="h-full w-full" />
          </div>
        ))}
        {!desk && (
          <div
            className="absolute flex items-center justify-center rounded-lg border-2 border-dashed border-ink-soft/40 bg-black/5 text-[12px] font-medium text-ink-soft"
            style={{
              left: `${(130 / STAGE.w) * 100}%`,
              top: `${(290 / STAGE.h) * 100}%`,
              width: `${(380 / STAGE.w) * 100}%`,
              height: `${(150 / STAGE.h) * 100}%`,
            }}
          >
            No desk in this setup
          </div>
        )}
      </div>

      {chosenExtras.length > 0 && (
        <div
          role="group"
          aria-label="Extras in this setup"
          className="absolute bottom-3 right-3 flex flex-col items-end gap-2"
        >
          {chosenExtras.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded-xl border border-line bg-white/95 py-1.5 pl-1.5 pr-3 shadow-sm backdrop-blur"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-softer p-1">
                <Art id={item.art} className="h-full w-full" />
              </div>
              <span className="text-[11px] font-semibold text-ink">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
