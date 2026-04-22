import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Family garden",
  description: "Your family's screen-time garden — gentle limits, quiet messages, and a shared sense of balance.",
};

export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
