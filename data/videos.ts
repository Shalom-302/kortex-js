/**
 * Short silent loops (Mixkit, free licence for commercial use: https://mixkit.co/license/).
 * Self-hosted in /public/videos, each with a poster frame. Shown in black and white.
 */
export type SiteVideo = { src: string; poster: string };

const mixkit = (id: number): SiteVideo => ({ src: `/videos/${id}.mp4`, poster: `/videos/${id}.jpg` });

export const VIDEOS = {
  digitalWorld: mixkit(12748),
  circuit: mixkit(47048),
  dataCenter: mixkit(23282),
  network: mixkit(31771),
  code: mixkit(9757),
} satisfies Record<string, SiteVideo>;

export type VideoKey = keyof typeof VIDEOS;
