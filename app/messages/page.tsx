"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/utils";

export default function MessagesPage() {
  const router = useRouter();
  const { conversations, contacts } = useStore();

  const sortedConversations = useMemo(() => {
    return [...conversations].sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
    );
  }, [conversations]);

  const getConversationDisplay = (conv: (typeof conversations)[0]) => {
    if (conv.type === "group") {
      return {
        name: conv.name ?? "Group Chat",
        avatar: undefined,
        initial: (conv.name ?? "G")[0],
      };
    }
    const otherParticipantId = conv.participants.find((p) => p !== "user_me");
    const contact = contacts.find((c) => c.id === otherParticipantId);
    return {
      name: contact?.name ?? "Unknown",
      avatar: contact?.avatar,
      initial: (contact?.name ?? "U")[0],
    };
  };

  const getLastMessage = (conv: (typeof conversations)[0]) => {
    const last = conv.messages[conv.messages.length - 1];
    if (!last) return "";
    const isMe = last.senderId === "user_me";
    const prefix = isMe ? "You: " : "";
    return `${prefix}${last.text}`;
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar title="Messages" />

      <div className="px-4 pt-3 pb-4">
        {sortedConversations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-[var(--color-text-tertiary)]">
              No conversations yet
            </p>
          </div>
        )}

        <div className="space-y-1">
          {sortedConversations.map((conv, index) => {
            const display = getConversationDisplay(conv);
            const lastMessage = getLastMessage(conv);

            return (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
                onClick={() => router.push(`/messages/${conv.id}`)}
                className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-primary)] cursor-pointer hover:bg-[var(--color-bg-tertiary)] transition-colors border border-[var(--color-border)]"
              >
                <Avatar
                  src={display.avatar}
                  name={display.name}
                  size="lg"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                      {display.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-tertiary)] flex-shrink-0 ml-2">
                      {timeAgo(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-[var(--color-text-secondary)] truncate flex-1">
                      {lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
