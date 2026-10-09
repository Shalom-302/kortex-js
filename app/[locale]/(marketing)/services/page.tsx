import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SERVICE_GROUPS } from "@/data/services";
import { getUniverse } from "@/data/universes";
import { staticPageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { OfferList } from "@/components/services/offer-list";

export function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  return staticPageMetadata(params, "services");
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tc = await getTranslations("common");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />

      <div className="container-page pb-24 md:pb-36">
        <div className="border-t border-grey-200">
          {SERVICE_GROUPS.map((group, i) => {
            const universe = getUniverse(group.universe)!;
            return (
              <Reveal
                as="section"
                key={group.universe}
                className="relative grid gap-10 border-b border-grey-200 py-14 md:grid-cols-12 md:py-20"
              >
                <span id={group.universe} className="absolute -top-24" aria-hidden />
                <div className="md:col-span-4">
                  <span className="font-mono text-xs text-grey-400">{String(i + 1).padStart(2, "0")}</span>
                  <p className="eyebrow mt-8 text-grey-400">KORTEX</p>
                  <h2 className="mt-2 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-none font-semibold tracking-[-0.04em]">
                    {universe.name}
                  </h2>
                  <p className="mt-5 max-w-xs leading-relaxed text-grey-600">{universe.summary[locale]}</p>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <OfferList offers={group.offers} locale={locale} details />
                  <ButtonLink href="/contact" variant="secondary" arrow className="mt-8">
                    {tc("requestQuote")}
                  </ButtonLink>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 max-w-2xl">
          <p className="text-sm leading-relaxed text-grey-500">{t("quoteNote")}</p>
        </Reveal>
      </div>

      <CtaBand />
    </>
  );
}
