"use client";

import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { FAB } from "@/components/layout/FAB";
import { Badge } from "@/components/ui/Badge";
import { useStore } from "@/store/useStore";
import { formatDateShort } from "@/lib/utils";
import { MapPin, Calendar, Users, Clock } from "lucide-react";

export default function PlacesPage() {
  const { places } = useStore();

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title="Places" />

      <div className="px-4 pt-3 pb-4 space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Discover events and happenings near you
        </p>

        {places.map((place, index) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-sm)]"
          >
            <div
              className="h-36 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${place.coverImage})` }}
            >
              <div className="absolute top-2 right-2">
                <Badge
                  text={place.category}
                  className="bg-black/60 text-white backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                {place.name}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                {place.description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{formatDateShort(place.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{place.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span className="truncate">{place.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  <span>
                    {place.rsvpCount} going
                    {place.maxCapacity && ` / ${place.maxCapacity}`}
                  </span>
                </div>
              </div>
              {place.hostId !== "platform" && (
                <p className="text-xs text-[var(--color-brand)] mt-2 font-medium">
                  Hosted by {place.hostName}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <FAB variant="places" />
    </div>
  );
}
