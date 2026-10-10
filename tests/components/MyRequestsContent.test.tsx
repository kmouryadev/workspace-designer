import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyRequestsContent } from "@/components/organisms/MyRequestsContent";
import { saveMyRequest } from "@/lib/myRequests";

describe("MyRequestsContent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows an empty state when nothing has been saved", async () => {
    render(<MyRequestsContent />);
    expect(await screen.findByText("Nothing here yet")).toBeInTheDocument();
  });

  it("lists saved requests with a link to their detail page", async () => {
    saveMyRequest({
      id: "MR-00001",
      fullName: "Jane Doe",
      location: "Canggu, Badung",
      startDate: "2027-01-01",
      duration: "monthly",
      periodTotalK: 650,
      createdAt: "2027-01-01T00:00:00.000Z",
    });

    render(<MyRequestsContent />);

    const link = await screen.findByRole("link", { name: /MR-00001/ });
    expect(link).toHaveAttribute("href", "/request/MR-00001");
    expect(screen.getByText(/Canggu, Badung/)).toBeInTheDocument();
  });
});
