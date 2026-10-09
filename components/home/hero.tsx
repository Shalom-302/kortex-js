import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SplitText } from "@/components/shared/split-text";
import { HeroParallax } from "./hero-parallax";
import { HeroWordmark } from "./hero-wordmark";
import { HeroScene } from "./hero-scene";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");

  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {/* three.js particle K */}
      <HeroScene className="pointer-events-none absolute inset-0 -z-10" />
      {/* Very soft light from the top-left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -left-1/4 -z-10 size-[60rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.06),transparent)]"
      />

      <HeroParallax className="container-page flex min-h-[100svh] flex-col pt-28 pb-10 md:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <Reveal>
            <p className="eyebrow text-grey-500">
              KORTEX DIGITAL <span className="mx-2 text-grey-700">/</span> {t("eyebrow")}
            </p>
          </Reveal>
          <h1 className="mt-8">
            <HeroWordmark className="h-[clamp(4.5rem,13vw,10.5rem)] w-auto max-w-full" />
            <SplitText
              immediate
              delay={0.35}
              text={t("title")}
              className="mt-8 block max-w-3xl text-headline font-medium text-balance text-grey-300 md:mt-10"
            />
          </h1>
          <Reveal delay={0.7}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-grey-400 md:text-xl">
              {t("subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.85} className="mt-12 flex flex-wrap items-center gap-3">
            <ButtonLink href="/universes" size="lg" variant="inverted" arrow>
              {t("primary")}
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline-inverted">
              {tc("contactUs")}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={1} className="mt-16 flex items-end justify-between gap-6 border-t border-grey-800 pt-6">
          <p className="eyebrow text-grey-400">{tc("signature")}</p>
          <p aria-hidden className="eyebrow hidden items-center gap-3 text-grey-600 sm:flex">
            {t("scroll")}
            <span className="relative block h-8 w-px overflow-hidden bg-grey-800">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-paper" />
            </span>
          </p>
        </Reveal>
      </HeroParallax>
    </section>
  );
}
