import type { CatalogItemDto } from "@/lib/catalogApi";

export type Slot = { x: number; y: number; w: number; h: number };

export type Item = {
  id: string;
  name: string;
  spec: string;
  priceK: number;
  art: string;
  max: number;
  slot?: Slot;
};

export const STAGE = { w: 640, h: 480 } as const;

const ART_AND_SLOT: Record<string, { art: string; slot?: Slot }> = {
  "desk-std": { art: "desk-std", slot: { x: 130, y: 290, w: 380, h: 150 } },
  "desk-classic": { art: "desk-classic", slot: { x: 130, y: 290, w: 380, h: 150 } },
  "desk-corner": { art: "desk-std", slot: { x: 130, y: 290, w: 380, h: 150 } },
  "desk-budget": { art: "desk-classic", slot: { x: 130, y: 290, w: 380, h: 150 } },
  "desk-glass": { art: "desk-std", slot: { x: 130, y: 290, w: 380, h: 150 } },
  "desk-exec": { art: "desk-classic", slot: { x: 130, y: 290, w: 380, h: 150 } },

  "chair-ergo": { art: "chair-ergo", slot: { x: 250, y: 310, w: 140, h: 150 } },
  "chair-exec": { art: "chair-exec", slot: { x: 250, y: 310, w: 140, h: 150 } },
  "chair-task": { art: "chair-ergo", slot: { x: 250, y: 310, w: 140, h: 150 } },
  "chair-mesh": { art: "chair-ergo", slot: { x: 250, y: 310, w: 140, h: 150 } },
  "chair-gaming": { art: "chair-exec", slot: { x: 250, y: 310, w: 140, h: 150 } },
  "chair-stool": { art: "chair-ergo", slot: { x: 250, y: 310, w: 140, h: 150 } },

  m27: { art: "mon" },
  m29: { art: "mon" },
  m24: { art: "mon" },
  m22: { art: "mon" },
  m20: { art: "mon" },
  mw: { art: "mon-wide" },

  "l-desk": { art: "lamp-desk", slot: { x: 452, y: 210, w: 50, h: 80 } },
  "l-led": { art: "lamp-led", slot: { x: 235, y: 165, w: 170, h: 16 } },
  "l-floor": { art: "lamp-floor", slot: { x: 70, y: 250, w: 40, h: 190 } },
  "l-pendant": { art: "lamp-floor", slot: { x: 290, y: 20, w: 50, h: 60 } },
  "l-ring": { art: "lamp-desk", slot: { x: 605, y: 150, w: 30, h: 60 } },
  "l-wall": { art: "lamp-floor", slot: { x: 400, y: 20, w: 35, h: 70 } },

  "p-small": { art: "plant-small", slot: { x: 136, y: 234, w: 40, h: 56 } },
  "p-large": { art: "plant-large", slot: { x: 535, y: 330, w: 70, h: 110 } },
  "p-hang": { art: "plant-hang", slot: { x: 565, y: 30, w: 50, h: 110 } },
  "p-succulent": { art: "plant-small", slot: { x: 40, y: 55, w: 40, h: 55 } },
  "p-cactus": { art: "plant-small", slot: { x: 608, y: 350, w: 30, h: 45 } },
  "p-fern": { art: "plant-large", slot: { x: 40, y: 140, w: 55, h: 90 } },

  "coffee-espresso": { art: "coffee" },
  "surf-short": { art: "surfboard" },
  "moto-scooter": { art: "motorcycle" },
  "relax-beanbag": { art: "beanbag" },
};

export type CatalogData = {
  DESKS: Item[];
  CHAIRS: Item[];
  MONITORS: Item[];
  LIGHTS: Item[];
  PLANTS: Item[];
  COFFEE: Item[];
  SURFBOARDS: Item[];
  MOTORCYCLES: Item[];
  RELAX_ZONE: Item[];
  ACCESSORIES: Item[];
  ALL_ITEMS: Item[];
};

const CATEGORY_TO_BUCKET: Record<string, keyof CatalogData> = {
  desk: "DESKS",
  chair: "CHAIRS",
  monitor: "MONITORS",
  lighting: "LIGHTS",
  plant: "PLANTS",
  coffee: "COFFEE",
  surfboard: "SURFBOARDS",
  motorcycle: "MOTORCYCLES",
  relax: "RELAX_ZONE",
};

export function buildCatalog(dtos: CatalogItemDto[]): CatalogData {
  const catalog: CatalogData = {
    DESKS: [],
    CHAIRS: [],
    MONITORS: [],
    LIGHTS: [],
    PLANTS: [],
    COFFEE: [],
    SURFBOARDS: [],
    MOTORCYCLES: [],
    RELAX_ZONE: [],
    ACCESSORIES: [],
    ALL_ITEMS: [],
  };

  for (const dto of dtos) {
    const visual = ART_AND_SLOT[dto.id];
    if (!visual) continue;

    const item: Item = {
      id: dto.id,
      name: dto.name,
      spec: dto.spec,
      priceK: dto.priceK,
      max: dto.maxQuantity,
      art: visual.art,
      slot: visual.slot,
    };

    const bucket = CATEGORY_TO_BUCKET[dto.category];
    if (bucket) catalog[bucket].push(item);
    catalog.ALL_ITEMS.push(item);
  }

  catalog.ACCESSORIES = [
    ...catalog.MONITORS,
    ...catalog.LIGHTS,
    ...catalog.PLANTS,
    ...catalog.COFFEE,
    ...catalog.SURFBOARDS,
    ...catalog.MOTORCYCLES,
    ...catalog.RELAX_ZONE,
  ];

  return catalog;
}

