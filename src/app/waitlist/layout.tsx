import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Early access opens May 15. Be the first family in the Buvijon garden.",
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
