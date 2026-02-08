"use client";

import { getInitials } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-[120px] h-[120px] text-2xl",
};

export const Avatar = ({ src, name, size = "md", className = "" }: AvatarProps) => {
  const initials = getInitials(name);

  return (
    <div
      className={`relative rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-[var(--color-bg-tertiary)] ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              const fallback = parent.querySelector("[data-fallback]");
              if (fallback) {
                (fallback as HTMLElement).style.display = "flex";
              }
            }
          }}
        />
      ) : null}
      <span
        data-fallback
        className={`absolute inset-0 flex items-center justify-center font-semibold text-[var(--color-text-secondary)] ${src ? "hidden" : "flex"}`}
        style={{ display: src ? "none" : "flex" }}
      >
        {initials}
      </span>
    </div>
  );
};
