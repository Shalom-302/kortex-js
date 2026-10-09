import type { SVGProps } from "react";
import { K_POLYGONS } from "./k-geometry";

/** The KORTEX "K" (circuit traces ending in nodes), on a 24×24 grid, centred on (12, 12). */
export const K_PATH = K_POLYGONS.map((poly) => `M${poly.map(([x, y]) => `${x} ${y}`).join("L")}Z`).join("");

/** Even-odd test against every stroke of the K, in grid units. */
export function insideK(x: number, y: number) {
  let inside = false;
  for (const poly of K_POLYGONS) {
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
}

/** Solid K symbol. Inherits `currentColor`; decorative unless given a `title`. */
export function KMark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d={K_PATH} />
    </svg>
  );
}
