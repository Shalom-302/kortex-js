"use client";

import { useRef, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/**
 * Horizontal film strip. On wide screens the section pins and vertical scrolling slides
 * the panels sideways, each frame drifting inside its window (parallax). On phones and
 * with reduced motion it is a plain swipeable row.
 */
export function GalleryTrack({ children, header, swipeHint }: { children: ReactNode; header: ReactNode; swipeHint: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  // Phones: the strip is swiped by hand; a bar shows how far along it is.
  const onSwipe = () => {
    const el = track.current;
    if (!el || !bar.current) return;
    const max = el.scrollWidth - el.clientWidth;
    bar.current.style.transform = `scaleX(${max > 0 ? Math.max(0.08, el.scrollLeft / max) : 1})`;
  };

  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 48rem) and ${MOTION_OK}`, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const slide = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-gallery=media]").forEach((media) => {
          gsap.fromTo(
            media,
            { xPercent: -9 },
            {
              xPercent: 9,
              ease: "none",
              scrollTrigger: { trigger: media.parentElement, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-gallery=caption]").forEach((caption) => {
          gsap.from(caption, {
            opacity: 0,
            y: 40,
            ease: "power3.out",
            scrollTrigger: { trigger: caption, containerAnimation: slide, start: "left 85%", toggleActions: "play none none reverse" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-dark className="relative overflow-hidden bg-ink py-20 text-paper md:flex md:h-[100svh] md:flex-col md:justify-center md:py-0">
      <div className="container-page">{header}</div>
      <ul
        ref={track}
        onScroll={onSwipe}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mt-14 md:w-max md:snap-none md:gap-6 md:overflow-visible md:px-[max(2rem,calc((100vw-80rem)/2+2.5rem))] md:pb-0"
      >
        {children}
      </ul>
      <div className="container-page mt-6 flex items-center gap-4 md:hidden">
        <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-grey-800">
          <span ref={bar} className="absolute inset-0 origin-left scale-x-[0.08] bg-paper transition-transform duration-150" />
        </span>
        <span className="eyebrow flex items-center gap-1 text-grey-300">
          {swipeHint}
          <ChevronRight aria-hidden className="size-4 animate-pulse" />
        </span>
      </div>
    </section>
  );
}
