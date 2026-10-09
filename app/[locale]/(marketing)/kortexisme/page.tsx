import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getKortexisme } from "@/data/kortexisme";
import { staticPageMetadata } from "@/lib/seo";
import { KMark } from "@/components/brand/k-mark";
import { Principle, Principles } from "@/components/kortexisme/principles";
import { CtaBand } from "@/components/shared/cta-band";
import { mdxComponents } from "@/components/shared/mdx-components";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { BrandName } from "@/components/brand/brand-name";

const MAXIMS = ["humility", "discernment", "responsibility"] as const;

export function generateMetadata({ params }: PageProps<"/[locale]/kortexisme">) {
  return staticPageMetadata(params, "kortexisme");
}

export default async function KortexismePage({ params }: PageProps<"/[locale]/kortexisme">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("kortexisme");
  const source = await getKortexisme(locale);

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} text={t("intro")} />

      <Section tone="dark" className="relative isolate overflow-hidden">
        <KMark className="pointer-events-none absolute top-1/2 -right-16 -z-10 h-[130%] w-auto -translate-y-1/2 text-grey-900 md:right-0" />
        <Reveal>
          <p className="eyebrow text-grey-500">{t("mottoLabel")}</p>
          <p className="mt-6 text-display font-medium">Overcome Standard Limits.</p>
          <p className="mt-4 text-lg text-grey-400">{t("mottoTranslation")}</p>
        </Reveal>
        <ul className="mt-16 grid gap-px border-t border-grey-800 md:grid-cols-3">
          {MAXIMS.map((key, i) => (
            <Reveal as="li" key={key} delay={i * 0.06} className="pt-6 md:pr-8">
              <span className="font-mono text-xs text-grey-600">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-title font-medium">{t(`maxims.${key}`)}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <article className="container-page py-24 md:py-36">
        <div className="mx-auto max-w-3xl [&>h2:first-child]:mt-0">
          <MDXRemote source={source} components={{ ...mdxComponents, Principles, Principle }} />
          <p className="eyebrow mt-16 border-t border-grey-200 pt-8 text-grey-500">
            <BrandName /> · Overcome Standard Limits.
          </p>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
