"use client";

import { use, useMemo } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { MapPin, Users } from "lucide-react";

export default function CircleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { circles, contacts } = useStore();

  const circle = useMemo(() => circles.find((c) => c.id === id), [circles, id]);

  const members = useMemo(() => {
    if (!circle) return [];
    return contacts.filter((c) => circle.members.includes(c.id));
  }, [circle, contacts]);

  if (!circle) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)]">
        <TopBar title="Circle" showBack backPath="/circles" />
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-[var(--color-text-tertiary)]">Circle not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title={`${circle.emoji} ${circle.name}`} showBack backPath="/circles" />

      {/* Circle Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-bg-primary)] px-4 pt-6 pb-5 text-center border-b border-[var(--color-border)]"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto"
          style={{ backgroundColor: `${circle.color}20` }}
        >
          {circle.emoji}
        </div>
        <h1 className="text-xl font-bold text-[var(--color-text-primary)] mt-3">
          {circle.name}
        </h1>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <Users size={14} className="text-[var(--color-text-tertiary)]" />
          <span className="text-sm text-[var(--color-text-secondary)]">
            {members.length} {members.length === 1 ? "member" : "members"}
          </span>
        </div>
      </motion.div>

      {/* Members */}
      <div className="px-4 pt-4 pb-4">
        <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
          Members
        </h3>
        <div className="space-y-1">
          {members.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              onClick={() => router.push(`/contacts/${contact.id}`)}
              className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-primary)] cursor-pointer hover:bg-[var(--color-bg-tertiary)] transition-colors border border-[var(--color-border)]"
            >
              <Avatar src={contact.avatar} name={contact.name} size="lg" />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate block">
                  {contact.name}
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-[var(--color-text-tertiary)] flex-shrink-0" />
                  <span className="text-xs text-[var(--color-text-secondary)] truncate">
                    {contact.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {members.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-[var(--color-text-tertiary)]">
                No members in this circle
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