export const NEEDS_DESK = new Set([
  "m27", "m29", "m24", "m22", "m20", "mw",
  "l-desk", "l-led", "p-small",
]);

const STD_MONITOR_SCALE: Record<string, number> = { m27: 1, m29: 0.95, m24: 0.9, m22: 0.8, m20: 0.75 };

export type Placement = { art: string; x: number; y: number; w: number; h: number };

export function layoutMonitors(qty: Record<string, number>): Placement[] {
  if ((qty["mw"] ?? 0) > 0) return [{ art: "mon-wide", x: 220, y: 195, w: 190, h: 95 }];
  const scales: number[] = [];
  for (const [monitorId, scale] of Object.entries(STD_MONITOR_SCALE)) {
    for (let unitIndex = 0; unitIndex < (qty[monitorId] ?? 0); unitIndex++) scales.push(scale);
  }
  const layoutByCount: Record<number, [baseWidth: number, centerXs: number[]]> = {
    1: [116, [315]],
    2: [88, [270, 360]],
    3: [84, [226, 315, 404]],
  };
  const layout = layoutByCount[scales.length];
  if (!layout) return [];
  const [baseWidth, centerXs] = layout;
  return scales.map((scale, index) => {
    const width = baseWidth * scale;
    const height = width * 0.8;
    return { art: "mon", x: centerXs[index] - width / 2, y: 290 - height, w: width, h: height };
  });
}

export function stagePlacements(
  deskId: string | null,
  chairId: string | null,
  qty: Record<string, number>,
  catalog: CatalogData
): Placement[] {
  const { DESKS, CHAIRS, LIGHTS, PLANTS } = catalog;
  const placements: Placement[] = [];
  const pushItemSlot = (item: Item) => item.slot && placements.push({ art: item.art, ...item.slot });
  const isChosen = (itemId: string) => (qty[itemId] ?? 0) > 0;

  const lightsAndPlants = LIGHTS.concat(PLANTS);
  lightsAndPlants.filter((item) => isChosen(item.id) && !NEEDS_DESK.has(item.id)).forEach(pushItemSlot);

  const desk = DESKS.find((candidate) => candidate.id === deskId);
  if (desk) {
    pushItemSlot(desk);
    lightsAndPlants
      .filter((item) => isChosen(item.id) && NEEDS_DESK.has(item.id) && item.id !== "l-desk" && item.id !== "p-small")
      .forEach(pushItemSlot);
    placements.push(...layoutMonitors(qty));
    lightsAndPlants.filter((item) => isChosen(item.id) && (item.id === "l-desk" || item.id === "p-small")).forEach(pushItemSlot);
  }

  const chair = CHAIRS.find((candidate) => candidate.id === chairId);
  if (chair) pushItemSlot(chair);

  return placements;
}

export function addMonitor(qty: Record<string, number>, monitorId: string): { qty: Record<string, number> } | { error: string } {
  const standardMonitorIds = Object.keys(STD_MONITOR_SCALE);
  const standardMonitorCount = standardMonitorIds.reduce((sum, standardId) => sum + (qty[standardId] ?? 0), 0);

  if (monitorId === "mw") {
    const clearedStandardMonitors = Object.fromEntries(standardMonitorIds.map((standardId) => [standardId, 0]));
    return { qty: { ...qty, ...clearedStandardMonitors, mw: 1 } };
  }
  if (standardMonitorCount >= 3) {
    return { error: "Up to 3 monitors fit on this desk. Remove one to add another." };
  }
  return { qty: { ...qty, mw: 0, [monitorId]: (qty[monitorId] ?? 0) + 1 } };
}

export const rp = (thousands: number) => "Rp " + String(thousands * 1000).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const rpK = (thousands: number) => `Rp ${thousands}k`;

export function totalMonthlyK(deskId: string | null, chairId: string | null, qty: Record<string, number>, catalog: CatalogData): number {
  const { DESKS, CHAIRS, ACCESSORIES } = catalog;
  const deskPriceK = DESKS.find((desk) => desk.id === deskId)?.priceK ?? 0;
  const chairPriceK = CHAIRS.find((chair) => chair.id === chairId)?.priceK ?? 0;
  const accessoriesPriceK = ACCESSORIES.reduce((sum, item) => sum + item.priceK * (qty[item.id] ?? 0), 0);
  return deskPriceK + chairPriceK + accessoriesPriceK;
}
