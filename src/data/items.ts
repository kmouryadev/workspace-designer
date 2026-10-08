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

export const DESKS: Item[] = [
  { id: "desk-std", name: "Standing Desk Pro", spec: "Height adjustable, 120 x 70 cm", priceK: 450, art: "desk-std", max: 1, slot: { x: 130, y: 290, w: 380, h: 150 } },
  { id: "desk-classic", name: "Classic Desk", spec: "Simple and sturdy, 140 x 70 cm", priceK: 300, art: "desk-classic", max: 1, slot: { x: 130, y: 290, w: 380, h: 150 } },
  { id: "desk-corner", name: "L-Shaped Desk", spec: "Space-efficient, 120 x 120 cm", priceK: 500, art: "desk-std", max: 1, slot: { x: 130, y: 290, w: 380, h: 150 } },
  { id: "desk-budget", name: "Budget Desk", spec: "Simple, 100 x 60 cm", priceK: 220, art: "desk-classic", max: 1, slot: { x: 130, y: 290, w: 380, h: 150 } },
  { id: "desk-glass", name: "Glass Top Desk", spec: "Modern, 130 x 70 cm", priceK: 480, art: "desk-std", max: 1, slot: { x: 130, y: 290, w: 380, h: 150 } },
  { id: "desk-exec", name: "Executive Desk", spec: "Premium, 150 x 75 cm", priceK: 550, art: "desk-classic", max: 1, slot: { x: 130, y: 290, w: 380, h: 150 } },
];

export const CHAIRS: Item[] = [
  { id: "chair-ergo", name: "Ergonomic Chair", spec: "Breathable mesh, adjustable", priceK: 350, art: "chair-ergo", max: 1, slot: { x: 250, y: 310, w: 140, h: 150 } },
  { id: "chair-exec", name: "Executive Chair", spec: "Premium comfort, leather", priceK: 400, art: "chair-exec", max: 1, slot: { x: 250, y: 310, w: 140, h: 150 } },
  { id: "chair-task", name: "Task Chair", spec: "Lightweight, armless", priceK: 220, art: "chair-ergo", max: 1, slot: { x: 250, y: 310, w: 140, h: 150 } },
  { id: "chair-mesh", name: "Mesh Chair", spec: "Breathable, budget-friendly", priceK: 180, art: "chair-ergo", max: 1, slot: { x: 250, y: 310, w: 140, h: 150 } },
  { id: "chair-gaming", name: "Gaming Chair", spec: "High back, extra padding", priceK: 380, art: "chair-exec", max: 1, slot: { x: 250, y: 310, w: 140, h: 150 } },
  { id: "chair-stool", name: "Standing Stool", spec: "Perches, for standing desks", priceK: 150, art: "chair-ergo", max: 1, slot: { x: 250, y: 310, w: 140, h: 150 } },
];

const STD_MONITOR_SCALE: Record<string, number> = { m27: 1, m29: 0.95, m24: 0.9, m22: 0.8, m20: 0.75 };

export const MONITORS: Item[] = [
  { id: "m27", name: '27" 4K Monitor', spec: "Up to 3 on one desk", priceK: 300, art: "mon", max: 3 },
  { id: "m29", name: '29" UWQHD Monitor', spec: "Up to 3 on one desk", priceK: 350, art: "mon", max: 3 },
  { id: "m24", name: '24" Full HD', spec: "Up to 3 on one desk", priceK: 200, art: "mon", max: 3 },
  { id: "m22", name: '22" HD Monitor', spec: "Up to 3 on one desk", priceK: 150, art: "mon", max: 3 },
  { id: "m20", name: '20" HD Monitor', spec: "Up to 3 on one desk", priceK: 120, art: "mon", max: 3 },
  { id: "mw", name: 'Ultrawide 34"', spec: "Takes the whole desk", priceK: 450, art: "mon-wide", max: 1 },
];

