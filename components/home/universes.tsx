import { getLocale, getTranslations } from "next-intl/server";
import { CORE_UNIVERSES } from "@/data/universes";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { CoreUniverseCard } from "@/components/universes/core-universe-card";
import { ExpansionList } from "@/components/universes/expansion-list";
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
        <div className="mt-10">
          <ExpansionList locale={locale} />
        </div>
        <Reveal className="mt-12">
          <ButtonLink href="/universes" variant="secondary" arrow>
            {t("cta")}
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
