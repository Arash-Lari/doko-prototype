"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import type { PlaceCategory } from "@/lib/types";

const categories: { value: PlaceCategory; label: string; emoji: string }[] = [
  { value: "art", label: "Art", emoji: "🎨" },
  { value: "food", label: "Food", emoji: "🍽" },
  { value: "sports", label: "Sports", emoji: "⚽" },
  { value: "tech", label: "Tech", emoji: "💻" },
  { value: "social", label: "Social", emoji: "🎉" },
  { value: "market", label: "Market", emoji: "🛍" },
];

export default function NewPlacePage() {
  const router = useRouter();
  const { contacts, currentUser, addPlace } = useStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<PlaceCategory>("social");
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);

  const toggleGuest = (contactId: string) => {
    setSelectedGuests((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSubmit = () => {
    if (!name.trim() || !date || !time || !location.trim()) return;

    const place = {
      id: `place_${Date.now()}`,
      name,
      description,
      coverImage:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop",
      date,
      time,
      location,
      hostId: currentUser.id,
      hostName: currentUser.name,
      category,
      rsvpCount: selectedGuests.length + 1,
      guests: selectedGuests.map((gId) => ({
        contactId: gId,
        status: "invited" as const,
      })),
    };

    addPlace(place);
    router.push("/places");
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title="Host Event" showBack backPath="/places" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-4 pb-8 space-y-5"
      >
        {/* Event Name */}
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
            Event Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What's the event called?"
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell people what to expect..."
            rows={3}
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20 resize-none"
          />
        </div>

        {/* Date & Time Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where is it happening?"
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
          />
        </div>

        {/* Category Selector */}
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-all ${
                  category === cat.value
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Guest List */}
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
            Invite Guests ({selectedGuests.length} selected)
          </label>
          <div className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden max-h-[240px] overflow-y-auto">
            {contacts.map((contact) => {
              const isSelected = selectedGuests.includes(contact.id);
              return (
                <button
                  key={contact.id}
                  onClick={() => toggleGuest(contact.id)}
                  className={`flex items-center gap-3 w-full p-3 text-left border-b border-[var(--color-border)] last:border-b-0 transition-colors ${
                    isSelected ? "bg-[var(--color-brand-light)]" : "hover:bg-[var(--color-bg-tertiary)]"
                  }`}
                >
                  <Avatar src={contact.avatar} name={contact.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-[var(--color-text-primary)] truncate block">
                      {contact.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-tertiary)] truncate block">
                      {contact.location}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[var(--color-brand)] flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <Button variant="primary" size="full" onClick={handleSubmit}>
          Create Event
        </Button>
      </motion.div>
    </div>
  );
}
