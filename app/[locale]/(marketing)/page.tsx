import type { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/shared/cta-band";
import { About } from "@/components/home/about";
import { Approach } from "@/components/home/approach";
import { Hero } from "@/components/home/hero";
import { UniverseMarquee } from "@/components/home/universe-marquee";
import { UNIVERSES } from "@/data/universes";
import { Manifesto } from "@/components/home/manifesto";
import { Services } from "@/components/home/services";
import { Universes } from "@/components/home/universes";
import { Vision } from "@/components/home/vision";

// Reading order follows the brand hierarchy:
// KORTEX → an ecosystem → DESIGN / AI / TRAINING → the other universes → offers → contact.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <UniverseMarquee items={UNIVERSES.map((u) => `KORTEX ${u.name}`)} />
      <Manifesto />
      <Universes />
      <Vision />
      <Services />
      <Approach />
      <About />
      <CtaBand />
    </>
  );
}
