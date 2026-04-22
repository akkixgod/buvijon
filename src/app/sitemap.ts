import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://buvijon.com";
  const now = new Date();
  return [
    { url: `${base}/`,         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/family`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/analysis`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/waitlist`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
