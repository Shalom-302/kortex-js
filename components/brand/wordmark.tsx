import type { SVGProps } from "react";
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "./wordmark-geometry";

export { WORDMARK_PATH, WORDMARK_VIEWBOX };

/** The KORTEX circuit wordmark. Inherits `currentColor`; set a height, width follows. */
export function Wordmark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d={WORDMARK_PATH} fillRule="evenodd" />
    </svg>
  );
}
