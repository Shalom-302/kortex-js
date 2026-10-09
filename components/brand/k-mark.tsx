import type { SVGProps } from "react";

/** The KORTEX "K", drawn on a 24×24 grid as a single closed outline. */
export const K_PATH = "M4 2H8.5V10.6L16.2 2H21.5L12.4 12L21.5 22H16.2L8.5 13.4V22H4Z";

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
