import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { KAtom } from "@/components/brand/k-atom";
import { CORE_UNIVERSES } from "@/data/universes";
import { PHONE_URL, SITE, WHATSAPP_URL } from "@/lib/constants";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";

const linkClass = "text-grey-400 transition-colors duration-200 hover:text-paper";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const pages = [
    { href: "/", label: nav("home") },
    { href: "/universes", label: nav("universes") },
    { href: "/services", label: nav("services") },
    { href: "/about", label: nav("about") },
    { href: "/kortexisme", label: nav("kortexisme") },
    { href: "/insights", label: nav("insights") },
    { href: "/careers", label: nav("careers") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-grey-800 bg-ink text-paper">
      <KAtom className="pointer-events-none absolute -right-28 -bottom-32 -z-10 size-[30rem] text-grey-900 md:-right-16 md:size-[42rem]" />

      <div className="container-page grid gap-14 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-grey-400">{t("tagline")}</p>
          <p className="eyebrow mt-6 text-grey-500">{t("signature")}</p>
          <LocaleSwitcher className="mt-8 text-sm" />
        </div>

        <FooterColumn title={t("universes")} className="md:col-span-3">
          {CORE_UNIVERSES.map((u) => (
            <li key={u.slug}>
              <Link href={`/universes#${u.slug}`} className={linkClass}>
                KORTEX {u.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/universes#expansion" className={linkClass}>
              {t("expansion")}
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title={t("pages")} className="md:col-span-2">
          {pages.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t("contact")} className="md:col-span-3">
          <li>
            <a href={PHONE_URL} className={linkClass}>
              {SITE.phone.display}
            </a>
            <span className="text-grey-600"> · </span>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              WhatsApp
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} className={`${linkClass} break-all`}>
              {SITE.email}
            </a>
          </li>
          <li className="text-grey-400">{SITE.city}</li>
        </FooterColumn>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-grey-800 py-8 text-xs text-grey-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {SITE.name}. {t("rights")}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/legal" className="hover:text-paper">
            {t("legal")}
          </Link>
          <Link href="/privacy" className="hover:text-paper">
            {t("privacy")}
          </Link>
          <span>{t("photoCredits")}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="eyebrow text-grey-500">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}
