import type { ReactNode } from "react";
import { KMark } from "@/components/brand/k-mark";
import { ShaapiTerminal } from "@/components/home/shaapi-terminal";

type JobCardProps = {
  title: string;
  summary: string;
  tags: string[];
  groups: { title: string; items: string[] }[];
  actions: ReactNode;
};

/** An open role: dark card with the shaapi terminal running beside the pitch. */
export function JobCard({ title, summary, tags, groups, actions }: JobCardProps) {
  return (
    <article
      data-dark
      data-spotlight
      className="spotlight relative isolate overflow-hidden rounded-card border border-grey-800 bg-ink p-6 text-paper md:p-12"
    >
      <KMark className="pointer-events-none absolute -right-20 -bottom-24 -z-10 size-[28rem] text-grey-900" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
        <div>
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full border border-grey-700 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.1em] text-grey-200 uppercase">
                {tag}
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">{title}</h3>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-grey-200">{summary}</p>
        </div>
        <ShaapiTerminal className="min-h-[17rem] lg:h-[19rem]" />
      </div>

      <div className="mt-12 grid gap-10 border-t border-grey-800 pt-10 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="eyebrow text-grey-300">{group.title}</h4>
            <ul className="mt-5 space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-grey-100">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-paper" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3">{actions}</div>
    </article>
  );
}
