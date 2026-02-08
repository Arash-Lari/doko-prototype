"use client";

import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { MapPin, BookOpen } from "lucide-react";

export default function GuidesPage() {
  const router = useRouter();
  const { guides } = useStore();

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title="Guides" />

      <div className="px-4 pt-3 pb-4 space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Your curated place guides
        </p>

        {guides.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            onClick={() => router.push(`/guides/${guide.id}`)}
            className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-sm)] cursor-pointer hover:shadow-[var(--shadow-md)] transition-shadow"
          >
            <div
              className="h-40 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${guide.coverImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-base font-bold text-white">
                  {guide.title}
                </h3>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                  <MapPin size={14} />
                  <span className="text-sm">{guide.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--color-text-tertiary)]">
                  <BookOpen size={14} />
                  <span className="text-xs font-medium">
                    {guide.entries.length} {guide.entries.length === 1 ? "place" : "places"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {guides.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={32} className="mx-auto text-[var(--color-text-tertiary)] mb-3" />
            <p className="text-sm text-[var(--color-text-tertiary)]">
              No guides yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
