"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/useStore";
import { Lock, FileText, Plane, Lightbulb, FolderOpen, X, Plus, Delete } from "lucide-react";
import type { VaultCategory } from "@/lib/types";

const categoryConfig: Record<VaultCategory, { label: string; icon: React.ElementType; color: string }> = {
  personal: { label: "Personal", icon: FileText, color: "var(--color-brand)" },
  travel: { label: "Travel", icon: Plane, color: "#F59E0B" },
  documents: { label: "Documents", icon: FolderOpen, color: "#3B82F6" },
  ideas: { label: "Ideas", icon: Lightbulb, color: "#10B981" },
};

export default function VaultPage() {
  const {
    vaultUnlocked,
    setVaultUnlocked,
    vaultNotes,
    updateVaultNote,
    addVaultNote,
  } = useStore();

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");
  const [showNewNote, setShowNewNote] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState<VaultCategory>("personal");

  const groupedNotes = useMemo(() => {
    const groups: Record<string, typeof vaultNotes> = {};
    vaultNotes.forEach((note) => {
      if (!groups[note.category]) {
        groups[note.category] = [];
      }
      groups[note.category].push(note);
    });
    return groups;
  }, [vaultNotes]);

  const handlePinInput = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setPinError(false);

    if (newPin.length === 4) {
      setTimeout(() => {
        setVaultUnlocked(true);
      }, 300);
    }
  };

  const handlePinDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setPinError(false);
  };

  const handleStartEdit = (noteId: string, body: string) => {
    setEditingId(noteId);
    setEditBody(body);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      updateVaultNote(editingId, {
        body: editBody,
        updatedAt: new Date().toISOString(),
      });
      setEditingId(null);
      setEditBody("");
    }
  };

  const handleAddNote = () => {
    if (!newTitle.trim()) return;
    const note = {
      id: `vault_${Date.now()}`,
      title: newTitle,
      body: newBody,
      category: newCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addVaultNote(note);
    setNewTitle("");
    setNewBody("");
    setNewCategory("personal");
    setShowNewNote(false);
  };

  // PIN Entry Screen
  if (!vaultUnlocked) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-secondary)]">
        <TopBar
          title="Private Vault"
          actions={<Badge text="Locked" variant="error" />}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center px-6 pt-12"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-6">
            <Lock size={28} className="text-[var(--color-text-secondary)]" />
          </div>

          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
            Enter PIN
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-8">
            Enter any 4 digits to unlock
          </p>

          {/* PIN Dots */}
          <div className="flex gap-4 mb-10">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: pin.length === i ? 1.2 : 1,
                  backgroundColor: i < pin.length
                    ? "var(--color-brand)"
                    : "var(--color-bg-tertiary)",
                }}
                className="w-4 h-4 rounded-full border-2 border-[var(--color-border)]"
              />
            ))}
          </div>

          {pinError && (
            <p className="text-sm text-red-500 mb-4">Incorrect PIN</p>
          )}

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map(
              (key) => {
                if (key === "") {
                  return <div key="empty" />;
                }
                if (key === "del") {
                  return (
                    <button
                      key="del"
                      onClick={handlePinDelete}
                      className="h-14 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                    >
                      <Delete size={22} />
                    </button>
                  );
                }
                return (
                  <button
                    key={key}
                    onClick={() => handlePinInput(key)}
                    className="h-14 rounded-[var(--radius-md)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-lg font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] active:scale-95 transition-all"
                  >
                    {key}
                  </button>
                );
              }
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Unlocked Vault
  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar
        title="Private Vault"
        actions={
          <div className="flex items-center gap-2">
            <Badge text="Unlocked" variant="success" />
            <button
              onClick={() => setShowNewNote(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-tertiary)]"
            >
              <Plus size={20} className="text-[var(--color-brand)]" />
            </button>
          </div>
        }
      />

      <div className="px-4 pt-3 pb-4 space-y-5">
        {Object.entries(groupedNotes).map(([category, notes]) => {
          const config = categoryConfig[category as VaultCategory];
          const IconComp = config.icon;

          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <IconComp size={16} style={{ color: config.color }} />
                <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  {config.label}
                </h3>
              </div>

              <div className="space-y-2">
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        editingId === note.id
                          ? handleSaveEdit()
                          : handleStartEdit(note.id, note.body)
                      }
                      className="w-full text-left p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lock size={12} className="text-[var(--color-text-tertiary)]" />
                          <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                            {note.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-[var(--color-text-tertiary)]">
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "short",
                          }).format(new Date(note.updatedAt))}
                        </span>
                      </div>
                    </button>

                    <AnimatePresence>
                      {editingId === note.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3">
                            <textarea
                              value={editBody}
                              onChange={(e) => setEditBody(e.target.value)}
                              rows={6}
                              className="w-full bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] p-3 text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20 resize-none"
                            />
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={handleSaveEdit}
                              >
                                Save
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* New Note Sheet */}
      <AnimatePresence>
        {showNewNote && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowNewNote(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)] rounded-t-[var(--radius-xl)] max-h-[85vh] overflow-y-auto"
            >
              <div className="w-10 h-1 bg-[var(--color-border)] rounded-full mx-auto mt-3" />
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  New Note
                </h2>
                <button onClick={() => setShowNewNote(false)}>
                  <X size={20} className="text-[var(--color-text-tertiary)]" />
                </button>
              </div>
              <div className="px-4 pb-8 space-y-4">
                <div>
                  <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Note title..."
                    className="w-full bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
                    Category
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {(Object.entries(categoryConfig) as [VaultCategory, typeof categoryConfig[VaultCategory]][]).map(
                      ([key, config]) => (
                        <button
                          key={key}
                          onClick={() => setNewCategory(key)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            newCategory === key
                              ? "bg-[var(--color-brand)] text-white"
                              : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
                          }`}
                        >
                          {config.label}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
                    Content
                  </label>
                  <textarea
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    placeholder="Write your note..."
                    rows={5}
                    className="w-full bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20 resize-none"
                  />
                </div>
                <Button variant="primary" size="full" onClick={handleAddNote}>
                  Save Note
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
