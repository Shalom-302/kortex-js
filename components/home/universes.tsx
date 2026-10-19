import { getLocale, getTranslations } from "next-intl/server";
import { CORE_UNIVERSES, EXPANSION_UNIVERSES } from "@/data/universes";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { CoreUniverseCard } from "@/components/universes/core-universe-card";
import { Link } from "@/i18n/navigation";
import { BrandName } from "@/components/brand/brand-name";
import { StatusBadge } from "@/components/universes/status-badge";

export async function Universes() {
  const t = await getTranslations("home.universes");
  const tu = await getTranslations("universes");
  const locale = await getLocale();

  return (
    <Section id="univers" className="border-t border-grey-200">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />

      <div className="mt-16 md:mt-24">
        <Reveal>
          <h3 className="eyebrow text-grey-500">{tu("coreTitle")}</h3>
        </Reveal>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {CORE_UNIVERSES.map((u, i) => (
            <Reveal as="li" key={u.slug} delay={i * 0.08}>
              <CoreUniverseCard
                universe={u}
                index={i}
                locale={locale}
                href={`/universes#${u.slug}`}
                statusLabel={tu("status.active")}
                linkLabel={tu("discover")}
              />
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="mt-24 md:mt-32">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-title font-medium text-grey-700">{tu("expansionTitle")}</h3>
          <StatusBadge status="development" className="text-grey-500">
            {tu("expansionBadge")}
          </StatusBadge>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-grey-500">{tu("expansionText")}</p>
        </Reveal>
        {/* Names only: the full modules live on /universes. */}
        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {EXPANSION_UNIVERSES.map((u) => (
              <li key={u.slug}>
                <Link
                  href={`/universes#${u.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-grey-300 px-3.5 py-1.5 text-sm font-medium tracking-[0.04em] text-grey-700 transition-colors duration-300 hover:border-solid hover:border-ink hover:text-ink"
                >
                  <BrandName /> {u.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-12">
          <ButtonLink href="/universes" variant="secondary" arrow>
            {t("cta")}
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
