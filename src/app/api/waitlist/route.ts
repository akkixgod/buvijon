// Waitlist submission endpoint. Persists entries to a Neon (Postgres)
// `waitlist` table via the Neon serverless driver. The connection string is
// server-side only (DATABASE_URL) — never exposed to the browser. Set
// DATABASE_URL in the Vercel project environment.

import type { NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (data: unknown, status: number) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const fullName = String(body.fullName ?? "").trim();
  const telegramUsername = String(body.telegramUsername ?? "")
    .replace(/^@+/, "")
    .trim();
  const gmail = String(body.gmail ?? "").trim().toLowerCase();
  const city = String(body.city ?? "").trim();

  // Server-side validation mirrors the client form so the table can't be
  // polluted by direct calls.
  if (
    !fullName ||
    !telegramUsername ||
    !gmail.includes("@gmail.com") ||
    !city
  ) {
    return json({ error: "invalid" }, 422);
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    // Not wired up yet — surface a clear 503 so the form shows a retry/contact
    // message instead of silently dropping the lead.
    return json({ error: "not_configured" }, 503);
  }

  try {
    const sql = neon(dbUrl);
    await sql`
      INSERT INTO waitlist (full_name, telegram_username, gmail, city, source)
      VALUES (${fullName}, ${telegramUsername}, ${gmail}, ${city}, 'website')
    `;
  } catch (err) {
    // 23505 = unique_violation → duplicate email (gmail column is UNIQUE).
    const code =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: unknown }).code)
        : "";
    if (code === "23505") {
      return json({ error: "duplicate" }, 409);
    }
    return json({ error: "upstream" }, 502);
  }

  return json({ ok: true }, 201);
}
