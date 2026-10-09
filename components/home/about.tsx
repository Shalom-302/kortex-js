import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { CompanyFacts } from "@/components/shared/company-facts";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

export async function About() {
  const t = await getTranslations("home.about");

  return (
    <Section className="border-t border-grey-200">
      <div className="grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-grey-500">{t("eyebrow")}</p>
          <h2 className="mt-6 text-headline font-medium text-balance">{t("title")}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-pretty text-grey-600">{t("text")}</p>
          <ButtonLink href="/about" variant="secondary" arrow className="mt-10">
            {t("cta")}
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:pt-3">
          <CompanyFacts />
        </Reveal>
      </div>
    </Section>
  );
}
