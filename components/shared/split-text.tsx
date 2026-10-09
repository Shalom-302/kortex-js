"use client";

import { motion, useReducedMotion } from "motion/react";
import { brand } from "@/components/brand/brand-name";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean;
};

/**
 * Words rise one after another from behind a mask. The full sentence stays in the DOM
 * as plain text for screen readers and search engines.
 */
export function SplitText({ text, className, delay = 0, immediate = false }: SplitTextProps) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{brand(text)}</span>;

  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "shown" }
    : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, shown: { y: 0 } }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {brand(word)}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
