import { K_PATH } from "@/components/brand/k-mark";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** The KORTEX logo: the circuit K stands in for the first letter of the wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="KORTEX"
      className={cn("flex items-center text-[1.05rem] leading-none font-semibold tracking-[0.18em]", className)}
    >
      {/* viewBox cropped to the mark so it sits on the letters' cap height. */}
      <svg viewBox="2 1 20 22" aria-hidden fill="currentColor" className="mr-[0.2em] h-[1.15em] w-auto shrink-0">
        <path d={K_PATH} />
      </svg>
      <span aria-hidden>ORTEX</span>
    </Link>
  );
}
