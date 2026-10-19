"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, SCRAMBLE_CHARS, useGSAP } from "./gsap";

type ScrambleTextProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Decode on mount instead of when scrolled into view. */
  immediate?: boolean;
};

/**
 * Text that "decodes" from machine glyphs into the final words, once.
 * The final text is server-rendered and stays readable to assistive tech.
 */
export function ScrambleText({ text, className, delay = 0, immediate = false }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Same text in and out: the plugin shows glyphs, then reveals the words left to right.
        gsap.to(ref.current, {
          scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.5, revealDelay: 0.15 },
          duration: Math.min(1.6, 0.5 + text.length * 0.03),
          delay,
          ease: "none",
          scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 92%", once: true },
        });
      });
    },
    { dependencies: [text] },
  );

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
