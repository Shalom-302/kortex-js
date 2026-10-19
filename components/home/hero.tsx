import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SplitText } from "@/components/shared/split-text";
import { ScrambleText } from "@/components/motion/scramble-text";
import { BrandName, brand } from "@/components/brand/brand-name";
import { HeroFlight } from "./hero-flight";
import { HeroHud } from "./hero-hud";
import { HeroScene } from "./hero-scene";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");

  return (
    <HeroFlight className="relative isolate overflow-hidden bg-ink text-paper">
      {/* three.js particle K — the scroll flight dives through it */}
      <HeroScene className="pointer-events-none absolute inset-0 -z-10" />
      {/* Grid floor, scan line, corner brackets, live telemetry */}
      <div data-flight="hud" className="pointer-events-none absolute inset-0 -z-10">
        <HeroHud className="absolute inset-0" labels={{ place: t("hud.place"), time: t("hud.time"), status: t("hud.status") }} />
      </div>
      {/* Very soft light from the top-left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -left-1/4 -z-10 size-[60rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.07),transparent)]"
      />

      <div data-flight="content" className="container-page flex min-h-[100svh] flex-col pt-28 pb-10 md:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <Reveal>
            <p className="eyebrow text-grey-300">
              <BrandName /> DIGITAL <span className="mx-2 text-grey-500">/</span>{" "}
              <span className="sm:hidden">{t("eyebrowShort")}</span>
              <ScrambleText immediate delay={0.2} text={t("eyebrow")} className="max-sm:hidden" />
            </p>
          </Reveal>
          <h1 className="mt-8 max-w-4xl text-display font-semibold text-balance text-paper">
            <SplitText immediate delay={0.2} text={t("title")} />
          </h1>
          <Reveal delay={0.6}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-grey-200 md:text-xl">
              {brand(t("subtitle"))}
            </p>
          </Reveal>
          <Reveal delay={0.75} className="mt-12 flex flex-wrap items-center gap-3">
            <ButtonLink href="/universes" size="lg" variant="inverted" arrow data-magnetic>
              {brand(t("primary"))}
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline-inverted" data-magnetic>
              {tc("contactUs")}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.9} className="mt-16 flex items-end justify-between gap-6 border-t border-grey-800 pt-6">
          <p className="eyebrow text-grey-300">{tc("signature")}</p>
          <p aria-hidden className="eyebrow hidden items-center gap-3 text-grey-400 sm:flex">
            {t("scroll")}
            <span className="relative block h-8 w-px overflow-hidden bg-grey-800">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-paper" />
            </span>
          </p>
        </Reveal>
      </div>
    </HeroFlight>
  );
}
