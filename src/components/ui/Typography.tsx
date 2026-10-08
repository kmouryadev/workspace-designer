"use client";

import type { ReactNode } from "react";

export type HeadingSize = "sm" | "md" | "lg";

const HEADING_SIZE_CLASS: Record<HeadingSize, string> = {
  lg: "font-heading text-[22px] font-extrabold",
  md: "font-heading text-[20px] font-extrabold",
  sm: "text-[15px] font-bold",
};

export function Heading({
  as: Tag = "h2",
  size = "sm",
  className = "",
  children,
}: {
  as?: "h1" | "h2";
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`text-ink ${HEADING_SIZE_CLASS[size]} ${className}`}>{children}</Tag>;
}

export type BodySize = "xs" | "sm" | "md";

const BODY_SIZE_CLASS: Record<BodySize, string> = {
  xs: "text-[11px]",
  sm: "text-[12px]",
  md: "text-[13px]",
};

export function Typography({
  size = "md",
  muted = false,
  className = "",
  children,
}: {
  size?: BodySize;
  muted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return <p className={`${BODY_SIZE_CLASS[size]} ${muted ? "text-ink-soft" : "text-ink"} ${className}`}>{children}</p>;
}
