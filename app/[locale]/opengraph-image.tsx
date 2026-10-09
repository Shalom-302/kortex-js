import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { K_PATH } from "@/components/brand/k-mark";

export const alt = "KORTEX — Technologie • Créativité • Expériences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <svg
          width="720"
          height="720"
          viewBox="0 0 24 24"
          style={{ position: "absolute", right: -120, top: -45 }}
        >
          <path d={K_PATH} fill="#262626" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, fontWeight: 600, letterSpacing: 4 }}>
          KORTEX DIGITAL
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.05em" }}>KORTEX</div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#d4d4d4", maxWidth: 820 }}>{t("title")}</div>
        </div>
        <div style={{ fontSize: 22, color: "#a3a3a3", letterSpacing: 3, textTransform: "uppercase" }}>
          {tc("signature")}
        </div>
      </div>
    ),
    size,
  );
}
