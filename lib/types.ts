export type UpdateType = "location" | "job" | "relationship" | "education" | "hobby" | "milestone" | "general";

export type PlanType = "short_trip" | "long_trip" | "event" | "work_travel";

export type ExpenseCategory = "food" | "transport" | "accommodation" | "activities" | "other";

export type PlaceCategory = "art" | "food" | "sports" | "tech" | "social" | "market";

export type VaultCategory = "personal" | "travel" | "documents" | "ideas";

export type RSVPStatus = "going" | "maybe" | "invited";

export type MessageType = "direct" | "group";

export type Theme = "light" | "dark";

export interface Update {
  id: string;
  type: UpdateType;
  text: string;
  date: string;
  icon: string;
}

export interface Plan {
  id: string;
  userId: string;
  destination: string;
  dates: {
    start: string;
    end: string;
  };
  type: PlanType;
  visibility: string;
  notes: string;
  overlaps?: Overlap[];
}

export interface Overlap {
  contactId: string;
  contactName: string;
  destination: string;
  overlapDates: {
    start: string;
    end: string;
  };
  overlapDays: number;
}

export interface Moment {
  id: string;
  authorId: string;
  text: string;
  image?: string;
  audience: string[];
  createdAt: string;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  birthday: string;
  updates: Update[];
  plans: Plan[];
  circles: string[];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  location: string;
  bio: string;
  phone: string;
  email: string;
  birthday: string;
  circle: string;
  updates: Update[];
  plans: Plan[];
  moments: Moment[];
  lastInteraction: string;
  mutualFriends: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  type: MessageType;
  name?: string;
  participants: string[];
  messages: Message[];
  lastMessageAt: string;
  unreadCount: number;
}

export interface CircleVisibility {
  updates: boolean;
  planDetails: boolean;
  moments: boolean;
  location: boolean;
  contactInfo: boolean;
}

export interface Circle {
  id: string;
  name: string;
  emoji: string;
  members: string[];
  color: string;
  visibility: CircleVisibility;
}

export interface PlaceGuest {
  contactId: string;
  status: RSVPStatus;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  date: string;
  time: string;
  location: string;
  hostId: string;
  hostName: string;
  category: PlaceCategory;
  rsvpCount: number;
  maxCapacity?: number;
  guests: PlaceGuest[];
}

export interface GuideEntry {
  id: string;
  placeName: string;
  notes: string;
  rating: number;
  location: string;
  image?: string;
}

export interface Guide {
  id: string;
  title: string;
  coverImage: string;
  location: string;
  entries: GuideEntry[];
  createdBy: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  paidBy: string;
  splitWith: string[];
  date: string;
}

export interface TripExpense {
  id: string;
  tripName: string;
  destination: string;
  dates: {
    start: string;
    end: string;
  };
  participants: string[];
  expenses: Expense[];
  totalAmount: number;
  currency: string;
}

export interface VaultNote {
  id: string;
  title: string;
  body: string;
  category: VaultCategory;
  createdAt: string;
  updatedAt: string;
}

export interface FeedItem {
  id: string;
  type: "update" | "moment" | "overlap" | "nudge" | "event" | "birthday";
  timestamp: string;
  data: Update | Moment | Overlap | NudgeData | Place | BirthdayData;
  contactId?: string;
  contactName?: string;
  contactAvatar?: string;
}

export interface NudgeData {
  id: string;
  variant: "reconnection" | "proximity" | "availability" | "welcome" | "milestone";
  text: string;
  contactIds: string[];
  actionText: string;
}

export interface BirthdayData {
  contactId: string;
  contactName: string;
  date: string;
  daysUntil: number;
}
