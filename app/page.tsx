"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export default function Home() {
  const router = useRouter();
  const { isOnboarded } = useStore();

  useEffect(() => {
    if (isOnboarded) {
      router.replace("/daily");
    } else {
      router.replace("/onboarding");
    }
  }, [isOnboarded, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg-primary)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--color-brand)]">doko</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">the everyday app</p>
      </div>
    </div>
  );
}
