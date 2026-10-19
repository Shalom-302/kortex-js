import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { PROJECTS } from "@/data/projects";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ShaapiTerminal } from "./shaapi-terminal";
import { WorkStack } from "./work-stack";

/** Delivered projects and our own framework, as cards that stack while scrolling. */
export async function Work() {
  const t = await getTranslations("home.work");
  const locale = await getLocale();

  return (
    <Section tone="dark" id="realisations">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} text={t("text")} tone="dark" />

      <WorkStack>
        {PROJECTS.map((project, i) => {
          return (
            <li
              key={project.slug}
              data-work="card"
              className="mb-6 last:mb-0 md:sticky md:mb-24"
              // Stacking offset; only used where the cards are sticky (md and up).
              style={{ top: `calc(5.5rem + ${i} * 1.25rem)` }}
            >
              <article
                data-spotlight
                className="spotlight group grid origin-top gap-8 overflow-hidden rounded-card border border-grey-800 bg-grey-900 p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:p-10"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs tracking-[0.12em] text-grey-300">
                      {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-grey-700 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.1em] text-grey-300 uppercase">
                      {project.inHouse ? t("inHouse") : t("client")}
                    </span>
                  </div>
                  <p className="eyebrow mt-10 text-grey-300 md:mt-auto">{project.sector[locale]}</p>
                  <h3 className="mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-none font-semibold tracking-[-0.04em]">
                    {project.name}
                  </h3>
                  <p className="mt-5 max-w-md leading-relaxed text-grey-200">{project.summary[locale]}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tags[locale].map((tag) => (
                      <li key={tag} className="rounded-full bg-grey-800 px-3 py-1 text-xs text-grey-200">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-grey-200"
                    >
                      {project.inHouse ? t("docs") : t("visit")}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  )}
                </div>

                {project.screenshot ? (
                  // Browser frame; the full-page capture pans inside it while scrolling.
                  <div aria-hidden className="flex flex-col overflow-hidden rounded-[0.5rem] border border-grey-800 bg-ink">
                    <div className="flex items-center gap-2 border-b border-grey-800 px-4 py-3">
                      <span className="size-2.5 rounded-full bg-grey-700" />
                      <span className="size-2.5 rounded-full bg-grey-700" />
                      <span className="size-2.5 rounded-full bg-grey-700" />
                      <span className="ml-3 inline-flex min-w-0 items-center gap-1.5 rounded-full bg-grey-900 px-3 py-1 font-mono text-xs text-grey-300">
                        <Lock className="size-3 shrink-0" />
                        <span className="truncate">{project.display}</span>
                      </span>
                    </div>
                    <div className="relative h-[16rem] overflow-hidden sm:h-[22rem] md:h-[min(52svh,30rem)]">
                      <Image
                        data-work="shot"
                        src={project.screenshot}
                        alt=""
                        width={1440}
                        height={3600}
                        sizes="(min-width: 48rem) 55vw, 90vw"
                        className="w-full grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                ) : (
                  <ShaapiTerminal className="h-[16rem] sm:h-[22rem] md:h-[min(52svh,30rem)]" />
                )}
              </article>
            </li>
          );
        })}
      </WorkStack>
    </Section>
  );
}
