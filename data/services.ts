import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/utils";

/** Indicative prices, in FCFA. */
export type Price =
  | { kind: "from"; amount: number }
  | { kind: "fixed"; amount: number; unit: Localized }
  | { kind: "quote" };

export type Offer = {
  name: Localized;
  detail?: Localized;
  price: Price;
  /** Shown in the condensed list on the homepage. */
  featured?: boolean;
};

export type ServiceGroup = {
  /** Slug of a core universe (see data/universes.ts). */
  universe: "design" | "ai" | "training";
  offers: Offer[];
};

const quote = { kind: "quote" } as const;

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    universe: "design",
    offers: [
      { name: { fr: "Logo", en: "Logo" }, price: { kind: "from", amount: 100_000 }, featured: true },
      {
        name: { fr: "Animation / Motion design", en: "Animation / Motion design" },
        price: { kind: "from", amount: 200_000 },
        featured: true,
      },
      { name: { fr: "Identité visuelle", en: "Visual identity" }, price: quote, featured: true },
      { name: { fr: "Supports de communication", en: "Brand collateral" }, price: quote },
      { name: { fr: "Pack branding", en: "Branding pack" }, price: quote, featured: true },
    ],
  },
  {
    universe: "ai",
    offers: [
      {
        name: { fr: "Site web professionnel", en: "Professional website" },
        price: { kind: "from", amount: 250_000 },
        featured: true,
      },
      { name: { fr: "Application web", en: "Web application" }, price: { kind: "from", amount: 500_000 }, featured: true },
      {
        name: { fr: "Application mobile", en: "Mobile application" },
        price: { kind: "from", amount: 1_000_000 },
        featured: true,
      },
      {
        name: { fr: "Solutions IA", en: "AI solutions" },
        detail: {
          fr: "Agents IA, RAG / base documentaire IA, automatisation",
          en: "AI agents, RAG / AI knowledge base, automation",
        },
        price: quote,
        featured: true,
      },
      { name: { fr: "API / intégration", en: "API / integration" }, price: quote },
      { name: { fr: "SaaS / plateforme complète", en: "SaaS / full platform" }, price: quote },
    ],
  },
  {
    universe: "training",
    offers: [
      {
        name: { fr: "Consultation IA", en: "AI consultation" },
        price: { kind: "fixed", amount: 5_000, unit: { fr: "séance de 2 h", en: "2-hour session" } },
        featured: true,
      },
      {
        name: { fr: "Formations", en: "Training courses" },
        detail: {
          fr: "Python, développement web / backend, IA / GenAI",
          en: "Python, web / backend development, AI / GenAI",
        },
        price: quote,
        featured: true,
      },
      {
        name: { fr: "Accompagnement", en: "Mentoring" },
        detail: { fr: "Accompagnement de projet et mentorat", en: "Project support and mentoring" },
        price: quote,
        featured: true,
      },
    ],
  },
];

const amount = (value: number, locale: Locale) =>
  `${new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US").format(value)} FCFA`;

/** "À partir de 100 000 FCFA", "5 000 FCFA / séance de 2 h", "Sur devis". */
export function formatPrice(price: Price, locale: Locale) {
  const fr = locale === "fr";
  switch (price.kind) {
    case "from":
      return `${fr ? "À partir de" : "From"} ${amount(price.amount, locale)}`;
    case "fixed":
      return `${amount(price.amount, locale)} / ${price.unit[locale]}`;
    case "quote":
      return fr ? "Sur devis" : "On quote";
  }
}
