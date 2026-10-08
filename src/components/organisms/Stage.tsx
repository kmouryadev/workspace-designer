"use client";

import { useEffect, useRef } from "react";
import { Art, RoomBackground } from "@/assets/art";
import { ALL_ITEMS, COFFEE, MOTORCYCLES, RELAX_ZONE, STAGE, SURFBOARDS, stagePlacements } from "@/data/items";
import { useWorkspace } from "@/store/workspace";
import { WrenchIcon } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

const EXTRA_ITEMS = [...COFFEE, ...SURFBOARDS, ...MOTORCYCLES, ...RELAX_ZONE];

export function Stage() {
  const desk = useWorkspace((state) => state.desk);
  const chair = useWorkspace((state) => state.chair);
  const qty = useWorkspace((state) => state.qty);
  const isAiViewOpen = useWorkspace((state) => state.isAiViewOpen);
  const setAiViewOpen = useWorkspace((state) => state.setAiViewOpen);
  const aiViewToggleRef = useRef<HTMLButtonElement>(null);
  const backToRoomViewRef = useRef<HTMLButtonElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isAiViewOpen) backToRoomViewRef.current?.focus();
    else aiViewToggleRef.current?.focus();
  }, [isAiViewOpen]);

  const placements = stagePlacements(desk, chair, qty);
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
            Pick a desk to start
          </div>
        )}
      </div>

      {chosenExtras.length > 0 && (
        <div
          role="group"
          aria-label="Extras added to your setup"
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

      <div
        role="group"
        aria-label="Stage view"
        className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 p-1 shadow-sm backdrop-blur"
      >
        <button
          type="button"
          aria-pressed={!isAiViewOpen}
          onClick={() => setAiViewOpen(false)}
          className={`rounded-full px-3 py-1 text-[12px] font-semibold ${!isAiViewOpen ? "bg-navy text-white" : "text-ink-soft"}`}
        >
          Room View
        </button>
        <button
          ref={aiViewToggleRef}
          type="button"
          aria-pressed={isAiViewOpen}
          onClick={() => setAiViewOpen(true)}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold ${isAiViewOpen ? "bg-navy text-white" : "text-ink-soft"}`}
        >
          AI View
          <span className="rounded-full bg-amber px-1.5 py-0.5 text-[9px] font-bold text-ink">Under maintenance</span>
        </button>
      </div>

      {isAiViewOpen && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-ink/30 backdrop-blur-sm"
          onKeyDown={(event) => {
            if (event.key === "Escape") setAiViewOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-view-dialog-title"
            className="mx-4 max-w-[280px] rounded-2xl bg-white p-5 text-center shadow-lg"
          >
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-gold-text">
              <WrenchIcon />
            </div>
            <p id="ai-view-dialog-title" className="font-heading text-[15px] font-bold text-ink">
              AI View is under maintenance
            </p>
            <Typography size="sm" muted className="mt-1.5">
              We are tuning the AI room render. Your setup is saved, so keep designing in Room View.
            </Typography>
            <Button ref={backToRoomViewRef} variant="primary" size="sm" onClick={() => setAiViewOpen(false)} className="mt-3">
              Back to Room View
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
