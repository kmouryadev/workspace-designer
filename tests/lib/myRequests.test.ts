import { describe, it, expect, beforeEach } from "vitest";
import { saveMyRequest, getMyRequests, type MyRequestSummary } from "@/lib/myRequests";

function summary(overrides: Partial<MyRequestSummary> = {}): MyRequestSummary {
  return {
    id: "MR-00001",
    fullName: "Jane Doe",
    location: "Canggu, Badung",
    startDate: "2027-01-01",
    duration: "monthly",
    periodTotalK: 650,
    createdAt: "2027-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("myRequests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty list when nothing has been saved", () => {
    expect(getMyRequests()).toEqual([]);
  });

  it("saves a request and returns it newest-first", () => {
    saveMyRequest(summary({ id: "MR-00001" }));
    saveMyRequest(summary({ id: "MR-00002" }));

    const requests = getMyRequests();
    expect(requests.map((item) => item.id)).toEqual(["MR-00002", "MR-00001"]);
  });

  it("deduplicates by id, keeping the latest save in front", () => {
    saveMyRequest(summary({ id: "MR-00001", location: "Canggu" }));
    saveMyRequest(summary({ id: "MR-00002" }));
    saveMyRequest(summary({ id: "MR-00001", location: "Ubud" }));

    const requests = getMyRequests();
    expect(requests).toHaveLength(2);
    expect(requests[0]).toMatchObject({ id: "MR-00001", location: "Ubud" });
  });

  it("caps the saved history at 50 entries", () => {
    for (let i = 0; i < 55; i++) {
      saveMyRequest(summary({ id: `MR-${String(i).padStart(5, "0")}` }));
    }

    expect(getMyRequests()).toHaveLength(50);
  });
});
