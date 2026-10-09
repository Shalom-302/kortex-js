import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SERVICE_GROUPS } from "@/data/services";
import { getUniverse } from "@/data/universes";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { OfferList } from "@/components/services/offer-list";

export async function Services() {
  const t = await getTranslations("home.services");
  const ts = await getTranslations("services");
  const locale = await getLocale();

  return (
    <Section tone="muted" id="services">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />

      <ul className="mt-16 grid gap-4 md:mt-24 lg:grid-cols-3">
        {SERVICE_GROUPS.map((group, i) => {
          const universe = getUniverse(group.universe)!;
          return (
            <Reveal
              as="li"
              key={group.universe}
              delay={i * 0.08}
              className="flex flex-col rounded-card border border-grey-200 bg-paper p-7 transition-colors duration-500 hover:border-grey-400 md:p-8"
            >
              <p className="eyebrow text-grey-400">KORTEX</p>
              <h3 className="mt-1 text-title font-semibold tracking-[-0.02em]">{universe.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-grey-500">{universe.summary[locale]}</p>
              <OfferList offers={group.offers.filter((o) => o.featured)} locale={locale} className="mt-8" />
              <Link
                href={`/services#${group.universe}`}
                className="mt-auto pt-8 text-sm text-grey-600 underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {ts("seeDetails")}
              </Link>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-sm text-grey-500">{ts("quoteNote")}</p>
        <ButtonLink href="/services" variant="secondary" arrow>
          {t("cta")}
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
