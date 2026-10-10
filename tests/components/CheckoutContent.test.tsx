import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { CheckoutContent } from "@/components/organisms/CheckoutContent";
import { resetWorkspaceStore } from "../fixtures/catalog";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams("d=desk-std&c=chair-ergo&q=m27:1"),
}));

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    isAxiosError: vi.fn(),
  },
}));

const mockedPost = vi.mocked(axios.post, { partial: true });

function futureDateInput(): string {
  const future = new Date();
  future.setDate(future.getDate() + 7);
  return future.toISOString().slice(0, 10);
}

async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Full name/), "Jane Doe");
  await user.type(screen.getByLabelText(/Email/), "jane@example.com");
  await user.type(screen.getByLabelText(/WhatsApp number/), "+62 812 3456 7890");
  await user.type(screen.getByLabelText(/Delivery location/), "Canggu, Badung");
  fireEvent.change(screen.getByLabelText(/Preferred start date/), { target: { value: futureDateInput() } });
  return user;
}

describe("CheckoutContent", () => {
  beforeEach(() => {
    push.mockReset();
    mockedPost.mockReset();
    resetWorkspaceStore();
  });

  it("shows field-level and summary validation errors when submitted empty", async () => {
    render(<CheckoutContent />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Submit Rental Request" }));

    expect(await screen.findByText(/Fix \d+ fields? to send your request/)).toBeInTheDocument();
    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(mockedPost).not.toHaveBeenCalled();
  });

  it("computes the monthly total from the selected desk, chair, and accessories", () => {
    render(<CheckoutContent />);

    expect(screen.getAllByText("Rp 1.100.000")).toHaveLength(2);
  });

  it("submits the form and shows the confirmation screen with the backend-issued id", async () => {
    mockedPost.mockResolvedValueOnce({ data: { id: "MR-11842", createdAt: "2027-01-01T00:00:00.000Z" } });
    render(<CheckoutContent />);

    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: "Submit Rental Request" }));

    expect(await screen.findByText("Request sent")).toBeInTheDocument();
    expect(screen.getByText("MR-11842")).toBeInTheDocument();
    expect(mockedPost).toHaveBeenCalledWith(
      expect.stringContaining("/requests"),
      expect.objectContaining({ fullName: "Jane Doe", email: "jane@example.com", setupDesk: "desk-std" })
    );
  });

  it("shows a retry-able error state when the backend call fails", async () => {
    mockedPost.mockRejectedValueOnce(new Error("Network Error"));
    render(<CheckoutContent />);

    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: "Submit Rental Request" }));

    expect(await screen.findByText(/couldn't send your request/)).toBeInTheDocument();

    mockedPost.mockResolvedValueOnce({ data: { id: "MR-22222", createdAt: "2027-01-01T00:00:00.000Z" } });
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Request sent")).toBeInTheDocument();
  });

  it("disables the submit button while the request is in flight", async () => {
    let resolvePost!: (value: { data: { id: string; createdAt: string } }) => void;
    mockedPost.mockReturnValueOnce(
      new Promise((resolve) => {
        resolvePost = resolve;
      })
    );
    render(<CheckoutContent />);

    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: "Submit Rental Request" }));

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();

    resolvePost({ data: { id: "MR-33333", createdAt: "2027-01-01T00:00:00.000Z" } });
    await waitFor(() => expect(screen.getByText("Request sent")).toBeInTheDocument());
  });
});
