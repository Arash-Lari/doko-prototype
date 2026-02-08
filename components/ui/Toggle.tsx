"use client";

import { motion } from "framer-motion";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle = ({ checked, onChange, label }: ToggleProps) => {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      {label && (
        <span className="text-sm text-[var(--color-text-primary)]">{label}</span>
      )}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-[50px] h-[30px] rounded-full transition-colors duration-200 ${
          checked ? "bg-[var(--color-brand)]" : "bg-[var(--color-border)]"
        }`}
      >
        <motion.div
          className="absolute top-[3px] left-[3px] w-6 h-6 bg-white rounded-full shadow-sm"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </label>
  );
};
