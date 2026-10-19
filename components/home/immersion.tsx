import { getTranslations } from "next-intl/server";
import { decode } from "@/components/motion/decode";
import { brand } from "@/components/brand/brand-name";
import { ImmersionStage } from "./immersion-stage";

/** "Step into the KORTEX universe": the hero flight lands in real footage. */
export async function Immersion() {
  const t = await getTranslations("home.immersion");

  return (
    <ImmersionStage before={t("before")} after={t("after")}>
      <p className="eyebrow text-grey-300">{decode(t("eyebrow"))}</p>
      <h2 className="mt-6 max-w-4xl text-display font-semibold text-balance">{t("title")}</h2>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-grey-200 md:text-xl">{brand(t("text"))}</p>
    </ImmersionStage>
  );
}
