"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/brand/wordmark";

declare global {
  interface Window {
    __kortexNavigated?: boolean;
  }
}

/**
 * Page transition: on client-side navigation only (never on first load, so nothing delays
 * the first paint), a black veil carrying the KORTEX wordmark lifts off the new page.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [veil] = useState(() => typeof window !== "undefined" && window.__kortexNavigated === true);

  useEffect(() => {
    window.__kortexNavigated = true;
  }, []);

  return (
    <>
      {veil && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-ink text-paper"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Wordmark className="h-10 w-auto" />
          </motion.span>
        </motion.div>
      )}
      {children}
    </>
  );
}
