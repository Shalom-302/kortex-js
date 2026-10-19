"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/**
 * Project cards stack on top of each other as the reader scrolls (CSS sticky, md and up). GSAP pushes
 * each covered card back into depth and pans every site capture inside its browser frame.
 */
export function WorkStack({ children }: { children: ReactNode }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add({ motion: MOTION_OK, wide: "(min-width: 48rem)" }, (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;
        const cards = gsap.utils.toArray<HTMLElement>("[data-work=card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          // Phones scroll the cards as a plain list: they are taller than the screen.
          if (next && wide) {
            gsap.to(card.firstElementChild, {
              // Darken rather than fade: a translucent card would show the ones beneath.
              scale: 0.92,
              filter: "brightness(0.4)",
              ease: "none",
              scrollTrigger: { trigger: next, start: "top 85%", end: "top 15%", scrub: true },
            });
          }

          const shot = card.querySelector<HTMLElement>("[data-work=shot]");
          const frame = shot?.parentElement;
          if (shot && frame) {
            gsap.to(shot, {
              y: () => -(shot.offsetHeight - frame.clientHeight),
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 70%", end: "+=140%", scrub: 0.6, invalidateOnRefresh: true },
            });
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="mt-16 md:mt-24">
      {children}
    </ol>
  );
}
