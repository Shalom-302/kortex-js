import Image from "next/image";
import { IMAGES, type ImageKey } from "@/data/images";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type MediaProps = {
  image: ImageKey;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  aspect?: string;
};

/** Monochrome photo in a fixed-ratio frame, with a subtle zoom on hover of a parent `group`. */
export function Media({ image, locale, sizes, priority, className, aspect = "aspect-[4/3]" }: MediaProps) {
  const { src, alt } = IMAGES[image];

  return (
    <div className={cn("relative overflow-hidden rounded-card bg-grey-100", aspect, className)}>
      <Image
        src={src}
        alt={alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover grayscale transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.03]"
      />
    </div>
  );
}
