import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PHONE_URL, SITE, WHATSAPP_URL } from "@/lib/constants";
import { staticPageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { brand } from "@/components/brand/brand-name";

const linkClass = "underline-offset-4 hover:underline";

export function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  return staticPageMetadata(params, "contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tb = await getTranslations("contactBand");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} text={t("text")} />

      <div className="container-page grid gap-16 pb-24 md:grid-cols-12 md:pb-36">
        <Reveal className="md:col-span-7">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <aside className="rounded-card bg-ink p-8 text-paper md:sticky md:top-28">
            <h2 className="eyebrow text-grey-500">{t("directTitle")}</h2>
            <p className="mt-6 text-lg font-medium tracking-tight">{SITE.founder}</p>
            <p className="text-sm text-grey-400">{brand(tb("role"))}</p>

            <dl className="mt-8 flex flex-col gap-5 border-t border-grey-800 pt-6">
              <div>
                <dt className="eyebrow text-grey-500">{tb("phone")}</dt>
                <dd className="mt-2 text-lg tracking-tight">
                  <a href={PHONE_URL} className={linkClass}>
                    {SITE.phone.display}
                  </a>
                </dd>
                <dd className="mt-1 text-sm text-grey-400">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {tb("whatsapp")}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-grey-500">{tb("email")}</dt>
                <dd className="mt-2 break-all">
                  <a href={`mailto:${SITE.email}`} className={linkClass}>
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-grey-500">{tb("location")}</dt>
                <dd className="mt-2">{SITE.city}</dd>
              </div>
            </dl>
          </aside>
        </Reveal>
      </div>
    </>
  );
}
