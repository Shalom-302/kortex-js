"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { brand } from "@/components/brand/brand-name";

/**
 * Endless band of universe names. Drifts on its own, accelerates and reverses with the
 * reader's scroll, and leans slightly with scroll speed.
 */
export function UniverseMarquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [4, -4]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    baseX.set(baseX.get() - direction.current * (delta / 1000) * (1.2 + Math.abs(b)));
  });

  const row = items.flatMap((item) => [item, "•"]);

  return (
    <div className="overflow-hidden border-y border-grey-800 bg-ink py-6 text-paper md:py-8" aria-hidden>
      <motion.div className="flex w-max whitespace-nowrap" style={{ x, skewX: reduce ? 0 : skew }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((label, i) => (
              <span
                key={`${copy}-${i}`}
                className={
                  label === "•"
                    ? "px-6 text-grey-700 md:px-10"
                    : i % 4 === 0
                      ? "text-[clamp(2rem,5.5vw,4.75rem)] leading-none font-semibold tracking-[-0.04em]"
                      : "text-[clamp(2rem,5.5vw,4.75rem)] leading-none font-semibold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--color-grey-500)] [&_path]:fill-transparent [&_path]:stroke-grey-500 [&_path]:[stroke-width:1px] [&_path]:[vector-effect:non-scaling-stroke]"
                }
              >
                {brand(label)}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
