"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  text: string;
  variant?: "default" | "brand" | "success" | "warning" | "error";
  size?: "sm" | "md";
  className?: string;
}

const variantClasses = {
  default: "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]",
  brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
  success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  error: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
};

export const Badge = ({ text, variant = "default", size = "sm", className = "" }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {text}
    </span>
  );
};
