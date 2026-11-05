import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site.config";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";

const headingFont = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading-face",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

const { site, company, seo } = siteConfig;
const locale = site.defaultLocale;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.title[locale],
  description: seo.description[locale],
  robots: { index: false, follow: false },
  icons: { icon: company.logo },
  openGraph: {
    title: seo.title[locale],
    description: seo.description[locale],
    url: site.url,
    siteName: company.name,
    locale,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050b18",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body">
        <MotionProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
