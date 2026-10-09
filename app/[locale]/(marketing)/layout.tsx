import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SiteShell } from "@/components/layout/site-shell";

export default async function MarketingLayout({ children, params }: LayoutProps<"/[locale]">) {
  // Layouts render in parallel with pages: set the locale here too to keep pages static.
  setRequestLocale((await params).locale as Locale);
  return <SiteShell>{children}</SiteShell>;
}
