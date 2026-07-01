// Plain-text robots.txt route handler. We use a Route Handler instead of the
// Next.js `robots.ts` metadata convention because the metadata API cannot emit
// arbitrary `Content-Signal` directives (Content Signals / AIPREF).
//
// Content-Signal declares AI usage preferences for this site's content:
//   ai-train=no   — do not use content to train AI models
//   search=yes    — content may be indexed for search
//   ai-input=yes  — content may be used as input for AI answers/grounding
// Adjust the values below to change these preferences.

export const dynamic = "force-static";

const BODY = `# https://contentsignals.org/  •  https://buvijon.com
User-agent: *
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: https://buvijon.com/sitemap.xml
`;

export function GET() {
  return new Response(BODY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
