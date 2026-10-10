import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BuilderContent } from "@/components/organisms/BuilderContent";
import { resetWorkspaceStore } from "../fixtures/catalog";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("BuilderContent", () => {
  beforeEach(() => {
    resetWorkspaceStore();
  });

  it("shows the category rail during setup", () => {
    resetWorkspaceStore({ step: "setup" });
    render(<BuilderContent />);

    expect(screen.getByRole("tablist", { name: "Categories" })).toBeInTheDocument();
  });

  it("hides the category rail on the summary step", () => {
    resetWorkspaceStore({ step: "summary", desk: "desk-std", chair: "chair-ergo" });
    render(<BuilderContent />);

    expect(screen.queryByRole("tablist", { name: "Categories" })).not.toBeInTheDocument();
  });

  it("reflects the current step in the stepper", () => {
    resetWorkspaceStore({ step: "accessories" });
    render(<BuilderContent />);

    expect(screen.getByText("Step 2 of 4 — Accessories")).toBeInTheDocument();
  });

  it("switching the active category changes which tile section is shown", () => {
    const { rerender } = render(<BuilderContent />);
    expect(screen.getByText("Choose a Desk")).toBeInTheDocument();

    resetWorkspaceStore({ activeSection: "section-chairs" });
    rerender(<BuilderContent />);

    expect(screen.getByText("Choose a Chair")).toBeInTheDocument();
    expect(screen.queryByText("Choose a Desk")).not.toBeInTheDocument();
  });
});
