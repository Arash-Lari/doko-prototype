"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)] rounded-t-[var(--radius-xl)] max-h-[85vh] overflow-y-auto"
          >
            <div className="w-10 h-1 bg-[var(--color-border)] rounded-full mx-auto mt-3" />
            {title && (
              <div className="px-4 pt-4 pb-2">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {title}
                </h2>
              </div>
            )}
            <div className="px-4 pb-8">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
