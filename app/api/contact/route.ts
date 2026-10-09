import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";
import { BUDGET_RANGES, SITE, TIMELINES } from "@/lib/constants";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`contact:${ip}`)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bots fill the honeypot: pretend success, send nothing.
  if (typeof body === "object" && body !== null && "website" in body && body.website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid", issues: parsed.error.issues }, { status: 422 });
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  // Until a professional mailbox and a verified domain exist, requests go to the founder's
  // address and are sent from Resend's test sender (which can only deliver to the account owner).
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || "KORTEX <onboarding@resend.dev>";
  const testSender = from.includes("@resend.dev");

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email not configured — request received:", data);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] Missing RESEND_API_KEY");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const t = await getTranslations({ locale: data.locale, namespace: "email" });
  const needs = await getTranslations({ locale: "fr", namespace: "contact.needs" });

  const team = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: t("teamSubject", { name: data.name, need: needs(data.need) }),
    text: teamEmail(data, needs(data.need)),
  });

  if (team.error) {
    console.error("[contact] Team email failed:", team.error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // Resend's test sender cannot email visitors: skip the acknowledgement until the domain is verified.
  if (testSender) return NextResponse.json({ ok: true });

  // The acknowledgement is best effort: the request is already delivered to the team.
  const ack = await resend.emails.send({
    from,
    to: data.email,
    subject: t("ackSubject"),
    text: [t("ackGreeting", { name: data.name }), "", t("ackBody"), "", t("ackSignature")].join("\n"),
  });
  if (ack.error) console.warn("[contact] Acknowledgement email failed:", ack.error);

  return NextResponse.json({ ok: true });
}

function teamEmail(data: ContactInput, needLabel: string) {
  const budget = BUDGET_RANGES.find((b) => b.value === data.budget)?.label.fr ?? data.budget;
  const timeline = TIMELINES.find((tl) => tl.value === data.timeline)?.label.fr ?? data.timeline;

  return [
    `Nom : ${data.name}`,
    `Entreprise : ${data.company || "—"}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.phone || "—"}`,
    `Besoin : ${needLabel}`,
    `Budget : ${budget}`,
    `Délai : ${timeline}`,
    `Langue : ${data.locale.toUpperCase()}`,
    "",
    "Projet :",
    data.message,
  ].join("\n");
}
