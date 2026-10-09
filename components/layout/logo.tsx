import { KMark } from "@/components/brand/k-mark";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** The KORTEX logo: the K symbol followed by the wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="KORTEX"
      className={cn("flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-[0.18em]", className)}
    >
      <KMark className="size-7 shrink-0" />
      <span aria-hidden>KORTEX</span>
    </Link>
  );
}
