"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// WebMCP: expose a few honest, read/navigate tools to agentic browsers via
// `navigator.modelContext.provideContext()`. No-ops in browsers that don't
// implement the API. Tools mirror what the public site can actually do — the
// waitlist is stored client-side, so `open_waitlist` navigates and optionally
// prefills rather than claiming a server-side registration.

const LAUNCH_DATE = "2026-06-01";

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<{
    content: Array<{ type: "text"; text: string }>;
  }>;
};

type ModelContext = {
  provideContext?: (ctx: { tools: WebMcpTool[] }) => void;
};

function getModelContext(): ModelContext | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
}

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

export function WebMcpProvider() {
  const router = useRouter();

  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext?.provideContext) return;

    const tools: WebMcpTool[] = [
      {
        name: "get_launch_info",
        description:
          "Get Buvijon's launch status and date, and whether the waitlist is open.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () =>
          textResult(
            JSON.stringify({
              status: "pre-launch",
              launchDate: LAUNCH_DATE,
              waitlistOpen: true,
              waitlistUrl: "https://buvijon.com/waitlist",
            }),
          ),
      },
      {
        name: "list_pages",
        description: "List the main pages of the Buvijon website with descriptions.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () =>
          textResult(
            JSON.stringify([
              { path: "/", title: "Home", description: "Product overview and call to action." },
              { path: "/family", title: "Family dashboard", description: "Shared family garden and per-child standing (preview)." },
              { path: "/analysis", title: "Analysis", description: "Screen time KPIs, trend, and app breakdown (preview)." },
              { path: "/waitlist", title: "Waitlist", description: "Early-access sign-up form." },
            ]),
          ),
      },
      {
        name: "open_waitlist",
        description:
          "Navigate the browser to the Buvijon waitlist sign-up page. Does not submit any data.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => {
          router.push("/waitlist");
          return textResult("Opened the waitlist page at /waitlist.");
        },
      },
    ];

    modelContext.provideContext({ tools });
  }, [router]);

  return null;
}
