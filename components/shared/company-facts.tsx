import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** KORTEX DIGITAL at a glance. Commercial facts only — legal documents stay off the site. */
export async function CompanyFacts({ className }: { className?: string }) {
  const t = await getTranslations("companyFacts");
  const locale = (await getLocale()) as Locale;

  const facts = [
    { label: t("company"), value: SITE.name },
    { label: t("brand"), value: SITE.shortName },
    { label: t("legalForm"), value: SITE.company.legalForm[locale] },
    { label: t("founder"), value: SITE.founder },
    { label: t("headquarters"), value: SITE.city },
  ];

  return (
    <dl className={cn("border-t border-grey-200", className)}>
      {facts.map((fact) => (
        <div key={fact.label} className="grid gap-1 border-b border-grey-200 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
          <dt className="text-sm text-grey-500">{fact.label}</dt>
          <dd className="font-medium tracking-tight">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
