"use client";

import { useReducedMotion } from "motion/react";
import { K_PATH } from "./k-mark";

// Three tilted orbits, like an atom model. Each carries one or two electrons.
const ORBITS = [
  { tilt: 0, electrons: [{ dur: 9, offset: 0 }, { dur: 9, offset: 0.5 }] },
  { tilt: 60, electrons: [{ dur: 13, offset: 0.2 }] },
  { tilt: 120, electrons: [{ dur: 17, offset: 0.65 }, { dur: 17, offset: 0.15 }] },
];
const RX = 270;
const RY = 92;
const ORBIT_PATH = `M ${-RX} 0 A ${RX} ${RY} 0 1 0 ${RX} 0 A ${RX} ${RY} 0 1 0 ${-RX} 0`;

/**
 * Background K at the nucleus of an atom: the letter slowly spins on itself while
 * electrons travel along tilted elliptical orbits. Decorative only.
 */
export function KAtom({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="-300 -300 600 600" aria-hidden className={className} fill="none">
      {/* Nucleus: the K, turning slowly around its centre. */}
      <g className="animate-drift" style={{ animationDuration: "48s", transformOrigin: "0 0" }}>
        <path d={K_PATH} fill="currentColor" transform="translate(-102 -96) scale(8)" />
      </g>

      {ORBITS.map((orbit) => (
        <g key={orbit.tilt} transform={`rotate(${orbit.tilt})`}>
          <path d={ORBIT_PATH} stroke="var(--color-grey-800)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {orbit.electrons.map((e, i) => (
            <circle
              key={i}
              r="5"
              fill="var(--color-grey-600)"
              // Reduced motion: electrons rest at their starting point on the orbit.
              cx={reduce ? -RX * Math.cos(e.offset * 2 * Math.PI) : undefined}
              cy={reduce ? RY * Math.sin(e.offset * 2 * Math.PI) : undefined}
            >
              {!reduce && (
                <animateMotion
                  dur={`${e.dur}s`}
                  begin={`${-e.offset * e.dur}s`}
                  repeatCount="indefinite"
                  path={ORBIT_PATH}
                />
              )}
            </circle>
          ))}
        </g>
      ))}
    </svg>
  );
}
