"use client";

import type { Notice as NoticeType } from "@/store/workspace";
import { ErrorIcon, InfoIcon } from "@/assets/icons";
import { Button } from "@/components/ui/Button";

export function Notice({ notice, onDismiss }: { notice: NoticeType; onDismiss?: () => void }) {
  if (!notice) return null;
  const isError = notice.type === "error";
  return (
    <div
      role="alert"
      className={`mb-3 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm ${
        isError
          ? "border-error-border bg-error-bg text-error-text"
          : "border-[#BBD2EA] bg-info-bg text-info-text"
      }`}
    >
      <span className="mt-0.5 shrink-0">{isError ? <ErrorIcon /> : <InfoIcon />}</span>
      <span className="flex-1">{notice.text}</span>
      {onDismiss && (
        <Button
          variant="plain"
          size="inline"
          onClick={onDismiss}
          aria-label="Dismiss message"
          className="shrink-0 text-xs opacity-70 hover:opacity-100"
        >
          ✕
        </Button>
      )}
    </div>
  );
}
