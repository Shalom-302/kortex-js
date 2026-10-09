import { Wordmark } from "@/components/brand/wordmark";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** The KORTEX logo: the circuit wordmark, linking home. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="KORTEX" className={cn("flex items-center", className)}>
      <Wordmark className="h-10 w-auto md:h-11" />
    </Link>
  );
}
