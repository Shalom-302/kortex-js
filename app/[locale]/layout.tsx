import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    ...pageMetadata({ locale, path: "", title: t("title"), description: t("description") }),
    metadataBase: new URL(SITE.url),
    title: { default: t("title"), template: `%s — ${SITE.name}` },
    applicationName: SITE.name,
  };
}

/** Tells search engines the site is KORTEX DIGITAL (the name shown in results) and how to reach it. */
function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: [SITE.shortName, "Kortex Digital"],
        url: SITE.url,
        logo: `${SITE.url}/logo/kortex-logo-black.png`,
        email: SITE.email,
        telephone: SITE.phone.e164,
        founder: { "@type": "Person", name: SITE.founder },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Cocody, Angré Extension Château – Latrille-Bessikoi",
          addressLocality: "Abidjan",
          addressCountry: "CI",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        alternateName: [SITE.shortName, "Kortex Digital"],
        url: `${SITE.url}/${locale}`,
        inLanguage: locale,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <script
          type="application/ld+json"
          // Escaped so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)).replace(/</g, "\\u003c") }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
