export type DurationKey = "weekly" | "biweekly" | "monthly" | "yearly";

export type CheckoutForm = {
  fullName: string;
  email: string;
  whatsapp: string;
  location: string;
  startDate: string;
  duration: DurationKey;
  message: string;
};

export type FormErrors = Partial<Record<keyof CheckoutForm, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidWhatsapp(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed.startsWith("+")) return false;
  const digits = trimmed.slice(1).replace(/[\s-]/g, "");
  return /^\d{8,15}$/.test(digits);
}

export function validateCheckout(form: CheckoutForm): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) errors.fullName = "Enter your full name.";

  if (!form.email.trim() || !EMAIL_RE.test(form.email.trim())) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  if (!isValidWhatsapp(form.whatsapp)) {
    errors.whatsapp = "Use a number with country code, like +62 812 3456 7890.";
  }

  if (!form.location.trim()) errors.location = "Tell us where in Bali to deliver.";

  if (!form.startDate) {
    errors.startDate = "Choose a start date.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(form.startDate);
    if (chosen < today) errors.startDate = "The start date cannot be in the past.";
  }

  return errors;
}

export const FIELD_LABELS: Record<keyof CheckoutForm, string> = {
  fullName: "Full name",
  email: "Email",
  whatsapp: "WhatsApp number",
  location: "Delivery location",
  startDate: "Preferred start date",
  duration: "Rental duration",
  message: "Additional message",
};
