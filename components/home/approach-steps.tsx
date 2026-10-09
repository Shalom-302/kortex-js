"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/shared/reveal";

type Step = { title: string; text: string };

/** Vertical sequence; a hairline fills in as the reader scrolls through it. */
export function ApproachSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute top-0 bottom-0 left-[0.4375rem] w-px bg-grey-200 md:left-[0.5625rem]" />
      <motion.span
        aria-hidden
        className="absolute top-0 bottom-0 left-[0.4375rem] w-px origin-top bg-ink md:left-[0.5625rem]"
        style={{ scaleY: reduce ? 1 : progress }}
      />

      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.title}
          delay={0.04}
          className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-14 last:pb-0 md:grid-cols-[3.5rem_1fr] md:pb-20"
        >
          <span aria-hidden className="relative mt-3 grid size-[0.9375rem] place-items-center rounded-full border border-ink bg-paper md:size-[1.1875rem]">
            <span className="size-1 rounded-full bg-ink" />
          </span>
          <div>
            <span className="font-mono text-xs text-grey-400">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.035em]">
              {step.title}
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed text-grey-600">{step.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
