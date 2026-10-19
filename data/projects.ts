import type { Localized } from "@/lib/utils";

/**
 * Work already delivered by KORTEX DIGITAL. Screenshots live in /public/projects
 * (full-page captures, 1440 px wide, panned inside a browser frame on the home page).
 */
export type Project = {
  slug: string;
  name: string;
  /** Public address. Left out while the client's own domain is not live yet: no "visit" button. */
  url?: string;
  /** Shown in the browser frame instead of the raw address (hides staging hosts). */
  display: string;
  sector: Localized;
  summary: Localized;
  tags: Localized<string[]>;
  /** Full-page capture; omitted for shaapi, shown as a live terminal instead. */
  screenshot?: string;
  /** Our own product rather than a client project. */
  inHouse?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "telcosante",
    name: "Telcosanté",
    url: "https://telcosante.com/",
    display: "telcosante.com",
    sector: { fr: "Santé · Télémédecine", en: "Health · Telemedicine" },
    summary: {
      fr: "Le site de la plateforme de télémédecine ivoirienne : téléconsultation 24h/24, rendez-vous en ligne, médecins, spécialités et tarifs, et le lien vers l’application mobile.",
      en: "The website of an Ivorian telemedicine platform: 24/7 teleconsultation, online booking, doctors, specialities and pricing, plus the path to the mobile app.",
    },
    tags: { fr: ["Site web", "Santé", "Application mobile"], en: ["Website", "Health", "Mobile app"] },
    screenshot: "/projects/telcosante.jpg",
  },
  {
    slug: "sevoil",
    name: "SEV-OIL",
    // Waiting for SEV-OIL's own domain; add `url` once it points to the site.
    display: "SEV MARITIME OIL-LOGISTICS",
    sector: { fr: "Énergie · Logistique pétrolière", en: "Energy · Fuel logistics" },
    summary: {
      fr: "Un site bilingue pour un distributeur de produits pétroliers : stations-service, sites miniers et soutage maritime à Abidjan et San-Pédro, avec demande de devis en ligne.",
      en: "A bilingual website for a fuel distributor: service stations, mining sites and marine bunkering in Abidjan and San-Pédro, with online quote requests.",
    },
    tags: { fr: ["Site bilingue", "Demande de devis", "Industrie"], en: ["Bilingual site", "Quote requests", "Industry"] },
    screenshot: "/projects/sevoil.jpg",
  },
  {
    slug: "oissu",
    name: "OISSU CONNECT",
    url: "https://oissu.kortex.sbs/",
    display: "OISSU CONNECT",
    sector: { fr: "Sport scolaire et universitaire", en: "School & university sport" },
    summary: {
      fr: "Une plateforme de suivi des athlètes : fiches, historique des compétitions et indicateurs de progression par journée et par saison, pour six disciplines.",
      en: "An athlete tracking platform: profiles, competition history and progress indicators by event day and season, across six disciplines.",
    },
    tags: { fr: ["Plateforme web", "Tableaux de bord", "Comptes sécurisés"], en: ["Web platform", "Dashboards", "Secure accounts"] },
    screenshot: "/projects/oissu.jpg",
  },
  {
    slug: "shaapi",
    name: "shaapi",
    url: "https://shalom-302.github.io/shaapi/",
    display: "shaapi",
    sector: { fr: "Framework open source · Python", en: "Open-source framework · Python" },
    summary: {
      fr: "Notre framework : il génère en quelques secondes un backend FastAPI prêt pour la production (PostgreSQL, Redis, JWT, RBAC, CLI Docker). Une API qui tourne en moins d’une minute.",
      en: "Our framework: it scaffolds a production-shaped FastAPI backend in seconds (PostgreSQL, Redis, JWT, RBAC, Docker CLI). A working API in under a minute.",
    },
    tags: { fr: ["Open source", "FastAPI", "Outil développeur"], en: ["Open source", "FastAPI", "Developer tool"] },
    inHouse: true,
  },
];
