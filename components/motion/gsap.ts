"use client";

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

// Registered once, on the client only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, DrawSVGPlugin, TextPlugin, useGSAP);
}

/** Use with gsap.matchMedia(): effects only run for people who accept motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Glyphs the "decoding" text cycles through. */
export const SCRAMBLE_CHARS = "01<>/\_#*+=";

export { gsap, ScrollTrigger, useGSAP };
