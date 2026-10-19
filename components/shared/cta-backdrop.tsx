"use client";

import { useRef } from "react";
import { K_PATH } from "@/components/brand/k-mark";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/**
 * Behind the closing call to action: an oversized K whose circuit traces are drawn
 * as the band scrolls in, with radar rings radiating from it. Decorative only.
 */
export function CtaBackdrop({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-k-trace]",
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 45%", scrub: 0.8 },
          },
        );
        gsap.fromTo(
          "[data-k-fill]",
          { opacity: 0 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "center 60%", end: "center 30%", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className={className}>
      {[0, 2, 4].map((delay) => (
        <span
          key={delay}
          className="radar-ring absolute top-1/2 left-1/2 aspect-square w-[min(70rem,160%)] rounded-full border border-grey-800"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      <svg viewBox="0 0 24 24" fill="none" className="absolute top-1/2 left-1/2 h-[130%] w-auto -translate-x-1/2 -translate-y-1/2">
        <path data-k-fill d={K_PATH} fill="currentColor" fillOpacity="0.025" />
        <path data-k-trace d={K_PATH} stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.035" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
