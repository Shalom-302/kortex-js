import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticPageMetadata } from "@/lib/seo";
import { KMark } from "@/components/brand/k-mark";
import { CompanyFacts } from "@/components/shared/company-facts";
import { CtaBand } from "@/components/shared/cta-band";
import { Media } from "@/components/shared/media";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

const VALUES = ["clarity", "rigor", "transmission", "impact"] as const;

export function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  return staticPageMetadata(params, "about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} text={t("intro")} />

      <div className="container-page">
        <Reveal>
          <Media
            image="city"
            locale={locale}
            priority
            aspect="aspect-[4/3] md:aspect-[21/9]"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="[&_img]:brightness-110 [&_img]:contrast-110"
          />
        </Reveal>
      </div>

      <Section>
        <SectionHeading eyebrow={t("visionTitle")} title={t("visionStatement")} text={t("visionText")} />
      </Section>

      <Section tone="dark">
        <Reveal>
          <h2 className="eyebrow text-grey-400">{t("valuesTitle")}</h2>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-grey-800 bg-grey-800 sm:grid-cols-2">
          {VALUES.map((key, i) => (
            <Reveal as="li" key={key} delay={i * 0.06} className="bg-ink p-8 md:p-12">
              <span className="font-mono text-xs text-grey-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 text-title font-medium">{t(`values.${key}.title`)}</h3>
              <p className="mt-3 max-w-sm text-grey-400">{t(`values.${key}.text`)}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-grey-500">{t("companyTitle")}</p>
            <h2 className="mt-6 text-headline font-medium text-balance">{t("companyStatement")}</h2>
            <p className="mt-6 max-w-md leading-relaxed text-grey-600">{t("companyText")}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:pt-3">
            <CompanyFacts />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <KMark className="size-32 md:size-48" />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-7 md:col-start-6">
            <p className="eyebrow text-grey-500">{t("originTitle")}</p>
            <p className="mt-6 text-title leading-snug font-medium text-pretty">{t("originText")}</p>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
