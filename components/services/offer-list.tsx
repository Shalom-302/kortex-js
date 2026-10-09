import type { Locale } from "@/i18n/routing";
import { formatPrice, type Offer } from "@/data/services";
import { cn } from "@/lib/utils";

/** Name on the left, indicative price on the right, hairline between rows. */
export function OfferList({
  offers,
  locale,
  details = false,
  className,
}: {
  offers: Offer[];
  locale: Locale;
  details?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("border-t border-grey-200", className)}>
      {offers.map((offer) => (
        <li
          key={offer.name.fr}
          className="flex flex-col gap-1 border-b border-grey-200 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <div>
            <p className="font-medium tracking-tight">{offer.name[locale]}</p>
            {details && offer.detail && <p className="mt-1 text-sm text-grey-500">{offer.detail[locale]}</p>}
          </div>
          <p
            className={cn(
              "shrink-0 text-sm tabular-nums sm:text-right",
              offer.price.kind === "quote" ? "text-grey-500" : "text-ink",
            )}
          >
            {formatPrice(offer.price, locale)}
          </p>
        </li>
      ))}
    </ul>
  );
}
