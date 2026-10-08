"use client";

import type { InputHTMLAttributes } from "react";
import { fieldClassName } from "@/components/ui/fieldStyles";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export function TextInput({ invalid, className = "", ...rest }: TextInputProps) {
  return <input className={fieldClassName(invalid, className)} {...rest} />;
}
