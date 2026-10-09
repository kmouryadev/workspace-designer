import { create } from "zustand";
import { addMonitor } from "@/data/items";
import type { CatalogData } from "@/data/items";
import { buildCatalog } from "@/data/items";
import { fetchCatalog } from "@/lib/catalogApi";

export type Step = "setup" | "accessories" | "summary";
export type Notice = { type: "error" | "info"; text: string } | null;
export type Section =
  | "section-desks"
  | "section-chairs"
  | "section-monitors"
  | "section-lighting"
  | "section-plants"
  | "section-coffee"
  | "section-surfboards"
  | "section-motorcycles"
  | "section-relax";

type WorkspaceState = {
  step: Step;
  activeSection: Section;
  desk: string | null;
  chair: string | null;
  qty: Record<string, number>;
  isAiViewOpen: boolean;
  notice: Notice;
  catalog: CatalogData | null;
  catalogError: string | null;
};

type WorkspaceActions = {
  setStep: (step: Step) => void;
  goNext: () => void;
  goBack: () => void;
  goToSection: (step: Step, section: Section) => void;
  setDesk: (deskId: string) => void;
  setChair: (chairId: string) => void;
  toggleSingle: (itemId: string) => void;
  incMonitor: (itemId: string) => void;
  decMonitor: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  setAiViewOpen: (isOpen: boolean) => void;
  dismissNotice: () => void;
  reset: () => void;
  loadSetup: (desk: string | null, chair: string | null, qty: Record<string, number>) => void;
  loadCatalog: () => Promise<void>;
};

const STEP_ORDER: Step[] = ["setup", "accessories", "summary"];
const DEFAULT_SECTION_FOR_STEP: Record<Step, Section> = {
  setup: "section-desks",
  accessories: "section-lighting",
  summary: "section-lighting",
};

const INITIAL_WORKSPACE_STATE: WorkspaceState = {
  step: "setup",
  activeSection: "section-desks",
  desk: null,
  chair: null,
  qty: {},
  isAiViewOpen: false,
  notice: null,
  catalog: null,
  catalogError: null,
};

export const useWorkspace = create<WorkspaceState & WorkspaceActions>((set, get) => ({
  ...INITIAL_WORKSPACE_STATE,

  setStep: (step) => set({ step, activeSection: DEFAULT_SECTION_FOR_STEP[step], notice: null }),

  goNext: () => {
    const currentIndex = STEP_ORDER.indexOf(get().step);
    if (currentIndex < STEP_ORDER.length - 1) {
      const step = STEP_ORDER[currentIndex + 1];
      set({ step, activeSection: DEFAULT_SECTION_FOR_STEP[step], notice: null });
    }
  },

  goBack: () => {
    const currentIndex = STEP_ORDER.indexOf(get().step);
    if (currentIndex > 0) {
      const step = STEP_ORDER[currentIndex - 1];
      set({ step, activeSection: DEFAULT_SECTION_FOR_STEP[step], notice: null });
    }
  },

  goToSection: (step, section) => set({ step, activeSection: section, notice: null }),

  setDesk: (deskId) => set((state) => ({ desk: state.desk === deskId ? null : deskId, notice: null })),
  setChair: (chairId) => set((state) => ({ chair: state.chair === chairId ? null : chairId, notice: null })),

  toggleSingle: (itemId) => {
    const { qty } = get();
    const isSelected = (qty[itemId] ?? 0) > 0;
    set({ qty: { ...qty, [itemId]: isSelected ? 0 : 1 }, notice: null });
  },

  incMonitor: (itemId) => {
    const { qty } = get();
    const hadOtherMonitorType =
      itemId === "mw" ? (qty.m27 ?? 0) > 0 || (qty.m24 ?? 0) > 0 : (qty.mw ?? 0) > 0;
    const result = addMonitor(qty, itemId);
    if ("error" in result) {
      set({ notice: { type: "error", text: result.error } });
      return;
    }
    let notice: Notice = null;
    if (hadOtherMonitorType) {
      notice =
        itemId === "mw"
          ? { type: "info", text: "An ultrawide takes the whole desk, so your other monitors were removed." }
          : { type: "info", text: "Standard monitors replace the ultrawide." };
    }
    set({ qty: result.qty, notice });
  },

  decMonitor: (itemId) => {
    const { qty } = get();
    const nextQuantity = Math.max(0, (qty[itemId] ?? 0) - 1);
    set({ qty: { ...qty, [itemId]: nextQuantity }, notice: null });
  },

  removeItem: (itemId) => {
    const { qty } = get();
    set({ qty: { ...qty, [itemId]: 0 }, notice: null });
  },

  setAiViewOpen: (isOpen) => set({ isAiViewOpen: isOpen }),
  dismissNotice: () => set({ notice: null }),

  reset: () => set({ ...INITIAL_WORKSPACE_STATE, qty: {} }),

  loadSetup: (desk, chair, qty) => set({ desk, chair, qty }),

  loadCatalog: async () => {
    try {
      const dtos = await fetchCatalog();
      set({ catalog: buildCatalog(dtos), catalogError: null });
    } catch (error) {
      set({ catalogError: error instanceof Error ? error.message : "Failed to load catalog" });
    }
  },
}));
