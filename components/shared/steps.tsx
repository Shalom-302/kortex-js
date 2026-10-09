import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type Step = { title: string; text: string };

/** Numbered horizontal sequence (stacks on mobile). */
export function Steps({ steps, tone = "light" }: { steps: Step[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";

  return (
    <ol className={cn("grid border-t sm:grid-cols-2 lg:grid-cols-5", dark ? "border-grey-800" : "border-grey-200")}>
      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.title}
          delay={i * 0.06}
          className={cn(
            "border-b py-8 sm:pr-8 lg:border-b-0 lg:py-10",
            dark ? "border-grey-800" : "border-grey-200",
            i > 0 && (dark ? "lg:border-l lg:border-grey-800 lg:pl-6" : "lg:border-l lg:border-grey-200 lg:pl-6"),
          )}
        >
          <span className={cn("font-mono text-xs", dark ? "text-grey-500" : "text-grey-400")}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-6 text-xl font-medium tracking-tight">{step.title}</h3>
          <p className={cn("mt-3 text-sm leading-relaxed", dark ? "text-grey-400" : "text-grey-600")}>{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
