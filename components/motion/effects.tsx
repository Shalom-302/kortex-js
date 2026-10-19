"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { gsap, MOTION_OK, ScrollTrigger } from "./gsap";
import { scrollToHash } from "./scroll-to-hash";
import { useMediaQuery } from "./use-media-query";

const INTERACTIVE = "a, button, input, textarea, select, label, [data-cursor]";

/**
 * Site-wide motion layer, mounted once in the shell:
 * - a hairline scroll-progress bar at the very top;
 * - a HUD cursor ring that trails the pointer and locks onto interactive elements;
 * - delegated effects: [data-magnetic] pulls toward the pointer, [data-tilt] leans in 3D,
 *   [data-spotlight] gets --mx/--my so CSS can draw a light under the pointer.
 * Pointer effects only run with a mouse and when motion is welcome.
 */
export function Effects() {
  const pathname = usePathname();
  const fine = useMediaQuery(`(pointer: fine) and ${MOTION_OK}`);

  // Layout shifts (images, fonts, client navigation) move scroll trigger positions.
  useEffect(() => {
    let timer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    const onPop = () => (window.__kortexPop = true);
    // A link to the page already shown does nothing in Next.js: "Home" on the home page brings
    // the reader back to the top, "#section" links glide to their section.
    const onClick = (e: MouseEvent) => {
      // No defaultPrevented check: Next.js cancels the native click on every <Link>.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest("a") : null;
      if (!link || link.target === "_blank" || link.origin !== window.location.origin) return;
      if (link.pathname !== window.location.pathname) return;
      if (link.hash) scrollToHash(link.hash);
      // After the mobile menu has closed and released the page scroll.
      else window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      {fine && <PointerEffects />}
    </>
  );
}

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const setScale = gsap.quickTo(el, "scaleX", { duration: 0.25, ease: "power2.out" });
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScale(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-paper mix-blend-difference"
    />
  );
}

function PointerEffects() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ringEl = ring.current;
    const dotEl = dot.current;
    if (!ringEl || !dotEl) return;

    gsap.set([ringEl, dotEl], { xPercent: -50, yPercent: -50, opacity: 0 });
    const ringX = gsap.quickTo(ringEl, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ringEl, "y", { duration: 0.45, ease: "power3.out" });
    const dotX = gsap.quickTo(dotEl, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dotEl, "y", { duration: 0.08, ease: "power3.out" });

    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let hovering = false;
    let shown = false;

    const release = (el: HTMLElement | null, props: gsap.TweenVars) => {
      if (el) gsap.to(el, { ...props, duration: 0.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([ringEl, dotEl], { x: e.clientX, y: e.clientY });
        gsap.to([ringEl, dotEl], { opacity: 1, duration: 0.3 });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);

      const target = e.target instanceof Element ? e.target : null;

      const over = Boolean(target?.closest(INTERACTIVE));
      if (over !== hovering) {
        hovering = over;
        gsap.to(ringEl, { scale: over ? 1.9 : 1, rotate: over ? 45 : 0, duration: 0.4, ease: "power3.out" });
        gsap.to(dotEl, { scale: over ? 0 : 1, duration: 0.25 });
      }

      const nextMagnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (nextMagnet !== magnet) {
        release(magnet, { x: 0, y: 0 });
        magnet = nextMagnet;
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        gsap.to(magnet, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.3,
          y: (e.clientY - (r.top + r.height / 2)) * 0.3,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      const nextTilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (nextTilt !== tilt) {
        release(tilt, { rotateX: 0, rotateY: 0 });
        tilt = nextTilt;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(tilt, {
          rotateY: px * 7,
          rotateX: -py * 7,
          transformPerspective: 900,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      const spot = target?.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };

    const onLeave = () => {
      shown = false;
      gsap.to([ringEl, dotEl], { opacity: 0, duration: 0.3 });
      release(magnet, { x: 0, y: 0 });
      release(tilt, { rotateX: 0, rotateY: 0 });
      magnet = tilt = null;
    };
    const onDown = () => gsap.to(ringEl, { scale: hovering ? 1.5 : 0.7, duration: 0.2 });
    const onUp = () => gsap.to(ringEl, { scale: hovering ? 1.9 : 1, duration: 0.4, ease: "back.out(3)" });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gsap.set([magnet, tilt].filter(Boolean), { clearProps: "transform" });
    };
  }, []);

  return (
    <>
      {/* HUD reticle: a square ring with four ticks, inverted against whatever is underneath. */}
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] size-9 mix-blend-difference"
      >
        <span className="absolute inset-0 rounded-full border border-paper/70" />
        <span className="absolute top-1/2 -left-1.5 h-px w-2 bg-paper" />
        <span className="absolute top-1/2 -right-1.5 h-px w-2 bg-paper" />
        <span className="absolute -top-1.5 left-1/2 h-2 w-px bg-paper" />
        <span className="absolute -bottom-1.5 left-1/2 h-2 w-px bg-paper" />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] size-1.5 rounded-full bg-paper mix-blend-difference"
      />
    </>
  );
}
