"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { LoopVideo } from "@/components/shared/loop-video";
import { brand } from "@/components/brand/brand-name";

type ImmersionStageProps = {
  before: string;
  after: string;
  children: ReactNode;
};

/**
 * Right after the hero flight: "Step into the KORTEX universe" sits over a small video
 * window; as the reader scrolls the window opens to full screen, the line grows and fades
 * as if we flew through it, then the copy rises over the footage.
 */
export function ImmersionStage({ before, after, children }: ImmersionStageProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=130%", pin: true, scrub: 0.8 },
        });
        tl.fromTo(
          "[data-imm=frame]",
          { clipPath: "inset(32% 34% 32% 34% round 18px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
          0,
        )
          .fromTo("[data-imm=video]", { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
          .to("[data-imm=line]", { scale: 1.8, opacity: 0, filter: "blur(6px)", duration: 0.7 }, 0.1)
          .fromTo("[data-imm=shade]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.7)
          .fromTo("[data-imm=copy]", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4 }, 0.85)
          .to({}, { duration: 0.3 });
      });
      // Without motion: the footage simply sits full-bleed behind the copy.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-imm=line]", { display: "none" });
        gsap.set("[data-imm=shade]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-dark className="relative isolate h-[100svh] overflow-hidden bg-ink text-paper">
      <div data-imm="frame" className="absolute inset-0 overflow-hidden">
        <div data-imm="video" className="size-full">
          <LoopVideo video="digitalWorld" />
        </div>
        <div data-imm="shade" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.92),rgb(0_0_0/0.45)_55%,rgb(0_0_0/0.25))]" />
      </div>

      <p
        data-imm="line"
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-content-center px-5 text-center text-[clamp(2.5rem,7.5vw,7rem)] leading-[0.95] font-semibold tracking-[-0.05em] [text-shadow:0_2px_30px_rgb(0_0_0/0.6)]"
      >
        <span className="block">{before}</span>
        <span className="block">{brand(after)}</span>
      </p>

      <div data-imm="copy" className="container-page relative flex h-full flex-col justify-end pb-16 md:pb-24">
        {children}
      </div>
    </section>
  );
}
