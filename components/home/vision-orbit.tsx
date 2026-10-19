"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { WORDMARK_PATH } from "@/components/brand/wordmark";

type OrbitProps = {
  core: string[];
  expansion: string[];
  className?: string;
};

const INNER_R = 150;
const OUTER_R = 300;
const TICKS_R = 350;
// Seconds per full turn: slow enough to read the labels, fast enough to feel alive.
const CORE_TURN = 45;
const OUTER_TURN = 80;
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

const point = (r: number, i: number, n: number, offset = -90) => {
  const a = ((offset + (360 / n) * i) * Math.PI) / 180;
  return { x: Math.round(r * Math.cos(a) * 100) / 100, y: Math.round(r * Math.sin(a) * 100) / 100 };
};

/**
 * KORTEX at the centre, the core universes on a close orbit, the expansion universes further out.
 * Rings turn very slowly; each label counter-rotates so it always reads upright.
 * Appears in three beats when scrolled into view: centre → core → expansion.
 * GSAP layer: a graduated outer dial drawn on scroll, comets running along both orbits,
 * and signal pulses leaving the centre.
 */
export function VisionOrbit({ core, expansion, className }: OrbitProps) {
  const reduce = useReducedMotion();
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const trigger = { trigger: root.current, start: "top 80%", end: "center 50%", scrub: 1 };
        gsap.from("[data-orbit=tick]", { opacity: 0, scaleY: 0, transformOrigin: "50% 100%", stagger: 0.01, ease: "none", scrollTrigger: trigger });
        gsap.fromTo("[data-orbit=dial]", { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", ease: "none", scrollTrigger: trigger });

        gsap.to("[data-orbit=comet-inner]", { rotation: 360, svgOrigin: "0 0", duration: 6, repeat: -1, ease: "none" });
        gsap.to("[data-orbit=comet-outer]", { rotation: -360, svgOrigin: "0 0", duration: 14, repeat: -1, ease: "none" });

        gsap.fromTo(
          "[data-orbit=pulse]",
          { attr: { r: 62 }, opacity: 0.45 },
          { attr: { r: OUTER_R }, opacity: 0, duration: 4, ease: "power1.out", repeat: -1, stagger: 2 },
        );
      });
    },
    { scope: root },
  );

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
    <svg ref={root} viewBox="-400 -400 800 800" aria-hidden className={className} fill="none">
      {/* Static guides */}
      <circle data-orbit="dial" r="390" stroke="currentColor" strokeOpacity="0.12" transform="rotate(-90)" />
      <g>
        {TICKS.map((deg) => (
          // Rotation lives on the group so GSAP can scale the line on its own.
          <g key={deg} transform={`rotate(${deg})`}>
            <line
              data-orbit="tick"
              x1="0"
              x2="0"
              y1={-TICKS_R}
              y2={-TICKS_R - (deg % 30 === 0 ? 14 : 6)}
              stroke="currentColor"
              strokeOpacity={deg % 30 === 0 ? 0.4 : 0.15}
            />
          </g>
        ))}
      </g>

      {/* Signal pulses */}
      {!reduce && [0, 1].map((i) => <circle key={i} data-orbit="pulse" r="62" stroke="currentColor" strokeOpacity="0.5" opacity="0" />)}

      {/* Comets: a bright head and a fading trail along each orbit */}
      {!reduce && (
        <>
          <Comet r={INNER_R} name="comet-inner" />
          <Comet r={OUTER_R} name="comet-outer" reverse />
        </>
      )}
      <motion.g {...beat(0.5)}>
        <circle r={INNER_R} stroke="currentColor" strokeOpacity="0.4" strokeDasharray="1 6" />
      </motion.g>
      <motion.g {...beat(1)}>
        <circle r={OUTER_R} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 10" />
      </motion.g>

      {/* Centre */}
      <motion.g {...beat(0)}>
        <circle r="62" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" />
        {/* Wordmark is 124.33 × 40 units: scale to ~96 wide, centred. */}
        <path d={WORDMARK_PATH} fill="currentColor" fillRule="evenodd" transform="translate(-48 -15.44) scale(0.772)" />
      </motion.g>

      {/* Core universes */}
      <motion.g {...beat(0.5)}>
        <Ring duration={CORE_TURN}>
          {core.map((label, i) => {
            const p = point(INNER_R, i, core.length);
            return (
              <g key={label} transform={`translate(${p.x} ${p.y})`}>
                <circle r="6" fill="currentColor" />
                <Upright duration={CORE_TURN}>
                  {/* Larger type on phones, where the whole diagram is drawn small. */}
                  <text y="-16" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="600" letterSpacing="1.5" className="max-sm:text-[26px]">
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
        <Ring duration={OUTER_TURN} reverse>
          {expansion.map((label, i) => {
            const p = point(OUTER_R, i, expansion.length, -75);
            return (
              <g key={label} transform={`translate(${p.x} ${p.y})`}>
                <circle r="4" fill="currentColor" fillOpacity="0.7" />
                <Upright duration={OUTER_TURN} reverse>
                  <text
                    y="-13"
                    textAnchor="middle"
                    fill="currentColor"
                    fillOpacity="0.7"
                    fontSize="12"
                    letterSpacing="1.5"
                    className="max-sm:text-[19px]"
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

function Comet({ r, name, reverse }: { r: number; name: string; reverse?: boolean }) {
  // Trail points sit behind the head, in the direction of travel.
  const step = (reverse ? 1 : -1) * (180 / (Math.PI * r)) * 9;
  return (
    <g data-orbit={name}>
      {Array.from({ length: 10 }, (_, i) => {
        const a = ((-90 + step * i) * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={Math.round(r * Math.cos(a) * 100) / 100}
            cy={Math.round(r * Math.sin(a) * 100) / 100}
            r={i === 0 ? 3.5 : 2.6 - i * 0.2}
            fill="currentColor"
            fillOpacity={i === 0 ? 1 : 0.6 - i * 0.055}
          />
        );
      })}
    </g>
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
