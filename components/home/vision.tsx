import { getTranslations } from "next-intl/server";
import { CORE_UNIVERSES, EXPANSION_UNIVERSES } from "@/data/universes";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SplitText } from "@/components/shared/split-text";
import { VisionOrbit } from "./vision-orbit";

export async function Vision() {
  const t = await getTranslations("home.vision");

  return (
    <Section tone="dark" className="overflow-hidden">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-grey-500">{t("eyebrow")}</p>
            <h2 className="mt-6 text-headline font-medium text-balance">
              <SplitText text={t("title")} />
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 text-lg leading-relaxed text-pretty text-grey-400">{t("text")}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-10 border-l border-grey-700 pl-5 text-pretty text-grey-300">{t("ambition")}</p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <VisionOrbit
            core={CORE_UNIVERSES.map((u) => u.name)}
            expansion={EXPANSION_UNIVERSES.map((u) => u.name)}
            className="mx-auto w-full max-w-[40rem] text-paper"
          />
          <p className="sr-only">{t("diagramLabel")}</p>
        </div>
      </div>
    </Section>
  );
}
