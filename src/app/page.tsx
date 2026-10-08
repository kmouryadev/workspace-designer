"use client";

import { CategoryRail } from "@/components/ui/CategoryRail";
import { OptionsPanel } from "@/components/organisms/OptionsPanel";
import { Stage } from "@/components/organisms/Stage";
import { Stepper } from "@/components/ui/Stepper";
import { useWorkspace } from "@/store/workspace";

const STEP_INDEX = { setup: 1, accessories: 2, summary: 3 } as const;

export default function BuilderPage() {
  const step = useWorkspace((state) => state.step);
  const showRail = step !== "summary";

  return (
    <main id="main-content" className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 min-[1100px]:px-8">
      <h1 className="sr-only">Workspace Designer</h1>
      <Stepper current={STEP_INDEX[step]} />

      <div
        className={`flex flex-col gap-4 min-[1100px]:grid min-[1100px]:items-start min-[1100px]:gap-5 ${
          showRail ? "min-[1100px]:grid-cols-[92px_420px_1fr]" : "min-[1100px]:grid-cols-[420px_1fr]"
        }`}
      >
        {showRail && (
          <div className="order-2 min-[1100px]:order-1">
            <CategoryRail />
          </div>
        )}
        <div className={`order-3 ${showRail ? "min-[1100px]:order-2" : "min-[1100px]:order-1"}`}>
          <OptionsPanel />
        </div>
        <div className={`order-1 ${showRail ? "min-[1100px]:order-3" : "min-[1100px]:order-2"}`}>
          <Stage />
        </div>
      </div>
    </main>
  );
}
