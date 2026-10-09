import { getTranslations } from "next-intl/server";
import { KMark } from "@/components/brand/k-mark";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SplitText } from "@/components/shared/split-text";

const CREATES = ["products", "services", "experiences", "communities"] as const;

/** Second beat: KORTEX is a brand / an ecosystem, technology is the engine. */
export async function Manifesto() {
  const t = await getTranslations("home.manifesto");

  return (
    <Section id="ecosysteme">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3 md:pt-3">
          <p className="eyebrow flex items-center gap-3 text-grey-500">
            <KMark className="size-4" />
            {t("eyebrow")}
          </p>
        </Reveal>
        <div className="md:col-span-9">
          <Reveal>
            <h2 className="max-w-4xl text-headline font-medium text-balance">
              <SplitText text={t("title")} />
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-grey-600 md:text-xl">
              {t("text")}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <Reveal>
          <p className="eyebrow text-grey-400">{t("createsLabel")}</p>
        </Reveal>
        <ul className="mt-6 grid border-t border-grey-200 sm:grid-cols-2 lg:grid-cols-4">
          {CREATES.map((key, i) => (
            <Reveal
              as="li"
              key={key}
              delay={i * 0.07}
              className="group border-b border-grey-200 py-8 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:odd:pr-8"
            >
              <span className="font-mono text-xs text-grey-400">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-10 text-title font-medium transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
                {t(`creates.${key}`)}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
