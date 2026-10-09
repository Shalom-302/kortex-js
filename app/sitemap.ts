import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getInsights } from "@/data/insights";
import { localizedUrl } from "@/lib/seo";

const STATIC_PATHS = ["", "/universes", "/services", "/about", "/insights", "/careers", "/contact", "/legal", "/privacy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Articles exist per locale; list a path once per locale it is published in.
  const insightPaths = new Map<string, string[]>();
  for (const locale of routing.locales) {
    for (const insight of await getInsights(locale)) {
      if (insight.draft) continue;
      const path = `/insights/${insight.slug}`;
      insightPaths.set(path, [...(insightPaths.get(path) ?? []), locale]);
    }
  }

  const paths: { path: string; locales: readonly string[] }[] = [
    ...STATIC_PATHS.map((path) => ({ path, locales: routing.locales })),
    ...[...insightPaths].map(([path, locales]) => ({ path, locales })),
  ];

  return paths.flatMap(({ path, locales }) =>
    routing.locales
      .filter((l) => locales.includes(l))
      .map((locale) => ({
        url: localizedUrl(locale, path),
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.filter((l) => locales.includes(l)).map((l) => [l, localizedUrl(l, path)]),
          ),
        },
      })),
  );
}
