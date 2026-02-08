"use client";

import { use, useMemo } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { useStore } from "@/store/useStore";
import { MapPin, Star } from "lucide-react";

export default function GuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { guides } = useStore();

  const guide = useMemo(() => guides.find((g) => g.id === id), [guides, id]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)]">
        <TopBar title="Guide" showBack backPath="/guides" />
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-[var(--color-text-tertiary)]">Guide not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title={guide.title} showBack backPath="/guides" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${guide.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-xl font-bold text-white">{guide.title}</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin size={14} className="text-white/80" />
            <span className="text-sm text-white/80">{guide.location}</span>
          </div>
        </div>
      </motion.div>

      {/* Entries */}
      <div className="px-4 pt-4 pb-4 space-y-3">
        <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          {guide.entries.length} {guide.entries.length === 1 ? "Place" : "Places"}
        </p>

        {guide.entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden"
          >
            {entry.image && (
              <div
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${entry.image})` }}
              />
            )}

            <div className="p-3">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {entry.placeName}
                </h3>
                <div className="flex gap-0.5 flex-shrink-0 ml-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= entry.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-[var(--color-border)]"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-[var(--color-text-tertiary)] flex-shrink-0" />
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {entry.location}
                </span>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                {entry.notes}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
