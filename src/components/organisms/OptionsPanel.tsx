"use client";

import { useRouter } from "next/navigation";
import { rp, totalMonthlyK } from "@/data/items";
import { useWorkspace } from "@/store/workspace";
import { SelectTile } from "@/components/ui/Tile";
import { ToggleGrid } from "@/components/ui/ToggleGrid";
import { TileSection } from "@/components/ui/TileSection";
import { Notice } from "@/components/ui/Notice";
import { Button } from "@/components/ui/Button";
import { SummaryList } from "@/components/organisms/SummaryList";
import { encodeSetup } from "@/lib/share";

export function OptionsPanel() {
  const step = useWorkspace((state) => state.step);
  const activeSection = useWorkspace((state) => state.activeSection);
  const desk = useWorkspace((state) => state.desk);
  const chair = useWorkspace((state) => state.chair);
  const qty = useWorkspace((state) => state.qty);
  const notice = useWorkspace((state) => state.notice);
  const dismissNotice = useWorkspace((state) => state.dismissNotice);
  const setDesk = useWorkspace((state) => state.setDesk);
  const setChair = useWorkspace((state) => state.setChair);
  const toggleSingle = useWorkspace((state) => state.toggleSingle);
  const incMonitor = useWorkspace((state) => state.incMonitor);
  const decMonitor = useWorkspace((state) => state.decMonitor);
  const goNext = useWorkspace((state) => state.goNext);
  const goBack = useWorkspace((state) => state.goBack);
  const router = useRouter();

  const catalog = useWorkspace((state) => state.catalog)!; // non-null: CatalogGate guarantees this
  const { DESKS, CHAIRS, MONITORS, LIGHTS, PLANTS, COFFEE, SURFBOARDS, MOTORCYCLES, RELAX_ZONE } = catalog;

  const hasDeskAndChair = Boolean(desk && chair);
  const monthlyTotalK = totalMonthlyK(desk, chair, qty, catalog);

  const nextLabel = step === "setup" ? "Next: Accessories" : step === "accessories" ? "Review Setup" : "Rent This Setup";

  const handleNext = () => {
    if (step === "summary") {
      const query = encodeSetup(desk, chair, qty);
      router.push(`/checkout${query ? `?${query}` : ""}`);
      return;
    }
    if (step === "setup" && !hasDeskAndChair) return;
    goNext();
  };

  const hasActiveTab = step !== "summary";

  return (
    <div
      id="options-panel"
      role={hasActiveTab ? "tabpanel" : undefined}
      aria-labelledby={hasActiveTab ? `tab-${activeSection}` : undefined}
      className="flex min-h-0 flex-col rounded-[20px] border border-line bg-panel p-4 min-[1100px]:w-[420px]"
    >
      <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
        <Notice notice={notice} onDismiss={dismissNotice} />

        {step === "setup" && activeSection === "section-desks" && (
          <TileSection title="Choose a Desk">
            {DESKS.map((deskOption) => (
              <SelectTile
                key={deskOption.id}
                item={deskOption}
                selected={desk === deskOption.id}
                onSelect={() => setDesk(deskOption.id)}
              />
            ))}
          </TileSection>
        )}

        {step === "setup" && activeSection === "section-chairs" && (
          <TileSection title="Choose a Chair">
            {CHAIRS.map((chairOption) => (
              <SelectTile
                key={chairOption.id}
                item={chairOption}
                selected={chair === chairOption.id}
                onSelect={() => setChair(chairOption.id)}
              />
            ))}
          </TileSection>
        )}

        {step === "setup" && activeSection === "section-monitors" && (
          <TileSection title="Add Monitors" subtitle="Up to 3 monitors, or 1 ultrawide.">
            <ToggleGrid items={MONITORS} qty={qty} onAdd={incMonitor} onIncrease={incMonitor} onDecrease={decMonitor} />
          </TileSection>
        )}

        {step === "accessories" && activeSection === "section-lighting" && (
          <TileSection title="Lighting" subtitle="Each light has its own spot, so nothing overlaps.">
            <ToggleGrid items={LIGHTS} qty={qty} onAdd={toggleSingle} />
          </TileSection>
        )}

        {step === "accessories" && activeSection === "section-plants" && (
          <TileSection title="Plants" subtitle="Add some green to your workspace.">
            <ToggleGrid items={PLANTS} qty={qty} onAdd={toggleSingle} />
          </TileSection>
        )}

        {step === "accessories" && activeSection === "section-coffee" && (
          <TileSection title="Coffee Station" subtitle="Start the day right.">
            <ToggleGrid items={COFFEE} qty={qty} onAdd={toggleSingle} />
          </TileSection>
        )}

        {step === "accessories" && activeSection === "section-surfboards" && (
          <TileSection title="Surfboards" subtitle="For the breaks between meetings.">
            <ToggleGrid items={SURFBOARDS} qty={qty} onAdd={toggleSingle} />
          </TileSection>
        )}

        {step === "accessories" && activeSection === "section-motorcycles" && (
          <TileSection title="Motorcycles" subtitle="Get around Bali with your setup.">
            <ToggleGrid items={MOTORCYCLES} qty={qty} onAdd={toggleSingle} />
          </TileSection>
        )}

        {step === "accessories" && activeSection === "section-relax" && (
          <TileSection title="Relax Zone" subtitle="Cushions and bean bags for downtime.">
            <ToggleGrid items={RELAX_ZONE} qty={qty} onAdd={toggleSingle} />
          </TileSection>
        )}

        {step === "summary" && <SummaryList />}
      </div>

      <div className="mt-4 border-t border-line pt-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[12px] text-ink-soft">Total (monthly)</span>
          <span className="text-[17px] font-bold text-ink">{rp(monthlyTotalK)}</span>
        </div>
        {step === "setup" && !hasDeskAndChair && (
          <p id="next-step-hint" className="mb-2 text-[12px] font-medium text-error-text">
            Pick a desk and a chair to continue.
          </p>
        )}
        <div className="flex gap-2">
          {step !== "setup" && (
            <Button variant="secondary" onClick={goBack} className="flex-1">
              Back
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!hasDeskAndChair}
            aria-describedby={step === "setup" && !hasDeskAndChair ? "next-step-hint" : undefined}
            className="flex-1"
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
