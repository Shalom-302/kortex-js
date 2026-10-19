import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { COMMUNITY_URL, SITE } from "@/lib/constants";
import { staticPageMetadata } from "@/lib/seo";
import { buttonClasses } from "@/components/ui/button";
import { Media } from "@/components/shared/media";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { JobCard } from "@/components/careers/job-card";
import { ArrowUpRight } from "lucide-react";

const LOOKING = ["craft", "curiosity", "ownership", "sharing"] as const;
const JOB_TAGS = ["type", "place", "stack"] as const;
const JOB_MISSION = ["features", "review", "docs", "help"] as const;
const JOB_PROFILE = ["python", "tools", "plus", "mindset"] as const;
const JOB_OFFER = ["real", "mentoring", "community"] as const;

const SHAAPI_REPO = "https://github.com/Shalom-302/shaapi";
const SHAAPI_DOCS = "https://shalom-302.github.io/shaapi/";

export function generateMetadata({ params }: PageProps<"/[locale]/careers">) {
  return staticPageMetadata(params, "careers");
}

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("careers");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />

      <div className="container-page">
        <Reveal>
          <Media image="architecture" locale={locale} priority aspect="aspect-[4/3] md:aspect-[21/9]" sizes="(min-width: 1280px) 1200px, 100vw" />
        </Reveal>
      </div>

      <Section id="postes">
        <Reveal className="flex items-end justify-between gap-6 border-b border-grey-200 pb-6">
          <h2 className="eyebrow text-grey-500">{t("openingsTitle")}</h2>
          <p className="text-sm text-grey-600">{t("noOpenings")}</p>
        </Reveal>

        <Reveal className="mt-10">
          <JobCard
            title={t("job.title")}
            summary={t("job.summary")}
            tags={JOB_TAGS.map((key) => t(`job.tags.${key}`))}
            groups={[
              { title: t("job.missionTitle"), items: JOB_MISSION.map((key) => t(`job.mission.${key}`)) },
              { title: t("job.profileTitle"), items: JOB_PROFILE.map((key) => t(`job.profile.${key}`)) },
              { title: t("job.offerTitle"), items: JOB_OFFER.map((key) => t(`job.offer.${key}`)) },
            ]}
            actions={
              <>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(t("job.subject"))}`}
                  data-magnetic
                  className={buttonClasses({ variant: "inverted", size: "lg", className: "gap-2" })}
                >
                  {t("job.apply")}
                  <ArrowUpRight aria-hidden className="size-4" />
                </a>
                <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: "outline-inverted", size: "lg" })}>
                  {t("community")}
                </a>
                <a href={SHAAPI_REPO} target="_blank" rel="noopener noreferrer" className="px-2 text-sm text-grey-300 underline-offset-4 hover:text-paper hover:underline">
                  {t("job.repo")}
                </a>
                <a href={SHAAPI_DOCS} target="_blank" rel="noopener noreferrer" className="px-2 text-sm text-grey-300 underline-offset-4 hover:text-paper hover:underline">
                  {t("job.docs")}
                </a>
              </>
            }
          />
        </Reveal>
      </Section>

      <Section className="border-t border-grey-200">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="eyebrow text-grey-500">{t("lookingTitle")}</h2>
            <ul className="mt-6">
              {LOOKING.map((key) => (
                <li key={key} className="border-b border-grey-200 py-4 text-xl tracking-tight">
                  {t(`looking.${key}`)}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <div data-dark className="rounded-card bg-ink p-8 text-paper md:p-10">
              <h3 className="text-title font-medium">{t("spontaneous")}</h3>
              <p className="mt-3 text-grey-400">{t("spontaneousText")}</p>
              <a
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className={buttonClasses({ variant: "inverted", className: "mt-8 gap-2" })}
              >
                {t("community")}
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
              <p className="mt-6 text-sm text-grey-400">
                {t("orEmail")}{" "}
                <a href={`mailto:${SITE.email}`} className="text-paper underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
