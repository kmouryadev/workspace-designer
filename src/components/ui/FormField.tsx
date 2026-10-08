"use client";

import type { ReactNode } from "react";

export function FormField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-1 block text-[12px] font-semibold text-ink">
        {label}
        {required && <span className="text-error-text"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`err-${id}`} className="mt-1 text-[12px] text-error-text">
          {error}
        </p>
      )}
    </div>
  );
}
