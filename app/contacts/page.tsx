"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { SearchBar } from "@/components/ui/SearchBar";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, UserPlus } from "lucide-react";

export default function ContactsPage() {
  const router = useRouter();
  const { contacts, circles } = useStore();
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filteredContacts = useMemo(() => {
    if (!search) return contacts;
    const q = search.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }, [contacts, search]);

  const groupedByCircle = useMemo(() => {
    const groups: Record<string, typeof contacts> = {};
    circles.forEach((circle) => {
      const members = filteredContacts.filter((c) => c.circle === circle.id);
      if (members.length > 0) {
        groups[circle.id] = members;
      }
    });
    return groups;
  }, [filteredContacts, circles]);

  const toggleCollapse = (circleId: string) => {
    setCollapsed((prev) => ({ ...prev, [circleId]: !prev[circleId] }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar
        title="Contacts"
        actions={
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-tertiary)]">
            <UserPlus size={20} className="text-[var(--color-brand)]" />
          </button>
        }
      />

      <div className="px-4 pt-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search contacts..."
        />
      </div>

      <div className="px-4 pt-4 pb-4">
        {circles.map((circle) => {
          const members = groupedByCircle[circle.id];
          if (!members || members.length === 0) return null;
          const isCollapsed = collapsed[circle.id] ?? false;

          return (
            <div key={circle.id} className="mb-4">
              <button
                onClick={() => toggleCollapse(circle.id)}
                className="flex items-center gap-2 w-full py-2"
              >
                {isCollapsed ? (
                  <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
                ) : (
                  <ChevronDown size={16} className="text-[var(--color-text-tertiary)]" />
                )}
                <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  {circle.emoji} {circle.name}
                </span>
                <span className="text-xs text-[var(--color-text-tertiary)]">
                  ({members.length})
                </span>
              </button>

              {!isCollapsed && (
                <div className="space-y-1">
                  {members.map((contact, index) => {
                    const latestUpdate = contact.updates[0];
                    return (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => router.push(`/contacts/${contact.id}`)}
                        className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-primary)] cursor-pointer hover:bg-[var(--color-bg-tertiary)] transition-colors border border-[var(--color-border)]"
                      >
                        <Avatar src={contact.avatar} name={contact.name} size="lg" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                              {contact.name}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--color-text-secondary)] truncate">
                            {contact.location}
                          </p>
                          {latestUpdate && (
                            <p className="text-xs text-[var(--color-brand)] truncate mt-0.5">
                              {latestUpdate.text}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-[var(--color-text-tertiary)]">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
