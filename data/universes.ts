import type { Localized } from "@/lib/utils";

/**
 * The KORTEX universes. They are brand axes carried by KORTEX DIGITAL, not separate companies.
 * - "core": operational today (DESIGN, AI, TRAINING) — shown first and large.
 * - "expansion": in development — always shown more discreetly, with a status badge.
 */
export type UniverseTier = "core" | "expansion";
export type UniverseFamily = "technology" | "experiences";

export type Universe = {
  slug: string;
  /** Suffix after "KORTEX", e.g. "DESIGN". */
  name: string;
  tier: UniverseTier;
  family?: UniverseFamily;
  summary: Localized;
  /** Core universes only. */
  intro?: Localized;
  focus?: Localized<string[]>;
};

export const UNIVERSES: Universe[] = [
  {
    slug: "design",
    name: "DESIGN",
    tier: "core",
    summary: {
      fr: "Création graphique, identité visuelle, logo, animation et motion design.",
      en: "Graphic design, visual identity, logos, animation and motion design.",
    },
    intro: {
      fr: "Donner une forme aux idées. Des identités nettes, des logos durables et du mouvement qui sert le message.",
      en: "Giving ideas a shape. Sharp identities, lasting logos and motion that serves the message.",
    },
    focus: {
      fr: ["Logo", "Identité visuelle", "Supports de communication", "Animation", "Motion design"],
      en: ["Logo", "Visual identity", "Brand collateral", "Animation", "Motion design"],
    },
  },
  {
    slug: "ai",
    name: "AI",
    tier: "core",
    summary: {
      fr: "Intelligence artificielle, LLM, agents IA, RAG, automatisation et solutions intelligentes.",
      en: "Artificial intelligence, LLMs, AI agents, RAG, automation and intelligent solutions.",
    },
    intro: {
      fr: "La technologie au cœur. Sites, applications et solutions d’IA conçus pour être utiles, mesurables et durables.",
      en: "Technology at the core. Websites, applications and AI solutions built to be useful, measurable and lasting.",
    },
    focus: {
      fr: ["Agents IA", "LLM", "RAG", "Automatisation", "Sites & applications"],
      en: ["AI agents", "LLMs", "RAG", "Automation", "Websites & apps"],
    },
  },
  {
    slug: "training",
    name: "TRAINING",
    tier: "core",
    summary: {
      fr: "Formation, consultation et accompagnement technologique.",
      en: "Training, consulting and technology mentoring.",
    },
    intro: {
      fr: "Transmettre les compétences. Des consultations, des formations et un accompagnement pour rendre chacun autonome.",
      en: "Passing on skills. Consultations, training and mentoring that make people autonomous.",
    },
    focus: {
      fr: ["Consultation IA", "Python", "Développement web", "IA générative", "Mentorat"],
      en: ["AI consulting", "Python", "Web development", "Generative AI", "Mentoring"],
    },
  },
  {
    slug: "dev",
    name: "DEV",
    tier: "expansion",
    family: "technology",
    summary: { fr: "Développement logiciel, plateformes, API et SaaS.", en: "Software development, platforms, APIs and SaaS." },
  },
  {
    slug: "security",
    name: "SECURITY",
    tier: "expansion",
    family: "technology",
    summary: { fr: "Cybersécurité et sécurité applicative.", en: "Cybersecurity and application security." },
  },
  {
    slug: "cloud",
    name: "CLOUD",
    tier: "expansion",
    family: "technology",
    summary: { fr: "Infrastructure, déploiement et services cloud.", en: "Infrastructure, deployment and cloud services." },
  },
  {
    slug: "data",
    name: "DATA",
    tier: "expansion",
    family: "technology",
    summary: { fr: "Données, analyse et dashboards.", en: "Data, analytics and dashboards." },
  },
  {
    slug: "media",
    name: "MEDIA",
    tier: "expansion",
    family: "experiences",
    summary: { fr: "Contenus numériques, vidéo et communication.", en: "Digital content, video and communication." },
  },
  {
    slug: "play",
    name: "PLAY",
    tier: "expansion",
    family: "experiences",
    summary: { fr: "Gaming, jeux et divertissement.", en: "Gaming, games and entertainment." },
  },
  {
    slug: "loisir",
    name: "LOISIR",
    tier: "expansion",
    family: "experiences",
    summary: {
      fr: "Loisirs, sorties, détente et expériences récréatives.",
      en: "Leisure, outings, relaxation and recreational experiences.",
    },
  },
  {
    slug: "sport",
    name: "SPORT",
    tier: "expansion",
    family: "experiences",
    summary: { fr: "Activités et expériences sportives.", en: "Sports activities and experiences." },
  },
  {
    slug: "culture",
    name: "CULTURE",
    tier: "expansion",
    family: "experiences",
    summary: { fr: "Culture, créativité et événements.", en: "Culture, creativity and events." },
  },
  {
    slug: "experience",
    name: "EXPERIENCE",
    tier: "expansion",
    family: "experiences",
    summary: {
      fr: "Expériences, événements et activités immersives.",
      en: "Experiences, events and immersive activities.",
    },
  },
  {
    slug: "travel",
    name: "TRAVEL",
    tier: "expansion",
    family: "experiences",
    summary: {
      fr: "Voyages, découvertes et expériences touristiques.",
      en: "Travel, discovery and tourism experiences.",
    },
  },
];

export const CORE_UNIVERSES = UNIVERSES.filter((u) => u.tier === "core");
export const EXPANSION_UNIVERSES = UNIVERSES.filter((u) => u.tier === "expansion");
export const UNIVERSE_FAMILIES: UniverseFamily[] = ["technology", "experiences"];

export function getUniverse(slug: string) {
  return UNIVERSES.find((u) => u.slug === slug);
}
