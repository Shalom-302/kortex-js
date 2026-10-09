import type { Localized } from "./utils";

export const SITE = {
  name: "KORTEX DIGITAL",
  shortName: "KORTEX",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kortex.digital",
  email: "shalomtehe219@gmail.com",
  phone: {
    display: "07 12 11 62 58",
    // Côte d’Ivoire (+225), 10-digit national number.
    e164: "+2250712116258",
  },
  city: "Abidjan, Côte d’Ivoire",
  founder: "Shalom Tehe",
  company: {
    legalForm: { fr: "SARL Unipersonnelle", en: "Single-member limited company (SARL-U)" },
    address: "Cocody, Angré Extension Château – Latrille-Bessikoi, Abidjan, Côte d’Ivoire",
  },
  // No official social accounts yet — add them here once they exist, never before.
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.phone.e164.replace("+", "")}`;
export const PHONE_URL = `tel:${SITE.phone.e164}`;

export const NEED_TYPES = ["design", "ai", "training", "other"] as const;

export type NeedType = (typeof NEED_TYPES)[number];

export const BUDGET_RANGES = [
  { value: "lt-250k", label: { fr: "Moins de 250 000 FCFA", en: "Under 250,000 FCFA" } },
  { value: "250k-1m", label: { fr: "250 000 – 1 M FCFA", en: "250,000 – 1M FCFA" } },
  { value: "1m-5m", label: { fr: "1 – 5 M FCFA", en: "1 – 5M FCFA" } },
  { value: "gt-5m", label: { fr: "Plus de 5 M FCFA", en: "Over 5M FCFA" } },
  { value: "tbd", label: { fr: "À définir", en: "To be defined" } },
] as const satisfies readonly { value: string; label: Localized }[];

export const TIMELINES = [
  { value: "urgent", label: { fr: "Urgent (< 1 mois)", en: "Urgent (< 1 month)" } },
  { value: "1-3m", label: { fr: "1 – 3 mois", en: "1 – 3 months" } },
  { value: "3-6m", label: { fr: "3 – 6 mois", en: "3 – 6 months" } },
  { value: "flexible", label: { fr: "Flexible", en: "Flexible" } },
] as const satisfies readonly { value: string; label: Localized }[];

export const BUDGET_VALUES = BUDGET_RANGES.map((b) => b.value) as [
  (typeof BUDGET_RANGES)[number]["value"],
  ...(typeof BUDGET_RANGES)[number]["value"][],
];

export const TIMELINE_VALUES = TIMELINES.map((t) => t.value) as [
  (typeof TIMELINES)[number]["value"],
  ...(typeof TIMELINES)[number]["value"][],
];
