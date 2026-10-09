"use client";

import { useEffect, useRef } from "react";
import { RoomStage } from "@/components/organisms/RoomStage";
import { useWorkspace } from "@/store/workspace";
import { WrenchIcon } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

export function Stage() {
  const desk = useWorkspace((state) => state.desk);
  const chair = useWorkspace((state) => state.chair);
  const qty = useWorkspace((state) => state.qty);
  const isAiViewOpen = useWorkspace((state) => state.isAiViewOpen);
  const setAiViewOpen = useWorkspace((state) => state.setAiViewOpen);
  const catalog = useWorkspace((state) => state.catalog)!; // non-null: CatalogGate guarantees this
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

  return (
    <div className="relative">
      <RoomStage desk={desk} chair={chair} qty={qty} catalog={catalog} />

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
