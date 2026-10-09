import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getInsight, getInsights } from "@/data/insights";
import { IMAGES } from "@/data/images";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { Media } from "@/components/shared/media";
import { mdxComponents } from "@/components/shared/mdx-components";
import { Reveal } from "@/components/shared/reveal";

export async function generateStaticParams() {
  const perLocale = await Promise.all(
    routing.locales.map(async (locale) => (await getInsights(locale)).map((i) => ({ locale, slug: i.slug }))),
  );
  return perLocale.flat();
}

export async function generateMetadata({ params }: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const insight = await getInsight(locale, slug);
  if (!insight) return {};

  return {
    ...pageMetadata({
      locale,
      path: `/insights/${slug}`,
      title: insight.title,
      description: insight.summary,
      image: insight.cover ? `${IMAGES[insight.cover].src}?w=1200&h=630&fit=crop&q=80` : undefined,
    }),
    ...(insight.draft ? { robots: { index: false } } : {}),
  };
}

export default async function InsightPage({ params }: PageProps<"/[locale]/insights/[slug]">) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const insight = await getInsight(locale, slug);
  if (!insight) notFound();

  const t = await getTranslations("insights");

  return (
    <article className="pt-36 pb-24 md:pt-48 md:pb-36">
      <header className="container-page">
        <Reveal className="mx-auto max-w-3xl">
          <Link href="/insights" className="group inline-flex items-center gap-2 text-sm text-grey-600 hover:text-ink">
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t("backToInsights")}
          </Link>
          <p className="mt-10 flex flex-wrap items-center gap-3 text-xs text-grey-500">
            <time dateTime={insight.date}>{formatDate(insight.date, locale)}</time>
            <span aria-hidden>·</span>
            <span>{t("readingTime", { minutes: insight.readingMinutes })}</span>
            {insight.draft && <span className="rounded-full border border-dashed border-grey-400 px-2 py-0.5">{t("draft")}</span>}
          </p>
          <h1 className="mt-5 text-headline font-medium text-balance">{insight.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-grey-600">{insight.summary}</p>
        </Reveal>
      </header>

      {insight.cover && (
        <div className="container-page mt-16">
          <Media image={insight.cover} locale={locale} priority aspect="aspect-[16/9] md:aspect-[21/9]" sizes="(min-width: 1280px) 1200px, 100vw" />
        </div>
      )}

      <div className="container-page mt-12">
        <div className="mx-auto max-w-3xl">
          <MDXRemote source={insight.content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
