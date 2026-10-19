"use client";

import { useEffect, useRef } from "react";
import { VIDEOS, type VideoKey } from "@/data/videos";
import { cn } from "@/lib/utils";

/**
 * Silent black-and-white loop, like an animated GIF but far lighter.
 * Only downloads and plays while on screen; stays on its poster with reduced motion.
 */
export function LoopVideo({ video, className }: { video: VideoKey; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { src, poster } = VIDEOS[video];

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={cn("size-full object-cover grayscale", className)}
    />
  );
}
