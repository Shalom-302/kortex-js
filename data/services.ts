import type { Localized } from "@/lib/utils";

export type Offer = {
  name: Localized;
  detail?: Localized;
  /** Shown in the condensed list on the homepage. */
  featured?: boolean;
};

export type ServiceGroup = {
  /** Slug of a core universe (see data/universes.ts). */
  universe: "design" | "ai" | "training";
  offers: Offer[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    universe: "design",
    offers: [
      { name: { fr: "Logo", en: "Logo" }, featured: true },
      { name: { fr: "Animation / Motion design", en: "Animation / Motion design" }, featured: true },
      { name: { fr: "Identité visuelle", en: "Visual identity" }, featured: true },
      { name: { fr: "Supports de communication", en: "Brand collateral" } },
      { name: { fr: "Pack branding", en: "Branding pack" }, featured: true },
    ],
  },
  {
    universe: "ai",
    offers: [
      { name: { fr: "Site web professionnel", en: "Professional website" }, featured: true },
      { name: { fr: "Application web", en: "Web application" }, featured: true },
      { name: { fr: "Application mobile", en: "Mobile application" }, featured: true },
      {
        name: { fr: "Solutions IA", en: "AI solutions" },
        detail: {
          fr: "Agents IA, RAG / base documentaire IA, automatisation",
          en: "AI agents, RAG / AI knowledge base, automation",
        },
        featured: true,
      },
      { name: { fr: "API / intégration", en: "API / integration" } },
      { name: { fr: "SaaS / plateforme complète", en: "SaaS / full platform" } },
    ],
  },
  {
    universe: "training",
    offers: [
      { name: { fr: "Consultation IA", en: "AI consultation" }, featured: true },
      {
        name: { fr: "Formations", en: "Training courses" },
        detail: {
          fr: "Python, développement web / backend, IA / GenAI",
          en: "Python, web / backend development, AI / GenAI",
        },
        featured: true,
      },
      {
        name: { fr: "Accompagnement", en: "Mentoring" },
        detail: { fr: "Accompagnement de projet et mentorat", en: "Project support and mentoring" },
        featured: true,
      },
    ],
  },
];
