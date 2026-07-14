import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Family tree, screen-time analysis for every child, in-app connection, and Buvijon AI — everything a family needs in one garden.",
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
