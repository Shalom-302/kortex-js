"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/**
 * Horizontal film strip. On wide screens the section pins and vertical scrolling slides
 * the panels sideways, each frame drifting inside its window (parallax). On phones and
 * with reduced motion it is a plain swipeable row.
 */
export function GalleryTrack({ children, header }: { children: ReactNode; header: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

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
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mt-14 md:w-max md:snap-none md:gap-6 md:overflow-visible md:px-[max(2rem,calc((100vw-80rem)/2+2.5rem))] md:pb-0"
      >
        {children}
      </ul>
    </section>
  );
}
