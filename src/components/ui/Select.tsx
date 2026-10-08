"use client";

import type { SelectHTMLAttributes } from "react";
import { fieldClassName } from "@/components/ui/fieldStyles";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export function Select({ invalid, className = "", ...rest }: SelectProps) {
  return <select className={fieldClassName(invalid, className)} {...rest} />;
}
