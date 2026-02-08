"use client";

import { useEffect, useState } from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) {
    return <div className="w-full h-[100dvh] overflow-y-auto">{children}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f0f0] dark:bg-[#0a0a0a] p-8">
      <div className="relative w-[390px] h-[844px] bg-[var(--color-bg-primary)] rounded-[40px] overflow-hidden shadow-2xl border border-[var(--color-border)]">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-[10px]">
          <div className="w-[126px] h-[34px] bg-black rounded-full" />
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center pb-2 pointer-events-none">
          <div className="w-[134px] h-[5px] bg-[var(--color-text-primary)] rounded-full opacity-20" />
        </div>
      </div>
    </div>
  );
};
