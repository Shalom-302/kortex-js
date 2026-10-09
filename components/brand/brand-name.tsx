import { Children, Fragment, type ReactNode } from "react";
import { K_TIGHT_VIEWBOX } from "./k-geometry";
import { K_PATH } from "./k-mark";

const BRAND = /\b(K)(ORTEX|ortex)\b/g;

/**
 * "KORTEX" set with the circuit K in place of its first letter.
 * Screen readers, search engines and copy-paste still get the plain word.
 */
export function BrandName({ rest = "ORTEX" }: { rest?: string }) {
  return (
    <span className="whitespace-nowrap">
      <span className="sr-only">K{rest}</span>
      <span aria-hidden>
        <svg
          viewBox={K_TIGHT_VIEWBOX}
          fill="currentColor"
          className="mr-[0.06em] inline-block h-[1.12em] w-auto align-[-0.2em]"
        >
          {/* A light outline thickens the fine traces to match the weight of text. */}
          <path d={K_PATH} stroke="currentColor" strokeWidth={0.3} strokeLinejoin="round" />
        </svg>
        {rest}
      </span>
    </span>
  );
}

/** Replaces every "KORTEX" / "Kortex" in a string with <BrandName />. */
export function brand(text: string): ReactNode {
  const parts = text.split(BRAND);
  if (parts.length === 1) return text;
  // split() with two groups yields [before, "K", rest, between, "K", rest, …].
  const out: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i]);
    if (i + 2 < parts.length) out.push(<BrandName key={i} rest={parts[i + 2]} />);
  }
  return out;
}

/** brand() applied to the string children of a React tree (used for MDX and rich text). */
export function brandChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) => (typeof child === "string" ? <Fragment>{brand(child)}</Fragment> : child));
}
