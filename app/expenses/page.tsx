"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useStore } from "@/store/useStore";
import { formatCurrency, formatDateShort } from "@/lib/utils";
import {
  Utensils, Car, Hotel, Ticket, MoreHorizontal,
  ChevronDown, ChevronRight, Users, MapPin, Calendar,
  Plus, DollarSign,
} from "lucide-react";
import type { ExpenseCategory, Expense } from "@/lib/types";

const categoryConfig: Record<ExpenseCategory, { label: string; icon: React.ElementType; color: string }> = {
  food: { label: "Food", icon: Utensils, color: "#F59E0B" },
  transport: { label: "Transport", icon: Car, color: "#3B82F6" },
  accommodation: { label: "Accommodation", icon: Hotel, color: "#8B5CF6" },
  activities: { label: "Activities", icon: Ticket, color: "#10B981" },
  other: { label: "Other", icon: MoreHorizontal, color: "#6B7280" },
};

export default function ExpensesPage() {
  const { tripExpenses, contacts, addExpense } = useStore();
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addToTrip, setAddToTrip] = useState<string>("");

  // Add expense form state
  const [expDesc, setExpDesc] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expCategory, setExpCategory] = useState<ExpenseCategory>("food");
  const [expPaidBy, setExpPaidBy] = useState("user_me");

  const getParticipantName = (id: string) => {
    if (id === "user_me") return "You";
    const contact = contacts.find((c) => c.id === id);
    return contact?.name ?? "Unknown";
  };

  const toggleTrip = (tripId: string) => {
    setExpandedTrip((prev) => (prev === tripId ? null : tripId));
  };

  const openAddModal = (tripId: string) => {
    setAddToTrip(tripId);
    setExpDesc("");
    setExpAmount("");
    setExpCategory("food");
    setExpPaidBy("user_me");
    setShowAddModal(true);
  };

  const handleAddExpense = () => {
    if (!expDesc.trim() || !expAmount) return;
    const trip = tripExpenses.find((t) => t.id === addToTrip);
    if (!trip) return;

    const expense: Expense = {
      id: `exp_${Date.now()}`,
      description: expDesc,
      amount: parseFloat(expAmount),
      currency: trip.currency,
      category: expCategory,
      paidBy: expPaidBy,
      splitWith: trip.participants,
      date: new Date().toISOString().split("T")[0],
    };

    addExpense(addToTrip, expense);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <TopBar
        title="Expenses"
        actions={
          <Badge text="Tracker" variant="brand" />
        }
      />

      <div className="px-4 pt-3 pb-4 space-y-3">
        {tripExpenses.map((trip, index) => {
          const isExpanded = expandedTrip === trip.id;

          // Expense by category for pie chart
          const byCategory = trip.expenses.reduce<Record<string, number>>(
            (acc, exp) => {
              acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
              return acc;
            },
            {}
          );

          // Per person split
          const perPersonTotals = trip.expenses.reduce<Record<string, number>>(
            (acc, exp) => {
              acc[exp.paidBy] = (acc[exp.paidBy] || 0) + exp.amount;
              return acc;
            },
            {}
          );

          return (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden"
            >
              {/* Trip Header */}
              <button
                onClick={() => toggleTrip(trip.id)}
                className="w-full text-left p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[var(--color-brand)] flex-shrink-0" />
                      <h3 className="text-base font-semibold text-[var(--color-text-primary)] truncate">
                        {trip.destination}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-secondary)]">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>
                          {formatDateShort(trip.dates.start)} &ndash;{" "}
                          {formatDateShort(trip.dates.end)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{trip.participants.length} people</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[var(--color-text-primary)]">
                      {formatCurrency(trip.totalAmount, trip.currency)}
                    </span>
                    {isExpanded ? (
                      <ChevronDown size={18} className="text-[var(--color-text-tertiary)]" />
                    ) : (
                      <ChevronRight size={18} className="text-[var(--color-text-tertiary)]" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--color-border)]">
                      {/* Expense List */}
                      <div className="px-4 py-3 space-y-2">
                        {trip.expenses.map((expense) => {
                          const config = categoryConfig[expense.category];
                          const IconComp = config.icon;
                          return (
                            <div
                              key={expense.id}
                              className="flex items-center gap-3 py-2 border-b border-[var(--color-border)] last:border-b-0"
                            >
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${config.color}20` }}
                              >
                                <IconComp size={16} style={{ color: config.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                                  {expense.description}
                                </p>
                                <p className="text-xs text-[var(--color-text-secondary)]">
                                  Paid by {getParticipantName(expense.paidBy)}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                                  {formatCurrency(expense.amount, expense.currency)}
                                </p>
                                <Badge
                                  text={config.label}
                                  size="sm"
                                  className="mt-0.5"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Pie Chart + Per Person */}
                      <div className="px-4 pb-4 space-y-4">
                        {/* Simple SVG Pie Chart */}
                        <div>
                          <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                            By Category
                          </h4>
                          <div className="flex items-center gap-4">
                            <PieChart data={byCategory} total={trip.totalAmount} />
                            <div className="flex-1 space-y-1.5">
                              {Object.entries(byCategory).map(([cat, amount]) => {
                                const config = categoryConfig[cat as ExpenseCategory];
                                return (
                                  <div key={cat} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: config.color }}
                                      />
                                      <span className="text-xs text-[var(--color-text-secondary)]">
                                        {config.label}
                                      </span>
                                    </div>
                                    <span className="text-xs font-medium text-[var(--color-text-primary)]">
                                      {formatCurrency(amount, trip.currency)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Per Person Split */}
                        <div>
                          <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                            Per Person Split
                          </h4>
                          <div className="bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] p-3 space-y-2">
                            {trip.participants.map((pId) => {
                              const paid = perPersonTotals[pId] || 0;
                              const fairShare = trip.totalAmount / trip.participants.length;
                              const diff = paid - fairShare;
                              return (
                                <div key={pId} className="flex items-center justify-between">
                                  <span className="text-sm text-[var(--color-text-primary)]">
                                    {getParticipantName(pId)}
                                  </span>
                                  <div className="text-right">
                                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                      {formatCurrency(paid, trip.currency)}
                                    </span>
                                    <span
                                      className={`text-xs ml-2 ${
                                        diff > 0
                                          ? "text-emerald-500"
                                          : diff < 0
                                          ? "text-red-500"
                                          : "text-[var(--color-text-tertiary)]"
                                      }`}
                                    >
                                      ({diff > 0 ? "+" : ""}
                                      {formatCurrency(diff, trip.currency)})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                            <div className="border-t border-[var(--color-border)] pt-2 mt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--color-text-secondary)]">
                                  Fair share per person
                                </span>
                                <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                                  {formatCurrency(
                                    trip.totalAmount / trip.participants.length,
                                    trip.currency
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          size="full"
                          onClick={() => openAddModal(trip.id)}
                        >
                          <Plus size={16} className="mr-1.5" />
                          Add Expense
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {tripExpenses.length === 0 && (
          <div className="text-center py-12">
            <DollarSign size={32} className="mx-auto text-[var(--color-text-tertiary)] mb-3" />
            <p className="text-sm text-[var(--color-text-tertiary)]">
              No trip expenses yet
            </p>
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Expense"
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
              Description
            </label>
            <input
              type="text"
              value={expDesc}
              onChange={(e) => setExpDesc(e.target.value)}
              placeholder="What was it for?"
              className="w-full bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
              Amount
            </label>
            <input
              type="number"
              value={expAmount}
              onChange={(e) => setExpAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
              Category
            </label>
            <div className="flex gap-2 flex-wrap">
              {(Object.entries(categoryConfig) as [ExpenseCategory, typeof categoryConfig[ExpenseCategory]][]).map(
                ([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setExpCategory(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      expCategory === key
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
              Paid By
            </label>
            <div className="flex gap-2 flex-wrap">
              {tripExpenses
                .find((t) => t.id === addToTrip)
                ?.participants.map((pId) => (
                  <button
                    key={pId}
                    onClick={() => setExpPaidBy(pId)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      expPaidBy === pId
                        ? "bg-[var(--color-brand)] text-white"
                        : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {getParticipantName(pId)}
                  </button>
                ))}
            </div>
          </div>
          <Button variant="primary" size="full" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// Simple SVG Pie Chart component
function PieChart({ data, total }: { data: Record<string, number>; total: number }) {
  const entries = Object.entries(data);
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <svg viewBox="-1 -1 2 2" className="w-20 h-20 flex-shrink-0" style={{ transform: "rotate(-90deg)" }}>
      {entries.map(([cat, amount]) => {
        const percent = amount / total;
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = percent > 0.5 ? 1 : 0;
        const pathData = [
          `M ${startX} ${startY}`,
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          "L 0 0",
        ].join(" ");

        const config = categoryConfig[cat as ExpenseCategory];

        return (
          <path key={cat} d={pathData} fill={config.color} />
        );
      })}
    </svg>
  );
}
