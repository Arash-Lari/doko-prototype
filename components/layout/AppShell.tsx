"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PhoneFrame } from "./PhoneFrame";
import { BottomNav } from "./BottomNav";
import { useStore } from "@/store/useStore";
import { contacts as seededContacts } from "@/data/contacts";
import { conversations as seededConversations } from "@/data/conversations";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { setTheme, setContacts, setConversations, contacts } = useStore();
  const isOnboarding = pathname === "/" || pathname?.startsWith("/onboarding");

  useEffect(() => {
    // Hydrate theme from localStorage
    const savedTheme = localStorage.getItem("doko-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Hydrate onboarded state
    const onboarded = localStorage.getItem("doko-onboarded");
    if (onboarded === "true") {
      useStore.getState().setOnboarded();
    }
  }, [setTheme]);

  useEffect(() => {
    // Load seeded contacts and conversations
    if (contacts.length === 0) {
      setContacts(seededContacts);
      setConversations(seededConversations);
    }
  }, [contacts.length, setContacts, setConversations]);

  return (
    <PhoneFrame>
      <div className={isOnboarding ? "h-full" : "pb-[80px]"}>
        {children}
      </div>
      <BottomNav />
    </PhoneFrame>
  );
};
