import type { ReactNode } from "react";

/** MDX block for the founding principles: a numbered list, hairline between rows. */
export function Principles({ children }: { children: ReactNode }) {
  return <ol className="my-10 border-t border-grey-200">{children}</ol>;
}

export function Principle({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <li className="grid gap-3 border-b border-grey-200 py-8 sm:grid-cols-[4rem_1fr]">
      <span className="font-mono text-xs text-grey-400 sm:pt-1.5">{n}</span>
      <div>
        <h3 className="text-xl font-medium tracking-tight">{title}</h3>
        <div className="mt-2 leading-relaxed text-grey-700">{children}</div>
      </div>
    </li>
  );
}
