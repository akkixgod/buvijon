// Markdown representations of the site's pages, served to agents that request
// `Accept: text/markdown` (see src/middleware.ts). HTML remains the default for
// browsers. Keep these in sync with the corresponding pages under src/app.

export const SITE_ORIGIN = "https://buvijon.com";

export const PAGE_MARKDOWN: Record<string, string> = {
  "/": `# Buvijon — Screen time. Reimagined.

A garden where your child's digital balance blooms. Beautiful, calm screen time
management for families.

## What Buvijon does
- Turns each child's daily screen time into a living flower that thrives when
  usage is balanced and wilts when limits are exceeded.
- Gives parents a shared family view, gentle analytics, and healthy defaults
  instead of surveillance-style dashboards.

## Key pages
- [Family dashboard](${SITE_ORIGIN}/family) — the shared family garden and
  per-child standing.
- [Analysis](${SITE_ORIGIN}/analysis) — screen time trends, activity, and app
  breakdown.
- [Join the waitlist](${SITE_ORIGIN}/waitlist) — sign up for early access.

## Status
Buvijon is pre-launch. The waitlist is open. Launch date: June 1.
`,

  "/family": `# Buvijon — Family dashboard

The family garden shows every member of the household and each child's current
standing at a glance. This page is an interactive preview populated with sample
data.

## Sections
- **Family** — members with avatars, roles, online status, and each child's
  flower reflecting today's balance.
- **Chats** — family group conversations, including gentle system nudges from
  Buvijon.
- **Direct** — one-to-one messages between family members.

## Per-child detail
Selecting a child reveals screen time today vs. their daily limit, the flower
state (healthy / attention / exceeded), and a weekly progress chart.

Join the waitlist: ${SITE_ORIGIN}/waitlist
`,

  "/analysis": `# Buvijon — Screen time analysis

Calm, readable analytics for a child's digital habits. This page is an
interactive preview populated with sample data.

## What it shows
- **KPI summary** — headline numbers for the selected period (today / week /
  month).
- **Activity** — screen time distributed across the day.
- **Trend** — usage trend with healthy / borderline / over-limit banding.
- **App breakdown** — time and share per app.
- **Positives and things to watch** — plain-language guidance.

Join the waitlist: ${SITE_ORIGIN}/waitlist
`,

  "/waitlist": `# Buvijon — Join the waitlist

Sign up for early access to Buvijon. Launch date: June 1.

## Fields
- Full name
- Telegram username
- Gmail address
- City (Uzbekistan)
- Agreement to be contacted about early access

Submitting adds you to the early-access list. Return home: ${SITE_ORIGIN}/
`,
};

/**
 * Rough token estimate for the `x-markdown-tokens` response header.
 * Uses the common ~4-characters-per-token heuristic.
 */
export function tokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}
