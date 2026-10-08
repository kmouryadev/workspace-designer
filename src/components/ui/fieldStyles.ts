export function fieldClassName(invalid = false, className = ""): string {
  return [
    "h-12 w-full rounded-[12px] border bg-panel px-3.5 text-[14px] text-ink outline-none focus:border-gold",
    invalid ? "border-error-field" : "border-line",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
