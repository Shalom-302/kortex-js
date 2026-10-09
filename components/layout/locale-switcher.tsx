"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS = { fr: "Français", en: "English" } as const;

/** FR / EN toggle. Plain links, so it keeps the current page and works without JS. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common");
  const active = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={cn("flex items-center gap-1 font-mono text-xs", className)}>
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="opacity-30">/</span>}
          <Link
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-current={locale === active ? "true" : undefined}
            aria-label={t("switchTo", { language: LABELS[locale] })}
            className={cn(
              "uppercase transition-opacity duration-200",
              locale === active ? "opacity-100" : "opacity-40 hover:opacity-100",
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </nav>
  );
}
