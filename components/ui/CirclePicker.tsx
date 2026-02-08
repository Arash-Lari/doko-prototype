"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface CirclePickerProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const CirclePicker = ({ selected, onChange }: CirclePickerProps) => {
  const { circles } = useStore();

  const toggleCircle = (circleId: string) => {
    if (selected.includes(circleId)) {
      onChange(selected.filter((id) => id !== circleId));
    } else {
      onChange([...selected, circleId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => {
          if (selected.includes("all_contacts")) {
            onChange([]);
          } else {
            onChange(["all_contacts"]);
          }
        }}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          selected.includes("all_contacts")
            ? "bg-[var(--color-brand)] text-white"
            : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
        )}
      >
        All Contacts
      </button>
      {circles.map((circle) => (
        <button
          key={circle.id}
          onClick={() => toggleCircle(circle.id)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            selected.includes(circle.id)
              ? "bg-[var(--color-brand)] text-white"
              : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
          )}
        >
          {circle.emoji} {circle.name}
        </button>
      ))}
    </div>
  );
};
