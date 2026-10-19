"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, SCRAMBLE_CHARS, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

/**
 * Boots the expansion modules in when they scroll into view: each card flips up out of
 * depth, then its name decodes. The build bar inside keeps scanning (CSS) to say "in progress".
 */
export function ExpansionGrid({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-exp=card]");
        gsap.set(cards, { opacity: 0, y: 40, rotateX: -35, transformPerspective: 900, transformOrigin: "50% 100%" });
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 });
            batch.forEach((card, i) => {
              const name = card.querySelector("[data-exp=name]");
              if (name) {
                gsap.to(name, {
                  scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.5 },
                  duration: 0.9,
                  delay: 0.25 + i * 0.08,
                });
              }
            });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <ul ref={root} className={className}>
      {children}
    </ul>
  );
}
