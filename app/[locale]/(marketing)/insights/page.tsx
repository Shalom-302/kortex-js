import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getInsights } from "@/data/insights";
import { formatDate } from "@/lib/utils";
import { staticPageMetadata } from "@/lib/seo";
import { Media } from "@/components/shared/media";
import { PageHeader } from "@/components/shared/page-header";
import { Placeholder } from "@/components/shared/placeholder";
import { Reveal } from "@/components/shared/reveal";

export function generateMetadata({ params }: PageProps<"/[locale]/insights">) {
  return staticPageMetadata(params, "insights");
}

export default async function InsightsPage({ params }: PageProps<"/[locale]/insights">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("insights");
  const insights = await getInsights(locale);

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

      <div className="container-page pb-24 md:pb-36">
        {insights.length === 0 ? (
          <Reveal className="grid gap-8 border-t border-grey-200 pt-12 md:grid-cols-12">
            <Placeholder label={t("eyebrow")} className="aspect-[4/3] md:col-span-5" />
            <div className="md:col-span-6 md:col-start-7 md:self-end">
              <h2 className="text-title font-medium">{t("emptyTitle")}</h2>
              <p className="mt-3 text-grey-600">{t("emptyText")}</p>
            </div>
          </Reveal>
        ) : (
          <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, i) => (
              <Reveal as="li" key={insight.slug} delay={i * 0.06}>
                <Link href={`/insights/${insight.slug}`} className="group block">
                  {insight.cover ? (
                    <Media image={insight.cover} locale={locale} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                  ) : (
                    <Placeholder label={insight.tags[0] ?? t("eyebrow")} className="aspect-[4/3]" />
                  )}
                  <p className="mt-5 flex flex-wrap items-center gap-3 text-xs text-grey-500">
                    <time dateTime={insight.date}>{formatDate(insight.date, locale)}</time>
                    <span aria-hidden>·</span>
                    <span>{t("readingTime", { minutes: insight.readingMinutes })}</span>
                    {insight.draft && <span className="rounded-full border border-dashed border-grey-400 px-2 py-0.5">{t("draft")}</span>}
                  </p>
                  <h2 className="mt-3 text-title font-medium transition-colors group-hover:text-grey-600">{insight.title}</h2>
                  <p className="mt-2 text-grey-600">{insight.summary}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
