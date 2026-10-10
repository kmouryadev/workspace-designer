import { describe, it, expect } from "vitest";
import { validateCheckout, type CheckoutForm } from "@/lib/validate";

function validForm(overrides: Partial<CheckoutForm> = {}): CheckoutForm {
  const future = new Date();
  future.setDate(future.getDate() + 7);

  return {
    fullName: "Jane Doe",
    email: "jane@example.com",
    whatsapp: "+62 812 3456 7890",
    location: "Canggu, Badung",
    startDate: future.toISOString().slice(0, 10),
    duration: "monthly",
    message: "",
    ...overrides,
  };
}

describe("validateCheckout", () => {
  it("returns no errors for a valid form", () => {
    expect(validateCheckout(validForm())).toEqual({});
  });

  it("requires a full name", () => {
    const errors = validateCheckout(validForm({ fullName: "  " }));
    expect(errors.fullName).toBe("Enter your full name.");
  });

  it("requires a valid email", () => {
    const errors = validateCheckout(validForm({ email: "not-an-email" }));
    expect(errors.email).toBe("Enter a valid email, like name@example.com.");
  });

  it("requires a WhatsApp number with a country code", () => {
    const errors = validateCheckout(validForm({ whatsapp: "0812345" }));
    expect(errors.whatsapp).toBe("Use a number with country code, like +62 812 3456 7890.");
  });

  it("accepts a WhatsApp number with spaces and dashes", () => {
    const errors = validateCheckout(validForm({ whatsapp: "+62-812-3456-7890" }));
    expect(errors.whatsapp).toBeUndefined();
  });

  it("requires a location", () => {
    const errors = validateCheckout(validForm({ location: "" }));
    expect(errors.location).toBe("Tell us where in Bali to deliver.");
  });

  it("requires a start date", () => {
    const errors = validateCheckout(validForm({ startDate: "" }));
    expect(errors.startDate).toBe("Choose a start date.");
  });

  it("rejects a start date in the past", () => {
    const errors = validateCheckout(validForm({ startDate: "2020-01-01" }));
    expect(errors.startDate).toBe("The start date cannot be in the past.");
  });
});
