"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  backPath?: string;
  actions?: React.ReactNode;
}

export const TopBar = ({ title, showBack = false, backPath, actions }: TopBarProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (backPath) {
      router.push(backPath);
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[var(--color-bg-primary)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between h-[56px] px-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {showBack && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-8 h-8 -ml-1 rounded-full hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <ChevronLeft size={24} className="text-[var(--color-brand)]" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-[var(--color-text-primary)] truncate">
            {title}
          </h1>
        </div>
        {actions && <div className="flex items-center gap-2 ml-2">{actions}</div>}
      </div>
    </header>
  );
};
