import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticPageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/shared/legal-page";

export function generateMetadata({ params }: PageProps<"/[locale]/legal">) {
  return staticPageMetadata(params, "legal");
}

export default async function LegalNoticePage({ params }: PageProps<"/[locale]/legal">) {
  setRequestLocale((await params).locale as Locale);
  return <LegalPage namespace="legal" sections={["publisher", "director", "host", "ip"]} />;
}
