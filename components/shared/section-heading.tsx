import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SplitText } from "./split-text";
import { brand, brandChildren } from "@/components/brand/brand-name";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "light",
  as: Heading = "h2",
  className,
  children,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <Reveal className={cn("grid gap-8 md:grid-cols-12", className)}>
      <p className={cn("eyebrow md:col-span-3 md:pt-3", dark ? "text-grey-400" : "text-grey-500")}>
        {brand(eyebrow)}
      </p>
      <div className="md:col-span-9">
        <Heading
          className={cn(
            "max-w-4xl text-balance",
            Heading === "h1" ? "text-display font-medium" : "text-headline font-medium",
          )}
        >
          {typeof title === "string" ? <SplitText text={title} /> : title}
        </Heading>
        {text && (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed text-pretty",
              dark ? "text-grey-400" : "text-grey-600",
            )}
          >
            {brandChildren(text)}
          </p>
        )}
        {children}
      </div>
    </Reveal>
  );
}
