import { describe, it, expect } from "vitest";
import { buildCatalog, addMonitor, totalMonthlyK, stagePlacements, rp } from "@/data/items";
import type { CatalogItemDto } from "@/lib/catalogApi";

const SAMPLE_DTOS: CatalogItemDto[] = [
  { id: "desk-std", category: "desk", name: "Standing Desk Pro", spec: "120 x 70 cm", priceK: 450, maxQuantity: 1 },
  { id: "chair-ergo", category: "chair", name: "Ergonomic Chair", spec: "Mesh", priceK: 350, maxQuantity: 1 },
  { id: "m27", category: "monitor", name: '27" 4K Monitor', spec: "Up to 3", priceK: 300, maxQuantity: 3 },
  { id: "mw", category: "monitor", name: 'Ultrawide 34"', spec: "Whole desk", priceK: 450, maxQuantity: 1 },
  { id: "l-desk", category: "lighting", name: "Desk Lamp", spec: "Warm LED", priceK: 100, maxQuantity: 1 },
  { id: "unknown-item", category: "desk", name: "No art mapping", spec: "n/a", priceK: 1, maxQuantity: 1 },
];

describe("buildCatalog", () => {
  it("buckets items by category and skips ids with no art/slot mapping", () => {
    const catalog = buildCatalog(SAMPLE_DTOS);

    expect(catalog.DESKS.map((item) => item.id)).toEqual(["desk-std"]);
    expect(catalog.CHAIRS.map((item) => item.id)).toEqual(["chair-ergo"]);
    expect(catalog.MONITORS.map((item) => item.id)).toEqual(["m27", "mw"]);
    expect(catalog.ALL_ITEMS.map((item) => item.id)).not.toContain("unknown-item");
  });

  it("builds ACCESSORIES from every non-desk, non-chair bucket", () => {
    const catalog = buildCatalog(SAMPLE_DTOS);
    expect(catalog.ACCESSORIES.map((item) => item.id)).toEqual(["m27", "mw", "l-desk"]);
  });
});

describe("addMonitor", () => {
  it("adds a standard monitor", () => {
    const result = addMonitor({}, "m27");
    expect(result).toEqual({ qty: { mw: 0, m27: 1 } });
  });

  it("refuses a fourth standard monitor", () => {
    const result = addMonitor({ m27: 3 }, "m22");
    expect(result).toEqual({ error: "Up to 3 monitors fit on this desk. Remove one to add another." });
  });

  it("clears standard monitors when switching to the ultrawide", () => {
    const result = addMonitor({ m27: 2, m24: 1 }, "mw");
    expect(result).toEqual({ qty: { m27: 0, m29: 0, m24: 0, m22: 0, m20: 0, mw: 1 } });
  });
});

describe("totalMonthlyK", () => {
  it("sums desk, chair, and accessory prices by quantity", () => {
    const catalog = buildCatalog(SAMPLE_DTOS);
    const total = totalMonthlyK("desk-std", "chair-ergo", { m27: 2, "l-desk": 1 }, catalog);
    expect(total).toBe(450 + 350 + 300 * 2 + 100);
  });

  it("ignores an unknown desk/chair id", () => {
    const catalog = buildCatalog(SAMPLE_DTOS);
    expect(totalMonthlyK("not-real", "not-real", {}, catalog)).toBe(0);
  });
});

describe("stagePlacements", () => {
  it("places nothing when no desk is chosen", () => {
    const catalog = buildCatalog(SAMPLE_DTOS);
    expect(stagePlacements(null, null, { m27: 1 }, catalog)).toEqual([]);
  });

  it("places the desk, chair, and a chosen desk-lamp once a desk is picked", () => {
    const catalog = buildCatalog(SAMPLE_DTOS);
    const placements = stagePlacements("desk-std", "chair-ergo", { "l-desk": 1 }, catalog);
    const arts = placements.map((placement) => placement.art);

    expect(arts).toContain("desk-std");
    expect(arts).toContain("chair-ergo");
    expect(arts).toContain("lamp-desk");
  });
});

describe("rp", () => {
  it("formats thousands as a dotted Rupiah string", () => {
    expect(rp(450)).toBe("Rp 450.000");
    expect(rp(1100)).toBe("Rp 1.100.000");
  });
});
