"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/Button";
import { Users, Compass, Sparkles } from "lucide-react";

type Screen = "splash" | "signin" | "carousel";

const carouselSlides = [
  {
    icon: Users,
    title: "Your contacts, alive",
    description: "See life updates from the people you care about. No posts, no likes — just real updates that matter.",
    color: "#8B5CF6",
  },
  {
    icon: Compass,
    title: "Plans that connect",
    description: "Share your travel plans and discover when friends will be in the same place. Serendipity, engineered.",
    color: "#F59E0B",
  },
  {
    icon: Sparkles,
    title: "Your daily pulse",
    description: "One calm feed with everything you need: updates, overlaps, moments, and gentle nudges to stay connected.",
    color: "#FF6B4A",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboarded } = useStore();
  const [screen, setScreen] = useState<Screen>("splash");
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("signin"), 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleSignIn = () => {
    setScreen("carousel");
  };

  const handleSkip = () => {
    setOnboarded();
    router.replace("/daily");
  };

  const handleNext = () => {
    if (carouselIndex < carouselSlides.length - 1) {
      setCarouselIndex(carouselIndex + 1);
    } else {
      handleSkip();
    }
  };

  return (
    <div className="h-full bg-[var(--color-bg-primary)] flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-5xl font-bold text-[var(--color-brand)]"
              >
                doko
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[var(--color-text-secondary)] mt-2 text-base"
              >
                the everyday app
              </motion.p>
            </div>
          </motion.div>
        )}

        {screen === "signin" && (
          <motion.div
            key="signin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center px-8"
          >
            <h1 className="text-4xl font-bold text-[var(--color-brand)] mb-2">doko</h1>
            <p className="text-[var(--color-text-secondary)] mb-10">Sign in to get started</p>

            <div className="w-full max-w-[320px] space-y-3">
              <Button variant="outline" size="full" onClick={handleSignIn}>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>

              <Button variant="outline" size="full" onClick={handleSignIn}>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Continue with Apple
              </Button>

              <Button variant="outline" size="full" onClick={handleSignIn}>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#00A4EF">
                  <path d="M11.4 2H2v9.4h9.4V2zm10.6 0h-9.4v9.4H22V2zM11.4 12.6H2V22h9.4v-9.4zm10.6 0h-9.4V22H22v-9.4z" />
                </svg>
                Continue with Microsoft
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--color-border)]" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-[var(--color-bg-primary)] text-[var(--color-text-tertiary)]">or</span>
                </div>
              </div>

              <Button variant="secondary" size="full" onClick={handleSignIn}>
                Continue with Email
              </Button>
            </div>
          </motion.div>
        )}

        {screen === "carousel" && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-end px-4 pt-4">
              <button
                onClick={handleSkip}
                className="text-sm font-medium text-[var(--color-text-secondary)] px-3 py-1"
              >
                Skip
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {(() => {
                    const slide = carouselSlides[carouselIndex];
                    const Icon = slide.icon;
                    return (
                      <>
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                          style={{ backgroundColor: `${slide.color}15` }}
                        >
                          <Icon size={36} style={{ color: slide.color }} />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                          {slide.title}
                        </h2>
                        <p className="text-[var(--color-text-secondary)] text-base leading-relaxed max-w-[280px] mx-auto">
                          {slide.description}
                        </p>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots + Next */}
            <div className="px-8 pb-12">
              <div className="flex justify-center gap-2 mb-6">
                {carouselSlides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === carouselIndex
                        ? "w-6 bg-[var(--color-brand)]"
                        : "w-2 bg-[var(--color-border)]"
                    }`}
                  />
                ))}
              </div>
              <Button size="full" onClick={handleNext}>
                {carouselIndex === carouselSlides.length - 1 ? "Get Started" : "Next"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
