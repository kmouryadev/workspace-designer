"use client";

import type { TextareaHTMLAttributes } from "react";
import { fieldClassName } from "@/components/ui/fieldStyles";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export function TextArea({ invalid, className = "", ...rest }: TextAreaProps) {
  return <textarea className={fieldClassName(invalid, `h-auto resize-none py-2 ${className}`)} {...rest} />;
}
