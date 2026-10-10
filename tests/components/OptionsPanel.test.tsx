import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OptionsPanel } from "@/components/organisms/OptionsPanel";
import { resetWorkspaceStore } from "../fixtures/catalog";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("OptionsPanel", () => {
  beforeEach(() => {
    push.mockReset();
    resetWorkspaceStore();
  });

  it("shows the desk-and-chair hint and disables Next until both are chosen", () => {
    render(<OptionsPanel />);

    expect(screen.getByText("Pick a desk and a chair to continue.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next: Accessories" })).toBeDisabled();
  });

  it("selecting a desk marks the tile selected and updates the running total", async () => {
    render(<OptionsPanel />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Standing Desk Pro/ }));

    expect(screen.getByRole("button", { name: /Standing Desk Pro/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Rp 450.000")).toBeInTheDocument();
  });

  it("enables Next once a desk and chair are both chosen", () => {
    resetWorkspaceStore({ desk: "desk-std", chair: "chair-ergo" });
    render(<OptionsPanel />);

    expect(screen.getByRole("button", { name: "Next: Accessories" })).toBeEnabled();
    expect(screen.queryByText("Pick a desk and a chair to continue.")).not.toBeInTheDocument();
  });

  it("increasing a monitor quantity updates the running total", async () => {
    resetWorkspaceStore({ desk: "desk-std", chair: "chair-ergo", activeSection: "section-monitors" });
    render(<OptionsPanel />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Add 27" 4K Monitor/ }));

    expect(screen.getByText("Rp 1.100.000")).toBeInTheDocument();
  });

  it("navigates to /checkout with the encoded setup when Next is clicked on the summary step", async () => {
    resetWorkspaceStore({ step: "summary", desk: "desk-std", chair: "chair-ergo" });
    render(<OptionsPanel />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Rent This Setup" }));

    expect(push).toHaveBeenCalledWith("/checkout?d=desk-std&c=chair-ergo");
  });

  it("dismissing a notice clears it", async () => {
    resetWorkspaceStore({
      desk: "desk-std",
      chair: "chair-ergo",
      notice: { type: "error", text: "Up to 3 monitors fit on this desk. Remove one to add another." },
    });
    render(<OptionsPanel />);
    const user = userEvent.setup();

    expect(screen.getByRole("alert")).toHaveTextContent("Up to 3 monitors");

    await user.click(screen.getByRole("button", { name: "Dismiss message" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