export const LIGHTS: Item[] = [
  { id: "l-desk", name: "Desk Lamp", spec: "Arm lamp, warm LED", priceK: 100, art: "lamp-desk", max: 1, slot: { x: 452, y: 210, w: 50, h: 80 } },
  { id: "l-led", name: "LED Light Bar", spec: "Mounted above the monitors", priceK: 120, art: "lamp-led", max: 1, slot: { x: 235, y: 165, w: 170, h: 16 } },
  { id: "l-floor", name: "Floor Lamp", spec: "Stands left of the desk", priceK: 150, art: "lamp-floor", max: 1, slot: { x: 70, y: 250, w: 40, h: 190 } },
  { id: "l-pendant", name: "Pendant Light", spec: "Hangs from the ceiling", priceK: 130, art: "lamp-floor", max: 1, slot: { x: 290, y: 20, w: 50, h: 60 } },
  { id: "l-ring", name: "Ring Light", spec: "Stands beside the desk", priceK: 90, art: "lamp-desk", max: 1, slot: { x: 605, y: 150, w: 30, h: 60 } },
  { id: "l-wall", name: "Wall Sconce", spec: "Mounts to the wall", priceK: 110, art: "lamp-floor", max: 1, slot: { x: 400, y: 20, w: 35, h: 70 } },
];

export const PLANTS: Item[] = [
  { id: "p-small", name: "Small Plant", spec: "Sits on the desk", priceK: 60, art: "plant-small", max: 1, slot: { x: 136, y: 234, w: 40, h: 56 } },
  { id: "p-large", name: "Large Plant", spec: "Stands right of the desk", priceK: 100, art: "plant-large", max: 1, slot: { x: 535, y: 330, w: 70, h: 110 } },
  { id: "p-hang", name: "Hanging Plant", spec: "Hangs from the wall", priceK: 80, art: "plant-hang", max: 1, slot: { x: 565, y: 30, w: 50, h: 110 } },
  { id: "p-succulent", name: "Succulent Trio", spec: "Sits on a shelf", priceK: 45, art: "plant-small", max: 1, slot: { x: 40, y: 55, w: 40, h: 55 } },
  { id: "p-cactus", name: "Cactus", spec: "Low maintenance", priceK: 50, art: "plant-small", max: 1, slot: { x: 608, y: 350, w: 30, h: 45 } },
  { id: "p-fern", name: "Fern", spec: "Adds texture to a corner", priceK: 70, art: "plant-large", max: 1, slot: { x: 40, y: 140, w: 55, h: 90 } },
];

export const COFFEE: Item[] = [
  { id: "coffee-espresso", name: "Espresso Machine", spec: "Single group, with grinder", priceK: 180, art: "coffee", max: 1 },
];

export const SURFBOARDS: Item[] = [
  { id: "surf-short", name: "Shortboard", spec: "6'2\", with leash", priceK: 90, art: "surfboard", max: 1 },
];

export const MOTORCYCLES: Item[] = [
  { id: "moto-scooter", name: "Scooter Rental", spec: "Automatic, with helmet", priceK: 650, art: "motorcycle", max: 1 },
];

export const RELAX_ZONE: Item[] = [
  { id: "relax-beanbag", name: "Bean Bag", spec: "Large, indoor or outdoor", priceK: 70, art: "beanbag", max: 1 },
];

export const ACCESSORIES: Item[] = [...MONITORS, ...LIGHTS, ...PLANTS, ...COFFEE, ...SURFBOARDS, ...MOTORCYCLES, ...RELAX_ZONE];
export const ALL_ITEMS: Item[] = [...DESKS, ...CHAIRS, ...ACCESSORIES];

export const NEEDS_DESK = new Set([...Object.keys(STD_MONITOR_SCALE), "mw", "l-desk", "l-led", "p-small"]);

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

export function stagePlacements(deskId: string | null, chairId: string | null, qty: Record<string, number>): Placement[] {
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

export function totalMonthlyK(deskId: string | null, chairId: string | null, qty: Record<string, number>): number {
  const deskPriceK = DESKS.find((desk) => desk.id === deskId)?.priceK ?? 0;
  const chairPriceK = CHAIRS.find((chair) => chair.id === chairId)?.priceK ?? 0;
  const accessoriesPriceK = ACCESSORIES.reduce((sum, item) => sum + item.priceK * (qty[item.id] ?? 0), 0);
  return deskPriceK + chairPriceK + accessoriesPriceK;
}
