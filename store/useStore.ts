import { create } from "zustand";
import type {
  User,
  Contact,
  Conversation,
  Plan,
  Place,
  Moment,
  Circle,
  Guide,
  TripExpense,
  VaultNote,
  Expense,
  Theme,
} from "@/lib/types";
import { currentUser } from "@/data/user";
import { plans as seededPlans } from "@/data/plans";
import { moments as seededMoments } from "@/data/moments";
import { circles as seededCircles } from "@/data/circles";
import { places as seededPlaces } from "@/data/places";
import { guides as seededGuides } from "@/data/guides";
import { tripExpenses as seededExpenses } from "@/data/expenses";
import { vaultNotes as seededVaultNotes } from "@/data/vault";

interface StoreState {
  theme: Theme;
  isOnboarded: boolean;
  activeTab: string;
  currentUser: User;
  contacts: Contact[];
  conversations: Conversation[];
  plans: Plan[];
  places: Place[];
  moments: Moment[];
  circles: Circle[];
  guides: Guide[];
  tripExpenses: TripExpense[];
  vaultNotes: VaultNote[];
  vaultUnlocked: boolean;

  setTheme: (theme: Theme) => void;
  setOnboarded: () => void;
  setActiveTab: (tab: string) => void;
  setContacts: (contacts: Contact[]) => void;
  setConversations: (conversations: Conversation[]) => void;
  addMoment: (moment: Moment) => void;
  addPlan: (plan: Plan) => void;
  addPlace: (place: Place) => void;
  addExpense: (tripId: string, expense: Expense) => void;
  addVaultNote: (note: VaultNote) => void;
  updateVaultNote: (id: string, updates: Partial<VaultNote>) => void;
  setVaultUnlocked: (unlocked: boolean) => void;
  addGuide: (guide: Guide) => void;
  moveContactToCircle: (contactId: string, circleId: string) => void;
  updateCircleVisibility: (circleId: string, feature: string, value: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  theme: "light",
  isOnboarded: false,
  activeTab: "daily",
  currentUser,
  contacts: [],
  conversations: [],
  plans: seededPlans,
  places: seededPlaces,
  moments: seededMoments,
  circles: seededCircles,
  guides: seededGuides,
  tripExpenses: seededExpenses,
  vaultNotes: seededVaultNotes,
  vaultUnlocked: false,

  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("doko-theme", theme);
    }
    set({ theme });
  },

  setOnboarded: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("doko-onboarded", "true");
    }
    set({ isOnboarded: true });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setContacts: (contacts) => set({ contacts }),

  setConversations: (conversations) => set({ conversations }),

  addMoment: (moment) =>
    set((state) => ({ moments: [moment, ...state.moments] })),

  addPlan: (plan) =>
    set((state) => ({ plans: [...state.plans, plan] })),

  addPlace: (place) =>
    set((state) => ({ places: [...state.places, place] })),

  addExpense: (tripId, expense) =>
    set((state) => ({
      tripExpenses: state.tripExpenses.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              expenses: [...trip.expenses, expense],
              totalAmount: trip.totalAmount + expense.amount,
            }
          : trip
      ),
    })),

  addVaultNote: (note) =>
    set((state) => ({ vaultNotes: [...state.vaultNotes, note] })),

  updateVaultNote: (id, updates) =>
    set((state) => ({
      vaultNotes: state.vaultNotes.map((note) =>
        note.id === id ? { ...note, ...updates } : note
      ),
    })),

  setVaultUnlocked: (unlocked) => set({ vaultUnlocked: unlocked }),

  addGuide: (guide) =>
    set((state) => ({ guides: [...state.guides, guide] })),

  moveContactToCircle: (contactId, circleId) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === contactId ? { ...c, circle: circleId } : c
      ),
      circles: state.circles.map((circle) => ({
        ...circle,
        members: circle.id === circleId
          ? [...new Set([...circle.members, contactId])]
          : circle.members.filter((id) => id !== contactId),
      })),
    })),

  updateCircleVisibility: (circleId, feature, value) =>
    set((state) => ({
      circles: state.circles.map((circle) =>
        circle.id === circleId
          ? {
              ...circle,
              visibility: { ...circle.visibility, [feature]: value },
            }
          : circle
      ),
    })),
}));
