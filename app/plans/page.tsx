"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { FAB } from "@/components/layout/FAB";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { formatDateShort } from "@/lib/utils";
import { MapPin, Calendar, Users, Sparkles } from "lucide-react";

export default function PlansPage() {
  const router = useRouter();
  const { plans, contacts } = useStore();

  const myPlans = useMemo(() => plans.filter((p) => p.userId === "user_me"), [plans]);
  const contactPlans = useMemo(() => plans.filter((p) => p.userId !== "user_me"), [plans]);

  const planTypeLabels: Record<string, string> = {
    short_trip: "Short Trip",
    long_trip: "Long Trip",
    event: "Event",
    work_travel: "Work Travel",
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title="Plans" />

      <div className="px-4 pt-3 pb-4 space-y-4">
        {/* My Plans */}
        <section>
          <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            My Plans
          </h3>
          {myPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border)] shadow-[var(--shadow-sm)] mb-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-brand-light)] flex items-center justify-center">
                    <MapPin size={22} className="text-[var(--color-brand)]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                      {plan.destination}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Calendar size={12} className="text-[var(--color-text-tertiary)]" />
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {formatDateShort(plan.dates.start)} &ndash; {formatDateShort(plan.dates.end)}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge text={planTypeLabels[plan.type] ?? plan.type} />
              </div>

              {plan.notes && (
                <p className="text-sm text-[var(--color-text-secondary)] mt-3">{plan.notes}</p>
              )}

              <div className="flex items-center gap-2 mt-3">
                <Badge text={plan.visibility === "all_contacts" ? "All Contacts" : plan.visibility.replace("_", " ")} variant="default" />
              </div>

              {/* Overlaps */}
              {plan.overlaps && plan.overlaps.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-1 mb-2">
                    <Sparkles size={14} className="text-[var(--color-brand)]" />
                    <span className="text-xs font-semibold text-[var(--color-brand)]">
                      {plan.overlaps.length} Overlap{plan.overlaps.length > 1 ? "s" : ""} Found!
                    </span>
                  </div>
                  {plan.overlaps.map((overlap) => {
                    const contact = contacts.find((c) => c.id === overlap.contactId);
                    return (
                      <div
                        key={overlap.contactId}
                        className="flex items-center gap-2 bg-[var(--color-brand-light)] rounded-[var(--radius-sm)] p-2 mb-1"
                      >
                        <Avatar src={contact?.avatar} name={overlap.contactName} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">
                            {overlap.contactName}
                          </p>
                          <p className="text-xs text-[var(--color-text-secondary)]">
                            {overlap.overlapDays} days overlap &middot;{" "}
                            {formatDateShort(overlap.overlapDates.start)} &ndash;{" "}
                            {formatDateShort(overlap.overlapDates.end)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Friends' Plans */}
        {contactPlans.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Friends&apos; Plans
            </h3>
            {contactPlans.map((plan, index) => {
              const contact = contacts.find((c) => c.id === plan.userId);
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (myPlans.length + index) * 0.05 }}
                  onClick={() => contact && router.push(`/contacts/${contact.id}`)}
                  className="bg-[var(--color-bg-primary)] rounded-[var(--radius-md)] p-3 border border-[var(--color-border)] mb-2 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={contact?.avatar} name={contact?.name ?? "Unknown"} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {contact?.name} &rarr; {plan.destination}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {formatDateShort(plan.dates.start)} &ndash; {formatDateShort(plan.dates.end)}
                      </p>
                    </div>
                    <Badge text={planTypeLabels[plan.type] ?? plan.type} />
                  </div>
                </motion.div>
              );
            })}
          </section>
        )}
      </div>

      <FAB variant="plans" />
    </div>
  );
}
