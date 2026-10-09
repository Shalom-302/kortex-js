"use client";

import dynamic from "next/dynamic";

// three.js is only fetched on the client, after the hero text is painted.
const HeroSceneCanvas = dynamic(() => import("./hero-scene-canvas"), { ssr: false, loading: () => null });

export function HeroScene({ className }: { className?: string }) {
  return <HeroSceneCanvas className={className} />;
}
