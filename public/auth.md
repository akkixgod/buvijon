# Buvijon — Agent Authentication

**Status: no agent authentication available.**

Buvijon is a pre-launch marketing site with no public authenticated API. There
is currently:

- no agent registration endpoint,
- no OAuth 2.0 / OpenID Connect provider,
- no OAuth-protected resource that issues or accepts access tokens.

The following discovery documents on this domain are non-production placeholders
that exist only to make this absence explicit for agent discovery tools:

- `/.well-known/openid-configuration`
- `/.well-known/oauth-authorization-server`
- `/.well-known/oauth-protected-resource`
- `/.well-known/mcp/server-card.json`

## What agents can do today

- Read any page as Markdown via `Accept: text/markdown`.
- Use the WebMCP tools exposed on the site's pages through
  `navigator.modelContext` (for example `get_launch_info`, `list_pages`,
  `open_waitlist`).
- Check availability at `/api/health`.

When a production API and agent registration become available, this file and the
discovery documents above will be updated with real endpoints, supported
identity and credential types, and registration, claim, and revocation URLs.

Contact: https://buvijon.com/
