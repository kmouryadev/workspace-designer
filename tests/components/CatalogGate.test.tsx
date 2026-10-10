import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CatalogGate } from "@/components/organisms/CatalogGate";
import { useWorkspace } from "@/store/workspace";
import { fetchCatalog } from "@/lib/catalogApi";

vi.mock("@/lib/catalogApi", () => ({
  fetchCatalog: vi.fn(),
}));

describe("CatalogGate", () => {
  beforeEach(() => {
    useWorkspace.setState({ catalog: null, catalogError: null });
    vi.mocked(fetchCatalog).mockReset();
  });

  it("shows a loading state while the catalog is being fetched", () => {
    vi.mocked(fetchCatalog).mockReturnValue(new Promise(() => {}));

    render(
      <CatalogGate>
        <div>content</div>
      </CatalogGate>
    );

    expect(screen.getByText(/loading workspace designer/i)).toBeInTheDocument();
  });

  it("renders children once the catalog loads", async () => {
    vi.mocked(fetchCatalog).mockResolvedValue([]);

    render(
      <CatalogGate>
        <div>content</div>
      </CatalogGate>
    );

    expect(await screen.findByText("content")).toBeInTheDocument();
  });

  it("shows an error state with a retry button, and retry recovers", async () => {
    vi.mocked(fetchCatalog).mockRejectedValueOnce(new Error("network down"));

    render(
      <CatalogGate>
        <div>content</div>
      </CatalogGate>
    );

    expect(await screen.findByText("Couldn't load the catalog")).toBeInTheDocument();
    expect(screen.getByText("network down")).toBeInTheDocument();

    vi.mocked(fetchCatalog).mockResolvedValueOnce([]);
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(await screen.findByText("content")).toBeInTheDocument();
  });
});
