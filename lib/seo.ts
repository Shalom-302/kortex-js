import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "./constants";

/** Absolute URL for a locale-less path, e.g. ("fr", "/work") → https://…/fr/work */
export function localizedUrl(locale: Locale, path = "") {
  const clean = path === "/" ? "" : path;
  return `${SITE.url}/${locale}${clean}`;
}

export function languageAlternates(path = "") {
  return {
    canonical: undefined as string | undefined,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, localizedUrl(l, path)]),
      ),
      "x-default": localizedUrl(routing.defaultLocale, path),
    },
  };
}

type PageMetaInput = {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  image?: string;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: PageMetaInput): Metadata {
  const url = localizedUrl(locale, path);
  const alternates = languageAlternates(path);
  alternates.canonical = url;

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: locale === "fr" ? "fr_CI" : "en_US",
      url,
      title: title ?? SITE.name,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE.name,
      description,
    },
  };
}

type StaticPage = "universes" | "services" | "about" | "kortexisme" | "insights" | "careers" | "contact" | "legal" | "privacy";

/** generateMetadata body for a static page whose copy lives in messages under `<page>.meta`. */
export async function staticPageMetadata(
  params: Promise<{ locale: string }>,
  page: StaticPage,
): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale });

  return pageMetadata({
    locale,
    path: `/${page}`,
    title: t(`${page}.meta.title`),
    description: t(`${page}.meta.description`),
  });
}
