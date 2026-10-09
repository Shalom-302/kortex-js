import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { KMark } from "@/components/brand/k-mark";
import { PHONE_URL, SITE, WHATSAPP_URL } from "@/lib/constants";
import { Reveal } from "./reveal";
import { SplitText } from "./split-text";
import { brand } from "@/components/brand/brand-name";

const linkClass = "underline-offset-4 decoration-grey-600 transition-colors hover:underline hover:decoration-paper";

/** Closing "Construisons quelque chose." section, reused at the bottom of most pages. */
export async function CtaBand() {
  const t = await getTranslations("contactBand");
  const tc = await getTranslations("common");

  const items = [
    {
      label: t("person"),
      content: (
        <>
          <span className="block">{SITE.founder}</span>
          <span className="block text-grey-500">{brand(t("role"))}</span>
        </>
      ),
    },
    {
      label: t("phone"),
      content: (
        <>
          <a href={PHONE_URL} className={`${linkClass} block`}>
            {SITE.phone.display}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} block text-grey-500`}>
            {t("whatsapp")}
          </a>
        </>
      ),
    },
    {
      label: t("email"),
      content: (
        <a href={`mailto:${SITE.email}`} className={`${linkClass} break-all`}>
          {SITE.email}
        </a>
      ),
    },
    { label: t("location"), content: SITE.city },
  ];

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="container-page py-28 md:py-44">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-grey-500">
            <KMark className="size-4" />
            {t("eyebrow")}
          </p>
        </Reveal>
        <h2 className="mt-10 text-[clamp(3.25rem,11.5vw,10.5rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance">
          <SplitText text={t("title")} delay={0.05} />
        </h2>

        <Reveal delay={0.12} className="mt-14 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-grey-400">{t("text")}</p>
          <ButtonLink href="/contact" variant="inverted" size="lg" arrow>
            {tc("startProject")}
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.18}>
          <dl className="mt-20 grid gap-px overflow-hidden rounded-card border border-grey-800 bg-grey-800 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.label} className="bg-ink p-6 md:p-8">
                <dt className="eyebrow text-grey-500">{item.label}</dt>
                <dd className="mt-4 text-lg tracking-tight">{item.content}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
