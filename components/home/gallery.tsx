import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { IMAGES, type ImageKey } from "@/data/images";
import type { VideoKey } from "@/data/videos";
import { decode } from "@/components/motion/decode";
import { brand } from "@/components/brand/brand-name";
import { LoopVideo } from "@/components/shared/loop-video";
import { cn } from "@/lib/utils";
import { GalleryTrack } from "./gallery-track";

type PanelKey = "circuits" | "design" | "labs" | "training" | "infra" | "code" | "city";
type Panel = { key: PanelKey; video?: VideoKey; image?: ImageKey; wide?: boolean };

const PANELS: Panel[] = [
  { key: "circuits", video: "circuit" },
  { key: "design", image: "design", wide: true },
  { key: "labs", image: "ai" },
  { key: "training", video: "network", wide: true },
  { key: "infra", video: "dataCenter" },
  { key: "code", video: "code", wide: true },
  { key: "city", image: "city" },
];

/** Real footage and photos of the KORTEX world, on a horizontal film strip. */
export async function Gallery() {
  const t = await getTranslations("home.gallery");
  const locale = await getLocale();

  const header = (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow text-grey-300">{decode(t("eyebrow"))}</p>
        <h2 className="mt-5 text-headline font-semibold text-balance">{t("title")}</h2>
      </div>
      <p className="max-w-sm leading-relaxed text-grey-300">
        {brand(t("text"))}
        <span aria-hidden className="eyebrow mt-3 hidden items-center gap-3 text-grey-400 md:flex">
          {t("hint")} <span className="inline-block h-px w-10 bg-grey-500" />
        </span>
      </p>
    </div>
  );

  return (
    <GalleryTrack header={header}>
      {PANELS.map((panel, i) => (
        <li
          key={panel.key}
          className={cn("relative w-[82vw] shrink-0 snap-start", panel.wide ? "md:w-[min(52vw,46rem)]" : "md:w-[min(34vw,30rem)]")}
        >
          <div data-spotlight className="spotlight relative aspect-[4/5] overflow-hidden rounded-card bg-grey-900 md:aspect-auto md:h-[58svh]">
            {/* Oversized so the parallax drift never shows an edge. */}
            <div data-gallery="media" className="absolute inset-y-0 -inset-x-[14%]">
              {panel.video ? (
                <LoopVideo video={panel.video} />
              ) : (
                <Image
                  src={IMAGES[panel.image!].src}
                  alt={IMAGES[panel.image!].alt[locale]}
                  fill
                  sizes="(min-width: 48rem) 50vw, 82vw"
                  className="object-cover grayscale"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.85),transparent_55%)]" />
            <span className="absolute top-4 left-4 font-mono text-xs tracking-[0.12em] text-grey-200">
              {String(i + 1).padStart(2, "0")} / {String(PANELS.length).padStart(2, "0")}
            </span>
            <div data-gallery="caption" className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="eyebrow text-grey-300">{brand(t(`items.${panel.key}.label`))}</p>
              <h3 className="mt-2 text-title font-semibold">{t(`items.${panel.key}.title`)}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-grey-200">{t(`items.${panel.key}.text`)}</p>
            </div>
          </div>
        </li>
      ))}
    </GalleryTrack>
  );
}
