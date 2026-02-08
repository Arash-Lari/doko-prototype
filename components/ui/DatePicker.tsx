"use client";

interface DatePickerProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}

export const DatePicker = ({ startDate, endDate, onChange }: DatePickerProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange(e.target.value, endDate)}
          className="w-full px-3 py-2.5 bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
        />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange(startDate, e.target.value)}
          className="w-full px-3 py-2.5 bg-[var(--color-bg-tertiary)] rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-brand)]/20"
        />
      </div>
    </div>
  );
};
