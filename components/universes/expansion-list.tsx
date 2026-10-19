import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { EXPANSION_UNIVERSES, UNIVERSE_FAMILIES } from "@/data/universes";
import { KMark } from "@/components/brand/k-mark";
import { Reveal } from "@/components/shared/reveal";
import { decode } from "@/components/motion/decode";
import { ExpansionGrid } from "./expansion-grid";

/**
 * Universes in development, grouped by family, as "modules under construction": dashed
 * outline, a scanning build bar, no links — nothing here should look already operational.
 */
export async function ExpansionList({ locale }: { locale: Locale }) {
  const t = await getTranslations("universes");

  return (
    <div className="space-y-14">
      {UNIVERSE_FAMILIES.map((family) => {
        const items = EXPANSION_UNIVERSES.filter((u) => u.family === family);
        return (
          <div key={family}>
            <Reveal className="flex items-center gap-4">
              <h4 className="eyebrow shrink-0 text-grey-500">{decode(t(`families.${family}`))}</h4>
              <span aria-hidden className="h-px flex-1 bg-grey-200" />
              <span className="font-mono text-xs text-grey-500">{String(items.length).padStart(2, "0")}</span>
            </Reveal>
            <ExpansionGrid className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((u) => (
                <li key={u.slug} id={u.slug} data-exp="card" className="scroll-mt-28">
                  <div
                    data-spotlight
                    className="spotlight group flex h-full flex-col rounded-card border border-dashed border-grey-300 bg-paper p-5 transition-[border-color,transform] duration-500 ease-out-soft hover:-translate-y-1 hover:border-solid hover:border-ink"
                  >
                    <div className="flex items-center justify-between">
                      <KMark className="size-5 text-grey-300 transition-colors duration-500 group-hover:text-ink" />
                      <span aria-hidden className="font-mono text-[0.6875rem] text-grey-500">
                        {u.slug.toUpperCase().slice(0, 3)}
                      </span>
                    </div>
                    <p className="mt-8 text-xl font-semibold tracking-[-0.02em]">
                      <span className="sr-only">KORTEX </span>
                      <span data-exp="name">{u.name}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-grey-600">{u.summary[locale]}</p>
                    <div className="mt-auto pt-6">
                      <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-grey-500 uppercase">
                        {t("status.development")}
                      </p>
                      <span aria-hidden className="build-bar mt-2 block h-0.5 overflow-hidden rounded-full bg-grey-200" />
                    </div>
                  </div>
                </li>
              ))}
            </ExpansionGrid>
          </div>
        );
      })}
    </div>
  );
}
