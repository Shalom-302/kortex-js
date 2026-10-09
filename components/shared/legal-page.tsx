import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/constants";

type LegalPageProps = {
  namespace: "legal" | "privacy";
  sections: readonly string[];
};

/** Plain long-form page for legal texts. Copy lives in messages under `<namespace>.sections`. */
export async function LegalPage({ namespace, sections }: LegalPageProps) {
  const t = await getTranslations(namespace);
  // Section keys differ per namespace; they are checked by the callers' const arrays.
  const section = (key: string, field: "title" | "body") =>
    (t as unknown as (k: string, v?: Record<string, string>) => string)(`sections.${key}.${field}`, {
      email: SITE.email,
    });

  return (
    <article className="container-page pt-36 pb-24 md:pt-48 md:pb-36">
      <h1 className="text-headline font-medium">{t("title")}</h1>
      <p className="mt-6 max-w-2xl rounded-card border border-dashed border-grey-300 p-4 text-sm text-grey-600">
        {t("notice")}
      </p>
      <div className="mt-16 flex max-w-3xl flex-col gap-12">
        {sections.map((key) => (
          <section key={key} className="grid gap-4 md:grid-cols-[14rem_1fr]">
            <h2 className="font-medium tracking-tight">{section(key, "title")}</h2>
            <p className="leading-relaxed whitespace-pre-line text-grey-700">{section(key, "body")}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
