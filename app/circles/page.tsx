"use client";

import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Toggle } from "@/components/ui/Toggle";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { Users, ChevronRight, Shield } from "lucide-react";
import type { CircleVisibility } from "@/lib/types";

const visibilityFeatures: { key: keyof CircleVisibility; label: string }[] = [
  { key: "updates", label: "Updates" },
  { key: "planDetails", label: "Plans" },
  { key: "moments", label: "Moments" },
  { key: "location", label: "Location" },
  { key: "contactInfo", label: "Contact Info" },
];

export default function CirclesPage() {
  const router = useRouter();
  const { circles, updateCircleVisibility } = useStore();

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar
        title="Circles"
        actions={
          <Shield size={20} className="text-[var(--color-brand)]" />
        }
      />

      <div className="px-4 pt-3 pb-4 space-y-5">
        {/* Circle List */}
        <section>
          <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            Your Circles
          </h3>
          <div className="space-y-2">
            {circles.map((circle, index) => (
              <motion.div
                key={circle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                onClick={() => router.push(`/circles/${circle.id}`)}
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-primary)] rounded-[var(--radius-md)] border border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-bg-tertiary)] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${circle.color}20` }}
                >
                  {circle.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {circle.name}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: circle.color }}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Users size={12} className="text-[var(--color-text-tertiary)]" />
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {circle.members.length}{" "}
                      {circle.members.length === 1 ? "member" : "members"}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visibility Matrix */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            Visibility Matrix
          </h3>
          <p className="text-xs text-[var(--color-text-tertiary)] mb-3">
            Control what each circle can see
          </p>

          <div className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
            {/* Header */}
            <div className="grid gap-0 border-b border-[var(--color-border)]" style={{ gridTemplateColumns: "1fr repeat(5, 54px)" }}>
              <div className="p-2 pl-3">
                <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase">
                  Circle
                </span>
              </div>
              {visibilityFeatures.map((feature) => (
                <div key={feature.key} className="p-2 text-center">
                  <span className="text-[9px] font-semibold text-[var(--color-text-tertiary)] uppercase leading-tight block">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {circles.map((circle, index) => (
              <div
                key={circle.id}
                className={`grid gap-0 items-center ${
                  index < circles.length - 1 ? "border-b border-[var(--color-border)]" : ""
                }`}
                style={{ gridTemplateColumns: "1fr repeat(5, 54px)" }}
              >
                <div className="p-2 pl-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{circle.emoji}</span>
                    <span className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                      {circle.name}
                    </span>
                  </div>
                </div>
                {visibilityFeatures.map((feature) => (
                  <div key={feature.key} className="flex items-center justify-center p-1">
                    <Toggle
                      checked={circle.visibility[feature.key]}
                      onChange={(val) =>
                        updateCircleVisibility(circle.id, feature.key, val)
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
