import { describe, it, expect } from "vitest";
import { encodeSetup, decodeSetup } from "@/lib/share";

describe("encodeSetup", () => {
  it("encodes desk, chair, and accessory quantities", () => {
    const query = encodeSetup("desk-std", "chair-ergo", { m27: 2, "l-desk": 1, "l-led": 0 });
    const params = new URLSearchParams(query);

    expect(params.get("d")).toBe("desk-std");
    expect(params.get("c")).toBe("chair-ergo");
    expect(params.get("q")).toBe("m27:2,l-desk:1");
  });

  it("omits missing desk, chair, and accessories", () => {
    const query = encodeSetup(null, null, {});
    expect(query).toBe("");
  });
});

describe("decodeSetup", () => {
  it("round-trips through encodeSetup", () => {
    const query = encodeSetup("desk-std", "chair-ergo", { m27: 2 });
    const decoded = decodeSetup(new URLSearchParams(query));

    expect(decoded).toEqual({ desk: "desk-std", chair: "chair-ergo", qty: { m27: 2 } });
  });

  it("defaults to null desk/chair and an empty qty when params are absent", () => {
    const decoded = decodeSetup(new URLSearchParams());
    expect(decoded).toEqual({ desk: null, chair: null, qty: {} });
  });

  it("ignores malformed accessory pairs", () => {
    const decoded = decodeSetup(new URLSearchParams("q=m27:2,badpair,:3,x:"));
    expect(decoded.qty).toEqual({ m27: 2 });
  });
});
