import { describe, it, expect } from "vitest";
import { DURATIONS, durationFactor, durationUnit } from "@/lib/duration";

describe("durationFactor", () => {
  it("returns the factor for each known duration", () => {
    for (const option of DURATIONS) {
      expect(durationFactor(option.id)).toBe(option.factor);
    }
  });
});

describe("durationUnit", () => {
  it("returns the unit for each known duration", () => {
    for (const option of DURATIONS) {
      expect(durationUnit(option.id)).toBe(option.unit);
    }
  });
});
