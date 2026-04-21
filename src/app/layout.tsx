import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { PageTransition } from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buvijon — Screen time. Reimagined.",
  description: "A garden where your child's digital balance blooms. Beautiful screen time management for families.",
  keywords: ["parental control", "screen time", "digital wellness", "family app", "child safety"],
  openGraph: {
    title: "Buvijon — Screen time. Reimagined.",
    description: "A garden where your child's digital balance blooms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <BackgroundDecor />
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
