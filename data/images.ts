/**
 * Temporary stock photography (Unsplash).
 * Replace each entry with KORTEX's own photos in /public/images when available —
 * components only reference these keys, so swapping `src` (e.g. "/images/team.jpg") is enough.
 */
export type SiteImage = {
  src: string;
  alt: { fr: string; en: string };
  credit?: { name: string; url: string };
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const IMAGES = {
  city: {
    src: unsplash("photo-1648770664367-54d43741edf1"),
    alt: {
      fr: "Vue aérienne d’Abidjan : les tours du Plateau et la lagune Ébrié",
      en: "Aerial view of Abidjan: the Plateau towers and the Ébrié lagoon",
    },
    credit: { name: "djebi abraham philippe", url: "https://unsplash.com/photos/e514SZzfpfM" },
  },
  architecture: {
    src: unsplash("photo-1646148447279-e0692b01ea66"),
    alt: {
      fr: "Immeuble moderniste en béton à Abidjan, vu en contre-plongée",
      en: "Modernist concrete building in Abidjan, seen from below",
    },
    credit: { name: "djebi abraham philippe", url: "https://unsplash.com/photos/bRVtv5VEXUE" },
  },
  team: {
    src: unsplash("photo-1655720357872-ce227e4164ba"),
    alt: {
      fr: "Trois jeunes femmes travaillent ensemble autour d’un ordinateur portable",
      en: "Three young women working together around a laptop",
    },
    credit: { name: "Iwaria Inc.", url: "https://unsplash.com/photos/M7ALc3UuX_g" },
  },
  software: {
    src: unsplash("photo-1730130054404-c2bd8e7038c2"),
    alt: {
      fr: "Développeur devant un grand écran affichant du code",
      en: "Developer in front of a large screen showing code",
    },
    credit: { name: "Olumuyiwa Sobowale", url: "https://unsplash.com/photos/kQIdjLbCghA" },
  },
  ai: {
    src: unsplash("photo-1592659762303-90081d34b277"),
    alt: {
      fr: "Gros plan sur un circuit électronique",
      en: "Close-up of an electronic circuit board",
    },
    credit: { name: "Vishnu Mohanan", url: "https://unsplash.com/photos/pfR18JNEMv8" },
  },
  design: {
    src: unsplash("photo-1558655146-d09347e92766"),
    alt: {
      fr: "Écran affichant une interface en cours de conception",
      en: "Screen showing an interface being designed",
    },
    credit: { name: "Balázs Kétyi", url: "https://unsplash.com/photos/_x335IZXxfc" },
  },
  animation: {
    src: unsplash("photo-1574717024653-61fd2cf4d44d"),
    alt: {
      fr: "Timeline de montage vidéo sur un écran",
      en: "Video editing timeline on a screen",
    },
    credit: { name: "Peter Stumpf", url: "https://unsplash.com/photos/yk9VXp4W5-Q" },
  },
  academy: {
    src: unsplash("photo-1653566031587-74f7d86a2e71"),
    alt: {
      fr: "Une formatrice anime une session devant des professionnels équipés d’ordinateurs",
      en: "A trainer leads a session for professionals working on laptops",
    },
    credit: { name: "UK Black Tech", url: "https://unsplash.com/photos/uZyE3w7khzw" },
  },
  workshop: {
    src: unsplash("photo-1653565684985-0b1a64cf7afc"),
    alt: {
      fr: "Atelier en salle de réunion, une intervenante échange avec les participants",
      en: "Workshop in a meeting room, a speaker engaging with participants",
    },
    credit: { name: "UK Black Tech", url: "https://unsplash.com/photos/3gO_bWev2jQ" },
  },
  labs: {
    src: unsplash("photo-1649959168260-2eb9702d7b69"),
    alt: {
      fr: "Carte électronique de prototypage posée sur une table",
      en: "Electronics prototyping board on a table",
    },
    credit: { name: "Vishnu Mohanan", url: "https://unsplash.com/photos/kyDsOF8gsIA" },
  },
  careers: {
    src: unsplash("photo-1642929426263-caf1617ced29"),
    alt: {
      fr: "Jeune professionnelle souriante dans un bureau moderne",
      en: "Smiling young professional in a modern office",
    },
    credit: { name: "Francis Odeyemi", url: "https://unsplash.com/photos/Xq-RY9z8VY4" },
  },
  texture1: {
    src: unsplash("photo-1521194263619-39ecc5b55c61"),
    alt: { fr: "Jeu d’ombre et de lumière sur un mur en béton", en: "Light and shadow on a concrete wall" },
    credit: { name: "Bernard Hermant", url: "https://unsplash.com/photos/u7VDgNGb78w" },
  },
  texture2: {
    src: unsplash("photo-1619280771206-d8330a0be617"),
    alt: { fr: "Escalier en béton aux lignes graphiques", en: "Concrete stairs with graphic lines" },
    credit: { name: "SiNa Jahany", url: "https://unsplash.com/photos/9vJJVjE8LIY" },
  },
  texture3: {
    src: unsplash("photo-1635074155443-6cbf74711dd2"),
    alt: { fr: "Texture de mur en béton", en: "Concrete wall texture" },
    credit: { name: "Bjørn-Magnus Kristiansen", url: "https://unsplash.com/photos/DrQ_An-GwOw" },
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;
