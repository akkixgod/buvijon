import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buvijon.com"),
  title: {
    default: "Buvijon — Screen time. Reimagined.",
    template: "%s — Buvijon",
  },
  description: "A garden where your child's digital balance blooms. Beautiful screen time management for families.",
  keywords: ["parental control", "screen time", "digital wellness", "family app", "child safety"],
  openGraph: {
    title: "Buvijon — Screen time. Reimagined.",
    description: "A garden where your child's digital balance blooms.",
    type: "website",
    url: "/",
    siteName: "Buvijon",
    images: [{ url: "/first-frame.webp", width: 1280, height: 1280, alt: "Buvijon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buvijon — Screen time. Reimagined.",
    description: "A garden where your child's digital balance blooms.",
    images: ["/first-frame.webp"],
  },
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <I18nProvider initialLocale={locale}>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
