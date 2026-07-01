# Agent Discovery

This document describes the agent-discovery surface of buvijon.com and the one
piece that must be applied manually (DNS).

## Implemented in this repo (auto-deployed by Vercel)

| Capability | Where | Notes |
| --- | --- | --- |
| RFC 8288 `Link` headers | `next.config.ts` | Homepage + page routes advertise `api-catalog`, `service-doc` (`/llms.txt`), and the agent-skills index. |
| Markdown for Agents | `src/middleware.ts`, `src/lib/agentContent.ts` | `Accept: text/markdown` returns markdown (`Content-Type: text/markdown`, `x-markdown-tokens`). HTML stays default; routes send `Vary: Accept`. |
| Content Signals | `src/app/robots.txt/route.ts` | `Content-Signal: ai-train=no, search=yes, ai-input=yes`. Edit values there. |
| API catalog (RFC 9727) | `public/.well-known/api-catalog` | `application/linkset+json` with `service-doc` + `status`. |
| Health endpoint | `src/app/api/health/route.ts` | `GET /api/health` → `{ "status": "ok" }`. |
| Agent skills index | `public/.well-known/agent-skills/index.json` + `.../overview/SKILL.md` | RFC v0.2.0; index carries the SKILL.md sha256. |
| WebMCP | `src/components/WebMcpProvider.tsx` | Registers `get_launch_info`, `list_pages`, `open_waitlist` via `navigator.modelContext`. |
| OAuth/OIDC/MCP placeholders | `public/.well-known/*`, `public/auth.md` | Clearly marked `no_production_api`. Delete these files if you prefer honest absence. |

### Regenerating the SKILL.md hash

If you edit `public/.well-known/agent-skills/overview/SKILL.md`, update the
`sha256` in `index.json`:

```powershell
(Get-FileHash -Algorithm SHA256 "public\.well-known\agent-skills\overview\SKILL.md").Hash.ToLower()
```

## Manual step — DNS for AI Discovery (DNS-AID) + DNSSEC

DNS records and DNSSEC signing cannot be done from this repo; they must be
configured at the DNS provider for `buvijon.com` (e.g. Vercel DNS, Cloudflare,
or the registrar).

### 1. Publish DNS-AID entrypoint records (SVCB/HTTPS, ServiceMode)

Per draft-mozleywilliams-dnsop-dnsaid, publish records under the `_agents`
label. Example zone entries (adjust `endpoint`/`target` to real hosts once an
agent service exists):

```dns
; General discovery index entrypoint
_index._agents.buvijon.com. 3600 IN SVCB 1 buvijon.com. (
    alpn="h2,h3"
    dohpath="/.well-known/agent-skills/index.json" )

; A2A (agent-to-agent) entrypoint
_a2a._agents.buvijon.com.   3600 IN SVCB 1 buvijon.com. (
    alpn="h2,h3" )
```

Notes:
- Use `HTTPS` RR type instead of `SVCB` if your provider only exposes the
  HTTPS record editor; the parameters are the same family.
- `1` is the SvcPriority for ServiceMode (non-zero). Priority `0` would be
  AliasMode.
- Only advertise `_a2a` once an actual agent endpoint is live; until then the
  `_index` record pointing at the skills index is the honest minimum.

### 2. Sign the zone with DNSSEC

1. In the DNS provider, enable DNSSEC for the `buvijon.com` zone (this generates
   ZSK/KSK and signs records).
2. Copy the generated DS record (or DNSKEY, depending on provider) to the domain
   **registrar** so the parent zone (`.com`) publishes the chain of trust.
3. Verify with:

   ```bash
   dig +dnssec SVCB _index._agents.buvijon.com
   delv @1.1.1.1 _index._agents.buvijon.com SVCB   # should report "fully validated"
   ```

Once validating resolvers return authenticated SVCB/HTTPS answers, the DNS-AID
check passes.
