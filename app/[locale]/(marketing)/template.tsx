"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/brand/wordmark";
import { scrollToHash } from "@/components/motion/scroll-to-hash";

declare global {
  interface Window {
    __kortexNavigated?: boolean;
    /** Set by the motion layer when the browser's back/forward buttons were used. */
    __kortexPop?: boolean;
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
    // Next.js keeps the scroll position while any part of the new page is in view, which on
    // the long home page leaves visitors mid-page with the hero already flown away. Start new
    // pages at the top, but let back/forward and #anchors restore their own position.
    if (veil && !window.__kortexPop) {
      if (window.location.hash) scrollToHash(window.location.hash, "instant");
      else window.scrollTo({ top: 0, behavior: "instant" });
    }
    window.__kortexPop = false;
    window.__kortexNavigated = true;
  }, [veil]);

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
