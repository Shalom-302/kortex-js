import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "@/i18n/routing";
import { IMAGES, type ImageKey } from "./images";

/**
 * Articles live in content/insights/<locale>/<slug>.mdx.
 * Use the same slug in both locales for the language switch to land on the translation.
 * `draft: true` articles are only listed in development.
 */
const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.iso.date(),
  tags: z.array(z.string()).default([]),
  cover: z.enum(Object.keys(IMAGES) as [ImageKey, ...ImageKey[]]).optional(),
  draft: z.boolean().default(false),
});

export type InsightMeta = z.infer<typeof frontmatterSchema> & {
  slug: string;
  readingMinutes: number;
};

export type Insight = InsightMeta & { content: string };

const showDrafts = process.env.NODE_ENV !== "production";

async function readInsight(locale: Locale, slug: string): Promise<Insight | null> {
  const file = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${z.prettifyError(parsed.error)}`);
  }

  const words = content.trim().split(/\s+/).length;
  return { ...parsed.data, slug, content, readingMinutes: Math.max(1, Math.round(words / 200)) };
}

export async function getInsights(locale: Locale): Promise<InsightMeta[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(path.join(CONTENT_DIR, locale));
  } catch {
    return [];
  }

  const insights = await Promise.all(
    files.filter((f) => f.endsWith(".mdx")).map((f) => readInsight(locale, f.replace(/\.mdx$/, ""))),
  );

  return insights
    .filter((i): i is Insight => i !== null && (showDrafts || !i.draft))
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getInsight(locale: Locale, slug: string) {
  const insight = await readInsight(locale, slug);
  if (!insight || (insight.draft && !showDrafts)) return null;
  return insight;
}
