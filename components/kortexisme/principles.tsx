import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";

/** MDX block for the founding principles: a grid of numbered cards that rise in one by one. */
export function Principles({ children }: { children: ReactNode }) {
  return <ol className="my-12 grid gap-3 sm:grid-cols-2">{children}</ol>;
}

export function Principle({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <Reveal
      as="li"
      data-spotlight
      className="spotlight group flex flex-col rounded-card border border-grey-200 bg-paper p-6 transition-[border-color,transform] duration-500 ease-out-soft hover:-translate-y-1 hover:border-ink sm:last:col-span-2 md:p-7"
    >
      <span className="font-mono text-3xl leading-none font-medium tracking-tight text-grey-300 transition-colors duration-500 group-hover:text-ink">
        {n}
      </span>
      <h3 className="mt-8 text-xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 leading-relaxed text-grey-600 [&>p]:m-0 [&>p]:text-base">{children}</div>
    </Reveal>
  );
}
