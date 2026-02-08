"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { FAB } from "@/components/layout/FAB";
import { useStore } from "@/store/useStore";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort, timeAgo, timeUntilExpiry } from "@/lib/utils";
import type { FeedItem } from "@/lib/types";
import {
  MapPin, Briefcase, Heart, GraduationCap, Palette, Trophy, Star,
  Clock, Users, MessageCircle, Calendar, Sparkles, Check
} from "lucide-react";
import { useRouter } from "next/navigation";

const iconMap: Record<string, React.ElementType> = {
  MapPin, Briefcase, Heart, GraduationCap, Palette, Trophy, Star,
  Rocket: Sparkles, Camera: Palette, Mic: Sparkles, Globe: Star,
  Anchor: Sparkles, Building: Briefcase, TrendingUp: Star,
  Home: MapPin, Award: Trophy, Medal: Trophy, UtensilsCrossed: Palette,
  Bike: Trophy, Plane: MapPin,
};

export default function DailyPage() {
  const router = useRouter();
  const { contacts, moments, plans, places } = useStore();

  const feedItems = useMemo(() => {
    const items: FeedItem[] = [];

    // Updates from contacts
    contacts.forEach((contact) => {
      contact.updates.forEach((update) => {
        items.push({
          id: `update-${update.id}`,
          type: "update",
          timestamp: update.date,
          data: update,
          contactId: contact.id,
          contactName: contact.name,
          contactAvatar: contact.avatar,
        });
      });
    });

    // Active moments
    moments.forEach((moment) => {
      const contact = contacts.find((c) => c.id === moment.authorId);
      if (contact && new Date(moment.expiresAt) > new Date()) {
        items.push({
          id: `moment-${moment.id}`,
          type: "moment",
          timestamp: moment.createdAt,
          data: moment,
          contactId: contact.id,
          contactName: contact.name,
          contactAvatar: contact.avatar,
        });
      }
    });

    // Overlaps from user plans
    plans
      .filter((p) => p.userId === "user_me" && p.overlaps && p.overlaps.length > 0)
      .forEach((plan) => {
        plan.overlaps?.forEach((overlap) => {
          const contact = contacts.find((c) => c.id === overlap.contactId);
          items.push({
            id: `overlap-${plan.id}-${overlap.contactId}`,
            type: "overlap",
            timestamp: new Date().toISOString(),
            data: overlap,
            contactId: overlap.contactId,
            contactName: overlap.contactName,
            contactAvatar: contact?.avatar,
          });
        });
      });

    // Nudges
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    contacts
      .filter((c) => new Date(c.lastInteraction) < threeMonthsAgo)
      .forEach((contact) => {
        const monthsAgo = Math.floor(
          (Date.now() - new Date(contact.lastInteraction).getTime()) / (1000 * 60 * 60 * 24 * 30)
        );
        items.push({
          id: `nudge-${contact.id}`,
          type: "nudge",
          timestamp: new Date().toISOString(),
          data: {
            id: `nudge-${contact.id}`,
            variant: "reconnection" as const,
            text: `You and ${contact.name} haven't connected in ${monthsAgo} months`,
            contactIds: [contact.id],
            actionText: "Say hi",
          },
          contactId: contact.id,
          contactName: contact.name,
          contactAvatar: contact.avatar,
        });
      });

    // Upcoming events
    places.slice(0, 3).forEach((place) => {
      items.push({
        id: `event-${place.id}`,
        type: "event",
        timestamp: place.date,
        data: place,
      });
    });

    // Sort by timestamp (newest first), but keep overlaps and nudges near top
    items.sort((a, b) => {
      if (a.type === "overlap") return -1;
      if (b.type === "overlap") return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return items;
  }, [contacts, moments, plans, places]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title="Doko Daily" />

      <div className="px-4 pt-3 pb-4 space-y-3">
        {feedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            {item.type === "overlap" && (
              <div
                onClick={() => router.push(`/plans`)}
                className="bg-[var(--color-brand-light)] border border-[var(--color-brand)]/20 rounded-[var(--radius-lg)] p-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={item.contactAvatar} name={item.contactName ?? ""} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-brand)]">
                      Travel Overlap!
                    </p>
                    <p className="text-sm text-[var(--color-text-primary)] mt-0.5">
                      You and {item.contactName} will both be in{" "}
                      <span className="font-semibold">
                        {(item.data as import("@/lib/types").Overlap).destination}
                      </span>
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      {(item.data as import("@/lib/types").Overlap).overlapDays} days overlap &middot;{" "}
                      {formatDateShort((item.data as import("@/lib/types").Overlap).overlapDates.start)} &ndash;{" "}
                      {formatDateShort((item.data as import("@/lib/types").Overlap).overlapDates.end)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/messages`);
                    }}
                    className="flex-1 py-2 text-sm font-medium text-[var(--color-brand)] bg-white rounded-[var(--radius-md)] border border-[var(--color-brand)]/20"
                  >
                    Message
                  </button>
                  <button className="flex-1 py-2 text-sm font-medium text-white bg-[var(--color-brand)] rounded-[var(--radius-md)]">
                    Plan Meetup
                  </button>
                </div>
              </div>
            )}

            {item.type === "moment" && (
              <div
                onClick={() => item.contactId && router.push(`/contacts/${item.contactId}`)}
                className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-md)] cursor-pointer border border-[var(--color-border)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar src={item.contactAvatar} name={item.contactName ?? ""} size="sm" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {item.contactName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--color-warning)]">
                    <Clock size={12} />
                    <span className="text-xs font-medium">
                      {timeUntilExpiry((item.data as import("@/lib/types").Moment).expiresAt)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
                  {(item.data as import("@/lib/types").Moment).text}
                </p>
                <Badge text="Moment" variant="warning" className="mt-2" />
              </div>
            )}

            {item.type === "update" && (
              <div
                onClick={() => item.contactId && router.push(`/contacts/${item.contactId}`)}
                className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-sm)] cursor-pointer border border-[var(--color-border)]"
              >
                <div className="flex items-start gap-3">
                  <Avatar src={item.contactAvatar} name={item.contactName ?? ""} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {item.contactName}
                      </span>
                      <span className="text-xs text-[var(--color-text-tertiary)]">
                        {timeAgo((item.data as import("@/lib/types").Update).date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {(() => {
                        const update = item.data as import("@/lib/types").Update;
                        const IconComp = iconMap[update.icon] ?? Star;
                        return <IconComp size={14} className="text-[var(--color-brand)] flex-shrink-0" />;
                      })()}
                      <p className="text-sm text-[var(--color-text-primary)]">
                        {(item.data as import("@/lib/types").Update).text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {item.type === "nudge" && (
              <div className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] p-4 border border-dashed border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <Avatar src={item.contactAvatar} name={item.contactName ?? ""} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {(item.data as import("@/lib/types").NudgeData).text}
                    </p>
                    <button
                      onClick={() => item.contactId && router.push(`/messages`)}
                      className="text-sm font-medium text-[var(--color-brand)] mt-1"
                    >
                      {(item.data as import("@/lib/types").NudgeData).actionText} &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {item.type === "event" && (
              <div
                onClick={() => router.push(`/places`)}
                className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)] cursor-pointer border border-[var(--color-border)]"
              >
                <div
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${(item.data as import("@/lib/types").Place).coverImage})` }}
                />
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                      {(item.data as import("@/lib/types").Place).name}
                    </h3>
                    <Badge text={(item.data as import("@/lib/types").Place).category} />
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-text-secondary)]">
                    <Calendar size={12} />
                    <span>{formatDateShort((item.data as import("@/lib/types").Place).date)}</span>
                    <span>&middot;</span>
                    <MapPin size={12} />
                    <span className="truncate">{(item.data as import("@/lib/types").Place).location}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-text-tertiary)]">
                    <Users size={12} />
                    <span>{(item.data as import("@/lib/types").Place).rsvpCount} going</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {/* Feed terminus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: feedItems.length * 0.05 + 0.2 }}
          className="flex flex-col items-center py-8 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mb-3">
            <Check size={24} className="text-[var(--color-success)]" />
          </div>
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            You&apos;re all caught up
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
            Check back later for new updates
          </p>
        </motion.div>
      </div>

      <FAB variant="daily" />
    </div>
  );
}
