---
name: buvijon-overview
description: Explore the Buvijon website and its content the way an agent should — pages, markdown negotiation, health, and the waitlist.
version: 0.1.0
---

# Buvijon — Site Overview Skill

Buvijon is a family screen-time product. This skill explains how an AI agent can
read and navigate the public site.

## What Buvijon is

Buvijon turns each child's daily screen time into a living flower: it stays
healthy when usage is balanced and wilts as daily limits are approached or
exceeded. Parents get a shared family view and calm analytics instead of
surveillance-style dashboards. The product is pre-launch; the waitlist is open,
with a launch date of June 1.

## Pages

- `https://buvijon.com/` — product overview and primary call to action.
- `https://buvijon.com/family` — shared family garden, member standing, chats,
  and per-child screen-time detail (interactive preview, sample data).
- `https://buvijon.com/analysis` — screen-time KPIs, activity, trend, and app
  breakdown (interactive preview, sample data).
- `https://buvijon.com/waitlist` — early-access sign-up form.

## Reading pages as Markdown

Each page above supports content negotiation. Request it with the header
`Accept: text/markdown` to receive a Markdown representation instead of HTML.
The response uses `Content-Type: text/markdown; charset=utf-8` and includes an
approximate `x-markdown-tokens` header.

## Programmatic discovery

- API catalog: `https://buvijon.com/.well-known/api-catalog`
  (`application/linkset+json`).
- Health check: `https://buvijon.com/api/health` returns `{ "status": "ok" }`.
- Content usage preferences: `https://buvijon.com/robots.txt` includes a
  `Content-Signal` line (`ai-train=no, search=yes, ai-input=yes`).

## Waitlist

The waitlist form collects full name, Telegram username, Gmail address, and
city. In an agentic browser, the site also exposes WebMCP tools (for example
`get_launch_info`, `list_pages`, and `open_waitlist`) via
`navigator.modelContext`.

## Constraints

There is no public authenticated API. Any OAuth/OIDC or MCP discovery documents
on this domain are non-production placeholders and should not be treated as live
endpoints.
