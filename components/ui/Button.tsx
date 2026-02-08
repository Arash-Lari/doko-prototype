"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "full";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const variantClasses = {
  primary: "bg-[var(--color-brand)] text-white hover:opacity-90 active:opacity-80",
  secondary: "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] active:opacity-80",
  ghost: "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] active:opacity-80",
  outline: "bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] active:opacity-80",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm rounded-[var(--radius-sm)]",
  md: "px-4 py-2.5 text-sm rounded-[var(--radius-md)]",
  lg: "px-6 py-3 text-base rounded-[var(--radius-md)]",
  full: "w-full px-4 py-3 text-base rounded-[var(--radius-md)]",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-150",
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};
