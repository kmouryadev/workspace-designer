"use client";

import type { KeyboardEvent } from "react";
import { useWorkspace, type Step, type Section } from "@/store/workspace";

type RailItem = { label: string; step: Step; section: Section; icon: string };

const RAIL: RailItem[] = [
  { label: "Desks", step: "setup", section: "section-desks", icon: "🖥️" },
  { label: "Chairs", step: "setup", section: "section-chairs", icon: "🪑" },
  { label: "Monitors", step: "setup", section: "section-monitors", icon: "🖵" },
  { label: "Lighting", step: "accessories", section: "section-lighting", icon: "💡" },
  { label: "Plants", step: "accessories", section: "section-plants", icon: "🌿" },
  { label: "Coffee", step: "accessories", section: "section-coffee", icon: "☕" },
  { label: "Surfboards", step: "accessories", section: "section-surfboards", icon: "🏄" },
  { label: "Motorcycles", step: "accessories", section: "section-motorcycles", icon: "🏍️" },
  { label: "Relax Zone", step: "accessories", section: "section-relax", icon: "🛋️" },
];

const tabId = (section: Section) => `tab-${section}`;

export function CategoryRail() {
  const step = useWorkspace((state) => state.step);
  const activeSection = useWorkspace((state) => state.activeSection);
  const goToSection = useWorkspace((state) => state.goToSection);

  const visibleRailItems = RAIL.filter((item) => item.step === step);
  if (visibleRailItems.length === 0) return null;

  const activate = (item: RailItem, focusAfter: boolean) => {
    goToSection(item.step, item.section);
    requestAnimationFrame(() => {
      document.getElementById("options-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (focusAfter) document.getElementById(tabId(item.section))?.focus();
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const isHorizontal = window.matchMedia("(max-width: 1099px)").matches;
    const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
    const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

    let targetIndex: number | null = null;
    if (event.key === nextKey) targetIndex = (index + 1) % visibleRailItems.length;
    else if (event.key === prevKey) targetIndex = (index - 1 + visibleRailItems.length) % visibleRailItems.length;
    else if (event.key === "Home") targetIndex = 0;
    else if (event.key === "End") targetIndex = visibleRailItems.length - 1;

    if (targetIndex !== null) {
      event.preventDefault();
      activate(visibleRailItems[targetIndex], true);
    }
  };

  return (
    <nav
      role="tablist"
      aria-label="Categories"
      aria-orientation="vertical"
      className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 min-[1100px]:w-[92px] min-[1100px]:flex-col min-[1100px]:overflow-y-auto min-[1100px]:pb-0"
    >
      {visibleRailItems.map((item, index) => {
        const current = item.section === activeSection;
        return (
          <button
            key={item.label}
            id={tabId(item.section)}
            type="button"
            role="tab"
            aria-selected={current}
            aria-controls="options-panel"
            tabIndex={current ? 0 : -1}
            onClick={() => activate(item, false)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex shrink-0 flex-col items-center gap-1 rounded-xl border px-3 py-2.5 text-[11px] font-semibold transition-colors min-[1100px]:px-2 ${
              current ? "border-gold bg-gold-soft text-gold-text" : "border-line bg-panel text-ink-soft"
            }`}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {item.icon}
            </span>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
