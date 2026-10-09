"use client";

import { motion, useReducedMotion } from "motion/react";
import { K_PATH } from "@/components/brand/k-mark";

/**
 * Oversized outline of the K, traced once on load, then a faint fill settles in.
 * Pure decoration: hidden from assistive tech.
 */
export function HeroK({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none">
      <motion.path
        d={K_PATH}
        fill="currentColor"
        initial={reduce ? false : { fillOpacity: 0 }}
        animate={{ fillOpacity: 0.035 }}
        transition={{ delay: 1.6, duration: 1.6, ease: "easeOut" }}
      />
      <motion.path
        d={K_PATH}
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
