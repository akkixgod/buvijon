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
- [Features](${SITE_ORIGIN}/features) — family tree, per-child screen-time
  analysis, in-app connection, and Buvijon AI.
- [Join the waitlist](${SITE_ORIGIN}/waitlist) — sign up for early access.

## Status
Buvijon is pre-launch. The waitlist is open.
`,

  "/features": `# Buvijon — Features

Everything a family needs in one garden. Four core functions, with a live
interactive preview of the screen-time analysis.

## Family tree
Every parent and child in one shared tree. Co-parents manage the same children
and see the same garden — a child belongs to the family, not a single phone.

## Screen-time analysis
See when, how much, and for what each child used their screen — by app, by hour,
by day. Cross-device: if a child uses any family member's phone, that time still
counts toward their total.

## In-app connection
A built-in family messenger, plus posting a child's achievements to the family
tree — encouragement, not surveillance.

## Buvijon AI
Plain-language reports on each child's wellbeing, flagging meaningful changes and
improvements. When screen time gets out of hand, Buvijon AI can suggest booking a
consultation with a vetted child psychologist or doctor in the app, or point to
trusted local sports coaches.

Join the waitlist: ${SITE_ORIGIN}/waitlist
`,

  "/waitlist": `# Buvijon — Join the waitlist

Sign up for early access to Buvijon. The waitlist is open.

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
