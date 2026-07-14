import type { NextConfig } from "next";

// RFC 8288 Link header advertising agent-discovery resources from the homepage
// (and other page routes). Targets must resolve: /.well-known/api-catalog,
// /llms.txt (service documentation), and the agent-skills index.
const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</llms.txt>; rel="service-doc"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"',
].join(", ");

// Page routes that support HTML + Markdown content negotiation. They must send
// `Vary: Accept` so shared caches don't serve markdown to a browser (or vice
// versa) after the middleware branches on the Accept header.
const PAGE_ROUTES = ["/", "/features", "/waitlist"];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    // The former /family and /analysis pages were folded into /features.
    return [
      { source: "/family", destination: "/features", permanent: true },
      { source: "/analysis", destination: "/features", permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: "/join/:code", destination: "/invite/join.html" }];
  },
  async headers() {
    const pageHeaders = PAGE_ROUTES.map((source) => ({
      source,
      headers: [
        { key: "Link", value: AGENT_LINK_HEADER },
        { key: "Vary", value: "Accept" },
      ],
    }));

    return [
      ...pageHeaders,
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/json; charset=utf-8",
          },
        ],
      },
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json; charset=utf-8",
          },
        ],
      },
      {
        // Extensionless linkset document (RFC 9727 / RFC 9264).
        source: "/.well-known/api-catalog",
        headers: [
          {
            key: "Content-Type",
            value: "application/linkset+json; charset=utf-8",
          },
        ],
      },
      {
        // Extensionless OAuth/OIDC discovery stubs.
        source: "/.well-known/openid-configuration",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
        ],
      },
      {
        source: "/.well-known/oauth-authorization-server",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
        ],
      },
      {
        source: "/.well-known/oauth-protected-resource",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
        ],
      },
      {
        source: "/auth.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
