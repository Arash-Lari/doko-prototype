"use client";

import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { Toggle } from "@/components/ui/Toggle";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import {
  Lock, Receipt, BookOpen, Users, Calendar, Bell, Plug,
  Shield, Info, ChevronRight, Moon
} from "lucide-react";

interface SettingsLinkProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  badge?: string;
}

const SettingsLink = ({ icon: Icon, label, onClick, badge }: SettingsLinkProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full p-3 hover:bg-[var(--color-bg-tertiary)] transition-colors rounded-[var(--radius-md)]"
  >
    <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-bg-tertiary)] flex items-center justify-center">
      <Icon size={16} className="text-[var(--color-text-secondary)]" />
    </div>
    <span className="flex-1 text-sm text-[var(--color-text-primary)] text-left">{label}</span>
    {badge && (
      <span className="text-xs text-[var(--color-text-tertiary)]">{badge}</span>
    )}
    <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
  </button>
);

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, theme, setTheme } = useStore();

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title="Profile" />

      <div className="px-4 pt-4 pb-4 space-y-4">
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border)] text-center"
        >
          <Avatar src={currentUser.avatar} name={currentUser.name} size="xl" className="mx-auto" />
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mt-3">
            {currentUser.name}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">{currentUser.location}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{currentUser.bio}</p>
        </motion.div>

        {/* Dark Mode */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-bg-tertiary)] flex items-center justify-center">
              <Moon size={16} className="text-[var(--color-text-secondary)]" />
            </div>
            <div className="flex-1">
              <Toggle
                checked={theme === "dark"}
                onChange={(checked) => setTheme(checked ? "dark" : "light")}
                label="Dark Mode"
              />
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden"
        >
          <SettingsLink icon={Lock} label="Private Vault" onClick={() => router.push("/vault")} />
          <SettingsLink icon={Receipt} label="Expenses" onClick={() => router.push("/expenses")} />
          <SettingsLink icon={BookOpen} label="My Guides" onClick={() => router.push("/guides")} />
          <SettingsLink icon={Users} label="Privacy Circles" onClick={() => router.push("/circles")} />
          <SettingsLink icon={Calendar} label="Calendar" onClick={() => router.push("/profile")} />
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden"
        >
          <SettingsLink icon={Bell} label="Notifications" onClick={() => {}} badge="All on" />
          <SettingsLink icon={Plug} label="Connected Apps" onClick={() => {}} badge="2 connected" />
          <SettingsLink icon={Shield} label="Data & Privacy" onClick={() => {}} />
          <SettingsLink icon={Info} label="About Doko" onClick={() => {}} />
        </motion.div>

        {/* Version */}
        <p className="text-center text-xs text-[var(--color-text-tertiary)] pt-2">
          Doko v0.1.0 — Prototype
        </p>
      </div>
    </div>
  );
}
