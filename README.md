# KORTEX DIGITAL — site web

Site officiel de KORTEX, marque-écosystème portée par KORTEX DIGITAL (Abidjan) : Technologie • Créativité • Expériences.
Bilingue FR / EN, Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4, Motion, three.js, next-intl.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis compléter
npm run dev                  # http://localhost:3000 → redirige vers /fr ou /en
```

Vérifications avant mise en ligne :

```bash
npm run lint
npm run build
```

## Structure

```
app/
├── [locale]/                 # toutes les pages existent en /fr et /en
│   ├── layout.tsx            # <html lang>, polices, provider i18n, metadata globale
│   ├── opengraph-image.tsx   # image Open Graph générée
│   └── (marketing)/          # header + footer
│       ├── page.tsx          # homepage
│       ├── universes/        # Nos univers (DESIGN, AI, TRAINING + écosystème en expansion)
│       ├── services/         # Nos services (sur devis)
│       ├── insights/         # blog MDX
│       ├── kortexisme/       # manifeste (content/kortexisme)
│       ├── about/ careers/ contact/ legal/ privacy/
│       └── not-found.tsx     # 404 bilingue
├── api/contact/route.ts      # formulaire → Resend
├── sitemap.ts  robots.ts  icon.svg
components/  ui/ layout/ home/ solutions/ work/ contact/ shared/
content/insights/{fr,en}/*.mdx
content/kortexisme/{fr,en}.mdx
data/        universes.ts services.ts insights.ts images.ts
i18n/        routing.ts request.ts navigation.ts
messages/    fr.json en.json   # tous les textes d'interface
lib/         constants.ts utils.ts seo.ts rate-limit.ts validations/
proxy.ts     # détection de langue et redirection /fr | /en
```

## Modifier le contenu

| Quoi | Où |
| --- | --- |
| Textes d'interface | `messages/fr.json` et `messages/en.json` (mêmes clés) |
| Univers (principaux / en expansion) | `data/universes.ts` |
| Offres | `data/services.ts` |
| Manifeste Kortexisme | `content/kortexisme/<fr\|en>.mdx` |
| Logo (K) | `public/logo/Kimage.png` → `components/brand/k-geometry.ts` (tracé vectoriel) |
| Articles | `content/insights/<fr\|en>/<slug>.mdx` — même slug dans les deux langues |
| Photos | `data/images.ts` |
| Email, téléphone, infos société, budgets | `lib/constants.ts` |

### Articles

```mdx
---
title: "Titre"
summary: "Résumé court"
date: "2026-10-01"
tags: ["IA"]
cover: "texture2"   # clé de data/images.ts (optionnel)
draft: false        # true = visible uniquement en développement
---
```

### Remplacer les photos temporaires

Les photos viennent d'Unsplash (crédits dans `data/images.ts`) et s'affichent en noir et blanc.
Pour mettre une vraie photo : la déposer dans `public/images/`, puis remplacer le `src` de l'entrée
correspondante (ex. `src: "/images/equipe.jpg"`). Aucun composant à modifier.

## Formulaire de contact

Variables (voir `.env.example`) : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
(domaine vérifié dans Resend). Sans elles, en développement, les demandes sont affichées dans la console.

Protections : validation Zod partagée client/serveur, honeypot, limite de 5 envois / 10 min par IP.

## À compléter avant la mise en ligne

Rechercher `TODO(kortex)` et `[à compléter]` :

- `lib/constants.ts` : email de contact, liens réseaux sociaux, tranches de budget et devise
- `data/projects.ts` : contenu de l'étude de cas SEVOIL
- `messages/*.json` → `legal` / `privacy` : raison sociale, RCCM, adresse, durée de conservation
- `content/insights` : réécrire ou supprimer l'article brouillon
- Logo définitif (`components/layout/logo.tsx`, `app/icon.svg`)
- `NEXT_PUBLIC_SITE_URL` avec le vrai domaine
