import type { Locale } from "@/i18n/routing";
import type { Offer } from "@/data/services";
import { cn } from "@/lib/utils";

/** Offer names with optional detail, hairline between rows. Every offer is quoted on request. */
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
        <li key={offer.name.fr} className="border-b border-grey-200 py-4">
          <p className="font-medium tracking-tight">{offer.name[locale]}</p>
          {details && offer.detail && <p className="mt-1 text-sm text-grey-500">{offer.detail[locale]}</p>}
        </li>
      ))}
    </ul>
  );
}
