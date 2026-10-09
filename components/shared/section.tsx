import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section"> & {
  tone?: "light" | "dark" | "muted";
  spacing?: "default" | "tight";
};

/** Full-bleed band with the page container inside. Dark tone = narrative break. */
export function Section({
  tone = "light",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        tone === "dark" && "bg-ink text-paper",
        tone === "muted" && "bg-grey-50",
        spacing === "default" ? "py-24 md:py-36" : "py-16 md:py-24",
        className,
      )}
      {...props}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
