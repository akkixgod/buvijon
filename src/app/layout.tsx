import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
