"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { flight } from "./flight";

/**
 * Pins the hero while the reader scrolls: the copy lifts away and the camera flies
 * through the particle K into the KORTEX universe (the scene reads `flight.progress`).
 */
export function HeroFlight({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=90%",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => (flight.progress = self.progress),
          },
        });
        tl.to("[data-flight=content]", { opacity: 0, y: -90, scale: 0.94, filter: "blur(10px)", duration: 0.55 }, 0)
          .to("[data-flight=hud]", { opacity: 0, duration: 0.4 }, 0.1)
          .to({}, { duration: 0.45 });
        return () => (flight.progress = 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-dark className={className}>
      {children}
    </section>
  );
}
