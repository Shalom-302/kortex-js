"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/button";
import { CORE_UNIVERSES } from "@/data/universes";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";
import { NAV_ITEMS } from "./nav-items";
import { BrandName, brand } from "@/components/brand/brand-name";

// Pages whose first screen is black: the header starts inverted there.
const DARK_TOP = new Set(["/"]);

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const dark = open || (DARK_TOP.has(pathname) && !scrolled);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-300",
        dark
          ? "border-transparent bg-ink text-paper"
          : scrolled
            ? "border-grey-200 bg-paper/85 text-ink backdrop-blur-md"
            : "border-transparent bg-paper text-ink",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-18">
        <Logo />

        <nav aria-label={t("primary")} className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 transition-opacity duration-200",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out-soft",
                    "hover:after:scale-x-100",
                    isActive(item.href) ? "opacity-100 after:scale-x-100" : "opacity-60 hover:opacity-100",
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher />
          <ButtonLink href="/contact" variant={dark ? "inverted" : "primary"}>
            {t("contact")}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5" aria-hidden>
            <span
              className={cn(
                "absolute left-0 h-px w-5 bg-current transition-transform duration-300 ease-out-soft",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-5 bg-current transition-transform duration-300 ease-out-soft",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-ink text-paper md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label={t("primary")} className="container-page flex min-h-full flex-col pt-10 pb-10">
              <ul className="flex flex-col gap-1">
                {[...NAV_ITEMS, { href: "/contact", key: "contact" } as const].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="block py-2 text-4xl font-medium tracking-tight"
                    >
                      {t(item.key)}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-12 border-t border-grey-800 pt-6">
                <p className="eyebrow text-grey-500">{brand(t("universesMenu"))}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-grey-400">
                  {CORE_UNIVERSES.map((u) => (
                    <li key={u.slug}>
                      <Link href={`/universes#${u.slug}`} className="hover:text-paper">
                        <BrandName /> {u.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex items-center justify-between gap-6 pt-12">
                <LocaleSwitcher className="text-sm" />
                <ButtonLink href="/contact" variant="inverted" arrow>
                  {tc("startProject")}
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
