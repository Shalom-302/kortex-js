import { cn } from "@/lib/utils";

type PlaceholderProps = {
  label: string;
  className?: string;
  tone?: "light" | "dark";
};

/** Quiet stand-in when no real visual exists yet: fine grid + label. */
export function Placeholder({ label, className, tone = "light" }: PlaceholderProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "relative flex items-end overflow-hidden rounded-card p-5",
        dark ? "bg-grey-900 text-grey-500" : "bg-grey-100 text-grey-500",
        className,
      )}
    >
      <svg aria-hidden className="absolute inset-0 size-full" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${tone}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M32 0H0V32"
              fill="none"
              stroke={dark ? "#262626" : "#e6e6e6"}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${tone})`} />
      </svg>
      <span className="eyebrow relative">{label}</span>
    </div>
  );
}
