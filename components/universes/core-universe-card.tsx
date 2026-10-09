import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Universe } from "@/data/universes";
import { KMark } from "@/components/brand/k-mark";
import { StatusBadge } from "./status-badge";

type CoreUniverseCardProps = {
  universe: Universe;
  index: number;
  locale: Locale;
  href: string;
  statusLabel: string;
  linkLabel: string;
};

/** Large monochrome card for an operational universe. Inverts to black on hover/focus. */
export function CoreUniverseCard({ universe, index, locale, href, statusLabel, linkLabel }: CoreUniverseCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-card border border-grey-200 bg-paper p-7 transition-colors duration-500 ease-out-soft hover:border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper md:p-8"
    >
      <KMark className="pointer-events-none absolute -right-10 -bottom-10 size-56 text-grey-100 transition-[color,transform] duration-700 ease-out-soft group-hover:-rotate-6 group-hover:text-grey-900" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-grey-400">{String(index + 1).padStart(2, "0")}</span>
        <StatusBadge status="active" className="text-grey-600 group-hover:text-grey-300">
          {statusLabel}
        </StatusBadge>
      </div>

      <div className="relative mt-auto pt-20">
        <p className="eyebrow text-grey-400">KORTEX</p>
        <h3 className="mt-2 text-[clamp(2.25rem,4.2vw,3.5rem)] leading-none font-semibold tracking-[-0.04em]">
          {universe.name}
        </h3>
        <p className="mt-5 max-w-xs leading-relaxed text-grey-600 transition-colors duration-500 group-hover:text-grey-400">
          {universe.summary[locale]}
        </p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
          {linkLabel}
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
