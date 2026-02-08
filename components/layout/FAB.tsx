"use client";

import { useState } from "react";
import { Plus, MessageCircle, CalendarPlus, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface FABAction {
  id: string;
  label: string;
  icon: typeof Plus;
  onClick: () => void;
}

interface FABProps {
  variant?: "daily" | "plans" | "places";
}

export const FAB = ({ variant = "daily" }: FABProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const actionsByVariant: Record<string, FABAction[]> = {
    daily: [
      {
        id: "moment",
        label: "New Moment",
        icon: MessageCircle,
        onClick: () => router.push("/daily?compose=moment"),
      },
      {
        id: "plan",
        label: "New Plan",
        icon: CalendarPlus,
        onClick: () => router.push("/plans/new"),
      },
      {
        id: "event",
        label: "New Event",
        icon: MapPin,
        onClick: () => router.push("/places/new"),
      },
    ],
    plans: [
      {
        id: "plan",
        label: "New Plan",
        icon: CalendarPlus,
        onClick: () => router.push("/plans/new"),
      },
    ],
    places: [
      {
        id: "event",
        label: "Host Event",
        icon: MapPin,
        onClick: () => router.push("/places/new"),
      },
    ],
  };

  const actions = actionsByVariant[variant] ?? actionsByVariant.daily;
  const isSingleAction = actions.length === 1;

  const handleFABClick = () => {
    if (isSingleAction) {
      actions[0].onClick();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="fixed bottom-[100px] right-4 z-30 max-w-[390px]">
      <AnimatePresence>
        {isOpen && !isSingleAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-[60px] right-0 flex flex-col gap-2 items-end"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-primary)] rounded-full shadow-lg border border-[var(--color-border)]"
                >
                  <span className="text-sm font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                    {action.label}
                  </span>
                  <Icon size={18} className="text-[var(--color-brand)]" />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleFABClick}
        className="w-14 h-14 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center shadow-lg"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
};
