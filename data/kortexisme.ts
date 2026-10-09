import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/i18n/routing";

/** The Kortexism manifesto, one MDX file per locale in content/kortexisme/. */
export function getKortexisme(locale: Locale) {
  return fs.readFile(path.join(process.cwd(), "content", "kortexisme", `${locale}.mdx`), "utf8");
}
