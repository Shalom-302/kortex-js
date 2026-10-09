import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
};

/** Top of every inner page: small label, large H1, short intro. */
export function PageHeader({ eyebrow, title, text, children }: PageHeaderProps) {
  return (
    <header className="container-page pt-36 pb-16 md:pt-48 md:pb-24">
      <Reveal>
        <p className="eyebrow text-grey-500">{eyebrow}</p>
        <h1 className="mt-6 max-w-5xl text-display font-medium text-balance">{title}</h1>
      </Reveal>
      {text && (
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-grey-600 text-pretty md:text-xl">
            {text}
          </p>
        </Reveal>
      )}
      {children}
    </header>
  );
}
