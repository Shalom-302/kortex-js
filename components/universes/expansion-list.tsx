import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { EXPANSION_UNIVERSES, UNIVERSE_FAMILIES } from "@/data/universes";
import { Reveal } from "@/components/shared/reveal";
import { StatusBadge } from "./status-badge";

/**
 * Universes in development, grouped by family. Deliberately quieter than the core cards:
 * smaller type, grey text, no links — nothing here should look already operational.
 */
export async function ExpansionList({ locale }: { locale: Locale }) {
  const t = await getTranslations("universes");

  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-10">
      {UNIVERSE_FAMILIES.map((family, f) => (
        <Reveal key={family} delay={f * 0.08}>
          <h4 className="eyebrow text-grey-400">{t(`families.${family}`)}</h4>
          <ul className="mt-4 border-t border-grey-200">
            {EXPANSION_UNIVERSES.filter((u) => u.family === family).map((u) => (
              <li
                key={u.slug}
                id={u.slug}
                className="group grid scroll-mt-28 gap-1 border-b border-grey-200 py-4 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <p className="text-sm font-medium tracking-[0.06em] text-grey-700">
                  <span className="text-grey-400">KORTEX </span>
                  {u.name}
                </p>
                <p className="text-sm text-grey-500">{u.summary[locale]}</p>
                <StatusBadge status="development" className="mt-2 justify-self-start text-grey-400 sm:mt-0">
                  {t("status.development")}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
