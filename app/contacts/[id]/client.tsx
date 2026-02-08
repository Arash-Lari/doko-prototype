"use client";

import { use, useMemo } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { formatDate, formatDateShort, timeUntilExpiry } from "@/lib/utils";
import {
  MapPin, Briefcase, Heart, GraduationCap, Palette, Trophy, Star,
  Sparkles, Phone, Mail, Cake, MessageCircle, Clock, Calendar,
  Users, ChevronRight
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  MapPin, Briefcase, Heart, GraduationCap, Palette, Trophy, Star,
  Rocket: Sparkles, Camera: Palette, Mic: Sparkles, Globe: Star,
  Anchor: Sparkles, Building: Briefcase, TrendingUp: Star,
  Home: MapPin, Award: Trophy, Medal: Trophy, UtensilsCrossed: Palette,
  Bike: Trophy, Plane: MapPin,
};

export default function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { contacts, circles, moments } = useStore();

  const contact = useMemo(() => contacts.find((c) => c.id === id), [contacts, id]);
  const circle = useMemo(
    () => circles.find((c) => c.id === contact?.circle),
    [circles, contact]
  );
  const activeMoments = useMemo(
    () => moments.filter((m) => m.authorId === id && new Date(m.expiresAt) > new Date()),
    [moments, id]
  );

  if (!contact) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)]">
        <TopBar title="Contact" showBack />
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-[var(--color-text-tertiary)]">Contact not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title={contact.name} showBack backPath="/contacts" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-bg-primary)] px-4 pt-6 pb-5 text-center border-b border-[var(--color-border)]"
      >
        <Avatar src={contact.avatar} name={contact.name} size="xl" className="mx-auto" />
        <h1 className="text-xl font-bold text-[var(--color-text-primary)] mt-3">{contact.name}</h1>
        <div className="flex items-center justify-center gap-1 mt-1">
          <MapPin size={14} className="text-[var(--color-text-tertiary)]" />
          <span className="text-sm text-[var(--color-text-secondary)]">{contact.location}</span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-[280px] mx-auto">
          {contact.bio}
        </p>
        {circle && (
          <Badge text={`${circle.emoji} ${circle.name}`} variant="brand" className="mt-3" />
        )}

        {/* Quick Actions */}
        <div className="flex gap-3 mt-5 justify-center">
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/messages")}
          >
            <MessageCircle size={16} className="mr-1.5" />
            Message
          </Button>
          <Button variant="outline" size="sm">
            <Phone size={16} className="mr-1.5" />
            Call
          </Button>
        </div>
      </motion.div>

      <div className="px-4 py-4 space-y-4">
        {/* Active Moments */}
        {activeMoments.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Active Moments
            </h3>
            {activeMoments.map((moment) => (
              <div
                key={moment.id}
                className="bg-[var(--color-bg-primary)] rounded-[var(--radius-md)] p-3 border border-[var(--color-border)]"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge text="Moment" variant="warning" />
                  <div className="flex items-center gap-1 text-[var(--color-warning)]">
                    <Clock size={12} />
                    <span className="text-xs font-medium">{timeUntilExpiry(moment.expiresAt)}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-primary)]">{moment.text}</p>
              </div>
            ))}
          </motion.section>
        )}

        {/* Updates Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            Updates Timeline
          </h3>
          <div className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
            {contact.updates.map((update, index) => {
              const IconComp = iconMap[update.icon] ?? Star;
              return (
                <div
                  key={update.id}
                  className={`flex items-start gap-3 p-3 ${
                    index < contact.updates.length - 1 ? "border-b border-[var(--color-border)]" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <IconComp size={16} className="text-[var(--color-brand)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {update.text}
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                      {formatDate(update.date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Plans */}
        {contact.plans.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Upcoming Plans
            </h3>
            {contact.plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-[var(--color-bg-primary)] rounded-[var(--radius-md)] p-3 border border-[var(--color-border)] flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--color-brand-light)] flex items-center justify-center">
                  <MapPin size={18} className="text-[var(--color-brand)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {plan.destination}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {formatDateShort(plan.dates.start)} &ndash; {formatDateShort(plan.dates.end)}
                  </p>
                </div>
                <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
              </div>
            ))}
          </motion.section>
        )}

        {/* Contact Info */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            Contact Info
          </h3>
          <div className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
            <div className="flex items-center gap-3 p-3 border-b border-[var(--color-border)]">
              <Phone size={16} className="text-[var(--color-text-tertiary)]" />
              <span className="text-sm text-[var(--color-text-primary)]">{contact.phone}</span>
            </div>
            <div className="flex items-center gap-3 p-3 border-b border-[var(--color-border)]">
              <Mail size={16} className="text-[var(--color-text-tertiary)]" />
              <span className="text-sm text-[var(--color-text-primary)]">{contact.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3">
              <Cake size={16} className="text-[var(--color-text-tertiary)]" />
              <span className="text-sm text-[var(--color-text-primary)]">
                {formatDate(contact.birthday)}
              </span>
            </div>
          </div>
        </motion.section>

        {/* Mutual Friends */}
        {contact.mutualFriends.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Mutual Friends
            </h3>
            <div className="bg-[var(--color-bg-primary)] rounded-[var(--radius-md)] p-3 border border-[var(--color-border)] flex items-center gap-2">
              <Users size={16} className="text-[var(--color-text-tertiary)]" />
              <span className="text-sm text-[var(--color-text-secondary)]">
                {contact.mutualFriends.length} mutual friend{contact.mutualFriends.length !== 1 ? "s" : ""}
              </span>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
