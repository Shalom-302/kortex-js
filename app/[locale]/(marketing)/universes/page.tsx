import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { CORE_UNIVERSES } from "@/data/universes";
import { staticPageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/button";
import { KMark } from "@/components/brand/k-mark";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { ExpansionList } from "@/components/universes/expansion-list";
import { StatusBadge } from "@/components/universes/status-badge";
import { BrandName, brand } from "@/components/brand/brand-name";

const PHASES = ["foundation", "tech", "products", "universes", "ecosystem"] as const;

export function generateMetadata({ params }: PageProps<"/[locale]/universes">) {
  return staticPageMetadata(params, "universes");
}

export default async function UniversesPage({ params }: PageProps<"/[locale]/universes">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("universes");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />

      {/* Core universes — operational today */}
      <Section spacing="tight" className="pt-0 md:pt-0">
        <Reveal>
          <h2 className="eyebrow text-grey-500">{t("coreTitle")}</h2>
        </Reveal>
        <div className="mt-6 border-t border-grey-200">
          {CORE_UNIVERSES.map((u, i) => (
            <Reveal
              as="section"
              key={u.slug}
              className="group relative grid scroll-mt-24 gap-8 border-b border-grey-200 py-14 md:grid-cols-12 md:py-20"
            >
              <span id={u.slug} className="absolute -top-24" aria-hidden />
              <div className="md:col-span-5">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-grey-400">{String(i + 1).padStart(2, "0")}</span>
                  <StatusBadge status="active" className="text-grey-600">
                    {t("status.active")}
                  </StatusBadge>
                </div>
                <p className="eyebrow mt-10 text-grey-400">
                  <BrandName />
                </p>
                <h3 className="mt-2 flex items-center gap-4 text-[clamp(2.75rem,6vw,5rem)] leading-none font-semibold tracking-[-0.045em]">
                  {u.name}
                  <KMark className="size-5 text-grey-200 transition-[transform,color] duration-700 ease-out-soft group-hover:rotate-90 group-hover:text-ink" />
                </h3>
              </div>
              <div className="md:col-span-6 md:col-start-7 md:pt-16">
                <p className="text-xl leading-relaxed text-pretty">{u.intro?.[locale]}</p>
                <p className="mt-4 text-grey-600">{u.summary[locale]}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {u.focus?.[locale].map((f) => (
                    <li key={f} className="rounded-full border border-grey-200 px-4 py-2 text-sm text-grey-700">
                      {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={`/services#${u.slug}`} variant="secondary" arrow className="mt-10">
                  {t("seeServices")}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Expansion universes — quieter, explicitly in development */}
      <Section tone="muted" id="expansion" className="scroll-mt-16">
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <StatusBadge status="development" className="text-grey-500">
              {t("expansionBadge")}
            </StatusBadge>
            <h2 className="mt-6 text-headline font-medium text-grey-800">{t("expansionTitle")}</h2>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-7 md:col-start-6 md:pt-14">
            <p className="leading-relaxed text-grey-600">{t("expansionText")}</p>
            <p className="mt-4 text-sm leading-relaxed text-grey-500">{brand(t("disclaimer"))}</p>
          </Reveal>
        </div>
        <div className="mt-16">
          <ExpansionList locale={locale} />
        </div>
      </Section>

      {/* Brand roadmap */}
      <Section>
        <Reveal>
          <p className="eyebrow text-grey-500">{t("roadmap.eyebrow")}</p>
          <h2 className="mt-6 max-w-3xl text-headline font-medium text-balance">{t("roadmap.title")}</h2>
        </Reveal>
        <ol className="mt-16 grid border-t border-grey-200 sm:grid-cols-2 lg:grid-cols-5">
          {PHASES.map((phase, i) => (
            <Reveal
              as="li"
              key={phase}
              delay={i * 0.06}
              className="border-b border-grey-200 py-8 sm:pr-8 lg:border-b-0 lg:py-10 lg:not-first:border-l lg:not-first:pl-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-grey-400">{t("roadmap.phase", { n: i + 1 })}</span>
                {i === 0 && (
                  <StatusBadge status="active" className="text-grey-700">
                    {t("roadmap.current")}
                  </StatusBadge>
                )}
              </div>
              <h3 className={i === 0 ? "mt-6 text-xl font-medium tracking-tight" : "mt-6 text-xl font-medium tracking-tight text-grey-500"}>
                {t(`roadmap.phases.${phase}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-grey-600">{brand(t(`roadmap.phases.${phase}.text`))}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
