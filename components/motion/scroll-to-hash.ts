"use client";

import { ScrollTrigger } from "./gsap";

/** Header height kept clear above the target section. */
const OFFSET = 72;

/**
 * Scrolls to the element named by `hash` (e.g. "#realisations"). Done by hand because
 * Next.js' own anchor scroll runs before pinned sections and the mobile menu settle.
 */
export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = decodeURIComponent(hash.slice(1));
  // Give the menu time to release the page scroll and pins time to measure.
  window.setTimeout(() => {
    const target = document.getElementById(id);
    if (!target) return;
    ScrollTrigger.refresh();
    const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior });
  }, 120);
}
