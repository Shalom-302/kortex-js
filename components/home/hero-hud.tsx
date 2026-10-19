"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, SCRAMBLE_CHARS, useGSAP } from "@/components/motion/gsap";

const abidjanTime = () =>
  new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Abidjan",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

/**
 * Futuristic frame around the hero: a perspective grid flowing toward the viewer,
 * a slow scan line, targeting brackets in the corners and a live telemetry readout
 * (Abidjan coordinates and local time). Pure decoration, hidden from assistive tech.
 */
export function HeroHud({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(abidjanTime());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({ delay: 0.4, defaults: { ease: "power3.out" } });
        tl.from("[data-hud=floor]", { opacity: 0, yPercent: 20, duration: 2.2 }, 0)
          .from("[data-hud=corner]", { opacity: 0, scale: 0.4, duration: 0.9, stagger: 0.08 }, 0.3)
          .from("[data-hud=line]", { opacity: 0, x: 12, duration: 0.6, stagger: 0.12 }, 0.8)
          // Only static text is scrambled: React keeps ownership of the ticking clock.
          .to(
            "[data-hud=code]",
            { scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.4 }, duration: 1.1, stagger: 0.12 },
            0.8,
          );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className={className}>
      {/* Perspective floor grid */}
      <div data-hud="grid" className="absolute inset-x-0 bottom-0 h-[45%]">
        <div data-hud="floor" className="absolute inset-0 overflow-hidden [perspective:420px]">
          <div className="hud-grid absolute -inset-x-1/2 bottom-0 h-[220%] origin-bottom [transform:rotateX(72deg)]" />
        </div>
      </div>

      {/* Scan line */}
      <div className="hud-scan absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.35),transparent)]" />

      {/* Targeting corners, inside the page gutter */}
      <div className="container-page absolute inset-x-0 top-24 bottom-6 mx-auto max-md:hidden md:top-28">
        {/* Pushed into the gutter so the brackets frame the content without touching it. */}
        <div className="absolute -inset-x-6 -top-6 bottom-0">
          <Corner className="top-0 left-0" />
          <Corner className="top-0 right-0 rotate-90" />
          <Corner className="right-0 bottom-0 rotate-180" />
          <Corner className="bottom-0 left-0 -rotate-90" />

          <div className="absolute top-6 right-6 flex flex-col items-end gap-1.5 font-mono text-[0.6875rem] leading-none tracking-[0.12em] text-grey-400">
            <span data-hud="line">
              <span data-hud="code">05°20′N · 04°01′W</span>
            </span>
            <span data-hud="line" className="tabular-nums">
              ABJ {time} GMT
            </span>
            <span data-hud="line" className="flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-paper/60" />
                <span className="relative size-1.5 rounded-full bg-paper" />
              </span>
              <span data-hud="code">SYS ONLINE</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span data-hud="corner" className={`absolute size-5 ${className}`}>
      <span className="absolute top-0 left-0 h-px w-full bg-grey-500" />
      <span className="absolute top-0 left-0 h-full w-px bg-grey-500" />
    </span>
  );
}
