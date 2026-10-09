"use client";

import { motion, useReducedMotion } from "motion/react";
import { WORDMARK_PATH } from "@/components/brand/wordmark";

type OrbitProps = {
  core: string[];
  expansion: string[];
  className?: string;
};

const INNER_R = 150;
const OUTER_R = 300;

const point = (r: number, i: number, n: number, offset = -90) => {
  const a = ((offset + (360 / n) * i) * Math.PI) / 180;
  return { x: Math.round(r * Math.cos(a) * 100) / 100, y: Math.round(r * Math.sin(a) * 100) / 100 };
};

/**
 * KORTEX at the centre, the core universes on a close orbit, the expansion universes further out.
 * Rings turn very slowly; each label counter-rotates so it always reads upright.
 * Appears in three beats when scrolled into view: centre → core → expansion.
 */
export function VisionOrbit({ core, expansion, className }: OrbitProps) {
  const reduce = useReducedMotion();

  const beat = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "0px 0px -15% 0px" },
          transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <svg viewBox="-400 -400 800 800" aria-hidden className={className} fill="none">
      {/* Static guides */}
      <circle r="390" stroke="currentColor" strokeOpacity="0.07" />
      <motion.g {...beat(0.5)}>
        <circle r={INNER_R} stroke="currentColor" strokeOpacity="0.28" strokeDasharray="1 6" />
      </motion.g>
      <motion.g {...beat(1)}>
        <circle r={OUTER_R} stroke="currentColor" strokeOpacity="0.16" strokeDasharray="2 10" />
      </motion.g>

      {/* Centre */}
      <motion.g {...beat(0)}>
        <circle r="62" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" />
        {/* Wordmark is 124.33 × 40 units: scale to ~96 wide, centred. */}
        <path d={WORDMARK_PATH} fill="currentColor" fillRule="evenodd" transform="translate(-48 -15.44) scale(0.772)" />
      </motion.g>

      {/* Core universes */}
      <motion.g {...beat(0.5)}>
        <Ring duration={140}>
          {core.map((label, i) => {
            const p = point(INNER_R, i, core.length);
            return (
              <g key={label} transform={`translate(${p.x} ${p.y})`}>
                <circle r="5" fill="currentColor" />
                <Upright duration={140}>
                  <text y="-16" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="600" letterSpacing="1.5">
                    {label}
                  </text>
                </Upright>
              </g>
            );
          })}
        </Ring>
      </motion.g>

      {/* Expansion universes */}
      <motion.g {...beat(1)}>
        <Ring duration={260} reverse>
          {expansion.map((label, i) => {
            const p = point(OUTER_R, i, expansion.length, -75);
            return (
              <g key={label} transform={`translate(${p.x} ${p.y})`}>
                <circle r="3" fill="currentColor" fillOpacity="0.5" />
                <Upright duration={260} reverse>
                  <text
                    y="-11"
                    textAnchor="middle"
                    fill="currentColor"
                    fillOpacity="0.55"
                    fontSize="12"
                    letterSpacing="1.5"
                    className="max-sm:hidden"
                  >
                    {label}
                  </text>
                </Upright>
              </g>
            );
          })}
        </Ring>
      </motion.g>
    </svg>
  );
}

function Ring({ duration, reverse, children }: { duration: number; reverse?: boolean; children: React.ReactNode }) {
  return (
    <g
      className="animate-drift"
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
        transformOrigin: "0 0",
      }}
    >
      {children}
    </g>
  );
}

/** Cancels the parent ring's rotation around the label's own origin. */
function Upright({ duration, reverse, children }: { duration: number; reverse?: boolean; children: React.ReactNode }) {
  return (
    <g
      className="animate-drift"
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "normal" : "reverse",
        transformOrigin: "0 0",
      }}
    >
      {children}
    </g>
  );
}
