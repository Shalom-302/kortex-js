import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticPageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/shared/legal-page";

export function generateMetadata({ params }: PageProps<"/[locale]/privacy">) {
  return staticPageMetadata(params, "privacy");
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  setRequestLocale((await params).locale as Locale);
  return (
    <LegalPage
      namespace="privacy"
      sections={["controller", "data", "purpose", "retention", "processors", "rights", "cookies"]}
    />
  );
}
