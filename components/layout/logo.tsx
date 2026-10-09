import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** The KORTEX logo: the wordmark, nothing else. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-[1.05rem] font-semibold tracking-[0.18em]", className)}>
      KORTEX
    </Link>
  );
}
