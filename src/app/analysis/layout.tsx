import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Screen time analysis",
  description: "A quiet, honest look at your family's digital rhythm — only the patterns worth seeing.",
};

export default function AnalysisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
