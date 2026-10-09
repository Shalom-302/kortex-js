"use client";

import { useId, useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";
import type { z } from "zod";
import type messages from "@/messages/fr.json";
import { Link } from "@/i18n/navigation";
import { BUDGET_RANGES, NEED_TYPES, SITE, TIMELINES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { contactSchema } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";

type FormInput = z.input<typeof contactSchema>;
type FormOutput = z.output<typeof contactSchema>;
type ErrorKey = keyof (typeof messages)["contact"]["errors"];
type Status = "idle" | "success" | "error" | "rate-limited";

const fieldBase =
  "w-full rounded-none border-0 border-b border-grey-300 bg-transparent px-0 py-3 text-base text-ink " +
  "placeholder:text-grey-400 transition-colors duration-200 focus:border-ink focus:outline-none focus-visible:outline-none " +
  "aria-[invalid=true]:border-danger";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      website: "",
      locale,
    } as Partial<FormInput>,
    mode: "onTouched",
  });

  const errorText = (error?: FieldError) =>
    error?.message ? t(`errors.${error.message as ErrorKey}`) : undefined;

  async function onSubmit(values: FormOutput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status === 429) return setStatus("rate-limited");
      if (!res.ok) return setStatus("error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card bg-ink p-8 text-paper md:p-12">
        <span className="grid size-10 place-items-center rounded-full bg-paper text-ink">
          <Check aria-hidden className="size-5" />
        </span>
        <h2 className="mt-8 text-title font-medium">{t("successTitle")}</h2>
        <p className="mt-3 text-grey-400">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
      {/* Honeypot: invisible to humans and assistive tech, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <input type="hidden" {...register("locale")} />

      <div className="grid gap-10 md:grid-cols-2">
        <Field label={t("fields.name")} error={errorText(errors.name)}>
          {(id, describedBy) => (
            <input id={id} type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={describedBy} className={fieldBase} {...register("name")} />
          )}
        </Field>
        <Field label={t("fields.company")} optional={t("fields.optional")} error={errorText(errors.company)}>
          {(id, describedBy) => (
            <input id={id} type="text" autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={describedBy} className={fieldBase} {...register("company")} />
          )}
        </Field>
        <Field label={t("fields.email")} error={errorText(errors.email)}>
          {(id, describedBy) => (
            <input id={id} type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={describedBy} className={fieldBase} {...register("email")} />
          )}
        </Field>
        <Field label={t("fields.phone")} optional={t("fields.optional")} error={errorText(errors.phone)}>
          {(id, describedBy) => (
            <input id={id} type="tel" autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone} aria-describedby={describedBy} className={fieldBase} {...register("phone")} />
          )}
        </Field>
      </div>

      <fieldset aria-describedby={errors.need ? "need-error" : undefined}>
        <legend className="text-sm text-grey-600">{t("fields.need")}</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {NEED_TYPES.map((need) => (
            <label key={need} className="cursor-pointer">
              <input type="radio" value={need} className="peer sr-only" {...register("need")} />
              <span className="inline-flex h-10 items-center rounded-full border border-grey-300 px-4 text-sm transition-colors duration-200 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink">
                {t(`needs.${need}`)}
              </span>
            </label>
          ))}
        </div>
        {errors.need && <ErrorText id="need-error">{errorText(errors.need)}</ErrorText>}
      </fieldset>

      <Field label={t("fields.message")} error={errorText(errors.message)}>
        {(id, describedBy) => (
          <textarea
            id={id}
            rows={5}
            placeholder={t("fields.messagePlaceholder")}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy}
            className={cn(fieldBase, "resize-y")}
            {...register("message")}
          />
        )}
      </Field>

      <div className="grid gap-10 md:grid-cols-2">
        <Field label={t("fields.budget")} error={errorText(errors.budget)}>
          {(id, describedBy) => (
            <select id={id} defaultValue="" aria-invalid={!!errors.budget} aria-describedby={describedBy} className={cn(fieldBase, "cursor-pointer")} {...register("budget")}>
              <option value="" disabled>
                {t("fields.select")}
              </option>
              {BUDGET_RANGES.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label[locale]}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field label={t("fields.timeline")} error={errorText(errors.timeline)}>
          {(id, describedBy) => (
            <select id={id} defaultValue="" aria-invalid={!!errors.timeline} aria-describedby={describedBy} className={cn(fieldBase, "cursor-pointer")} {...register("timeline")}>
              <option value="" disabled>
                {t("fields.select")}
              </option>
              {TIMELINES.map((tl) => (
                <option key={tl.value} value={tl.value}>
                  {tl.label[locale]}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-grey-600">
          <input
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-ink"
            {...register("consent")}
          />
          <span>
            {t.rich("fields.consent", {
              link: (chunks) => (
                <Link href="/privacy" className="text-ink underline underline-offset-4" target="_blank">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.consent && <ErrorText id="consent-error">{errorText(errors.consent)}</ErrorText>}
      </div>

      <div className="flex flex-col items-start gap-4">
        <Button type="submit" size="lg" arrow disabled={isSubmitting}>
          {isSubmitting ? t("sending") : t("submit")}
        </Button>
        <p aria-live="polite" className="text-sm text-danger">
          {status === "error" && t("error", { email: SITE.email })}
          {status === "rate-limited" && t("rateLimited")}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: string;
  error?: string;
  children: (id: string, describedBy: string | undefined) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-sm text-grey-600">
        {label}
        {optional && <span className="ml-2 text-grey-400">({optional})</span>}
      </label>
      {children(id, error ? errorId : undefined)}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm text-danger">
      {children}
    </p>
  );
}
