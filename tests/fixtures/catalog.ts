import { buildCatalog, type CatalogData } from "@/data/items";
import { useWorkspace } from "@/store/workspace";
import type { CatalogItemDto } from "@/lib/catalogApi";

export const SAMPLE_CATALOG_DTOS: CatalogItemDto[] = [
  { id: "desk-std", category: "desk", name: "Standing Desk Pro", spec: "120 x 70 cm", priceK: 450, maxQuantity: 1 },
  { id: "desk-classic", category: "desk", name: "Classic Desk", spec: "140 x 70 cm", priceK: 300, maxQuantity: 1 },
  { id: "chair-ergo", category: "chair", name: "Ergonomic Chair", spec: "Breathable mesh", priceK: 350, maxQuantity: 1 },
  { id: "chair-exec", category: "chair", name: "Executive Chair", spec: "Premium comfort", priceK: 400, maxQuantity: 1 },
  { id: "m27", category: "monitor", name: '27" 4K Monitor', spec: "Up to 3 on one desk", priceK: 300, maxQuantity: 3 },
  { id: "mw", category: "monitor", name: 'Ultrawide 34"', spec: "Takes the whole desk", priceK: 450, maxQuantity: 1 },
  { id: "l-desk", category: "lighting", name: "Desk Lamp", spec: "Arm lamp, warm LED", priceK: 100, maxQuantity: 1 },
  { id: "p-small", category: "plant", name: "Small Plant", spec: "Sits on the desk", priceK: 60, maxQuantity: 1 },
  { id: "coffee-espresso", category: "coffee", name: "Espresso Machine", spec: "Single group", priceK: 180, maxQuantity: 1 },
  { id: "surf-short", category: "surfboard", name: "Shortboard", spec: "6'2\", with leash", priceK: 90, maxQuantity: 1 },
  { id: "moto-scooter", category: "motorcycle", name: "Scooter Rental", spec: "Automatic, with helmet", priceK: 650, maxQuantity: 1 },
  { id: "relax-beanbag", category: "relax", name: "Bean Bag", spec: "Large, indoor or outdoor", priceK: 70, maxQuantity: 1 },
];

export const SAMPLE_CATALOG: CatalogData = buildCatalog(SAMPLE_CATALOG_DTOS);

type WorkspaceStateOverrides = Partial<ReturnType<typeof useWorkspace.getState>>;

export function resetWorkspaceStore(overrides: WorkspaceStateOverrides = {}): void {
  useWorkspace.setState({
    step: "setup",
    activeSection: "section-desks",
    desk: null,
    chair: null,
    qty: {},
    isAiViewOpen: false,
    notice: null,
    catalog: SAMPLE_CATALOG,
    catalogError: null,
    ...overrides,
  });
}
