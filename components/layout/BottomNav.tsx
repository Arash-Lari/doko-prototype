"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, Users, Compass, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
  path: string;
}

const navItems: NavItem[] = [
  { id: "daily", label: "Daily", icon: Home, path: "/daily" },
  { id: "contacts", label: "Contacts", icon: Users, path: "/contacts" },
  { id: "plans", label: "Plans", icon: Compass, path: "/plans" },
  { id: "places", label: "Places", icon: MapPin, path: "/places" },
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
];

export const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setActiveTab } = useStore();

  const isOnboarding = pathname === "/" || pathname?.startsWith("/onboarding");
  if (isOnboarding) return null;

  const activeId = navItems.find((item) => pathname?.startsWith(item.path))?.id ?? "daily";

  const handleTap = (item: NavItem) => {
    setActiveTab(item.id);
    router.push(item.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-md border-t border-[var(--color-border)]">
      <div className="flex items-center justify-around h-[60px] max-w-[390px] mx-auto">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleTap(item)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={cn(
                    "transition-colors duration-200",
                    isActive
                      ? "text-[var(--color-brand)]"
                      : "text-[var(--color-text-tertiary)]"
                  )}
                />
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-brand)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] mt-1 font-medium transition-colors duration-200",
                  isActive
                    ? "text-[var(--color-brand)]"
                    : "text-[var(--color-text-tertiary)]"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area padding */}
      <div className="h-[env(safe-area-inset-bottom,20px)]" />
    </nav>
  );
};
