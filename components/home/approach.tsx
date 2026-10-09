import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SplitText } from "@/components/shared/split-text";
import { ApproachSteps } from "./approach-steps";

const STEPS = ["understand", "design", "build", "deploy", "evolve"] as const;

export async function Approach() {
  const t = await getTranslations("home.approach");

  return (
    <Section>
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal className="md:sticky md:top-32">
            <p className="eyebrow text-grey-500">{t("eyebrow")}</p>
            <h2 className="mt-6 text-headline font-medium text-balance">
              <SplitText text={t("title")} />
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-grey-600">{t("text")}</p>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <ApproachSteps steps={STEPS.map((key) => ({ title: t(`steps.${key}.title`), text: t(`steps.${key}.text`) }))} />
        </div>
      </div>
    </Section>
  );
}
