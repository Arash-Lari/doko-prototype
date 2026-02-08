import type { Circle } from "@/lib/types";

export const circles: Circle[] = [
  {
    id: "family",
    name: "Family",
    emoji: "👨‍👩‍👧‍👦",
    members: ["contact_sarah", "contact_james", "contact_chloe"],
    color: "#8B5CF6",
    visibility: {
      updates: true,
      planDetails: true,
      moments: true,
      location: true,
      contactInfo: true,
    },
  },
  {
    id: "close_friends",
    name: "Close Friends",
    emoji: "💛",
    members: ["contact_nadia", "contact_sam", "contact_jamie", "contact_priya"],
    color: "#F59E0B",
    visibility: {
      updates: true,
      planDetails: true,
      moments: true,
      location: true,
      contactInfo: true,
    },
  },
  {
    id: "work_friends",
    name: "Work Friends",
    emoji: "💼",
    members: ["contact_tom", "contact_lena", "contact_marco"],
    color: "#3B82F6",
    visibility: {
      updates: true,
      planDetails: true,
      moments: true,
      location: false,
      contactInfo: false,
    },
  },
  {
    id: "new_contacts",
    name: "New Contacts",
    emoji: "👋",
    members: ["contact_yuki", "contact_ravi"],
    color: "#10B981",
    visibility: {
      updates: true,
      planDetails: false,
      moments: true,
      location: false,
      contactInfo: false,
    },
  },
  {
    id: "acquaintances",
    name: "Acquaintances",
    emoji: "🤝",
    members: ["contact_aisha", "contact_ben"],
    color: "#6B7280",
    visibility: {
      updates: true,
      planDetails: false,
      moments: false,
      location: false,
      contactInfo: false,
    },
  },
];
