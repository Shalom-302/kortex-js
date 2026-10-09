import { cn } from "@/lib/utils";

/** "Univers actif" (solid dot) or "En développement" (hollow dot, dashed border). */
export function StatusBadge({
  status,
  children,
  className,
}: {
  status: "active" | "development";
  children: React.ReactNode;
  className?: string;
}) {
  const active = status === "active";

  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.65rem] whitespace-nowrap",
        active ? "border-current/25" : "border-dashed border-current/30",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", active ? "bg-current" : "border border-current")}
      />
      {children}
    </span>
  );
}
