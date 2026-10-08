"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline-light" | "plain";
export type ButtonSize = "sm" | "md" | "lg" | "inline";

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[12px]",
  md: "h-11 px-5 text-[13px]",
  lg: "h-12 px-6 text-[14px]",
  inline: "",
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white",
  secondary: "border border-line text-ink",
  ghost: "text-ink-soft hover:text-ink",
  "outline-light": "border border-white/25 text-white/85 hover:border-white/50 hover:text-white",
  plain: "",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}): string {
  return [
    "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-opacity",
    "disabled:cursor-not-allowed disabled:opacity-40",
    SIZE_CLASS[size],
    VARIANT_CLASS[variant],
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, fullWidth, className, type = "button", ...rest },
  ref
) {
  return <button ref={ref} type={type} className={buttonClassName({ variant, size, fullWidth, className })} {...rest} />;
});
