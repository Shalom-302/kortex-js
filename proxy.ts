import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Detects the browser language and redirects to /fr or /en.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
