"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { CirclePicker } from "@/components/ui/CirclePicker";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import type { PlanType } from "@/lib/types";
import { MapPin, Plane, Briefcase, Calendar, PartyPopper } from "lucide-react";

const planTypes: { id: PlanType; label: string; icon: React.ElementType }[] = [
  { id: "short_trip", label: "Short Trip", icon: Plane },
  { id: "long_trip", label: "Long Trip", icon: MapPin },
  { id: "event", label: "Event", icon: PartyPopper },
  { id: "work_travel", label: "Work Travel", icon: Briefcase },
];

export default function NewPlanPage() {
  const router = useRouter();
  const { addPlan } = useStore();
  const [step, setStep] = useState(0);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [planType, setPlanType] = useState<PlanType>("short_trip");
  const [visibility, setVisibility] = useState<string[]>(["close_friends"]);
  const [notes, setNotes] = useState("");

  const steps = ["Destination", "Dates", "Type", "Visibility", "Notes"];

  const canProceed = () => {
    switch (step) {
      case 0: return destination.trim().length > 0;
      case 1: return startDate && endDate;
      case 2: return true;
      case 3: return visibility.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    addPlan({
      id: `plan_new_${Date.now()}`,
      userId: "user_me",
      destination,
      dates: { start: startDate, end: endDate },
      type: planType,
      visibility: visibility[0] ?? "all_contacts",
      notes,
    });
    router.push("/plans");
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <TopBar title="New Plan" showBack backPath="/plans" />

      {/* Progress */}
      <div className="px-4 pt-3">
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-colors ${
                i <= step ? "bg-[var(--color-brand)]" : "bg-[var(--color-border)]"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
          Step {step + 1} of {steps.length}: {steps[step]}
        </p>
      </div>

      <div className="px-4 pt-6 pb-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="destination"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                Where are you going?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Enter your destination city or country
              </p>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
                />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Lisbon, Tokyo, New York..."
                  className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
                  autoFocus
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="dates"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                When are you going?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Select your travel dates
              </p>
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={(s, e) => { setStartDate(s); setEndDate(e); }}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="type"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                What kind of trip?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                This helps us match you with the right people
              </p>
              <div className="grid grid-cols-2 gap-3">
                {planTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = planType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setPlanType(type.id)}
                      className={`p-4 rounded-[var(--radius-md)] border-2 transition-all ${
                        isSelected
                          ? "border-[var(--color-brand)] bg-[var(--color-brand-light)]"
                          : "border-[var(--color-border)] bg-[var(--color-bg-primary)]"
                      }`}
                    >
                      <Icon
                        size={24}
                        className={isSelected ? "text-[var(--color-brand)]" : "text-[var(--color-text-tertiary)]"}
                      />
                      <span className={`block text-sm font-medium mt-2 ${
                        isSelected ? "text-[var(--color-brand)]" : "text-[var(--color-text-primary)]"
                      }`}>
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="visibility"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                Who can see this plan?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Choose which circles can view your travel plans
              </p>
              <CirclePicker selected={visibility} onChange={setVisibility} />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                Any notes?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Add context for friends who might want to join
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Looking for restaurant recs, open to meetups..."
                rows={4}
                className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20 resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="secondary" size="full" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button
            size="full"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {step === steps.length - 1 ? "Create Plan" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
