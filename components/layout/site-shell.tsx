import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Footer } from "./footer";
import { Header } from "./header";

export async function SiteShell({ children }: { children: ReactNode }) {
  const t = await getTranslations("common");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
