"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Stepper } from "@/components/ui/Stepper";
import { OrderSummary } from "@/components/organisms/OrderSummary";
import { decodeSetup } from "@/lib/share";
import { DURATIONS } from "@/lib/duration";
import { validateCheckout, FIELD_LABELS, type CheckoutForm, type DurationKey, type FormErrors } from "@/lib/validate";
import { useWorkspace } from "@/store/workspace";
import { CheckmarkIcon, ChevronLeftIcon } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { Heading, Typography } from "@/components/ui/Typography";
import { FormField } from "@/components/ui/FormField";
import { TextInput } from "@/components/ui/TextInput";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";

const EMPTY_FORM: CheckoutForm = {
  fullName: "",
  email: "",
  whatsapp: "",
  location: "",
  startDate: "",
  duration: "monthly",
  message: "",
};

const TODAY = new Date().toISOString().slice(0, 10);

function makeRequestId() {
  return `MR-${Math.floor(10000 + Math.random() * 89999)}`;
}

export function CheckoutContent() {
  const searchParams = useSearchParams();
  const { desk, chair, qty } = useMemo(() => decodeSetup(searchParams), [searchParams]);
  const reset = useWorkspace((state) => state.reset);
  const loadSetup = useWorkspace((state) => state.loadSetup);
  const goToSection = useWorkspace((state) => state.goToSection);
  const router = useRouter();

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sendFailed, setSendFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const field = (key: keyof CheckoutForm) => (value: string) => {
    setForm((previousForm) => ({ ...previousForm, [key]: value }));
  };

  const backToSummary = () => {
    loadSetup(desk, chair, qty);
    goToSection("summary", "section-lighting");
    router.push("/");
  };

  const submit = async () => {
    const found = validateCheckout(form);
    setErrors(found);
    setSendFailed(false);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.08) reject(new Error("network"));
          else resolve();
        }, 500);
      });
      setRequestId(makeRequestId());
    } catch {
      setSendFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const errorList = Object.entries(errors) as [keyof CheckoutForm, string][];

  if (requestId) {
    return (
      <main id="main-content" className="mx-auto w-full flex-1 px-4 py-6 min-[1100px]:px-8">
        <Stepper current={4} />
        <div className="grid grid-cols-1 gap-5 min-[900px]:grid-cols-[1fr_360px]">
          <div className="flex flex-col items-center justify-center rounded-[20px] border border-line bg-panel px-6 py-14 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success-bg text-success-text">
              <CheckmarkIcon />
            </div>
            <Heading as="h1" size="md">
              Request sent
            </Heading>
            <Typography muted className="mt-1">
              We confirm dates and delivery with you by WhatsApp or email.
            </Typography>
            <p className="mt-3 rounded-full bg-gold-soft px-4 py-1.5 text-[13px] font-bold text-gold-text">
              {requestId}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <LinkButton href="/" onClick={() => reset()} variant="primary">
                Design another setup
              </LinkButton>
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard?.writeText(requestId).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? "Copied!" : "Copy request ID"}
              </Button>
            </div>
          </div>
          <OrderSummary desk={desk} chair={chair} qty={qty} duration={form.duration} />
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="mx-auto w-full flex-1 px-4 py-6 min-[1100px]:px-8">
      <Stepper current={4} />
      <Button variant="ghost" size="inline" onClick={backToSummary} className="mb-3 flex items-center text-[13px]">
        <ChevronLeftIcon />
        Back to Summary
      </Button>
      <div className="grid grid-cols-1 gap-5 min-[900px]:grid-cols-[1fr_360px]">
        <form
          className="rounded-[20px] border border-line bg-panel p-5"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Heading as="h1" size="md">
            Almost There!
          </Heading>
          <Typography muted className="mt-1">
            Tell us where to deliver your setup.
          </Typography>

          {errorList.length > 0 && (
            <div role="alert" className="mt-4 rounded-xl border border-error-border bg-error-bg p-3 text-[13px] text-error-text">
              <p className="font-semibold">
                Fix {errorList.length} field{errorList.length > 1 ? "s" : ""} to send your request
              </p>
              <ul className="mt-1 list-inside list-disc">
                {errorList.map(([key]) => (
                  <li key={key}>
                    <a href={`#field-${key}`} className="underline">
                      {FIELD_LABELS[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sendFailed && (
            <div role="alert" className="mt-4 rounded-xl border border-error-border bg-error-bg p-3 text-[13px] text-error-text">
              <p>We couldn&apos;t send your request. Check your connection and try again. Your details are still here.</p>
              <Button variant="primary" size="sm" onClick={submit} className="mt-2">
                Try again
              </Button>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2">
            <FormField id="fullName" label="Full name" required error={errors.fullName}>
              <TextInput
                id="field-fullName"
                type="text"
                value={form.fullName}
                onChange={(event) => field("fullName")(event.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "err-fullName" : undefined}
                invalid={Boolean(errors.fullName)}
              />
            </FormField>
            <FormField id="email" label="Email" required error={errors.email}>
              <TextInput
                id="field-email"
                type="email"
                value={form.email}
                onChange={(event) => field("email")(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "err-email" : undefined}
                invalid={Boolean(errors.email)}
              />
            </FormField>
            <FormField id="whatsapp" label="WhatsApp number" required error={errors.whatsapp}>
              <TextInput
                id="field-whatsapp"
                type="tel"
                placeholder="+62 812 3456 7890"
                value={form.whatsapp}
                onChange={(event) => field("whatsapp")(event.target.value)}
                aria-invalid={Boolean(errors.whatsapp)}
                aria-describedby={errors.whatsapp ? "err-whatsapp" : undefined}
                invalid={Boolean(errors.whatsapp)}
              />
            </FormField>
            <FormField id="location" label="Delivery location in Bali" required error={errors.location}>
              <TextInput
                id="field-location"
                type="text"
                placeholder="e.g. Canggu, Badung"
                value={form.location}
                onChange={(event) => field("location")(event.target.value)}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? "err-location" : undefined}
                invalid={Boolean(errors.location)}
              />
            </FormField>
            <FormField id="startDate" label="Preferred start date" required error={errors.startDate}>
              <TextInput
                id="field-startDate"
                type="date"
                min={TODAY}
                value={form.startDate}
                onChange={(event) => field("startDate")(event.target.value)}
                aria-invalid={Boolean(errors.startDate)}
                aria-describedby={errors.startDate ? "err-startDate" : undefined}
                invalid={Boolean(errors.startDate)}
              />
            </FormField>
            <FormField id="duration" label="Rental duration">
              <Select
                id="field-duration"
                value={form.duration}
                onChange={(event) => setForm((previousForm) => ({ ...previousForm, duration: event.target.value as DurationKey }))}
              >
                {DURATIONS.map((durationOption) => (
                  <option key={durationOption.id} value={durationOption.id}>
                    {durationOption.label}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <div className="mt-4">
            <FormField id="message" label="Additional message (optional)">
              <TextArea id="field-message" rows={3} value={form.message} onChange={(event) => field("message")(event.target.value)} />
            </FormField>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting} className="mt-5">
            {submitting ? "Sending…" : "Submit Rental Request"}
          </Button>
          <Typography size="sm" muted className="mt-2">
            This sends a request, it does not charge you. We confirm dates and delivery with you first.
          </Typography>
        </form>

        <OrderSummary desk={desk} chair={chair} qty={qty} duration={form.duration} />
      </div>
    </main>
  );
}

