"use client";

import { motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/brand/wordmark";

/** Hero title: the circuit wordmark rises in on load. Text stays available to screen readers. */
export function HeroWordmark({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <span className="block">
      <span className="sr-only">KORTEX</span>
      <motion.span
        aria-hidden
        className="block"
        initial={reduce ? false : { opacity: 0, y: "18%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Wordmark className={className} />
      </motion.span>
    </span>
  );
}
