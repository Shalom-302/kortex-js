import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { KMark } from "@/components/brand/k-mark";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tc = useTranslations("common");

  return (
    <section className="relative isolate overflow-hidden">
      <KMark className="pointer-events-none absolute top-1/2 right-[-20%] -z-10 h-[90%] w-auto -translate-y-1/2 text-grey-100 md:right-[-5%]" />
      <div className="container-page flex min-h-[80svh] flex-col items-start justify-center pt-32 pb-24">
        <p className="eyebrow text-grey-500">404</p>
        <h1 className="mt-6 text-display font-medium">{t("title")}</h1>
        <p className="mt-6 max-w-md text-lg text-grey-600">{t("text")}</p>
        <ButtonLink href="/" className="mt-10" size="lg">
          {tc("backHome")}
        </ButtonLink>
      </div>
    </section>
  );
}
