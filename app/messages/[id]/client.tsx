"use client";

import { use, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { useStore } from "@/store/useStore";
import { Send } from "lucide-react";

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { conversations, contacts } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = useMemo(
    () => conversations.find((c) => c.id === id),
    [conversations, id]
  );

  const isGroup = conversation?.type === "group";

  const getContactName = (senderId: string) => {
    if (senderId === "user_me") return "You";
    const contact = contacts.find((c) => c.id === senderId);
    return contact?.name ?? "Unknown";
  };

  const chatTitle = useMemo(() => {
    if (!conversation) return "Chat";
    if (conversation.type === "group") return conversation.name ?? "Group Chat";
    const otherId = conversation.participants.find((p) => p !== "user_me");
    const contact = contacts.find((c) => c.id === otherId);
    return contact?.name ?? "Chat";
  }, [conversation, contacts]);

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)]">
        <TopBar title="Chat" showBack backPath="/messages" />
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Conversation not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] flex flex-col">
      <TopBar title={chatTitle} showBack backPath="/messages" />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 space-y-2">
        {conversation.messages.map((msg, index) => {
          const isMe = msg.senderId === "user_me";

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-[var(--radius-lg)] px-3.5 py-2.5 ${
                  isMe
                    ? "bg-[var(--color-brand)] text-white rounded-br-sm"
                    : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-bl-sm"
                }`}
              >
                {isGroup && !isMe && (
                  <p className="text-[11px] font-semibold mb-0.5 text-[var(--color-brand)]">
                    {getContactName(msg.senderId)}
                  </p>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p
                  className={`text-[10px] mt-1 text-right ${
                    isMe ? "text-white/70" : "text-[var(--color-text-tertiary)]"
                  }`}
                >
                  {formatMessageTime(msg.timestamp)}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <div className="sticky bottom-0 bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-[var(--color-bg-tertiary)] rounded-full px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
          />
          <button className="w-10 h-10 rounded-full bg-[var(--color-brand)] flex items-center justify-center flex-shrink-0">
            <Send size={18} className="text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
