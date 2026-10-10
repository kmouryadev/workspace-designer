import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchCatalog, type CatalogItemDto } from "@/lib/catalogApi";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    isAxiosError: vi.fn(),
  },
}));

const mockedGet = vi.mocked(axios.get, { partial: true });
const mockedIsAxiosError = vi.mocked(axios.isAxiosError);

const SAMPLE_ITEMS: CatalogItemDto[] = [
  { id: "desk-std", category: "desk", name: "Standing Desk Pro", spec: "120 x 70 cm", priceK: 450, maxQuantity: 1 },
];

describe("fetchCatalog", () => {
  beforeEach(() => {
    mockedGet.mockReset();
    mockedIsAxiosError.mockReset();
  });

  it("returns the catalog on a successful response", async () => {
    mockedGet.mockResolvedValueOnce({ data: SAMPLE_ITEMS });

    await expect(fetchCatalog()).resolves.toEqual(SAMPLE_ITEMS);
  });

  it("includes the HTTP status in the error message for a failed response", async () => {
    mockedIsAxiosError.mockReturnValue(true);
    mockedGet.mockRejectedValueOnce({ response: { status: 500 } });

    await expect(fetchCatalog()).rejects.toThrow("Failed to load catalog (status 500)");
  });

  it("omits the status for a network error with no response", async () => {
    mockedIsAxiosError.mockReturnValue(true);
    mockedGet.mockRejectedValueOnce({ response: undefined });

    await expect(fetchCatalog()).rejects.toThrow(/^Failed to load catalog$/);
  });

  it("falls back to a generic message for a non-axios error", async () => {
    mockedIsAxiosError.mockReturnValue(false);
    mockedGet.mockRejectedValueOnce(new Error("boom"));

    await expect(fetchCatalog()).rejects.toThrow(/^Failed to load catalog$/);
  });
});
