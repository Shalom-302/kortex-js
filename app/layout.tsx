import "./globals.css";

// The <html> element lives in app/[locale]/layout.tsx so its `lang` follows the locale.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return children;
}
