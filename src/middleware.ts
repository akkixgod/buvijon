import { NextResponse, type NextRequest } from "next/server";
import { PAGE_MARKDOWN, tokenCount } from "@/lib/agentContent";

// Markdown for Agents: when a client explicitly asks for `text/markdown`, return
// a markdown representation of the page. Browsers (which send `text/html` and do
// not prioritize markdown) continue to receive the normal HTML response.
//
// The response carries `Vary: Accept` so shared caches key on the Accept header;
// next.config.ts sets the same Vary on the HTML side of these routes.

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const lower = accept.toLowerCase();
  if (!lower.includes("text/markdown")) return false;
  // If the client also lists text/html, only serve markdown when markdown is not
  // explicitly deprioritized below html. Browsers send html without markdown, so
  // this branch is effectively agent-only, but we stay conservative.
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const markdown = PAGE_MARKDOWN[pathname];

  if (markdown && prefersMarkdown(request.headers.get("accept"))) {
    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(tokenCount(markdown)),
        Vary: "Accept",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/features", "/waitlist"],
};
