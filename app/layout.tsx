import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buvijon - Grow Together, Flourish Together | Parental Control with Love",
  description: "Beautiful screen time management for families. Watch your child's digital wellness bloom with our flower-based tracking system. Set limits, monitor progress, and nurture healthy digital habits.",
  keywords: ["parental control", "screen time", "digital wellness", "family app", "child safety"],
  openGraph: {
    title: "Buvijon - Grow Together, Flourish Together",
    description: "Beautiful screen time management for families using the power of flower metaphors.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buvijon - Grow Together, Flourish Together",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div id="particle-container" className="fixed inset-0 pointer-events-none overflow-hidden" />
        {children}
      </body>
    </html>
  );
}
