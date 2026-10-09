import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { staticPageMetadata } from "@/lib/seo";
import { buttonClasses } from "@/components/ui/button";
import { Media } from "@/components/shared/media";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

const LOOKING = ["craft", "curiosity", "ownership", "sharing"] as const;

export function generateMetadata({ params }: PageProps<"/[locale]/careers">) {
  return staticPageMetadata(params, "careers");
}

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("careers");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />

      <div className="container-page">
        <Reveal>
          <Media image="careers" locale={locale} priority aspect="aspect-[4/3] md:aspect-[21/9]" sizes="(min-width: 1280px) 1200px, 100vw" />
        </Reveal>
      </div>

      <Section>
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="eyebrow text-grey-500">{t("lookingTitle")}</h2>
            <ul className="mt-6">
              {LOOKING.map((key) => (
                <li key={key} className="border-b border-grey-200 py-4 text-xl tracking-tight">
                  {t(`looking.${key}`)}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <h2 className="eyebrow text-grey-500">{t("openingsTitle")}</h2>
            <p className="mt-6 text-xl text-grey-600">{t("noOpenings")}</p>

            <div className="mt-12 rounded-card bg-ink p-8 text-paper md:p-10">
              <h3 className="text-title font-medium">{t("spontaneous")}</h3>
              <p className="mt-3 text-grey-400">{t("spontaneousText")}</p>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(t("spontaneous"))}`}
                className={buttonClasses({ variant: "inverted", className: "mt-8" })}
              >
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
