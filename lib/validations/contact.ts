import { z } from "zod";
import { BUDGET_VALUES, NEED_TYPES, TIMELINE_VALUES } from "@/lib/constants";

/**
 * Shared by the client form and the /api/contact route.
 * Error messages are translation keys resolved in the form (namespace "contact.errors").
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120, "tooLong"),
  company: z.string().trim().max(120, "tooLong").optional().or(z.literal("")),
  email: z.email("email").max(200, "tooLong"),
  phone: z
    .string()
    .trim()
    .max(40, "tooLong")
    .regex(/^[+\d\s().-]*$/, "phone")
    .optional()
    .or(z.literal("")),
  need: z.enum(NEED_TYPES, "need"),
  message: z.string().trim().min(20, "message").max(5000, "tooLong"),
  budget: z.enum(BUDGET_VALUES, "budget"),
  timeline: z.enum(TIMELINE_VALUES, "timeline"),
  consent: z.literal(true, "consent"),
  locale: z.enum(["fr", "en"]),
  // Honeypot — must stay empty. Hidden from humans.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
