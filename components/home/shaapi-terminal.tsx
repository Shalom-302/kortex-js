"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

const LINES: { text: string; kind: "cmd" | "out" | "ok" }[] = [
  { text: "pip install shaapi", kind: "cmd" },
  { text: "Successfully installed shaapi-0.3.2", kind: "out" },
  { text: 'shaapi new "my api"', kind: "cmd" },
  { text: "✓ Project created in ./my_api", kind: "ok" },
  { text: "cd my_api && shaapi up", kind: "cmd" },
  { text: "✓ postgres   ✓ redis   ✓ api", kind: "ok" },
  { text: "→ API ready on http://localhost:8000/docs", kind: "ok" },
];

/** shaapi's quick start, typed out in a terminal each time it scrolls into view. */
export function ShaapiTerminal({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-term=row]", root.current);
        const texts = gsap.utils.toArray<HTMLElement>("[data-term=text]", root.current);
        const reset = () => {
          gsap.set(rows, { autoAlpha: 0 });
          gsap.set(texts, { text: "" });
        };
        reset();

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3, paused: true, onRepeat: reset });
        rows.forEach((row, i) => {
          const { text, kind } = LINES[i];
          tl.set(row, { autoAlpha: 1 }, kind === "cmd" ? "+=0.4" : "+=0.3");
          tl.to(texts[i], kind === "cmd" ? { text, duration: text.length * 0.035, ease: "none" } : { text, duration: 0 });
        });

        // Only type while the terminal is on screen.
        const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? tl.play() : tl.pause()));
        io.observe(root.current!);
        return () => io.disconnect();
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      <p className="sr-only">pip install shaapi, shaapi new, shaapi up : une API FastAPI prête en moins d’une minute.</p>
      <div aria-hidden className="flex h-full flex-col overflow-hidden rounded-[0.5rem] border border-grey-800 bg-ink font-mono text-xs leading-relaxed sm:text-[0.8125rem] md:text-sm">
        <div className="flex items-center gap-2 border-b border-grey-800 px-4 py-3">
          <span className="size-2.5 rounded-full bg-grey-700" />
          <span className="size-2.5 rounded-full bg-grey-700" />
          <span className="size-2.5 rounded-full bg-grey-700" />
          <span className="ml-3 text-xs text-grey-400">~/projects</span>
        </div>
        <div className="flex-1 space-y-1.5 p-4 break-words sm:p-5 md:p-6">
          {LINES.map((line, i) => (
            <p key={i} data-term="row" className={line.kind === "cmd" ? "text-paper" : line.kind === "ok" ? "text-grey-200" : "text-grey-400"}>
              {line.kind === "cmd" && <span className="mr-2 text-grey-500">$</span>}
              <span data-term="text">{line.text}</span>
              {i === LINES.length - 1 && <span className="ml-1 inline-block h-[1.1em] w-2 translate-y-[0.2em] animate-pulse bg-paper" />}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
