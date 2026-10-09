import type { MDXComponents } from "mdx/types";
import { brandChildren } from "@/components/brand/brand-name";

/** Typography for long-form MDX articles (no typography plugin needed). */
export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 className="mt-14 mb-4 text-2xl font-medium tracking-tight md:text-3xl" {...props}>
      {brandChildren(children)}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-10 mb-3 text-xl font-medium tracking-tight" {...props}>
      {brandChildren(children)}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="my-5 text-lg leading-relaxed text-grey-800" {...props}>
      {brandChildren(children)}
    </p>
  ),
  ul: (props) => <ul className="my-5 flex list-disc flex-col gap-2 pl-6 text-lg text-grey-800 marker:text-grey-400" {...props} />,
  ol: (props) => <ol className="my-5 flex list-decimal flex-col gap-2 pl-6 text-lg text-grey-800 marker:text-grey-400" {...props} />,
  a: (props) => <a className="underline decoration-grey-300 underline-offset-4 hover:decoration-ink" {...props} />,
  blockquote: ({ children, ...props }) => (
    <blockquote className="my-8 border-l-2 border-ink pl-6 text-xl italic" {...props}>
      {brandChildren(children)}
    </blockquote>
  ),
  code: (props) => <code className="rounded bg-grey-100 px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />,
  pre: (props) => <pre className="my-6 overflow-x-auto rounded-card bg-ink p-5 text-sm text-paper [&_code]:bg-transparent [&_code]:p-0" {...props} />,
  hr: () => <hr className="my-12 border-grey-200" />,
  li: ({ children, ...props }) => <li {...props}>{brandChildren(children)}</li>,
  em: ({ children, ...props }) => <em {...props}>{brandChildren(children)}</em>,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {brandChildren(children)}
    </strong>
  ),
};
