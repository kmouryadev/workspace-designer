import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchRequestById, type RequestDetailDto } from "@/lib/requestsApi";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(axios.get, { partial: true });

const SAMPLE_REQUEST: RequestDetailDto = {
  id: "MR-11842",
  fullName: "Jane Doe",
  email: "jane@example.com",
  whatsapp: "+62 812 3456 7890",
  location: "Canggu, Badung",
  startDate: "2027-01-01",
  duration: "monthly",
  monthlyTotalK: 650,
  periodTotalK: 650,
  createdAt: "2027-01-01T00:00:00.000Z",
};

describe("fetchRequestById", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("returns the request on a successful response", async () => {
    mockedGet.mockResolvedValueOnce({ data: SAMPLE_REQUEST });

    await expect(fetchRequestById("MR-11842")).resolves.toEqual(SAMPLE_REQUEST);
  });

  it("requests the url-encoded id", async () => {
    mockedGet.mockResolvedValueOnce({ data: SAMPLE_REQUEST });

    await fetchRequestById("MR 11842");

    expect(mockedGet).toHaveBeenCalledWith(expect.stringContaining("/requests/MR%2011842"));
  });

  it("propagates a 404 response as a rejection", async () => {
    mockedGet.mockRejectedValueOnce({ response: { status: 404 } });

    await expect(fetchRequestById("MR-00000")).rejects.toBeDefined();
  });

  it("propagates a network error as a rejection", async () => {
    mockedGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchRequestById("MR-11842")).rejects.toThrow("Network Error");
  });

  it("passes through whatever shape the backend returns, even if malformed", async () => {
    const malformed = { id: "MR-11842" };
    mockedGet.mockResolvedValueOnce({ data: malformed });

    await expect(fetchRequestById("MR-11842")).resolves.toEqual(malformed);
  });
});
