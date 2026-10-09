import Link from "next/link";

// Requests that never reach a locale (rare: the proxy prefixes almost everything).
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <main style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: 500, letterSpacing: "-0.03em" }}>404</h1>
          <p>
            <Link href="/fr">Accueil</Link> · <Link href="/en">Home</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
